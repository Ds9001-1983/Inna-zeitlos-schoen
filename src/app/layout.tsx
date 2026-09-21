import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat, Parisienne } from 'next/font/google'
import { SmoothScroll } from '@/components/smooth-scroll'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SeoSchema } from '@/components/seo-schema'
import { TerminLeiste } from '@/components/termin-leiste'
import { seitenUrl } from '@/inhalte/seite'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400'],
  // Die Schwungkursive ist das Erkennungsmerkmal von Cormorant Garamond.
  // Ohne style-Array wird sie gar nicht geladen und der Browser verzerrt sie.
  style: ['normal', 'italic'],
  display: 'swap',
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

const parisienne = Parisienne({
  variable: '--font-parisienne',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(seitenUrl),
  title: 'INNA – Zeitlos schön | Friseur & Blond-Expertin in Wiehl',
  description:
    'Airtouch, Balayage und Farbkorrektur in Wiehl. Farben, die herauswachsen dürfen – von zwei Friseurmeisterinnen.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'INNA – Zeitlos schön',
    description: 'Typgerechte Schönheit. Gesundes Haar. Ergebnisse, die zu dir passen.',
    url: '/',
    siteName: 'INNA – Zeitlos schön',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-bild.jpg',
        width: 1200,
        height: 630,
        alt: 'Langes Haar mit weichem Verlauf vom dunklen Ansatz in helle Spitzen.',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${montserrat.variable} ${parisienne.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <SeoSchema seitenUrl={seitenUrl} />
        <SmoothScroll>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <TerminLeiste />
        </SmoothScroll>
      </body>
    </html>
  )
}
