/**
 * Alle Angaben zum Salon an EINER Stelle.
 *
 * Felder mit `null` sind noch offen. Sobald Inna sie durchgibt, hier eintragen –
 * die Seite zeigt sie dann automatisch an und blendet bis dahin einen sinnvollen
 * Ersatz ein. Es steht nichts Erfundenes auf der Seite.
 *
 * OFFEN: telefon, email, domain, oeffnungszeiten, Innas Instagram-Profil, Preise, Betriebsname
 * fürs Impressum, Nursahs Nachname, Portraits von Inna und Nursah.
 */

export const salon = {
  marke: 'INNA – Zeitlos schön',
  betrieb: 'INNA – Zeitlos schön',
  strasse: 'Schulstraße 1',
  plz: '51674',
  ort: 'Wiehl',
  region: 'Oberbergischer Kreis',
  telefon: null as string | null,
  email: null as string | null,
  /** OFFEN – Domain ohne https://, sobald sie feststeht. Steht auf Schild und Visitenkarte. */
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
  { name: 'Arbeiten', ziel: '#arbeiten' },
  { name: 'Leistungen', ziel: '#leistungen' },
  { name: 'Philosophie', ziel: '#philosophie' },
  { name: 'Preise', ziel: '#preise' },
  { name: 'Kontakt', ziel: '#kontakt' },
] as const

export type Leistung = {
  titel: string
  beschreibung: string
  bild: string
  alt: string
  /** OFFEN – z. B. '4 bis 6 Stunden'. Erscheint nur, wenn gefüllt. */
  dauer?: string | null
  /** OFFEN – z. B. 'hält 3 bis 6 Monate'. Erscheint nur, wenn gefüllt. */
  haltbarkeit?: string | null
  /**
   * Fokuspunkt des Textur-Ausschnitts (object-position). Die Kacheln zeigen wie in Innas
   * Entwurf Haar-Nahaufnahmen – enge Ausschnitte derselben Fotos, die in der Galerie ganz zu sehen sind.
   */
  ausschnitt: string
}

