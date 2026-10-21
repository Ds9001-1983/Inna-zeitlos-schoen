/**
 * Visitenkarte 85 × 55 mm quer – im Design des Schilds (Dennis, 21.10.2026).
 *
 * Beide Seiten Cognac (Kupfer), die Schrift in Tiefschwarz: reines K 100, überdruckt, Cormorant
 * Regular und Montserrat Medium – wie auf dem Schild. Vorn nur die Wortmarke, hinten links der
 * Satz und die Kontaktwege, rechts der QR-Code auf die Website. Beruf und Schwerpunkt sind am
 * 21.10.2026 entfallen (Dennis).
 *
 * Hinten steht oben Innas Satz „Du bist zeitlos schön." in Cormorant Kursiv – ihr Name stand ihr
 * sonst zu oft auf der Karte (21.10.2026). Die Kleinschrift ist eine Stufe größer als auf der früheren
 * Leinen-Rückseite (9 statt 8 pt), weil Tiefschwarz auf Cognac weniger Kontrast hat als auf Leinen.
 * E-Mail, Website und der QR-Code erscheinen nur, wenn sie in salon.ts stehen.
 *
 * Die früheren Fassungen (Leinen, Cognac-Beige, Cognac-Schwarz mit K 94) stehen in der Git-Geschichte.
 */

/** Gestaltungsrand – weit innerhalb des Sicherheitsabstands von 3 mm */
const RAND = 8
const RECHTS = 85 - RAND
const UNTEN = 55 - RAND
const MITTE_X = 85 / 2
/** optische Mitte der Wortmarke, knapp über der geometrischen (27,5) */
const MITTE_Y = 26.6

const TON = { grund: 'kupfer', farbe: 'schwarz', ueberdrucken: true }
const schrift = { farbe: TON.farbe, ueberdrucken: TON.ueberdrucken }

/** Innas Satz statt eines zweiten INNA – Cormorant Kursiv, ruhig neben der Grotesk der Kontaktzeilen */
const zuspruch = { schrift: 'displayKursiv', groessePt: 17, ...schrift }
const telefon = { schrift: 'sansMedium', groessePt: 10, ...schrift }
const kleinschrift = { schrift: 'sans', groessePt: 9, ...schrift }
/** sichtbare Codefläche des QR in mm; die Ruhezone (4 Module, bei Version 2 rund 2,1 mm) liegt außen */
const QR = 13
const QR_RUHE = (4 * QR) / 25
/** Zeilenabstand der Kleinschrift */
const ZEILE = 4.3

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

/**
 * Wortmarke wie auf dem Schild: INNA in Cormorant Regular, Laufweite 0,34; ZEITLOS SCHÖN in
 * Montserrat Medium, Laufweite 0,36 – so groß, dass beide Zeilen sichtbar gleich breit sind.
 */
function vorn(s, { text }) {
  s.flaeche(TON.grund)
  const inna = { schrift: 'display', versalhoehe: 7.2, laufweite: 0.34, ...schrift }
  const probe = { schrift: 'sansMedium', groessePt: 8, laufweite: 0.36, ...schrift }
  const faktor = sichtbar(s.messen(text.wortmarke, inna)) / sichtbar(s.messen(text.wortmarkeZeile2, probe))
  const zeile2 = { ...probe, groessePt: probe.groessePt * faktor }

  const abstand = 0.55 * inna.versalhoehe
  const versal2 = s.messen('H', zeile2).versalhoehe
  const oben = MITTE_Y - (inna.versalhoehe + abstand + versal2) / 2
  const grundlinie1 = oben + inna.versalhoehe
  zentriert(s, text.wortmarke, { ...inna, x: MITTE_X, y: grundlinie1 })
  zentriert(s, text.wortmarkeZeile2, { ...zeile2, x: MITTE_X, y: grundlinie1 + abstand + versal2 })
}

function hinten(s, { text, angaben }) {
  s.flaeche(TON.grund)

  // „INNA" steht schon vorn – hinten Innas eigener Satz (21.10.2026: „zu oft mein Name")
  const grundlinieZuspruch = RAND + s.messen(text.zuspruch, zuspruch).oben
  linksbuendig(s, text.zuspruch, { ...zuspruch, x: RAND, y: grundlinieZuspruch })

  // Kontakt von unten nach oben: Adresse auf dem unteren Rand, darüber Website und E-Mail, sofern
  // es sie gibt, ganz oben die Telefonnummer – sie ist der Weg zum Termin
  const zeilen = [{ inhalt: text.adresse, o: kleinschrift }]
  if (angaben.domain) zeilen.unshift({ feld: 'domain', o: kleinschrift })
  if (angaben.email) zeilen.unshift({ feld: 'email', o: kleinschrift })
  zeilen.unshift({ feld: 'telefon', o: telefon, abstandDanach: 1 })

  const breite = (z) => s.messen(z.feld ? (angaben[z.feld] ?? '02262 000000') : z.inhalt, z.o).breite
  const breitesteZeile = Math.max(...zeilen.map(breite))
  passt(breitesteZeile, RECHTS - RAND, 'die längste Kontaktzeile')

  let y = UNTEN
  for (const z of [...zeilen].reverse()) {
    if (z.feld) {
      const wert = angaben[z.feld]
      const x = wert ? RAND - s.messen(wert, z.o).links : RAND
      s.angabe(z.feld, { ...z.o, x, y, ausrichtung: 'links' })
    } else {
      linksbuendig(s, z.inhalt, { ...z.o, x: RAND, y })
    }
    y -= ZEILE + (z.abstandDanach ?? 0)
  }

  // QR-Code auf die Website, erst wenn es eine gibt: unten rechts auf der Adress-Grundlinie, sonst
  // oben rechts neben dem Namen. Tiefschwarz auf Cognac.
  if (angaben.domain) {
    const qrX = RECHTS - QR
    const untenFrei = RAND + breitesteZeile + 1 <= qrX - QR_RUHE
    s.qr({ x: qrX, y: untenFrei ? UNTEN - QR : RAND, groesse: QR, farbe: TON.farbe })
  }
}

const auftrag = {
  produkt: 'visitenkarte',
  beschreibung: 'Visitenkarte 85 × 55 mm im Design des Schilds – beidseitig Tiefschwarz auf Cognac, hinten Kontakt',
  ausgaben: { default: [vorn, hinten] },
}

export default auftrag
