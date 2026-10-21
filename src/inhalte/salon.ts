/**
 * Alle Angaben zum Salon an EINER Stelle.
 *
 * Felder mit `null` sind noch offen. Sobald Inna sie durchgibt, hier eintragen –
 * die Seite zeigt sie dann automatisch an und blendet bis dahin einen sinnvollen
 * Ersatz ein. Es steht nichts Erfundenes auf der Seite.
 *
 * OFFEN: email, domain, oeffnungszeiten, Innas Instagram-Profil, Betriebsname
 * fürs Impressum, Nursahs Nachname, Portraits von Inna und Nursah, Ersatzfoto für „Über mich“.
 */

export const salon = {
  marke: 'INNA – Zeitlos schön',
  betrieb: 'INNA – Zeitlos schön',
  strasse: 'Schulstraße 1',
  plz: '51674',
  ort: 'Wiehl',
  region: 'Oberbergischer Kreis',
  /** Innas Mobilnummer, durchgegeben von Dennis am 21.10.2026 */
  telefon: '0170 66 19 452' as string | null,
  email: null as string | null,
  /** OFFEN – Domain ohne https://, sobald sie feststeht. Steht dann auch auf der Visitenkarte (mit QR-Code). */
  domain: null as string | null,
  /** OFFEN – Innas eigenes Profil. Erscheint erst, wenn beides gefüllt ist. */
  instagram: null as string | null,
  instagramName: null as string | null,
  maps: 'https://www.google.com/maps/search/?api=1&query=Schulstra%C3%9Fe+1%2C+51674+Wiehl',
  /** OFFEN – z. B. [{ tag: 'Dienstag bis Freitag', zeit: '9 – 18 Uhr' }] */
  oeffnungszeiten: null as { tag: string; zeit: string }[] | null,
} as const

export const navigation = [
  { name: 'Über mich', ziel: '#ueber-mich' },
  { name: 'Leistungen', ziel: '#leistungen' },
  { name: 'Philosophie', ziel: '#philosophie' },
  { name: 'Kontakt', ziel: '#kontakt' },
] as const

export type Leistung = {
  titel: string
  bild: string
  alt: string
  /**
   * Fokuspunkt des Textur-Ausschnitts (object-position). Die Kacheln zeigen wie in Innas
   * Entwurf Haar-Nahaufnahmen – enge Ausschnitte aus Innas Arbeiten.
   */
  ausschnitt: string
}

/**
 * Seit der Korrektur vom 13.10.2026 stehen die Kacheln ohne Text. Der Titel bleibt
 * für das Schild (druck/inhalte.mjs), die Beschreibungen stehen in projekt/auftrag.md.
 */
export const leistungen: Leistung[] = [
  {
    titel: 'Blond Expertin',
    bild: '/arbeiten/blond-expertin.jpg',
    ausschnitt: '50% 62%',
    alt: 'Langes Haar von hinten mit vielschichtigem Blond vom dunkleren Ansatz in helle Spitzen.',
  },
  {
    titel: 'Farb­transformation',
    bild: '/arbeiten/farb-transformation.jpg',
    ausschnitt: '58% 48%',
    alt: 'Seitenansicht einer Farbarbeit mit weichen Übergängen von Dunkel nach Hell.',
  },
  {
    titel: 'Tressen & Verdichtung',
    bild: '/arbeiten/tressen-verdichtung.jpg',
    ausschnitt: '50% 70%',
    alt: 'Volles, langes Haar mit sichtbarer Dichte bis in die Spitzen.',
  },
  {
    titel: 'Schnitt & Styling',
    bild: '/arbeiten/schnitt-styling.jpg',
    ausschnitt: '42% 44%',
    alt: 'Gewellte Längen nach Schnitt und Styling, seitlich fotografiert.',
  },
]

export const philosophie = [
  {
    titel: 'Natürlichkeit',
    text: 'Farben, die herauswachsen dürfen. Individuell und typgerecht.',
    symbol: 'blatt',
  },
  {
    titel: 'Qualität',
    text: 'Hochwertige Produkte. Gesundes Haar steht immer an erster Stelle.',
    symbol: 'tropfen',
  },
  {
    titel: 'Ehrlichkeit',
    text: 'Ich verspreche nichts, was ich nicht verantworten kann.',
    symbol: 'herz',
  },
  {
    titel: 'Zeit',
    text: 'Ein Termin ohne Stress. Ohne Hektik. Ohne Druck.',
    symbol: 'uhr',
  },
] as const
