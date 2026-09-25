/**
 * Visitenkarte 85 × 55 mm quer – Kontaktkarte (gewählt am 23.09.2026).
 *
 * Vorn die Wortmarke wie die Karte auf dem Tisch in Innas Seitenentwurf: zentriert auf Leinen,
 * rund die halbe Kartenbreite. Hinten eine linke Kante für alles.
 *
 * Aus der Jury (23.09.2026): Wortmarke größer (INNA 7,2 mm statt 5,5 mm Versalhöhe), ZEITLOS SCHÖN
 * in Montserrat 400 wie auf dem Schild, ein Kleinschriftgrad (8 pt – lesbar ohne Lesebrille),
 * Versalien 7 pt, Unterschrift in Kupfer tief, QR-Code auf die Website rechts auf der Rückseite.
 */
import { feldBeschreibung } from '../inhalte.mjs'

/** Gestaltungsrand – weit innerhalb des Sicherheitsabstands von 3 mm */
const RAND = 8
const RECHTS = 85 - RAND
const UNTEN = 55 - RAND
const MITTE_X = 85 / 2
/** optische Mitte der Wortmarke, knapp über der geometrischen (27,5) */
const MITTE_Y = 26.6

const tinte = 'tinteText'
const kleinschrift = { schrift: 'sans', groessePt: 8, farbe: tinte }
/** ein Versaliengrad für die ganze Karte, wie t-label der Website */
const versalien = { schrift: 'sansMedium', groessePt: 7, laufweite: 0.18, farbe: tinte }
/** die Unterschrift – das Kupfer-Moment der Rückseite, über 12 pt */
const kupfer = 'kupferTief'
/** sichtbare Codefläche des QR in mm; die Ruhezone (4 Module, bei Version 2 rund 2,1 mm) liegt außen */
const QR = 13
const QR_RUHE = (4 * QR) / 25
/** Zeilenabstand der Kleinschrift */
const ZEILE = 3.9

/** Bricht mit verständlicher Meldung ab, wenn eine Angabe breiter ist als die Karte zulässt. */
function passt(breite, platz, was) {
  if (breite > platz) throw new Error(`Visitenkarte: ${was} ist ${breite.toFixed(1)} mm breit, Platz sind ${platz.toFixed(1)} mm – bitte kürzer schreiben.`)
}

const sichtbar = (m) => m.rechts - m.links

/** Setzt Text mit seiner sichtbaren linken Glyphenkante genau auf x. */
function linksbuendig(s, inhalt, o) {
  const m = s.messen(inhalt, o)
  return s.text(inhalt, { ...o, x: o.x - m.links, ausrichtung: 'links' })
}

/** Zentriert nach den sichtbaren Glyphen, nicht nach der Dickte. */
function zentriert(s, inhalt, o) {
  const m = s.messen(inhalt, o)
  return s.text(inhalt, { ...o, x: o.x - (m.links + m.rechts) / 2, ausrichtung: 'links' })
}

/** Angabe auf der linken Kante; offen → Platzhalter ab x. */
function angabeLinks(s, angaben, feld, o) {
  const wert = angaben[feld]
  const x = wert ? o.x - s.messen(wert, o).links : o.x
  return s.angabe(feld, { ...o, x, ausrichtung: 'links' })
}

/** Breite, die eine Angabe belegt – Wert oder Platzhalter-Muster. */
const angabeBreite = (s, angaben, feld, o) => s.messen(angaben[feld] ?? feldBeschreibung[feld].muster, o).breite

/**
 * Vorderseiten: Leinen (gewählt am 23.09.2026) und Innas Wunsch vom 24.09.2026, Cognac mit beiger
 * oder schwarzer Schrift. Jede Schriftfarbe bekommt den Cognac-Ton, auf dem sie lesbar bleibt:
 * - Beige (Leinen) auf Kupfer tief, 5,2:1. Als Aussparung aus vier Farben: Cormorant 400 und
 *   Montserrat 500, weil feinere Haarstriche im Druck zulaufen würden.
 * - Schwarz (reines K) auf dem helleren Kupfer. Auf Kupfer tief käme es nur auf 2,3:1. Die Schrift
 *   wird überdruckt statt ausgespart, dadurch entsteht ein warmes Tiefbraun ohne Blitzer.
 */
