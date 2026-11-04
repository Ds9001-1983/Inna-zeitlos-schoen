'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Wortmarke } from '@/components/wortmarke'
import { navigation, salon } from '@/inhalte/salon'
import { useSprung } from '@/lib/sprung'

export function SiteHeader() {
  const [offen, setOffen] = useState(false)

  // Menü schließt mit Escape und sperrt den Seitenscroll, solange es offen ist
  useEffect(() => {
    if (!offen) return
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOffen(false)
    }
    document.addEventListener('keydown', beiTaste)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', beiTaste)
      document.body.style.overflow = ''
    }
  }, [offen])

  const springe = useSprung(() => setOffen(false))

  return (
    <header className="sticky top-0 z-50 border-b border-greige/40 bg-leinen/92 backdrop-blur-sm">
      <div className="inhalt flex items-center justify-between py-5">
        {/* Logo und rechte Seite gleich breit: Das Menü bleibt mittig, auch ohne Termin-Knopf */}
        <div className="flex-1">
          <Link
            href="/"
            aria-label="INNA – Zeitlos schön, zur Startseite"
            className="inline-block"
          >
            <Wortmarke />
          </Link>
        </div>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation.map((punkt) => (
              <li key={punkt.ziel}>
                <Link
                  href={`/${punkt.ziel}`}
                  onClick={(e) => springe(e, punkt.ziel)}
                  className="text-sm text-tinte transition-colors hover:text-kupfer-tief"
                >
                  {punkt.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mindesthöhe des Knopfs, damit die Kopfzeile ohne ihn nicht schrumpft (Hero rechnet mit ihr) */}
        <div className="flex flex-1 items-center justify-end gap-3 sm:min-h-[2.625rem]">
          {/* Termin-Knöpfe erst, wenn der Link der Onlinebuchung da ist (Dennis, 02.11.2026) */}
          {salon.buchung ? (
            <Link
              href="/#kontakt"
              onClick={(e) => springe(e, '#kontakt')}
              className="hidden bg-kupfer-tief px-6 py-3 text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase transition-colors hover:bg-tinte sm:inline-block"
            >
              Termin anfragen
            </Link>
          ) : null}

          <button
            type="button"
            onClick={() => setOffen((o) => !o)}
            aria-expanded={offen}
            aria-controls="mobilmenue"
            className="p-2 lg:hidden"
          >
            <span className="sr-only">{offen ? 'Menü schließen' : 'Menü öffnen'}</span>
            {offen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobilmenue"
        hidden={!offen}
        className="border-t border-greige/40 bg-leinen lg:hidden"
      >
        <nav aria-label="Navigation im Menü" className="inhalt py-8">
          <ul className="space-y-1">
            {navigation.map((punkt) => (
              <li key={punkt.ziel}>
                <Link
                  href={`/${punkt.ziel}`}
                  onClick={(e) => springe(e, punkt.ziel)}
                  className="font-display block py-3 text-3xl font-light text-tinte"
                >
                  {punkt.name}
                </Link>
              </li>
            ))}
          </ul>
          {salon.buchung ? (
            <Link
              href="/#kontakt"
              onClick={(e) => springe(e, '#kontakt')}
              className="mt-6 block bg-kupfer-tief px-6 py-4 text-center text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase"
            >
              Termin anfragen
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  )
}
