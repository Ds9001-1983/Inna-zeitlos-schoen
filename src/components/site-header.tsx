'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { Menu, X } from 'lucide-react'
import { Wortmarke } from '@/components/wortmarke'
import { navigation } from '@/inhalte/salon'

export function SiteHeader() {
  const [offen, setOffen] = useState(false)
  const lenis = useLenis()

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

  const springeZu = (ziel: string) => {
    setOffen(false)
    const el = document.querySelector(ziel)
    if (el instanceof HTMLElement) lenis?.scrollTo(el, { offset: -88 })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-greige/40 bg-leinen/92 backdrop-blur-sm">
      <div className="inhalt flex items-center justify-between py-5">
        <Link href="/" aria-label="INNA – Zeitlos schön, zur Startseite">
          <Wortmarke />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation.map((punkt) => (
              <li key={punkt.ziel}>
                <a
                  href={punkt.ziel}
                  onClick={(e) => {
                    e.preventDefault()
                    springeZu(punkt.ziel)
                  }}
                  className="text-sm text-tinte transition-colors hover:text-kupfer-tief"
                >
                  {punkt.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault()
              springeZu('#kontakt')
            }}
            className="hidden bg-kupfer-tief px-6 py-3 text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase transition-colors hover:bg-tinte sm:inline-block"
          >
            Termin anfragen
          </a>

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
                <a
                  href={punkt.ziel}
                  onClick={(e) => {
                    e.preventDefault()
                    springeZu(punkt.ziel)
                  }}
                  className="font-display block py-3 text-3xl font-light text-tinte"
                >
                  {punkt.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault()
              springeZu('#kontakt')
            }}
            className="mt-6 block bg-kupfer-tief px-6 py-4 text-center text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase"
          >
            Termin anfragen
          </a>
        </nav>
      </div>
    </header>
  )
}
