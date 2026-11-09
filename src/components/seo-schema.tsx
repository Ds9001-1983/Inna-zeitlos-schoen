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
      'Friseursalon in Wiehl: Blond, Farbe, Farbkorrekturen, Tressen sowie Schnitt und Styling. Persönliche Beratung im Salon vor jeder größeren Veränderung.',
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
    ...(salon.instagram ? { sameAs: [salon.instagram] } : {}),
    knowsAbout: [
      'Airtouch',
      'Balayage',
      'Babylights',
      'Faceframe',
      'Glossing',
      'Grey Blending',
      'Farbkorrektur',
      'Grauhaarkaschierung',
      'Tressen und Haarverdichtung',
      'Haarverlängerung',
    ],
  }

  schema.geo = {
    '@type': 'GeoCoordinates',
    latitude: salon.geo.breite,
    longitude: salon.geo.laenge,
  }
  schema.hasMap = salon.maps

  // International, so wie der tel:-Link in der Fußzeile (0170 … → +49 170 …)
  if (salon.telefon) schema.telephone = salon.telefon.replace(/^0/, '+49 ')
  if (salon.email) schema.email = salon.email
  // Onlinebuchung, nur für Stammkundinnen (Neukundinnen per WhatsApp)
  if (salon.buchung) {
    schema.potentialAction = {
      '@type': 'ReserveAction',
      name: 'Onlinebuchung für Stammkundinnen',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: salon.buchung,
        inLanguage: 'de',
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
    }
  }
  if (salon.ustId) schema.vatID = salon.ustId
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
