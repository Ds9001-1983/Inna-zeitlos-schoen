/**
 * Preflight der erzeugten PDFs gegen die Flyeralarm-Vorgaben.
 *
 *   npm --prefix druck run pruefen                  prüft ausgabe/final/
 *   npm --prefix druck run pruefen -- --ordner entwurf
 *   npm --prefix druck run pruefen -- --ordner test
 *
 * Geprüft: MediaBox = Datenformat, TrimBox = Endformat, alle Schriften eingebettet, nur DeviceCMYK,
 * nur Farbwerte aus farben.mjs, Farbauftrag ≤ 300 %, keine Transparenz, PDF/X-3 mit Output-Intent
 * (nur final/test), dazu die Satzregeln aus dem Register (Sicherheitszone, Mindestgrößen, Kleinschrift
 * in K, Lesbarkeit des Schilds, Texte nur aus inhalte.mjs, keine Überschneidungen), dazu ob die Druck-PDFs
 * noch zum aktuellen Stand von salon.ts passen. Exit 1 bei jedem Fehler.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { produkte, profile, datenformat, grenzen } from './formate.mjs'
import { farbtabelle } from './farben.mjs'
import { angaben } from './inhalte.mjs'
import { createHash } from 'node:crypto'

const HIER = dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const ordnerName = args.includes('--ordner') ? args[args.indexOf('--ordner') + 1] : 'final'
const ordner = join(HIER, 'ausgabe', ordnerName)
const druckdaten = ordnerName !== 'entwurf'
const PT = 72 / 25.4

if (!existsSync(ordner)) {
  console.error(`Ordner fehlt: ${ordner}`)
  process.exit(1)
}
const pdfs = readdirSync(ordner).filter((f) => f.endsWith('.pdf') && !f.startsWith('._'))
const berichte = readdirSync(ordner).filter((f) => f.endsWith('.json') && !f.startsWith('._'))
let fehlerGesamt = 0

// Aufträge, bei denen der letzte Lauf wegen Regelverstößen keine Druck-PDF geschrieben hat
for (const datei of berichte) {
  const b = JSON.parse(readFileSync(join(ordner, datei), 'utf8'))
  if (!b.pdf) {
    console.log(`\n${b.name}  FEHLER\n  ✗ keine Druck-PDF – der letzte Lauf hatte Regelverstöße (${datei})`)
    fehlerGesamt++
  }
}
if (!pdfs.length) {
  console.error(`Keine PDFs in ${ordner}`)
  process.exit(1)
}

/** Derselbe Stempel wie in erzeugen.mjs – weicht er ab, wurden die Angaben seitdem geändert. */
const stempelJetzt = createHash('sha256').update(JSON.stringify(angaben)).digest('hex').slice(0, 12)

