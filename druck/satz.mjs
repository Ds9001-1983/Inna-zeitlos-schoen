/**
 * Satzhilfen für Schild und Visitenkarte.
 *
 * Koordinaten in Millimetern, Ursprung oben links im ENDFORMAT (Beschnitt liegt bei negativen
 * Werten bzw. jenseits von Breite/Höhe). y von oben nach unten. Text wird auf seiner Grundlinie
 * positioniert – die Größe gibt man als Versalhöhe in mm (wie ein Schriftenmaler) oder in pt an.
 *
 * Farben nur als Token aus farben.mjs (Hex aus design-plan.md, CMYK errechnet). Jedes Element landet
 * im Register; pruefeSeite() misst daran Sicherheitszone, Mindestgrößen, Kleinschrift in K,
 * Lesbarkeit des Schilds und ob jeder Text aus inhalte.mjs stammt.
 */
import { openSync } from 'fontkit'
import QRCode from 'qrcode'
import { fileURLToPath } from 'node:url'
import { farbtabelle } from './farben.mjs'
import { grenzen, produkte } from './formate.mjs'
import { angaben, feldBeschreibung, erlaubteTexte } from './inhalte.mjs'

export const PT_JE_MM = 72 / 25.4
export const mm = (wert) => wert * PT_JE_MM
export const zuMm = (pt) => pt / PT_JE_MM

const schriftDatei = (datei) => fileURLToPath(new URL(`./schriften/${datei}`, import.meta.url))

/** Schnitte laut design-plan.md: Cormorant 300/400 mit Kursiv, Montserrat 300/400/500, Parisienne. */
export const schriften = {
  display: 'CormorantGaramond-Regular.ttf',
  displayLight: 'CormorantGaramond-Light.ttf',
  displayKursiv: 'CormorantGaramond-Italic.ttf',
  displayLightKursiv: 'CormorantGaramond-LightItalic.ttf',
  sans: 'Montserrat-Regular.ttf',
  sansLight: 'Montserrat-Light.ttf',
  sansMedium: 'Montserrat-Medium.ttf',
  signatur: 'Parisienne-Regular.ttf',
}

const fontkitCache = new Map()
function fontkitSchrift(name) {
  if (!schriften[name]) throw new Error(`Unbekannte Schrift „${name}". Erlaubt: ${Object.keys(schriften).join(', ')}`)
  if (!fontkitCache.has(name)) fontkitCache.set(name, openSync(schriftDatei(schriften[name])))
  return fontkitCache.get(name)
}

/** Kleinschrift-Farben: reines K auf hell, oder Aussparung in Leinen auf dunklem Grund. */
const K_FARBEN = new Set(['tinteText'])
const NEGATIV_FARBEN = new Set(['leinen'])

const normal = (s) => s.toLowerCase().replaceAll('ß', 'ss')
const TRENNER = /[\s·–—\-,.:;&|/()]+/g

export class Seite {
  /**
   * @param {import('pdfkit')} doc
   * @param {object} kontext – { produkt, modus: 'entwurf'|'final', offen: Set }
   */
  constructor(doc, name, kontext) {
    this.doc = doc
    this.name = name
    this.kontext = kontext
    this.produkt = produkte[kontext.produkt]
    this.breite = this.produkt.endformat.breite
    this.hoehe = this.produkt.endformat.hoehe
    this.beschnitt = this.produkt.beschnitt
    this.sicherheit = this.produkt.sicherheit
    this.farben = farbtabelle.profile[this.produkt.profil].farben
    this.register = []
    /** Satzspiegel = Endformat minus Sicherheitsabstand */
    this.satzspiegel = {
      x: this.sicherheit,
      y: this.sicherheit,
      breite: this.breite - 2 * this.sicherheit,
      hoehe: this.hoehe - 2 * this.sicherheit,
    }
  }

  // ---------- Grundlagen ----------

  x(wert) {
    return mm(wert + this.beschnitt)
  }
  y(wert) {
    return mm(wert + this.beschnitt)
  }

