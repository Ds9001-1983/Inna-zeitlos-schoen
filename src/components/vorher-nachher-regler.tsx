'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { VorherNachher } from '@/inhalte/salon'

/**
 * Innas Wunsch vom 30.10.2026: Vorher/Nachher zum Wischen, seit 31.10. in der jeweiligen Leistung.
 * Der Regler war am 21.09. gestrichen worden, weil die beiden Fotos verschieden gerahmt waren und
 * die Schulterlinie sprang. Die neuen Paare sind so zugeschnitten (scripts/fotos-aufbereiten.mjs),
 * dass Scheitel und Haarbreite übereinanderliegen.
 *
 * Bedienbar mit Maus, Finger und Tastatur – der Regler ist ein echtes
 * <input type="range">, das unsichtbar über dem Bildpaar liegt. Die Bilder laden erst, wenn die
 * Leistung aufgeklappt wird.
 */
export function VorherNachherRegler({ paar, titel }: { paar: VorherNachher; titel: string }) {
  const [position, setPosition] = useState(50)
  const [fokus, setFokus] = useState(false)

  return (
    <figure>
      <div className="relative aspect-7/10 w-full overflow-hidden bg-sand select-none">
        <Image
          src={paar.vorher.bild}
          alt={paar.vorher.alt}
          fill
          sizes="(max-width: 1024px) 85vw, 20rem"
          className="object-cover"
        />

        <div
          className="absolute inset-0 transition-[clip-path] duration-150 ease-out"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <Image
            src={paar.nachher.bild}
            alt={paar.nachher.alt}
            fill
            sizes="(max-width: 1024px) 85vw, 20rem"
            className="object-cover"
          />
        </div>

        <span className="pointer-events-none absolute bottom-3 left-3 bg-tinte/75 px-2 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-leinen uppercase">
          vorher
        </span>
        <span className="pointer-events-none absolute right-3 bottom-3 bg-tinte/75 px-2 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-leinen uppercase">
          nachher
        </span>

        {/* Trennkante und Griff folgen dem Reglerwert */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-leinen transition-[left] duration-150 ease-out"
          style={{ left: `${position}%` }}
        >
          <span
            className={`absolute top-1/2 left-1/2 block h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-kupfer-tief bg-leinen ${
              fokus ? 'ring-2 ring-kupfer-tief ring-offset-2' : ''
            }`}
          />
        </div>

        <label className="absolute inset-0 cursor-ew-resize">
          <span className="sr-only">
            {titel}: Vergleich zwischen vorher und nachher – mit den Pfeiltasten verschiebbar
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            onFocus={() => setFokus(true)}
            onBlur={() => setFokus(false)}
            className="h-full w-full cursor-ew-resize opacity-0"
            aria-valuetext={`${position} Prozent nachher sichtbar`}
          />
        </label>
      </div>
    </figure>
  )
}
