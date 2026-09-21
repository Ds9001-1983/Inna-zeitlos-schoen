import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat, Parisienne } from 'next/font/google'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400'],
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
  title: 'INNA – Zeitlos schön | Friseur & Blond-Expertin',
  description:
    'Airtouch, Balayage und typgerechte Farbe von zwei Friseurmeisterinnen. Farben, die herauswachsen dürfen.',
  openGraph: {
    title: 'INNA – Zeitlos schön',
    description: 'Typgerechte Schönheit. Gesundes Haar. Ergebnisse, die zu dir passen.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${montserrat.variable} ${parisienne.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