  farbe(token) {
    const f = this.farben[token]
    if (!f) throw new Error(`Unbekannte Farbe „${token}". Erlaubt: ${Object.keys(this.farben).join(', ')}`)
    return f.cmyk
  }

  schriftSetzen(name) {
    this.doc.font(schriftDatei(schriften[name]))
  }

  // ---------- Flächen und Linien ----------

  /** Ganze Seite bis in den Beschnitt füllen. */
  flaeche(farbe) {
    this.doc
      .rect(0, 0, mm(this.breite + 2 * this.beschnitt), mm(this.hoehe + 2 * this.beschnitt))
      .fill(this.farbe(farbe))
    this.register.push({ art: 'flaeche', farbe, bbox: this.#beschnittBox() })
  }

  /**
   * Gefülltes Rechteck. `randabfallend: true` für Flächen, die über den Rand laufen – sie müssen
   * dann an jeder angeschnittenen Kante bis zum Ende des Beschnitts reichen.
   */
  rechteck(x, y, breite, hoehe, { farbe, randabfallend = false } = {}) {
    this.doc.rect(this.x(x), this.y(y), mm(breite), mm(hoehe)).fill(this.farbe(farbe))
    this.register.push({ art: 'rechteck', farbe, randabfallend, bbox: [x, y, x + breite, y + hoehe] })
  }

  /** Linie. Stärke in pt. `aufDunkel` für helle Linien auf dunklem Grund (Mindeststärke 0,5 pt). */
  linie(x1, y1, x2, y2, { farbe, staerkePt, aufDunkel = false, gestrichelt = null } = {}) {
    this.doc.save().lineWidth(staerkePt).lineCap('butt')
    if (gestrichelt) this.doc.dash(mm(gestrichelt[0]), { space: mm(gestrichelt[1]) })
    this.doc.moveTo(this.x(x1), this.y(y1)).lineTo(this.x(x2), this.y(y2)).stroke(this.farbe(farbe))
    this.doc.restore()
    const halb = zuMm(staerkePt) / 2
    this.register.push({
      art: 'linie',
      farbe,
      staerkePt,
      aufDunkel,
      bbox: [Math.min(x1, x2) - halb, Math.min(y1, y2) - halb, Math.max(x1, x2) + halb, Math.max(y1, y2) + halb],
    })
  }

  // ---------- Schrift ----------

  /**
   * Misst einen Text, ohne ihn zu setzen.
   * @returns {{breite:number, groessePt:number, versalhoehe:number, xHoehe:number, oben:number, unten:number, links:number}}
   *   Maße in mm. oben/unten = Ausdehnung der tatsächlichen Glyphen über/unter der Grundlinie
   *   (unten negativ bei Unterlängen), links = Glyphen-Überhang links vom Startpunkt.
   */
  messen(inhalt, { schrift, groessePt, versalhoehe, laufweite = 0 } = {}) {
    const font = fontkitSchrift(schrift)
    const fehlend = [...new Set(inhalt)].filter((z) => !font.hasGlyphForCodePoint(z.codePointAt(0)))
    if (fehlend.length) {
      const liste = fehlend.map((z) => `U+${z.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`).join(', ')
      throw new Error(`Zeichen ${liste} fehlt in ${schriften[schrift]} – Text „${inhalt}". Im Druck käme ein Kasten.`)
    }
    const upm = font.unitsPerEm
    const pt = groessePt ?? (versalhoehe / (font.capHeight / upm)) * PT_JE_MM
    const lauf = this.#layout(font, inhalt, laufweite)
    const ptJeEinheit = pt / upm
    const trackPt = laufweite * pt
    let stift = 0
    let min = { x: Infinity, y: Infinity }
    let max = { x: -Infinity, y: -Infinity }
    lauf.glyphs.forEach((glyph, i) => {
      const pos = lauf.positions[i]
      const b = glyph.bbox
      if (Number.isFinite(b.minX) && b.maxX > b.minX) {
        min.x = Math.min(min.x, stift + (b.minX + pos.xOffset) * ptJeEinheit)
        max.x = Math.max(max.x, stift + (b.maxX + pos.xOffset) * ptJeEinheit)
        min.y = Math.min(min.y, (b.minY + pos.yOffset) * ptJeEinheit)
        max.y = Math.max(max.y, (b.maxY + pos.yOffset) * ptJeEinheit)
      }
      stift += pos.xAdvance * ptJeEinheit + (i < lauf.glyphs.length - 1 ? trackPt : 0)
    })
    return {
      breite: zuMm(stift),
      groessePt: pt,
      versalhoehe: zuMm((font.capHeight / upm) * pt),
      xHoehe: zuMm((font.xHeight / upm) * pt),
      oben: zuMm(max.y),
      unten: zuMm(min.y),
      links: zuMm(min.x),
      rechts: zuMm(max.x),
    }
  }

  /**
   * Setzt eine Zeile Text auf die Grundlinie y.
   * @param {string} inhalt – muss aus inhalte.mjs stammen (Verbindungen mit · – , sind erlaubt)
   * @param {object} o
   * @param {number} o.x – Bezugspunkt, je nach ausrichtung linke Kante, Mitte oder rechte Kante
   * @param {number} o.y – Grundlinie
   * @param {string} o.schrift – Schlüssel aus `schriften`
   * @param {number} [o.versalhoehe] – mm; alternativ o.groessePt
   * @param {number} [o.laufweite] – in em, z. B. 0.34 wie die Wortmarke der Website
   * @param {string} o.farbe – Token aus farben.mjs
   * @param {'links'|'mitte'|'rechts'} [o.ausrichtung]
   * @param {string} [o.rolle] – nur Schild: wortmarke | leistung | angabe | label | claim
   * @param {boolean} [o.aufDunkel] – helle Schrift auf dunklem Grund
   * @param {boolean} [o.ueberdrucken] – Text überdruckt den Grund statt ihn auszusparen. Für kleine
   *   Schrift in reinem K auf farbiger Fläche (Flyeralarm: sonst Blitzer bei Passerschwankung)
   * @returns Maße wie messen() plus bbox [x0, y0, x1, y1] in mm
   */
  text(inhalt, o) {
    const m = this.messen(inhalt, o)
    const start =
      o.ausrichtung === 'mitte' ? o.x - m.breite / 2 : o.ausrichtung === 'rechts' ? o.x - m.breite : o.x
    this.doc.save()
    if (o.ueberdrucken) this.#ueberdruckenEin()
    this.schriftSetzen(o.schrift)
    this.doc.fontSize(m.groessePt).fillColor(this.farbe(o.farbe))
    this.doc.text(inhalt, this.x(start), this.y(o.y), {
      lineBreak: false,
      baseline: 'alphabetic',
      characterSpacing: (o.laufweite ?? 0) * m.groessePt,
      features: (o.laufweite ?? 0) > 0 ? { liga: false, clig: false, dlig: false } : undefined,
    })
    this.doc.restore()
    const bbox = [start + m.links, o.y - m.oben, start + m.rechts, o.y - m.unten]
    this.register.push({
      art: 'text',
      inhalt,
      schrift: o.schrift,
      groessePt: runden(m.groessePt, 2),
      versalhoehe: runden(m.versalhoehe, 2),
      xHoehe: runden(m.xHoehe, 2),
      farbe: o.farbe,
      rolle: o.rolle ?? null,
      aufDunkel: !!o.aufDunkel,
      ueberdrucken: !!o.ueberdrucken,
      intern: !!o.intern,
      bbox: bbox.map((v) => runden(v, 2)),
    })
    return { ...m, start, bbox }
  }

  /**
   * Eine Angabe aus salon.ts (telefon, email, domain). Ist sie offen, entsteht im Entwurf ein
   * Platzhalter in der Größe, die der Inhalt später ungefähr braucht. In der Druck-PDF (final)
   * wirft ein offenes Feld einen Fehler.
   */
  angabe(feld, o) {
    const wert = angaben[feld]
    if (wert) return this.text(wert, o)
    const muster = this.messen(feldBeschreibung[feld].muster, o)
    const start =
      o.ausrichtung === 'mitte' ? o.x - muster.breite / 2 : o.ausrichtung === 'rechts' ? o.x - muster.breite : o.x
    const hoehe = Math.max(muster.versalhoehe * 1.5, muster.oben - muster.unten)
    return this.platzhalter(feld, {
      x: start,
      y: o.y - muster.versalhoehe - (hoehe - muster.versalhoehe) / 2,
      breite: muster.breite,
      hoehe,
      aufDunkel: o.aufDunkel,
      maxVersal: muster.versalhoehe,
      anker: o.ausrichtung ?? 'links',
    })
  }

  /**
   * Öffnungszeiten als Tabelle: Tag links, Zeit rechtsbündig.
   * Mit `luft` (mm) wird die Tabelle so breit wie längster Tag + luft + längste Zeit, höchstens
   * `breite` – sonst genau `breite`. `ausrichtung: 'mitte'` zentriert die Tabelle auf x.
   * `linien: { farbe, staerkePt, abstand }` zieht unter jede Zeile eine Linie wie in der Preisliste
   * (abstand = mm unter der Grundlinie). Offen → ein Platzhalter über die Höhe von drei Zeilen.
   * @returns {{hoehe:number, breite:number}} Höhe ab Versalkante der ersten Zeile, Breite der Tabelle
   */
  zeiten({ x, y, breite, zeilenabstand, luft = null, ausrichtung = 'links', linien = null, ...o }) {
    const zeilen = angaben.oeffnungszeiten
    const v = this.messen('H', o).versalhoehe
    const platz = (b) => (ausrichtung === 'mitte' ? x - b / 2 : x)
    if (zeilen) {
      const tag = Math.max(...zeilen.map((z) => this.messen(z.tag, o).breite))
      const zeit = Math.max(...zeilen.map((z) => this.messen(z.zeit, o).breite))
      const b = luft === null ? breite : Math.min(breite, tag + luft + zeit)
      const x0 = platz(b)
      zeilen.forEach((z, i) => {
        const grundlinie = y + i * zeilenabstand
        this.text(z.tag, { ...o, x: x0, y: grundlinie, ausrichtung: 'links' })
        this.text(z.zeit, { ...o, x: x0 + b, y: grundlinie, ausrichtung: 'rechts' })
        if (linien) this.linie(x0, grundlinie + linien.abstand, x0 + b, grundlinie + linien.abstand, { ...linien, aufDunkel: o.aufDunkel })
      })
      return { hoehe: (zeilen.length - 1) * zeilenabstand + v, breite: b }
    }
    const anzahl = feldBeschreibung.oeffnungszeiten.zeilen
    const b = luft === null ? breite : Math.min(breite, this.messen(feldBeschreibung.oeffnungszeiten.muster, o).breite + luft)
    const hoehe = (anzahl - 1) * zeilenabstand + v * 1.5
    this.platzhalter('oeffnungszeiten', { x: platz(b), y: y - v * 1.25, breite: b, hoehe, aufDunkel: o.aufDunkel, maxVersal: v, anker: ausrichtung })
    return { hoehe, breite: b }
  }

  /** Gefüllter Kreis, z. B. als Trennpunkt, der auch auf Distanz sichtbar bleibt. Mittelpunkt und Durchmesser in mm. */
  punkt(x, y, durchmesser, { farbe }) {
    this.doc.circle(this.x(x), this.y(y), mm(durchmesser / 2)).fill(this.farbe(farbe))
    const r = durchmesser / 2
    this.register.push({ art: 'punkt', farbe, bbox: [x - r, y - r, x + r, y + r] })
  }

  /**
   * QR-Code auf die Website (Feld domain), als Vektor. x, y und groesse beschreiben die sichtbare
   * Codefläche; die Ruhezone von 4 Modulen liegt außen herum und gehört zur bbox (nichts darf
   * hineinragen). Fehlerkorrektur M; werden die Module damit kleiner als grenzen.qrModulMinMm, L.
   * Offen → Platzhalter in der Größe der Codefläche, Ruhezone für Version 2 angenommen.
   */
  qr({ x, y, groesse, farbe = 'tinteText', aufDunkel = false }) {
    const domain = angaben.domain
    if (!domain) {
      const ruhe = (4 * groesse) / 25
      this.platzhalter('domain', { x, y, breite: groesse, hoehe: groesse, aufDunkel, qr: true, anker: 'mitte', gruppe: 'qr' })
      this.register.push({ art: 'ruhezone', gruppe: 'qr', bbox: [x - ruhe, y - ruhe, x + groesse + ruhe, y + groesse + ruhe] })
      return
    }
    const url = `https://${domain}`
    let code = QRCode.create(url, { errorCorrectionLevel: 'M' })
    if (groesse / code.modules.size < grenzen.qrModulMinMm) code = QRCode.create(url, { errorCorrectionLevel: 'L' })
    const n = code.modules.size
    const modul = groesse / n
    if (modul < grenzen.qrModulMinMm) {
      throw new Error(
        `QR-Code für ${url}: Modul ${modul.toFixed(2)} mm, mindestens ${grenzen.qrModulMinMm} mm – QR größer setzen oder die Domain kürzen (ohne www.).`,
      )
    }
    for (let zeile = 0; zeile < n; zeile++) {
      for (let spalte = 0; spalte < n; spalte++) {
        if (code.modules.get(zeile, spalte)) {
          this.doc.rect(this.x(x + spalte * modul), this.y(y + zeile * modul), mm(modul), mm(modul))
        }
      }
    }
    this.doc.fill(this.farbe(farbe))
    const ruhe = 4 * modul
    this.register.push({
      art: 'qr',
      gruppe: 'qr',
      inhalt: url,
      farbe,
      modulMm: runden(modul, 3),
      bbox: [x - ruhe, y - ruhe, x + groesse + ruhe, y + groesse + ruhe],
    })
  }

  /**
   * Sichtbar offenes Feld: Kupfer-Strichlinie mit „<Feld> · folgt". Nur im Entwurf.
   * Die Beschriftung wird nie größer als der spätere Inhalt (`maxVersal`), damit die Vorschau die
   * echte Hierarchie zeigt. Ist sie in 6 pt breiter als der Kasten, wächst der Kasten von `anker` aus.
   */
  platzhalter(feld, { x, y, breite, hoehe, aufDunkel = false, qr = false, maxVersal = 40, anker = 'links', gruppe = null }) {
    if (this.kontext.modus === 'final') {
      throw new Error(`Feld „${feld}" ist offen – in der Druck-PDF sind keine Platzhalter erlaubt.`)
    }
    this.kontext.offen.add(feld)
    const farbe = aufDunkel ? 'kupferHell' : 'kupfer'
    const beschriftung = qr ? 'QR · folgt' : `${feldBeschreibung[feld].name} · folgt`
    const beschriftungsStil = { schrift: 'sansMedium', laufweite: 0.08 }
    const minVersal = this.messen('H', { schrift: 'sansMedium', groessePt: 6 }).versalhoehe
    const breiteBei = (vh) => this.messen(beschriftung, { ...beschriftungsStil, versalhoehe: vh }).breite
    let v = Math.min(hoehe * 0.45, maxVersal)
    if (breiteBei(v) > breite * 0.9) v = v * ((breite * 0.9) / breiteBei(v))
    v = Math.max(v, minVersal)
    const noetig = breiteBei(v) + 2 * Math.max(1, v * 0.5)
    if (noetig > breite) {
      const mehr = noetig - breite
      x = anker === 'mitte' ? x - mehr / 2 : anker === 'rechts' ? x - mehr : x
      breite = noetig
    }
    const staerke = Math.max(0.5, Math.min(2, hoehe * 0.04))
    this.doc.save().lineWidth(staerke).dash(mm(Math.max(0.8, hoehe * 0.06)), { space: mm(Math.max(0.6, hoehe * 0.04)) })
    this.doc.rect(this.x(x), this.y(y), mm(breite), mm(hoehe)).stroke(this.farbe(farbe))
    this.doc.restore()
    this.register.push({ art: 'platzhalter', feld, farbe, gruppe, bbox: [x, y, x + breite, y + hoehe] })
    this.text(beschriftung, {
      x: x + breite / 2,
      y: y + hoehe / 2 + v / 2,
      schrift: 'sansMedium',
      versalhoehe: v,
      laufweite: 0.08,
      farbe,
      ausrichtung: 'mitte',
      intern: true,
    })
  }

  // ---------- intern ----------

  /** Grafikzustand „Überdrucken" (OP/op, Modus 1) – einmal je Dokument angelegt, je Seite eingehängt. */
  #ueberdruckenEin() {
    if (!this.doc._inna_ueberdrucken) {
      const zustand = this.doc.ref({ Type: 'ExtGState', OP: true, op: true, OPM: 1 })
      zustand.end()
      this.doc._inna_ueberdrucken = zustand
    }
    this.doc.page.ext_gstates.GsUeberdrucken = this.doc._inna_ueberdrucken
    this.doc.addContent('/GsUeberdrucken gs')
  }

  #layout(font, inhalt, laufweite) {
    return laufweite > 0 ? font.layout(inhalt, { liga: false, clig: false, dlig: false }) : font.layout(inhalt)
  }

