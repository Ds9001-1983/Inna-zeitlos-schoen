'use client'

import Image from 'next/image'
import { useState } from 'react'
import { vorherNachher } from '@/inhalte/salon'
import { BildReveal, ZeilenReveal } from '@/components/reveal'

/**
 * Innas Wunsch vom 30.10.2026: Vorher/Nachher zum Wischen. Der Regler war am 21.09.
 * gestrichen worden, weil die beiden Fotos verschieden gerahmt waren und die Schulterlinie
 * sprang. Die neuen Paare sind so zugeschnitten (scripts/fotos-aufbereiten.mjs), dass
 * Scheitel und Haarbreite übereinanderliegen.
 *
 * Bedienbar mit Maus, Finger und Tastatur – der Regler ist ein echtes
 * <input type="range">, das unsichtbar über dem Bildpaar liegt.
 */
export function VorherNachher() {
  const [aktiv, setAktiv] = useState(0)
  const [position, setPosition] = useState(50)
  const [fokus, setFokus] = useState(false)
  const paar = vorherNachher[aktiv]

  return (
    <section id="vorher-nachher" className="scroll-mt-24 bg-sand py-[var(--spacing-sektion)]">
      <div className="inhalt raster items-start gap-y-10 lg:grid-rows-[auto_1fr]">
        <div className="col-span-6 lg:col-span-5">
          <p className="t-label">Unsere Arbeiten</p>
          <ZeilenReveal as="h2" className="t-titel mt-4">
            Vorher &amp; Nachher
          </ZeilenReveal>
          <p className="t-lead mt-6 text-tinte/80">
            Zieh den Regler, um vorher und nachher zu vergleichen.
          </p>
        </div>

        <figure className="col-span-6 lg:col-start-7 lg:col-end-13 lg:row-span-2 lg:row-start-1">
          <BildReveal>
            <div className="relative aspect-7/10 w-full overflow-hidden bg-leinen select-none">
              <Image
                src={paar.vorher.bild}
                alt={paar.vorher.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40rem"
                className="object-cover"
                data-bild
              />

              <div
                className="absolute inset-0 transition-[clip-path] duration-150 ease-out"
                style={{ clipPath: `inset(0 0 0 ${position}%)` }}
              >
                <Image
                  src={paar.nachher.bild}
                  alt={paar.nachher.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40rem"
                  className="object-cover"
                />
              </div>

              <span className="pointer-events-none absolute bottom-5 left-5 bg-tinte/75 px-3 py-1 text-[0.65rem] font-medium tracking-[0.2em] text-leinen uppercase">
                vorher
              </span>
              <span className="pointer-events-none absolute right-5 bottom-5 bg-tinte/75 px-3 py-1 text-[0.65rem] font-medium tracking-[0.2em] text-leinen uppercase">
                nachher
              </span>

              {/* Trennkante und Griff folgen dem Reglerwert */}
              <div
                className="pointer-events-none absolute inset-y-0 w-px bg-leinen transition-[left] duration-150 ease-out"
                style={{ left: `${position}%` }}
              >
                <span
                  className={`absolute top-1/2 left-1/2 block h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-kupfer-tief bg-leinen ${
                    fokus ? 'ring-2 ring-kupfer-tief ring-offset-2' : ''
                  }`}
                />
              </div>

              <label className="absolute inset-0 cursor-ew-resize">
                <span className="sr-only">
                  Vergleich zwischen vorher und nachher – mit den Pfeiltasten verschiebbar
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
          </BildReveal>

          <figcaption className="t-label mt-4">{paar.kategorie}</figcaption>
        </figure>

        {/* Am Handy eine Reihe zum Wischen unter dem Regler, am Rechner ein Raster unter dem Text */}
        <ul className="col-span-6 -mx-1 flex gap-3 overflow-x-auto px-1 pb-2 lg:col-span-5 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0">
          {vorherNachher.map((eintrag, i) => (
            <li key={eintrag.nachher.bild} className="w-24 shrink-0 lg:w-auto">
              <button
                type="button"
                aria-pressed={aktiv === i}
                onClick={() => {
                  setAktiv(i)
                  setPosition(50)
                }}
                // relative: hält den sr-only-Text in der Wischreihe, sonst verbreitert er die Seite
                className="group relative block w-full text-left"
              >
                <span
                  className={`relative block aspect-7/10 w-full overflow-hidden outline-offset-2 transition-opacity ${
                    aktiv === i
                      ? 'outline outline-1 outline-kupfer-tief'
                      : 'opacity-70 group-hover:opacity-100'
                  }`}
                >
                  <Image src={eintrag.nachher.bild} alt="" fill sizes="8rem" className="object-cover" />
                </span>
                <span className="mt-2 block text-xs text-tinte/80">
                  {eintrag.kategorie}
                  <span className="sr-only">, Arbeit {i + 1} von {vorherNachher.length}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
