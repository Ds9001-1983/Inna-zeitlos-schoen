/**
 * Erzeugt Schild und Visitenkarten aus den Modulen in entwuerfe/.
 *
 *   npm --prefix druck run entwurf                 Entwürfe mit Platzhaltern + Vorschau-PNGs
 *   npm --prefix druck run entwurf -- --nur schild-a
 *   npm --prefix druck run final                   Druck-PDFs (PDF/X-3) – bricht ab, solange Pflichtfelder offen sind
 *   DRUCK_TESTDATEN=1 npm --prefix druck run final Gegenprobe mit unechten Testwerten → ausgabe/test/
 *
 * Ein Modul in entwuerfe/ exportiert:
 *   export default {
 *     produkt: 'schild' | 'visitenkarte',
 *     beschreibung: 'ein Satz',
 *     ausgaben: { default: [seite1] }                          // Schild → <modul>.pdf
 *            | { kontakt: [vorn, hinten], termin: [vorn, hinten] } // Karte → <modul>-kontakt.pdf …
 *   }
 * Jede Seite ist eine Funktion (seite, inhalte) => void mit einem `seitenname`-Feld optional.
 *
 * Exit 1: offene Pflichtfelder im final-Modus oder ein Satzfehler (z. B. zu viele Zeilen). Exit 2: Regelverstöße –
 * im Entwurf entstehen die Dateien trotzdem, im final-Modus entsteht dann keine Druck-PDF.
 * Vor jedem Lauf werden die Dateien früherer Läufe desselben Auftrags entfernt.
 */