const VORDERSEITE = {
  leinen: { grund: 'leinen', farbe: tinte, inna: 'displayLight', zeile2: 'sans' },
  cognacBeige: { grund: 'kupferTief', farbe: 'leinen', inna: 'display', zeile2: 'sansMedium', aufDunkel: true },
  cognacSchwarz: { grund: 'kupfer', farbe: tinte, inna: 'displayLight', zeile2: 'sans', ueberdrucken: true },
}

/**
 * Wortmarke wie auf der Website: INNA in Cormorant, Laufweite 0,34; ZEITLOS SCHÖN in Montserrat,
 * Laufweite 0,36 – so groß, dass beide Zeilen sichtbar gleich breit sind (rund 45 % der Karte).
 */
function wortmarke(s, { text }, ton) {
  const farbe = { farbe: ton.farbe, aufDunkel: ton.aufDunkel, ueberdrucken: ton.ueberdrucken }
  const inna = { schrift: ton.inna, versalhoehe: 7.2, laufweite: 0.34, ...farbe }
  const probe = { schrift: ton.zeile2, groessePt: 8, laufweite: 0.36, ...farbe }
  const faktor = sichtbar(s.messen(text.wortmarke, inna)) / sichtbar(s.messen(text.wortmarkeZeile2, probe))
  const zeile2 = { ...probe, groessePt: probe.groessePt * faktor }

  const abstand = 0.55 * inna.versalhoehe
  const versal2 = s.messen('H', zeile2).versalhoehe
  const oben = MITTE_Y - (inna.versalhoehe + abstand + versal2) / 2
  const grundlinie1 = oben + inna.versalhoehe
  zentriert(s, text.wortmarke, { ...inna, x: MITTE_X, y: grundlinie1 })
  zentriert(s, text.wortmarkeZeile2, { ...zeile2, x: MITTE_X, y: grundlinie1 + abstand + versal2 })
}

const vorn = (ton) => (s, inhalte) => {
  s.flaeche(ton.grund)
  wortmarke(s, inhalte, ton)
}

const hinten = (s, { text, angaben }) => {
  s.flaeche('leinen')

  // Person: die Unterschrift führt, Beruf und Schwerpunkt ordnen sich unter
  const unterschrift = { schrift: 'signatur', groessePt: 26, farbe: kupfer }
  const grundlinieName = RAND + s.messen(text.name, unterschrift).oben
  const grundlinieBeruf = grundlinieName + 5.6
  linksbuendig(s, text.name, { ...unterschrift, x: RAND, y: grundlinieName })
  linksbuendig(s, text.beruf.toUpperCase(), { ...versalien, x: RAND, y: grundlinieBeruf })
  linksbuendig(s, text.schwerpunkt, { schrift: 'displayKursiv', groessePt: 10.5, farbe: tinte, x: RAND, y: grundlinieBeruf + 4.4 })

  // Kontaktwege, darunter mit eigenem Abstand der Ort – die Adresse steht auf dem unteren Rand
  const grundlinieWeb = UNTEN - 1.4 * ZEILE
  const kanaele = ['telefon', 'email', 'domain']
  const breitesteZeile = Math.max(...kanaele.map((f) => angabeBreite(s, angaben, f, kleinschrift)), s.messen(text.adresse, kleinschrift).breite)
  passt(breitesteZeile, RECHTS - RAND, 'die längste Kontaktzeile')
  kanaele.forEach((feld, i) =>
    angabeLinks(s, angaben, feld, { ...kleinschrift, x: RAND, y: grundlinieWeb - (kanaele.length - 1 - i) * ZEILE }),
  )
  linksbuendig(s, text.adresse, { ...kleinschrift, x: RAND, y: UNTEN })

  // QR-Code auf die Website: unten rechts auf der Adress-Grundlinie. Reichen E-Mail oder Domain bis
  // an seine Ruhezone, weicht er nach oben rechts neben die Unterschrift aus.
  const qrX = RECHTS - QR
  const untenFrei = RAND + breitesteZeile + 1 <= qrX - QR_RUHE
  s.qr({ x: qrX, y: untenFrei ? UNTEN - QR : RAND, groesse: QR })
}

const auftrag = {
  produkt: 'visitenkarte',
  beschreibung: 'Visitenkarte 85 × 55 mm – vorn die Wortmarke (Leinen oder Cognac), hinten Kontakt mit QR-Code auf die Website',
  ausgaben: {
    default: [vorn(VORDERSEITE.leinen), hinten],
    'cognac-beige': [vorn(VORDERSEITE.cognacBeige), hinten],
    'cognac-schwarz': [vorn(VORDERSEITE.cognacSchwarz), hinten],
  },
}

export default auftrag