  #beschnittBox() {
    return [-this.beschnitt, -this.beschnitt, this.breite + this.beschnitt, this.hoehe + this.beschnitt]
  }
}

const runden = (v, stellen) => Math.round(v * 10 ** stellen) / 10 ** stellen

/**
 * Prüft das Register einer Seite gegen die Druckregeln.
 * @returns {string[]} Verstöße – leer, wenn alles passt
 */
export function pruefeSeite(seite) {
  const verstoesse = []
  const s = seite.satzspiegel
  const innen = (b) => b[0] >= s.x - 0.01 && b[1] >= s.y - 0.01 && b[2] <= s.x + s.breite + 0.01 && b[3] <= s.y + s.hoehe + 0.01
  const erlaubt = [...erlaubteTexte()].map(normal).sort((a, b) => b.length - a.length)
  const lesbarkeit = seite.produkt.lesbarkeit

  for (const e of seite.register) {
    const wo = `${e.art}${e.inhalt ? ` „${e.inhalt}"` : e.feld ? ` ${e.feld}` : ''}`
    if (e.art === 'flaeche') continue

    if (e.art === 'rechteck' && e.randabfallend) {
      const [x0, y0, x1, y1] = e.bbox
      const b = seite.beschnitt
      const fehlt = []
      if (x0 < s.x && x0 > -b + 0.01) fehlt.push('links')
      if (y0 < s.y && y0 > -b + 0.01) fehlt.push('oben')
      if (x1 > s.x + s.breite && x1 < seite.breite + b - 0.01) fehlt.push('rechts')
      if (y1 > s.y + s.hoehe && y1 < seite.hoehe + b - 0.01) fehlt.push('unten')
      if (fehlt.length) verstoesse.push(`${wo}: läuft über den Sicherheitsrand, reicht ${fehlt.join('/')} aber nicht bis zum Beschnitt`)
      continue
    }
    const [bx0, by0, bx1, by1] = e.bbox
    const bboxText = e.bbox.map((v) => v.toFixed(1)).join(', ')
    if (bx0 < -0.01 || by0 < -0.01 || bx1 > seite.breite + 0.01 || by1 > seite.hoehe + 0.01)
      verstoesse.push(`${wo}: läuft über die Schnittkante und wird abgeschnitten – bbox ${bboxText}`)
    else if (!innen(e.bbox)) verstoesse.push(`${wo}: ragt in den Sicherheitsabstand (${seite.sicherheit} mm) – bbox ${bboxText}`)

    if (e.art === 'linie') {
      const min = e.aufDunkel ? grenzen.linieNegativMinPt : grenzen.liniePositivMinPt
      if (e.staerkePt < min) verstoesse.push(`${wo}: Linie ${e.staerkePt} pt, Minimum ${min} pt`)
      if (!K_FARBEN.has(e.farbe) && e.staerkePt < 0.5) verstoesse.push(`${wo}: vierfarbige Linie (${e.farbe}) unter 0,5 pt`)
    }

    if (e.art === 'text') {
      if (e.groessePt < grenzen.schriftMinPt) verstoesse.push(`${wo}: ${e.groessePt} pt, Minimum ${grenzen.schriftMinPt} pt`)
      if (e.groessePt < grenzen.kleinschriftPt && !e.intern) {
        const negativOk = e.aufDunkel && NEGATIV_FARBEN.has(e.farbe) && e.groessePt >= grenzen.negativSchriftMinPt
        if (!K_FARBEN.has(e.farbe) && !negativOk) {
          verstoesse.push(
            `${wo}: ${e.groessePt} pt in ${e.farbe} – unter ${grenzen.kleinschriftPt} pt nur tinteText (reines K) oder leinen auf dunklem Grund ab ${grenzen.negativSchriftMinPt} pt`,
          )
        }
      }
      if (e.ueberdrucken && !K_FARBEN.has(e.farbe)) verstoesse.push(`${wo}: überdrucken nur für reines K (tinteText), nicht ${e.farbe}`)
      if (!e.intern) {
        let rest = normal(e.inhalt)
        for (const teil of erlaubt) rest = rest.replaceAll(teil, ' ')
        if (rest.replace(TRENNER, '').length > 0) verstoesse.push(`${wo}: Text stammt nicht aus inhalte.mjs (Rest: „${rest.trim()}")`)
      }
      if (lesbarkeit && !e.intern) {
        if (!e.rolle) verstoesse.push(`${wo}: auf dem Schild braucht jeder Text eine rolle (${Object.keys(lesbarkeit).join(', ')})`)
        else {
          const mass = e.schrift === 'signatur' ? e.xHoehe : e.versalhoehe
          const min = lesbarkeit[e.rolle]
          if (min === undefined) verstoesse.push(`${wo}: unbekannte rolle ${e.rolle}`)
          else if (mass < min - 0.05)
            verstoesse.push(`${wo}: ${e.schrift === 'signatur' ? 'x-Höhe' : 'Versalhöhe'} ${mass.toFixed(1)} mm, für ${e.rolle} mindestens ${min} mm`)
        }
      }
    }
  }

  // Überschneidungen: Text, QR samt Ruhezone, Platzhalter und Punkte dürfen sich nicht berühren
  const koerper = seite.register.filter(
    (e) => ['qr', 'ruhezone', 'platzhalter', 'punkt'].includes(e.art) || (e.art === 'text' && !e.intern),
  )
  const name = (e) => `${e.art}${e.inhalt ? ` „${e.inhalt}"` : e.feld ? ` ${e.feld}` : ''}`
  for (let i = 0; i < koerper.length; i++) {
    for (let k = i + 1; k < koerper.length; k++) {
      const [a, b] = [koerper[i], koerper[k]]
      if (a.gruppe && a.gruppe === b.gruppe) continue
      const ueber = Math.min(a.bbox[2], b.bbox[2]) - Math.max(a.bbox[0], b.bbox[0])
      const unter = Math.min(a.bbox[3], b.bbox[3]) - Math.max(a.bbox[1], b.bbox[1])
      if (ueber > 0.05 && unter > 0.05) verstoesse.push(`${name(a)} überschneidet sich mit ${name(b)} (${ueber.toFixed(1)} × ${unter.toFixed(1)} mm)`)
    }
  }
  return verstoesse
}