/** Texte wörtlich aus Innas Entwurf. */
export const leistungen: Leistung[] = [
  {
    titel: 'Blond Expertin',
    beschreibung:
      'Airtouch, Balayage, Babylights, Faceframe und Glossing – weiche Aufhellung in Stufen, damit die Struktur mitkommt.',
    bild: '/arbeiten/blond-expertin.jpg',
    ausschnitt: '50% 62%',
    alt: 'Langes Haar von hinten mit vielschichtigem Blond vom dunkleren Ansatz in helle Spitzen.',
  },
  {
    titel: 'Farb­transformation',
    beschreibung: 'Individuelle Farbkonzepte für deinen perfekten Farbton – abgestimmt auf dich.',
    bild: '/arbeiten/farb-transformation.jpg',
    ausschnitt: '58% 48%',
    alt: 'Seitenansicht einer Farbarbeit mit weichen Übergängen von Dunkel nach Hell.',
  },
  {
    titel: 'Tressen & Verdichtung',
    beschreibung: 'Hochwertige Tressen für mehr Länge, Volumen und ein natürliches Haargefühl.',
    bild: '/arbeiten/tressen-verdichtung.jpg',
    ausschnitt: '50% 70%',
    alt: 'Volles, langes Haar mit sichtbarer Dichte bis in die Spitzen.',
  },
  {
    titel: 'Schnitt & Styling',
    beschreibung: 'Maßgeschneiderte Schnitte, die deine Persönlichkeit unterstreichen.',
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

export type Preisposten = {
  leistung: string
  hinweis: string
  /** OFFEN – sobald Innas Preisliste da ist: z. B. 'ab 180 €' */
  preis: string | null
}

export const preise: Preisposten[] = [
  {
    leistung: 'Airtouch',
    hinweis: 'Aufhellung Strähne für Strähne, je nach Länge 4 bis 6 Stunden',
    preis: null,
  },
  {
    leistung: 'Balayage',
    hinweis: 'Freihand gemalter Verlauf, Ansatz bleibt weich',
    preis: null,
  },
  {
    leistung: 'Babylights & Faceframe',
    hinweis: 'Feine Aufhellung rund ums Gesicht',
    preis: null,
  },
  {
    leistung: 'Farbkorrektur',
    hinweis: 'Nach Fremdarbeit oder wenn die Längen unruhig geworden sind',
    preis: null,
  },
  {
    leistung: 'Grauhaarkaschierung',
    hinweis: 'Grau wird eingebettet statt abgedeckt',
    preis: null,
  },
  {
    leistung: 'Glossing & Pflege',
    hinweis: 'Frische und Leuchtkraft zwischen zwei Farbterminen',
    preis: null,
  },
  {
    leistung: 'Tressen & Verdichtung',
    hinweis: 'Beratung, Anpassung und Einarbeitung',
    preis: null,
  },
  {
    leistung: 'Schnitt & Styling',
    hinweis: 'Waschen, Schnitt, Föhnen',
    preis: null,
  },
]

export type Arbeit = {
  bild: string
  alt: string
  titel: string
  technik: string
  datum: string
  notiz: string
}

/**
 * Innas eigene Arbeiten. Technik und Datum stammen aus ihren
 * Instagram-Beiträgen, die Notiz beschreibt, was im Bild zu sehen ist –
 * nichts davon ist erfunden.
 */
export const arbeiten: Arbeit[] = [
  {
    bild: '/arbeiten/rueckansicht-hero.jpg',
    alt: 'Lange Längen von hinten: dunkler Ansatz, der ohne Kante in helle, gewellte Spitzen übergeht.',
    titel: 'Der Ansatz, der mitwächst',
    technik: 'Airtouch',
    datum: 'Januar 2026',
    notiz: 'Der Ansatz bleibt dunkel und wächst mit. Keine Linie, die nachgezogen werden muss.',
  },
  {
    bild: '/arbeiten/farbkorrektur-nachher.jpg',
    alt: 'Dimensionales Blond mit eingebetteten hellen Partien nach einer Farbkorrektur.',
    titel: 'Zurück zu mehr Tiefe',
    technik: 'Farb\u00adkorrektur',
    datum: 'Juli 2026',
    notiz:
      'Nach mehreren enttäuschenden Terminen: helle Bereiche eingebettet, harte Übergänge ausgeglichen.',
  },
  {
    bild: '/arbeiten/blond-expertin.jpg',
    alt: 'Rückansicht mit vielschichtigem Blond vom Oberkopf bis in die Spitzen.',
    titel: 'Aufhellung in Stufen',
    technik: 'Airtouch',
    datum: 'Januar 2026',
    notiz: 'Aufhellung in Stufen über mehrere Termine, damit die Struktur mitkommt.',
  },
  {
    bild: '/arbeiten/farb-transformation.jpg',
    alt: 'Seitenansicht mit weichem Verlauf von Dunkel nach Hell über die gesamte Länge.',
    titel: 'Ruhe in unruhigen Längen',
    technik: 'Airtouch',
    datum: 'Januar 2026',
    notiz: 'Unruhige Längen zurück in einen Verlauf gebracht, der von selbst ruhig aussieht.',
  },
  {
    bild: '/arbeiten/tressen-verdichtung.jpg',
    alt: 'Volle, lange Längen mit sichtbarer Dichte bis in die Spitzen.',
    titel: 'Dichte bis in die Spitzen',
    technik: 'Airtouch',
    datum: 'Januar 2026',
    notiz: 'Dichte bis in die Spitzen – dafür wird die Länge vorher auf Substanz geprüft.',
  },
  {
    bild: '/arbeiten/salonlicht.jpg',
    alt: 'Warm ausgeleuchtete Längen mit Naturton im Ansatz und hellen Spitzen.',
    titel: 'Drei Zonen, ein Verlauf',
    technik: 'Airtouch',
    datum: 'Januar 2026',
    notiz: 'Naturton oben, Tiefe in der Mitte, Helligkeit unten. Drei Zonen, ein Verlauf.',
  },
  {
    bild: '/arbeiten/schnitt-styling.jpg',
    alt: 'Gewellte Längen nach Schnitt und Styling, seitlich fotografiert.',
    titel: 'Der Schnitt zeigt den Verlauf',
    technik: 'Farb\u00adkorrektur',
    datum: 'Juli 2026',
    notiz: 'Der Schnitt zeigt den Verlauf, statt ihn zu verstecken.',
  },
  {
    bild: '/arbeiten/handwerk-straehne.jpg',
    alt: 'Innas Hand hält eine Strähne hoch und prüft den Übergang vom Ansatz in die Längen.',
    titel: 'Strähne für Strähne',
    technik: 'Die Arbeit selbst',
    datum: 'Januar 2026',
    notiz: 'Strähne für Strähne. So entsteht ein Übergang, den man später nicht mehr sieht.',
  },
]
