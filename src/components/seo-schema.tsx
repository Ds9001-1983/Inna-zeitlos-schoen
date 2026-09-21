import { salon } from '@/inhalte/salon'

/**
 * HairSalon-Auszeichnung für Google. Felder, die noch offen sind
 * (Telefon, Öffnungszeiten), werden weggelassen statt erfunden –
 * eine falsche Angabe im Schema ist schlimmer als eine fehlende.
 */
export function SeoSchema({ seitenUrl }: { seitenUrl: string }) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': `${seitenUrl}/#salon`,
    name: salon.marke,
    alternateName: salon.betrieb,
    description:
      'Friseursalon mit Schwerpunkt Haarfarbe in Wiehl. Airtouch, Balayage, Farbkorrektur und Grauhaarkaschierung von zwei Friseurmeisterinnen.',
    url: seitenUrl,
    image: `${seitenUrl}/og-bild.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: salon.strasse,
      addressLocality: salon.ort,
      postalCode: salon.plz,
      addressRegion: 'Nordrhein-Westfalen',
      addressCountry: 'DE',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: salon.region,
    },
    sameAs: [salon.instagram],
    knowsAbout: [
      'Airtouch',
      'Balayage',
      'Babylights',
      'Faceframe',
      'Glossing',
      'Farbkorrektur',
      'Grauhaarkaschierung',
      'Tressen und Haarverdichtung',
    ],
  }

  if (salon.telefon) schema.telephone = salon.telefon
  if (salon.email) schema.email = salon.email
  if (salon.oeffnungszeiten) {
    schema.openingHours = salon.oeffnungszeiten.map((z) => `${z.tag} ${z.zeit}`)
  }

  return (
    <script
      type="application/ld+json"
      // < maskieren, damit kein HTML aus den Daten ausgeführt werden kann
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  )
}
