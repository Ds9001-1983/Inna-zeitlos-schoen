'use client'

import type { MouseEvent } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Sprung zu einem Abschnitt der Startseite, für alle Links mit href="/#ziel".
 *
 * - Auf der Startseite scrollt Lenis weich hin. Den Abstand unter der Kopfzeile liefert
 *   `scroll-mt-24` am Abschnitt, Lenis rechnet scroll-margin selbst ein. Ein zusätzlicher
 *   Offset hätte ihn doppelt abgezogen (bis 04.11.2026: rund 100 px zu tief).
 * - `vorher` schließt z. B. das Handy-Menü. Gemessen wird erst im nächsten Frame, sonst zählt
 *   die Höhe des offenen Menüs mit und der Sprung schießt übers Ziel hinaus.
 * - Auf Impressum und Datenschutz gibt es den Abschnitt nicht: Dann wechselt <Link> auf die
 *   Startseite, und SmoothScroll übernimmt dort den Sprung zum Abschnitt.
 */
export function useSprung(vorher?: () => void) {
  const lenis = useLenis()

  return (e: MouseEvent<HTMLAnchorElement>, ziel: string) => {
    const el = document.querySelector(ziel)
    if (!(el instanceof HTMLElement) || !lenis) {
      vorher?.()
      return
    }
    e.preventDefault()
    vorher?.()
    requestAnimationFrame(() => lenis.scrollTo(el))
  }
}
