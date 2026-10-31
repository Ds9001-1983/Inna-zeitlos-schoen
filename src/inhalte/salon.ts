/**
 * Alle Angaben zum Salon an EINER Stelle.
 *
 * Felder mit `null` sind noch offen. Sobald Inna sie durchgibt, hier eintragen –
 * die Seite zeigt sie dann automatisch an und blendet bis dahin einen sinnvollen
 * Ersatz ein. Es steht nichts Erfundenes auf der Seite.
 *
 * OFFEN: oeffnungszeiten, Link der Onlinebuchung, Betriebsname
 * fürs Impressum, Nursahs Nachname, Portraits von Inna und Nursah.
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
  /** Dennis, 21.10.2026 */
  email: 'info@inna-zeitlosschoen.de' as string | null,
  /** Domain ohne https:// (Dennis, 21.10.2026). Steht auf der Visitenkarte, der QR-Code führt dorthin. */
  domain: 'inna-zeitlosschoen.de' as string | null,
  /**
   * Beratungstermine für Neukundinnen laufen über WhatsApp, auf Innas Mobilnummer
   * (Dennis, 30.10.2026). International ohne + und ohne führende 0.
   */
  whatsapp: '491706619452' as string | null,
  /**
   * OFFEN – Link der Onlinebuchung, nur für Stammkundinnen (Inna, 30.10.2026).
   * Solange er fehlt, steht im Abschnitt Termine der Satz ohne Knopf.
   */
  buchung: null as string | null,
  /** Erscheint nur, wenn beides gefüllt ist. */
  instagram: 'https://www.instagram.com/innazeitlosschoen/' as string | null,
  instagramName: '@innazeitlosschoen' as string | null,
  maps: 'https://www.google.com/maps/search/?api=1&query=Schulstra%C3%9Fe+1%2C+51674+Wiehl',
  /** OFFEN – z. B. [{ tag: 'Dienstag bis Freitag', zeit: '9 – 18 Uhr' }] */
  oeffnungszeiten: null as { tag: string; zeit: string }[] | null,
} as const

/** Öffnet den Chat mit einem kurzen Anfangssatz, den die Kundin noch ändern kann. */
export const whatsappLink = salon.whatsapp
  ? `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(
      'Hallo, ich bin neu bei euch und möchte gern einen Beratungstermin anfragen.',
    )}`
  : null

export const navigation = [
  { name: 'Über uns', ziel: '#ueber-uns' },
  { name: 'Leistungen', ziel: '#leistungen' },
  { name: 'Philosophie', ziel: '#philosophie' },
  { name: 'Neu bei uns', ziel: '#neu-bei-uns' },
] as const

type Seite = { bild: string; alt: string }
export type VorherNachher = { vorher: Seite; nachher: Seite }

export type Leistung = {
  titel: string
  /** Innas erster Satz – steht in der zugeklappten Zeile */
  einstieg: string
  absaetze: string[]
  /** Schlusssatz, groß gesetzt */
  merksatz?: string[]
  /**
   * Innas Arbeit zur Leistung, Foto vom 13.10.2026 (Zuordnung: projekt/fotos/README.md).
   * Zugeschnitten mit scripts/fotos-aufbereiten.mjs, damit Scheitel und Haarbreite
   * in beiden Bildern übereinanderliegen.
   * OFFEN: schriftliche Einwilligung der Kundinnen (projekt/auftrag.md).
   */
  vorherNachher: VorherNachher
}

/**
 * Texte wörtlich aus Innas finaler Fassung vom 30.10.2026. Der Titel steht auch im
 * Druck (druck/inhalte.mjs), die weiche Trennung nimmt der Druck wieder heraus.
 */
