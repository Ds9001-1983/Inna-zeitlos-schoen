'use client'

import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Auf dem Handy liegt der Termin-Knopf im Hero unter der Bildschirmkante.
 * Diese Leiste erscheint, sobald der Hero durchgescrollt ist, und
 * verschwindet wieder, wenn der Kontakt-Abschnitt sichtbar wird.
 * Auf dem Rechner steht der Knopf durchgehend in der Kopfzeile – dort
 * wird die Leiste nicht gebraucht.
 */
export function TerminLeiste() {
  const [sichtbar, setSichtbar] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const kontakt = document.querySelector('#kontakt')
    const pruefen = () => {
      const durchHero = window.scrollY > window.innerHeight * 0.9
      const kontaktSichtbar = kontakt
        ? kontakt.getBoundingClientRect().top < window.innerHeight * 0.9
        : false
      setSichtbar(durchHero && !kontaktSichtbar)
    }
    pruefen()
    window.addEventListener('scroll', pruefen, { passive: true })
    window.addEventListener('resize', pruefen)
    return () => {
      window.removeEventListener('scroll', pruefen)
      window.removeEventListener('resize', pruefen)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-greige/40 bg-leinen/95 p-3 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        sichtbar ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!sichtbar}
    >
      <a
        href="#kontakt"
        tabIndex={sichtbar ? undefined : -1}
        onClick={(e) => {
          e.preventDefault()
          const ziel = document.querySelector('#kontakt')
          if (ziel instanceof HTMLElement) lenis?.scrollTo(ziel, { offset: -88 })
        }}
        className="block bg-kupfer-tief px-6 py-4 text-center text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase"
      >
        Termin anfragen
      </a>
    </div>
  )
}
