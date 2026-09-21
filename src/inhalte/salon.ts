/**
 * Alle Angaben zum Salon an EINER Stelle.
 *
 * Felder mit `null` sind noch offen. Sobald Inna sie durchgibt, hier eintragen –
 * die Seite zeigt sie dann automatisch an und blendet bis dahin einen sinnvollen
 * Ersatz ein. Es steht nichts Erfundenes auf der Seite.
 *
 * OFFEN: telefon, email, oeffnungszeiten, Preise, Betriebsname fürs Impressum,
 * Nursahs Nachname, Portraits von Inna und Nursah.
 */

export const salon = {
  marke: "INNA – Zeitlos schön",
  /** OFFEN – Instagram heißt „Wiehler Schönheitsfleck". Welcher Name gilt für Impressum und Google? */
  betrieb: "Wiehler Schönheitsfleck",
  strasse: "Schulstraße 1",
  plz: "51674",
  ort: "Wiehl",
  region: "Oberbergischer Kreis",
  telefon: null as string | null,
  email: null as string | null,
  instagram: "https://www.instagram.com/wiehlerschoenheitsfleck/",
  instagramName: "@wiehlerschoenheitsfleck",
  maps: "https://www.google.com/maps/search/?api=1&query=Schulstra%C3%9Fe+1%2C+51674+Wiehl",
  /** OFFEN – z. B. [{ tag: 'Dienstag bis Freitag', zeit: '9 – 18 Uhr' }] */
  oeffnungszeiten: null as { tag: string; zeit: string }[] | null,
} as const;

export const navigation = [
  { name: "Über mich", ziel: "#ueber-mich" },
  { name: "Leistungen", ziel: "#leistungen" },
  { name: "Philosophie", ziel: "#philosophie" },
  { name: "Preise", ziel: "#preise" },
  { name: "Kontakt", ziel: "#kontakt" },
] as const;

export type Leistung = {
  titel: string;
  beschreibung: string;
  bild: string;
  alt: string;
};

/** Texte wörtlich aus Innas Entwurf. */
export const leistungen: Leistung[] = [
  {
    titel: "Blond Expertin",
    beschreibung:
      "Airtouch, Balayage, Babylights, Faceframe und Glossing – weiche Aufhellung in Stufen, damit die Struktur mitkommt.",
    bild: "/arbeiten/blond-expertin.jpg",
    alt: "Langes Haar von hinten mit vielschichtigem Blond vom dunkleren Ansatz in helle Spitzen.",
  },
  {
    titel: "Farb­transformation",
    beschreibung:
      "Individuelle Farbkonzepte für deinen perfekten Farbton – abgestimmt auf dich.",
    bild: "/arbeiten/farb-transformation.jpg",
    alt: "Seitenansicht einer Farbarbeit mit weichen Übergängen von Dunkel nach Hell.",
  },
  {
    titel: "Tressen & Verdichtung",
    beschreibung:
      "Hochwertige Tressen für mehr Länge, Volumen und ein natürliches Haargefühl.",
    bild: "/arbeiten/tressen-verdichtung.jpg",
    alt: "Volles, langes Haar mit sichtbarer Dichte bis in die Spitzen.",
  },
  {
    titel: "Schnitt & Styling",
    beschreibung:
      "Maßgeschneiderte Schnitte, die deine Persönlichkeit unterstreichen.",
    bild: "/arbeiten/schnitt-styling.jpg",
    alt: "Gewellte Längen nach Schnitt und Styling, seitlich fotografiert.",
  },
];

export const philosophie = [
  {
    titel: "Natürlichkeit",
    text: "Farben, die herauswachsen dürfen. Individuell und typgerecht.",
    symbol: "blatt",
  },
  {
    titel: "Qualität",
    text: "Hochwertige Produkte. Gesundes Haar steht immer an erster Stelle.",
    symbol: "tropfen",
  },
  {
    titel: "Ehrlichkeit",
    text: "Ich verspreche nichts, was ich nicht verantworten kann.",
    symbol: "herz",
  },
  {
    titel: "Zeit",
    text: "Ein Termin ohne Stress. Ohne Hektik. Ohne Druck.",
    symbol: "uhr",
  },
] as const;

export type Preisposten = {
  leistung: string;
  hinweis: string;
  /** OFFEN – sobald Innas Preisliste da ist: z. B. 'ab 180 €' */
  preis: string | null;
};

export const preise: Preisposten[] = [
  {
    leistung: "Airtouch",
    hinweis: "Aufhellung Strähne für Strähne, je nach Länge 4 bis 6 Stunden",
    preis: null,
  },
  {
    leistung: "Balayage",
    hinweis: "Freihand gemalter Verlauf, Ansatz bleibt weich",
    preis: null,
  },
  {
    leistung: "Babylights & Faceframe",
    hinweis: "Feine Aufhellung rund ums Gesicht",
    preis: null,
  },
  {
    leistung: "Farbkorrektur",
    hinweis: "Nach Fremdarbeit oder wenn die Längen unruhig geworden sind",
    preis: null,
  },
  {
    leistung: "Grauhaarkaschierung",
    hinweis: "Grau wird eingebettet statt abgedeckt",
    preis: null,
  },
  {
    leistung: "Glossing & Pflege",
    hinweis: "Frische und Leuchtkraft zwischen zwei Farbterminen",
    preis: null,
  },
  {
    leistung: "Tressen & Verdichtung",
    hinweis: "Beratung, Anpassung und Einarbeitung",
    preis: null,
  },
  {
    leistung: "Schnitt & Styling",
    hinweis: "Waschen, Schnitt, Föhnen",
    preis: null,
  },
];