for (const datei of pdfs.sort()) {
  const pdf = join(ordner, datei)
  const bericht = JSON.parse(readFileSync(pdf.replace(/\.pdf$/, '.json'), 'utf8'))
  const produkt = produkte[bericht.produkt]
  const format = datenformat(bericht.produkt)
  const fehler = []
  const ok = []

  // Boxen
  const info = execFileSync('pdfinfo', ['-box', '-f', '1', '-l', '99', pdf]).toString()
  const boxen = [...info.matchAll(/Page\s+(\d+)\s+(MediaBox|TrimBox|BleedBox):\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g)]
  const nahe = (a, b) => Math.abs(a - b) < 0.05
  for (const [, seite, art, x0, y0, x1, y1] of boxen) {
    const [bx, by, bb, bh] = [x0, y0, x1 - x0, y1 - y0].map((v) => Number(v) / PT)
    if (art === 'MediaBox' && !(nahe(bb, format.breite) && nahe(bh, format.hoehe)))
      fehler.push(`Seite ${seite}: MediaBox ${bb.toFixed(2)} × ${bh.toFixed(2)} mm, erwartet ${format.breite} × ${format.hoehe}`)
    if (art === 'TrimBox' && !(nahe(bb, produkt.endformat.breite) && nahe(bh, produkt.endformat.hoehe) && nahe(bx, produkt.beschnitt) && nahe(by, produkt.beschnitt)))
      fehler.push(`Seite ${seite}: TrimBox ${bb.toFixed(2)} × ${bh.toFixed(2)} mm bei ${bx.toFixed(2)}/${by.toFixed(2)}, erwartet Endformat mit ${produkt.beschnitt} mm Rand`)
  }
  const seitenZahl = Number(info.match(/Pages:\s+(\d+)/)[1])
  const sollSeiten = bericht.produkt === 'visitenkarte' ? 2 : 1
  if (seitenZahl !== sollSeiten) fehler.push(`${seitenZahl} Seiten, erwartet ${sollSeiten}`)
  else ok.push(`${seitenZahl} Seite(n), MediaBox ${format.breite} × ${format.hoehe} mm, TrimBox ${produkt.endformat.breite} × ${produkt.endformat.hoehe} mm`)

  // Schriften
  const fonts = execFileSync('pdffonts', [pdf]).toString().trim().split('\n').slice(2)
  const nichtEingebettet = fonts.filter((z) => !/\syes\s+yes\s/.test(z))
  if (nichtEingebettet.length) fehler.push(`Schriften nicht (als Teilmenge) eingebettet: ${nichtEingebettet.join(' | ')}`)
  else ok.push(`${fonts.length} Schriften eingebettet`)

  // Farben
  const p = profile[produkt.profil]
  const erlaubt = Object.values(farbtabelle.profile[produkt.profil].farben).map((f) => f.cmyk)
  const farbe = JSON.parse(
    execFileSync('python3', [join(HIER, 'tac.py'), pdf, join(HIER, 'profile', p.datei), JSON.stringify(erlaubt)]).toString(),
  )
  if (farbe.farbauftragMax > grenzen.farbauftragMaxProzent + 1) fehler.push(`Farbauftrag ${farbe.farbauftragMax} % > ${grenzen.farbauftragMaxProzent} %`)
  else ok.push(`Farbauftrag höchstens ${farbe.farbauftragMax} %`)
  if (farbe.andereFarbraeume.rgb || farbe.andereFarbraeume.grau)
    fehler.push(`Nicht-CMYK-Farben: ${farbe.andereFarbraeume.rgb} RGB-, ${farbe.andereFarbraeume.grau} Grau-Operatoren`)
  if (farbe.fremdeWerte.length) fehler.push(`CMYK-Werte, die nicht in farben.mjs stehen: ${JSON.stringify(farbe.fremdeWerte)}`)
  else ok.push(`${farbe.cmykWerte.length} CMYK-Werte, alle aus farben.mjs (${p.name})`)
  if (farbe.transparenz.length) fehler.push(`Transparenz: ${farbe.transparenz.join(', ')}`)
  if (druckdaten) {
    if (farbe.pdfx !== 'PDF/X-3:2002') fehler.push(`PDF/X-Kennung: ${farbe.pdfx ?? 'fehlt'}`)
    if (farbe.outputIntent !== p.kennung) fehler.push(`Output-Intent: ${farbe.outputIntent ?? 'fehlt'}, erwartet ${p.kennung}`)
    if (farbe.pdfx && farbe.outputIntent) ok.push(`${farbe.pdfx}, Output-Intent ${farbe.outputIntent}`)
  }

  // Satzregeln aus dem Register
  const verstoesse = bericht.seiten.flatMap((s) => s.verstoesse.map((v) => `${s.seite}: ${v}`))
  fehler.push(...verstoesse)
  if (!verstoesse.length) ok.push('Satzregeln eingehalten (Sicherheitszone, Mindestgrößen, Kleinschrift in K, Texte aus inhalte.mjs)')
  if (druckdaten && bericht.offeneFelder.length) fehler.push(`Platzhalter in Druckdaten: ${bericht.offeneFelder.join(', ')}`)
  if (ordnerName === 'final' && bericht.angabenStempel !== stempelJetzt)
    fehler.push('veraltet: Die Angaben in salon.ts haben sich seit dem Erzeugen geändert – npm --prefix druck run final erneut ausführen')

  console.log(`\n${datei}  ${fehler.length ? 'FEHLER' : 'ok'}`)
  ok.forEach((t) => console.log(`  ✓ ${t}`))
  fehler.forEach((t) => console.log(`  ✗ ${t}`))
  if (!druckdaten && bericht.offeneFelder.length) console.log(`  · Entwurf – offene Felder: ${bericht.offeneFelder.join(', ')}`)
  fehlerGesamt += fehler.length
}
process.exit(fehlerGesamt ? 1 : 0)