export const leistungen: Leistung[] = [
  {
    titel: 'Blond',
    einstieg: 'Blond kann so vieles sein.',
    absaetze: [
      'Hell und klar. Weich und natürlich. Kühl, warm, dimensional oder einfach so, dass niemand genau sagen kann, warum es so gut aussieht.',
      'Airtouch, Faceframe, Babylights oder eine Kombination verschiedener Techniken – wir entscheiden nicht vorher nach Schema F, sondern danach, was dein Haar und dein gewünschtes Ergebnis brauchen.',
      'Mit weichen Übergängen, Tiefe und Dimension und immer mit Blick auf die Qualität deines Haares.',
    ],
    vorherNachher: {
      vorher: {
        bild: '/arbeiten/vorher-nachher/1-blond-vorher.jpg',
        alt: 'Vorher: lange, glatte Längen in warmem Gelbblond, von hinten.',
      },
      nachher: {
        bild: '/arbeiten/vorher-nachher/1-blond-nachher.jpg',
        alt: 'Nachher: kühles Aschblond mit weichem Übergang, von der Seite.',
      },
    },
  },
  {
    titel: 'Farbe',
    einstieg: 'Farbe darf verändern – ohne dich zu verkleiden.',
    absaetze: [
      'Von natürlichen Nuancen und Grey Blending bis zu satten Braun-, Kupfer- und Rottönen entwickeln wir Farbkonzepte, die zu deinem Typ, deiner Ausgangslage und deinem Alltag passen.',
      'Denn die schönste Haarfarbe ist für uns die, bei der am Ende nicht die Farbe zuerst auffällt.',
    ],
    merksatz: ['Sondern du.'],
    vorherNachher: {
      vorher: {
        bild: '/arbeiten/vorher-nachher/2-farbe-vorher.jpg',
        alt: 'Vorher: ausgewaschenes Orange-Kupfer mit stumpfen Längen.',
      },
      nachher: {
        bild: '/arbeiten/vorher-nachher/2-farbe-nachher.jpg',
        alt: 'Nachher: sattes, glänzendes Rot in gestuften Längen.',
      },
    },
  },
  {
    titel: 'Farb­korrekturen',
    einstieg: 'Nicht jede Ausgangslage ist einfach. Und genau das macht sie für uns interessant.',
    absaetze: [
      'Bei Farbkorrekturen schauen wir ganz genau hin: Was wurde bisher gemacht? Was kann dein Haar noch leisten? Wo möchtest du hin – und welcher Weg dorthin ist wirklich sinnvoll?',
      'Dabei versprechen wir dir nichts, was dein Haar nicht halten kann.',
      'Manchmal erreichen wir dein Ziel in einem Termin. Manchmal braucht gutes Haar einen Plan und etwas Geduld.',
    ],
    merksatz: ['Beides sagen wir dir ehrlich.'],
    vorherNachher: {
      vorher: {
        bild: '/arbeiten/vorher-nachher/3-farbkorrektur-vorher.jpg',
        alt: 'Vorher: lange, glatte Längen in Gelbblond mit dünnen Spitzen.',
      },
      nachher: {
        bild: '/arbeiten/vorher-nachher/3-farbkorrektur-nachher.jpg',
        alt: 'Nachher: kühles Aschblond mit weichem Übergang vom Ansatz, in Wellen gelegt.',
      },
    },
  },
  {
    titel: 'Tressen',
    einstieg: 'Manchmal fehlt gar nicht die Länge.',
    absaetze: [
      'Sondern Dichte. Fülle. Eine schönere Kontur. Oder einfach dieses Gefühl, wieder richtig viele Haare zu haben.',
      'Mit Tressen schaffen wir individuelle Haarverdichtungen und Haarverlängerungen, die sich selbstverständlich in dein Eigenhaar einfügen sollen.',
      'Dabei gilt auch hier:',
    ],
    merksatz: ['Nicht so viel wie möglich.', 'Sondern genau so viel wie nötig.'],
    vorherNachher: {
      vorher: {
        bild: '/arbeiten/vorher-nachher/4-tressen-vorher.jpg',
        alt: 'Vorher: glattes Haar mit dunklem Ansatz und gelblichen Längen.',
      },
      nachher: {
        bild: '/arbeiten/vorher-nachher/4-tressen-nachher.jpg',
        alt: 'Nachher: helles, kühles Blond in langen Wellen.',
      },
    },
  },
  {
    titel: 'Schnitt & Styling',
    einstieg:
      'Ein guter Schnitt muss nicht nur an dem Tag funktionieren, an dem du unseren Salon verlässt.',
    absaetze: [
      'Er muss zu deiner Haarstruktur, deinem Typ und deinem Alltag passen.',
      'Schnitt und Styling gehören deshalb selbstverständlich zu unserem Handwerk und zu unseren bestehenden Kundinnen.',
    ],
    vorherNachher: {
      vorher: {
        bild: '/arbeiten/vorher-nachher/5-schnitt-styling-vorher.jpg',
        alt: 'Vorher: lange, glatte Längen in gelblichem Orangeblond.',
      },
      nachher: {
        bild: '/arbeiten/vorher-nachher/5-schnitt-styling-nachher.jpg',
        alt: 'Nachher: gestuftes Blond mit hellen Partien und Tiefe am Ansatz.',
      },
    },
  },
]

