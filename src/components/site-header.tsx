import Link from 'next/link'
import { Wortmarke } from '@/components/wortmarke'

/**
 * Steht im Fluss auf Leinen, nicht über dem Bild: Über einem Haarfoto ist die
 * dunkle Wortmarke nicht lesbar (Screenshot-Kritik Phase 3).
 * Der tel:-Link kommt zurück, sobald Innas Nummer feststeht – bis dahin kein
 * Link auf eine Nummer, die es nicht gibt.
 */
export function SiteHeader() {
  return (
    <header className="relative z-40 bg-leinen">
      <div className="inhalt flex items-center justify-between py-6 lg:py-8">
        <Link href="/" aria-label="INNA – Zeitlos schön, zur Startseite">
          <Wortmarke />
        </Link>

        <a
          href="#termin"
          className="bg-kupfer-tief px-6 py-3 text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase transition-colors hover:bg-tinte"
        >
          Termin buchen
        </a>
      </div>
    </header>
  )
}
