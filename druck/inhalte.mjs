/**
 * Alles, was auf Schild und Karte stehen darf – und nichts sonst.
 *
 * Fakten kommen aus src/inhalte/salon.ts (dieselbe Quelle wie die Website), die Sätze wörtlich aus
 * projekt/texte/vokabular.md. Neue Werbetexte werden hier nicht erfunden; wer einen Satz braucht,
 * der hier fehlt, trägt ihn erst ins Vokabular ein.
 */
import { readFileSync } from 'node:fs'
import { salon, leistungen } from '../src/inhalte/salon.ts'

/** Weiche Trennstriche der Website (Farb­transformation) gehören nicht aufs Papier. */
const ohneTrennung = (text) => text.replaceAll('­', '')

/**
 * Nur für Gegenproben (DRUCK_TESTDATEN=1, oder DRUCK_TESTDATEN_DATEI=pfad.json für Belastungstests
 * mit langen Werten). Die Werte sind offensichtlich unecht und landen ausschließlich in
 * ausgabe/test/, nie in ausgabe/final/.
 */
const testdatenDatei = process.env.DRUCK_TESTDATEN_DATEI
const testdaten = testdatenDatei
  ? JSON.parse(readFileSync(testdatenDatei, 'utf8'))
  : {
      telefon: '00000 000000',
      email: 'test@example.com',
      domain: 'example.com',
      oeffnungszeiten: [
        { tag: 'Testtag', zeit: '00 – 00 Uhr' },
        { tag: 'Testtag', zeit: '00 – 00 Uhr' },
      ],
    }

export const mitTestdaten = process.env.DRUCK_TESTDATEN === '1' || Boolean(testdatenDatei)

/**
 * Sonderzeichen aus Kopiervorlagen, die die Schriften nicht haben (schmale und geschützte
 * Leerzeichen, geschützter Bindestrich, weicher Trennstrich), auf druckbare Zeichen bringen.
 */
const druckbar = (wert) =>
  wert
    ?.replace(/[\u00a0\u2007\u2009\u202f]/g, ' ')
    .replace(/\u2011/g, '-')
    .replace(/\u00ad/g, '')
    .trim() ?? null

const quelle = mitTestdaten ? testdaten : salon

/** Angaben mit Wert oder null (= offen, im Entwurf als Platzhalter). */
export const angaben = {
  telefon: druckbar(quelle.telefon),
  email: druckbar(quelle.email),
  // ohne https:// und ohne Schrägstrich am Ende – so steht die Domain auf Papier
  domain: druckbar(quelle.domain)?.replace(/^https?:\/\//, '').replace(/\/$/, '') ?? null,
  oeffnungszeiten: quelle.oeffnungszeiten?.map((z) => ({ tag: druckbar(z.tag), zeit: druckbar(z.zeit) })) ?? null,
}

/** Wie ein offenes Feld im Entwurf heißt und wie groß sein Platzhalter ungefähr wird. */
export const feldBeschreibung = {
  telefon: { name: 'Telefon', muster: '02262 000000' },
  email: { name: 'E-Mail', muster: 'kontakt@beispiel-salon.de' },
  domain: { name: 'Website', muster: 'www.beispiel-salon.de' },
  oeffnungszeiten: { name: 'Öffnungszeiten', muster: 'Dienstag bis Freitag  00 – 00 Uhr', zeilen: 3 },
}

export const text = {
  wortmarke: 'INNA',
  wortmarkeZeile2: 'ZEITLOS SCHÖN',
  /** Hero-Zeile 1 und 2 der Website */
  titel: 'Zeitlos schön.',
  claim: 'So natürlich wie du.',
  team: 'Zwei Friseurmeisterinnen. Ein Anspruch.',
  name: 'Inna',
  beruf: 'Friseurmeisterin',
  /** Innas eigener Satz im Seitenentwurf: „Inna für Farben, Transformationen & Beratung." */
  schwerpunkt: 'Farben, Transformationen & Beratung',
  leistungen: leistungen.map((l) => ohneTrennung(l.titel)),
  /** Details zu „Blond Expertin" laut Vorlage */
  blondTechniken: ['Airtouch', 'Balayage', 'Babylights', 'Faceframe', 'Glossing'],
  werte: ['Natürlichkeit', 'Qualität', 'Ehrlichkeit', 'Zeit'],
  strasse: salon.strasse,
  ort: `${salon.plz} ${salon.ort}`,
  adresse: `${salon.strasse} · ${salon.plz} ${salon.ort}`,
  /** Ersatztext der Website, solange es keine Öffnungszeiten gibt */
  nachVereinbarung: 'Termine nach Vereinbarung.',
  // funktionale Beschriftungen
  labelTelefon: 'Telefon',
  labelEmail: 'E-Mail',
  labelWeb: 'Web',
  labelOeffnungszeiten: 'Öffnungszeiten',
  labelLeistungen: 'Leistungen',
}

/** Jeder Text, der gesetzt wird, muss hieraus stammen – erzeugen.mjs prüft das. */
export function erlaubteTexte() {
  const menge = new Set()
  for (const wert of Object.values(text)) {
    if (Array.isArray(wert)) wert.forEach((w) => menge.add(w))
    else menge.add(wert)
  }
  for (const [feld, wert] of Object.entries(angaben)) {
    if (!wert) continue
    if (feld === 'oeffnungszeiten') wert.forEach((z) => (menge.add(z.tag), menge.add(z.zeit)))
    else menge.add(wert)
  }
  return menge
}
