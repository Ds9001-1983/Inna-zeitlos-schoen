/**
 * Schild vor dem Eingang, 600 × 500 mm quer – wie die Vorderseite der Visitenkarte (Innas Wunsch
 * vom 13.10.2026: „Schild wie Karte", nur die Schrift dunkler).
 *
 * Cognac (Kupfer) über die ganze Fläche, darauf nur die Wortmarke, zentriert auf der optischen
 * Mitte – dieselben Proportionen wie auf der Karte, INNA rund die halbe Schildbreite.
 *
 * Dunkler als auf der Karte, auf zwei Wegen:
 * - Farbe: reines K 100 statt K 94, überdruckt. Mit dem Kupfer darunter druckt es ein warmes
 *   Tiefschwarz (L* 13 statt 17, 3,8:1 statt 3,4:1 gegen den Grund). Dunkler wird es auf diesem
 *   Kupfer auch mit vierfarbigem Tiefschwarz kaum (L* 12), dafür mit Blitzer-Gefahr.
 * - Schnitt: Cormorant Regular statt Light und Montserrat Medium statt Regular. Die Haarstriche
 *   der Light-Schnitte wirken auf Abstand heller als die Farbe, in der sie gedruckt sind.
 *
 * Der Vorgänger (hell auf Leinen mit Claim, Leistungen, Zeiten und Kontakt, 23.09.2026) steht in
 * der Git-Geschichte.
 */

const TON = { grund: 'kupfer', schrift: 'schwarz' }

/** Verhältnisse der Kartenvorderseite (85 × 55 mm): INNA 7,2 mm Versalhöhe, Mitte bei 26,6 mm */
const KARTE = { breite: 85, hoehe: 55, innaVersal: 7.2, mitteY: 26.6 }

const sichtbar = (m) => m.rechts - m.links

/** Zentriert nach den sichtbaren Glyphen, nicht nach der Dickte. */
function zentriert(s, inhalt, o) {
  const m = s.messen(inhalt, o)
  return s.text(inhalt, { ...o, x: o.x - (m.links + m.rechts) / 2, ausrichtung: 'links' })
}

function schild(s, { text }) {
  s.flaeche(TON.grund)

  const massstab = s.breite / KARTE.breite
  const farbe = { farbe: TON.schrift, ueberdrucken: true }
  const inna = { schrift: 'display', versalhoehe: KARTE.innaVersal * massstab, laufweite: 0.34, rolle: 'wortmarke', ...farbe }
  // ZEITLOS SCHÖN auf dieselbe Tintenbreite wie INNA – wie auf Karte und Website
  const probe = { schrift: 'sansMedium', versalhoehe: 10, laufweite: 0.36, rolle: 'label', ...farbe }
  const faktor = sichtbar(s.messen(text.wortmarke, inna)) / sichtbar(s.messen(text.wortmarkeZeile2, probe))
  const zeile2 = { ...probe, versalhoehe: probe.versalhoehe * faktor }

  const abstand = 0.55 * inna.versalhoehe
  const mitteX = s.breite / 2
  const mitteY = (KARTE.mitteY / KARTE.hoehe) * s.hoehe
  const oben = mitteY - (inna.versalhoehe + abstand + zeile2.versalhoehe) / 2
  const grundlinie1 = oben + inna.versalhoehe
  zentriert(s, text.wortmarke, { ...inna, x: mitteX, y: grundlinie1 })
  zentriert(s, text.wortmarkeZeile2, { ...zeile2, x: mitteX, y: grundlinie1 + abstand + zeile2.versalhoehe })
}

const auftrag = {
  produkt: 'schild',
  beschreibung: 'Schild 600 × 500 mm quer vor dem Eingang – Wortmarke in Tiefschwarz auf Cognac, wie die Kartenvorderseite',
  ausgaben: { default: [schild] },
}

export default auftrag