import PDFDocument from 'pdfkit'
import { createWriteStream, mkdirSync, readdirSync, writeFileSync, renameSync, rmSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { produkte, profile, datenformat } from './formate.mjs'
import { mm, Seite, pruefeSeite } from './satz.mjs'
import * as inhalte from './inhalte.mjs'

const HIER = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const final = args.includes('--final')
const nur = args.includes('--nur') ? args[args.indexOf('--nur') + 1] : null
const modus = final ? 'final' : 'entwurf'
const zielOrdner = join(HIER, 'ausgabe', final ? (inhalte.mitTestdaten ? 'test' : 'final') : 'entwurf')
const tmp = join(HIER, 'ausgabe', '.tmp')
mkdirSync(zielOrdner, { recursive: true })
mkdirSync(tmp, { recursive: true })

if (final && !inhalte.mitTestdaten && existsSync(join(HIER, 'ausgabe', 'test'))) {
  // Testdateien nie neben echten Druckdaten liegen lassen
  rmSync(join(HIER, 'ausgabe', 'test'), { recursive: true, force: true })
}

const profilPfad = (name) => join(HIER, 'profile', profile[name].datei)
for (const name of Object.keys(profile)) {
  if (!existsSync(profilPfad(name))) {
    console.error(`Farbprofil fehlt: ${profilPfad(name)}\n→ sh druck/profile/laden.sh`)
    process.exit(1)
  }
}

// ---------- Module laden ----------

const modulDateien = readdirSync(join(HIER, 'entwuerfe'))
  .filter((f) => f.endsWith('.mjs') && !f.startsWith('._') && !f.startsWith('_'))
  .filter((f) => !nur || f === `${nur}.mjs`)
  .sort()
if (modulDateien.length === 0) {
  console.error(nur ? `Kein Modul entwuerfe/${nur}.mjs` : 'Keine Module in entwuerfe/')
  process.exit(1)
}

const auftraege = []
for (const datei of modulDateien) {
  const modul = (await import(pathToFileURL(join(HIER, 'entwuerfe', datei)).href)).default
  const modulName = datei.replace(/\.mjs$/, '')
  if (!produkte[modul?.produkt]) throw new Error(`${datei}: produkt fehlt oder unbekannt`)
  for (const [schluessel, seiten] of Object.entries(modul.ausgaben)) {
    const name = schluessel === 'default' ? modulName : `${modulName}-${schluessel}`
    auftraege.push({ name, modulName, produkt: modul.produkt, beschreibung: modul.beschreibung, seiten })
  }
}

// ---------- Pflichtfelder (final) ----------

if (final) {
  const offen = new Map()
  for (const a of auftraege) {
    for (const feld of produkte[a.produkt].pflichtfelder) {
      if (!inhalte.angaben[feld]) offen.set(feld, [...(offen.get(feld) ?? []), a.name])
    }
  }
  if (offen.size) {
    console.error('Keine Druck-PDF: Pflichtfelder in src/inhalte/salon.ts sind offen.\n')
    for (const [feld, wo] of offen) console.error(`  ${inhalte.feldBeschreibung[feld].name.padEnd(15)} (${feld}) – gebraucht für ${wo.join(', ')}`)
    console.error('\nSobald Inna die Angaben geschickt hat: in salon.ts eintragen und erneut ausführen.')
    process.exit(1)
  }
}

// ---------- Erzeugen ----------

/** Stempel der verwendeten Angaben – pruefen.mjs erkennt daran Druckdaten mit veraltetem Stand. */
const angabenStempel = createHash('sha256').update(JSON.stringify(inhalte.angaben)).digest('hex').slice(0, 12)

/** Entfernt alle Dateien eines früheren Laufs dieses Auftrags, damit nichts Veraltetes liegen bleibt. */
function altesEntfernen(name) {
  const json = join(zielOrdner, `${name}.json`)
  if (existsSync(json)) {
    try {
      const alt = JSON.parse(readFileSync(json, 'utf8'))
      for (const datei of [alt.pdf, ...(alt.vorschau ?? [])]) if (datei) rmSync(datei, { force: true })
    } catch {
      // unlesbarer Bericht – unten wird trotzdem alles mit bekanntem Namen gelöscht
    }
  }
  for (const datei of [`${name}.pdf`, `${name}.json`]) rmSync(join(zielOrdner, datei), { force: true })
}

async function erzeuge(a) {
  const produkt = produkte[a.produkt]
  const format = datenformat(a.produkt)
  const kontext = { produkt: a.produkt, modus, offen: new Set() }
  const doc = new PDFDocument({
    autoFirstPage: false,
    margin: 0,
    pdfVersion: '1.4',
    info: {
      Title: `INNA – Zeitlos schön · ${a.name}`,
      Author: 'SUPERBRAND.marketing für INNA – Zeitlos schön',
      Subject: produkt.titel,
      Creator: 'druck/erzeugen.mjs',
    },
  })
  const roh = join(tmp, `${a.name}-roh.pdf`)
  const fertig = new Promise((ok, fehler) => {
    const strom = createWriteStream(roh)
    strom.on('finish', ok)
    strom.on('error', fehler)
    doc.pipe(strom)
  })

  const seitenBericht = []
  try {
    a.seiten.forEach((zeichne, i) => {
      const seitenname = zeichne.seitenname ?? (a.produkt === 'visitenkarte' ? ['vorderseite', 'rueckseite'][i] : `seite-${i + 1}`)
      doc.addPage({ size: [mm(format.breite), mm(format.hoehe)], margin: 0 })
      // Endformat als TrimBox, Datenformat als BleedBox (PDF-Koordinaten, Ursprung unten links)
      const b = mm(produkt.beschnitt)
      doc.page.dictionary.data.TrimBox = [b, b, mm(format.breite) - b, mm(format.hoehe) - b]
      doc.page.dictionary.data.BleedBox = [0, 0, mm(format.breite), mm(format.hoehe)]
      const seite = new Seite(doc, seitenname, kontext)
      zeichne(seite, inhalte)
      seitenBericht.push({ seite: seitenname, verstoesse: pruefeSeite(seite), elemente: seite.register })
    })
  } finally {
    doc.end()
    await fertig
  }

  const verstoesse = seitenBericht.reduce((summe, s) => summe + s.verstoesse.length, 0)
  // Druckdaten entstehen nur regelkonform; Entwürfe auch mit Verstößen, damit man sie sieht
  let pdf = null
  if (!final) {
    pdf = join(zielOrdner, `${a.name}.pdf`)
    renameSync(roh, pdf)
  } else if (!verstoesse) {
    pdf = join(zielOrdner, `${a.name}.pdf`)
    pdfx(roh, pdf, produkt, a)
  }
  const vorschau = vorschauen(pdf ?? roh, a, produkt)

  const eintrag = {
    name: a.name,
    produkt: a.produkt,
    beschreibung: a.beschreibung,
    modus,
    angabenStempel,
    angaben: inhalte.angaben,
    datenformatMm: format,
    endformatMm: produkt.endformat,
    beschnittMm: produkt.beschnitt,
    sicherheitMm: produkt.sicherheit,
    profil: profile[produkt.profil].name,
    offeneFelder: [...kontext.offen],
    pdf,
    vorschau,
    seiten: seitenBericht,
  }
  writeFileSync(join(zielOrdner, `${a.name}.json`), JSON.stringify(eintrag, null, 2))
  return eintrag
}

const bericht = []
const fehler = []
for (const a of auftraege) {
  altesEntfernen(a.name)
  try {
    bericht.push(await erzeuge(a))
  } catch (e) {
    fehler.push({ name: a.name, meldung: e.message })
  }
}

if (!process.env.DRUCK_TMP_BEHALTEN) rmSync(tmp, { recursive: true, force: true })

// ---------- Zusammenfassung ----------

let verstoesseGesamt = 0
for (const e of bericht) {
  const v = e.seiten.flatMap((s) => s.verstoesse.map((t) => `${s.seite}: ${t}`))
  verstoesseGesamt += v.length
  console.log(`\n${e.name}  (${e.produkt}, ${e.datenformatMm.breite} × ${e.datenformatMm.hoehe} mm, ${e.profil})`)
  console.log(`  PDF        ${e.pdf ? e.pdf.replace(HIER + '/', 'druck/') : 'keine – erst die Verstöße beheben'}`)
  for (const p of e.vorschau) console.log(`  Vorschau   ${p.replace(HIER + '/', 'druck/')}`)
  if (e.offeneFelder.length) console.log(`  offen      ${e.offeneFelder.join(', ')} (Platzhalter)`)
  console.log(v.length ? v.map((t) => `  VERSTOSS   ${t}`).join('\n') : '  Regeln     alle eingehalten')
}
for (const f of fehler) console.log(`\n${f.name}\n  FEHLER     ${f.meldung}\n  Es ist keine Datei entstanden.`)
if (produkte.schild.beschnittIstAnnahme && auftraege.some((a) => a.produkt === 'schild')) {
  console.log('\nHinweis: Beschnitt des Schilds (3 mm) ist angenommen – mit dem Flyeralarm-Datenblatt der Bestellung abgleichen.')
}
process.exit(fehler.length ? 1 : verstoesseGesamt ? 2 : 0)

// ---------- Ghostscript ----------

function gs(argumente) {
  execFileSync('gs', ['-q', '-dSAFER', `--permit-file-read=${join(HIER, 'profile')}/`, `--permit-file-read=${tmp}/`, ...argumente], {
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

/** Rohes PDFKit-PDF (DeviceCMYK) → PDF/X-3 mit Output-Intent des Flyeralarm-Profils. */
function pdfx(ein, aus, produkt, a) {
  const p = profile[produkt.profil]
  const vorlagePfad = execFileSync('gs', ['-q', '-dNODISPLAY', '-dNOSAFER', '-c', '(PDFX_def.ps) findlibfile { pop print } { (FEHLT) print } ifelse quit'])
    .toString()
    .trim()
  if (vorlagePfad === 'FEHLT') throw new Error('Ghostscript findet PDFX_def.ps nicht')
  // PostScript-String aus Bytes: Text als Latin-1 (= PDFDocEncoding für Umlaute), Dateipfade als UTF-8 –
  // macOS speichert „Zeitlosschön" zerlegt (o + U+0308), das darf nicht verloren gehen
  const psBytes = (bytes) =>
    '(' +
    [...bytes]
      .map((c) => {
        if (c === 0x28 || c === 0x29 || c === 0x5c) return '\\' + String.fromCharCode(c)
        if (c >= 32 && c < 127) return String.fromCharCode(c)
        return '\\' + c.toString(8).padStart(3, '0')
      })
      .join('') +
    ')'
  const psText = (s) => psBytes(Buffer.from(s.normalize('NFC').replace(/[^\u0000-ÿ]/g, (z) => (z === '–' ? '-' : '?')), 'latin1'))
  const psPfad = (s) => psBytes(Buffer.from(s, 'utf8'))
  const def = readFileSync(vorlagePfad, 'latin1')
    .replaceAll('/Title (Title)', `/Title ${psText(`INNA – Zeitlos schön · ${a.name}`)}`)
    .replace('/ICCProfile (ISO Coated sb.icc) def', `/ICCProfile ${psPfad(profilPfad(produkt.profil))} def`)
    .replace('/OutputCondition (Commercial and specialty printing)', `/OutputCondition ${psText(p.bedingung)}`)
    .replace('/Info (none)', `/Info ${psText(p.name)}`)
    .replace('/OutputConditionIdentifier (CGATS TR001)', `/OutputConditionIdentifier ${psText(p.kennung)}`)
  const defPfad = join(tmp, `PDFX_${a.name}.ps`)
  writeFileSync(defPfad, def, 'latin1')
  gs([
    '-dBATCH',
    '-dNOPAUSE',
    '-sDEVICE=pdfwrite',
    '-dPDFX=3',
    '-dCompatibilityLevel=1.4',
    '-dPDFSETTINGS=/prepress',
    '-dAutoRotatePages=/None',
    '-dEmbedAllFonts=true',
    '-dSubsetFonts=true',
    '-sColorConversionStrategy=CMYK',
    '-sProcessColorModel=DeviceCMYK',
    `-sOutputFile=${aus}`,
    defPfad,
    ein,
  ])
}

/**
 * Vorschau-PNGs im Endformat (TrimBox), mit dem Profil gerechnet – so sieht Kupfer aus wie gedruckt.
 * Schild zusätzlich klein („fern"): 10 dpi = 236 px Breite – so viel löst das Auge (rund 60 Pixel je Grad)
 * von einem 60 cm breiten Schild aus knapp 9 m Entfernung auf.
 */
function vorschauen(pdf, a, produkt) {
  const basis = join(zielOrdner, a.name)
  const icc = profilPfad(produkt.profil)
  const rendern = (dpi, muster) =>
    gs([
      '-dBATCH',
      '-dNOPAUSE',
      '-sDEVICE=png16m',
      `-r${dpi}`,
      '-dUseTrimBox',
      '-dTextAlphaBits=4',
      '-dGraphicsAlphaBits=4',
      // Überdrucken so zeigen, wie es gedruckt wird
      '-dOverprint=/simulate',
      `-sDefaultCMYKProfile=${icc}`,
      `-sOutputFile=${muster}`,
      pdf,
    ])
  const dateien = []
  rendern(produkt.vorschauDpi, `${basis}-%d.png`)
  a.seiten.forEach((zeichne, i) => {
    const seitenname = zeichne.seitenname ?? (a.produkt === 'visitenkarte' ? ['vorderseite', 'rueckseite'][i] : null)
    const ziel = seitenname ? `${basis}-${seitenname}.png` : `${basis}.png`
    renameSync(`${basis}-${i + 1}.png`, ziel)
    dateien.push(ziel)
  })
  if (a.produkt === 'schild') {
    rendern(10, `${basis}-fern.png`)
    dateien.push(`${basis}-fern.png`)
  }
  return dateien
}
