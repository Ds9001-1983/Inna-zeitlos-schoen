'use client'

import Image from 'next/image'
import { useState, useSyncExternalStore } from 'react'

type Verbindung = { saveData?: boolean; effectiveType?: string }

function abonnieren(benachrichtigen: () => void) {
  const abfrage = window.matchMedia('(prefers-reduced-motion: reduce)')
  abfrage.addEventListener('change', benachrichtigen)
  return () => abfrage.removeEventListener('change', benachrichtigen)
}

/** Darf das Video geladen werden? Nur ohne Bewegungs-Einschränkung und nicht im Sparmodus. */
function lesen() {
  const wenigerBewegung = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const verbindung = (navigator as Navigator & { connection?: Verbindung }).connection
  const sparsam = verbindung?.saveData === true || /(^|-)2g$/.test(verbindung?.effectiveType ?? '')
  return !wenigerBewegung && !sparsam
}

/**
 * Hero-Bild, das zu leben anfängt.
 *
 * Das Standbild wird immer ausgeliefert und bleibt das LCP-Element – dadurch
 * bleibt die Seite schnell. Das Video legt sich erst darüber, wenn es
 * tatsächlich abspielt, und blendet sich weich ein. Verweigert der Browser
 * Autoplay, bleibt einfach das Standbild stehen.
 */
export function HeroMedien() {
  const videoErlaubt = useSyncExternalStore(abonnieren, lesen, () => false)
  const [sichtbar, setSichtbar] = useState(false)

  return (
    <>
      <Image
        data-hero-foto
        src="/arbeiten/rueckansicht-hero.jpg"
        alt="Rückansicht einer Kundin: langes Haar, das vom dunklen Ansatz ohne harte Kante in helle, gewellte Spitzen übergeht."
        fill
        preload
        sizes="(max-width: 1024px) 100vw, 46vw"
        className="object-cover object-[50%_28%]"
      />

      {videoErlaubt ? (
        <video
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
          tabIndex={-1}
          onCanPlay={(e) => {
            e.currentTarget
              .play()
              .then(() => setSichtbar(true))
              .catch(() => undefined)
          }}
          className={`absolute inset-0 h-full w-full object-cover object-[50%_28%] transition-opacity duration-1000 ${
            sichtbar ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      ) : null}
    </>
  )
}
