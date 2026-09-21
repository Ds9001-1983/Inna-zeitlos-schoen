'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { useLenis } from 'lenis/react'
import { HeroMedien } from '@/components/hero-medien'

gsap.registerPlugin(useGSAP, SplitText)

export function Hero() {
  const container = useRef<HTMLElement>(null)
  const lenis = useLenis()

  const springeZu = (ziel: string) => {
    const el = document.querySelector(ziel)
    if (el instanceof HTMLElement) lenis?.scrollTo(el, { offset: -88 })
  }

  // Die eine orchestrierte Sequenz der Seite: Bild fährt aus der Maske auf,
  // die Headline steigt zeilenweise ein, der Rest folgt versetzt.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const titel = SplitText.create('[data-hero-titel]', {
          type: 'lines',
          mask: 'lines',
          aria: 'auto',
        })

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('[data-hero-bild]', { clipPath: 'inset(0 0 100% 0)', duration: 1.2 })
          .from('[data-hero-foto]', { scale: 1.14, duration: 2 }, 0)
          .from(titel.lines, { yPercent: 115, duration: 1.1, stagger: 0.1 }, 0.35)
          .from('[data-hero-zeile]', { y: 26, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.7)

        return () => {
          tl.kill()
          titel.revert()
        }
      })
      return () => mm.revert()
    },
    { scope: container },
  )

  return (
    <section ref={container} className="relative bg-tinte">
      <div
        data-hero-bild
        className="relative h-[calc(100svh-5.25rem)] min-h-[560px] w-full overflow-hidden"
      >
        <HeroMedien />

        {/* Verlauf mit Aufgabe: Ohne ihn ist die Schrift auf hellem Haar nicht lesbar */}
        {/*
          Zwei Verläufe mit Aufgabe, nicht als Schmuck: von unten für den Textblock,
          von links für die Schriftseite. Rechts bleibt das Haar hell und offen.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-tinte/92 from-10% via-tinte/55 via-50% to-tinte/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-tinte/75 via-tinte/25 via-45% to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="inhalt pb-[clamp(3rem,7vh,5.5rem)]">
            <h1 data-hero-titel data-auf-bild className="t-display text-leinen">
              Zeitlos
              <br />
              schön.
            </h1>

            <p
              data-hero-zeile
              data-auf-bild
              className="t-signatur mt-3 text-[clamp(1.875rem,4vw,3rem)] text-kupfer-hell"
            >
              So natürlich wie du.
            </p>

            <p data-hero-zeile data-auf-bild className="t-lead mt-6 text-leinen/90">
              Ich nehme mir Zeit für dein Haar, deine Wünsche und deine Persönlichkeit – damit du
              den Salon nicht nur schöner, sondern auch mit einem guten Gefühl verlässt.
            </p>

            <div data-hero-zeile className="mt-9 flex flex-wrap items-center gap-8">
              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault()
                  springeZu('#kontakt')
                }}
                className="inline-block bg-leinen px-9 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-tinte uppercase transition-colors hover:bg-kupfer-tief hover:text-leinen"
              >
                Termin anfragen
              </a>
              <a
                href="#arbeiten"
                onClick={(e) => {
                  e.preventDefault()
                  springeZu('#arbeiten')
                }}
                className="link text-sm text-leinen"
              >
                Arbeiten ansehen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
