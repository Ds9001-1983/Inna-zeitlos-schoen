'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { arbeiten } from '@/inhalte/salon'
import { ZeilenReveal } from '@/components/reveal'

/**
 * Die Werkgalerie – der Kern einer Coloristen-Seite.
 * Waagerechtes Schnapp-Scrollen ohne Bibliothek: nativ auf dem Handy,
 * mit Knöpfen und Tastatur am Rechner. Kein Pinning, damit das Scrollen
 * der Seite nicht entführt wird.
 */
export function Arbeiten() {
  const spur = useRef<HTMLUListElement>(null)
  const [amAnfang, setAmAnfang] = useState(true)
  const [amEnde, setAmEnde] = useState(false)

  const randPruefen = useCallback(() => {
    const el = spur.current
    if (!el) return
    setAmAnfang(el.scrollLeft < 8)
    setAmEnde(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  const schieben = (richtung: 1 | -1) => {
    const el = spur.current
    if (!el) return
    const karte = el.firstElementChild as HTMLElement | null
    const weite = karte ? karte.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: weite * richtung, behavior: 'smooth' })
  }

  return (
    <section id="arbeiten" className="scroll-mt-24 bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="t-label">Die Arbeiten</p>
            <ZeilenReveal as="h2" className="t-titel mt-4 max-w-[14ch]">
              Acht Termine, acht Verläufe.
            </ZeilenReveal>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => schieben(-1)}
              disabled={amAnfang}
              className="flex h-12 w-12 items-center justify-center border border-greige text-tinte transition-colors hover:border-kupfer-tief hover:text-kupfer-tief disabled:opacity-35"
            >
              <span className="sr-only">Vorherige Arbeiten zeigen</span>
              <ArrowLeft size={18} strokeWidth={1.4} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => schieben(1)}
              disabled={amEnde}
              className="flex h-12 w-12 items-center justify-center border border-greige text-tinte transition-colors hover:border-kupfer-tief hover:text-kupfer-tief disabled:opacity-35"
            >
              <span className="sr-only">Weitere Arbeiten zeigen</span>
              <ArrowRight size={18} strokeWidth={1.4} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={spur}
        onScroll={randPruefen}
        tabIndex={0}
        aria-label="Arbeiten von Inna, waagerecht scrollbar"
        className="mt-12 grid snap-x snap-mandatory auto-cols-[78%] grid-flow-col gap-6 overflow-x-auto overscroll-x-contain scroll-smooth scroll-pl-[clamp(1.25rem,5vw,4.5rem)] px-[clamp(1.25rem,5vw,4.5rem)] pb-4 [scrollbar-width:none] sm:auto-cols-[46%] lg:auto-cols-[30%] xl:auto-cols-[24%] [&::-webkit-scrollbar]:hidden"
      >
        {arbeiten.map((arbeit) => (
          <li key={arbeit.bild} className="snap-start">
            <figure>
              <div className="relative aspect-7/10 w-full overflow-hidden bg-sand">
                <Image
                  src={arbeit.bild}
                  alt={arbeit.alt}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 30vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-5">
                <h3 className="font-display text-xl leading-tight font-light">{arbeit.titel}</h3>
                <p className="t-label mt-2">
                  {arbeit.technik} · {arbeit.datum}
                </p>
                <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-tinte/80">
                  {arbeit.notiz}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
