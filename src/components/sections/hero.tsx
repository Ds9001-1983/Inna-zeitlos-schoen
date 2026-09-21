'use client'

import Image from 'next/image'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { useLenis } from 'lenis/react'

gsap.registerPlugin(useGSAP, SplitText)

export function Hero() {
  const container = useRef<HTMLElement>(null)
  const lenis = useLenis()

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
        tl.from('[data-hero-bild]', { clipPath: 'inset(0 0 100% 0)', duration: 1.1 })
          .from('[data-hero-foto]', { scale: 1.18, duration: 1.8 }, 0)
          .from(titel.lines, { yPercent: 115, duration: 1.1, stagger: 0.1 }, 0.25)
          .from('[data-hero-zeile]', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.6)

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
    <section ref={container} className="relative z-10 bg-leinen lg:min-h-[calc(100svh-5.5rem)]">
      <div
        data-hero-bild
        className="relative h-[52vh] min-h-[340px] w-full overflow-hidden lg:absolute lg:top-0 lg:right-0 lg:bottom-[-7rem] lg:h-auto lg:w-[46%] lg:min-h-0"
      >
        <Image
          data-hero-foto
          src="/arbeiten/rueckansicht-hero.jpg"
          alt="Rückansicht einer Kundin: langes Haar, das vom dunklen Ansatz ohne harte Kante in helle, gewellte Spitzen übergeht."
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="object-cover object-[50%_28%]"
        />
      </div>

      <div className="inhalt relative">
        <div className="py-14 lg:flex lg:min-h-[calc(100svh-5.5rem)] lg:w-[52%] lg:flex-col lg:justify-center lg:py-24">
          <h1 data-hero-titel className="t-display">
            Zeitlos
            <br />
            schön.
          </h1>

          <p
            data-hero-zeile
            className="t-signatur mt-4 text-[clamp(1.875rem,4vw,3rem)] text-kupfer-tief"
          >
            So natürlich wie du.
          </p>

          <p data-hero-zeile className="t-lead mt-8 text-tinte/80">
            Ich nehme mir Zeit für dein Haar, deine Wünsche und deine Persönlichkeit – damit du
            den Salon nicht nur schöner, sondern auch mit einem guten Gefühl verlässt.
          </p>

          <div data-hero-zeile className="mt-10 flex flex-wrap items-center gap-8">
            <a
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault()
                const ziel = document.querySelector('#kontakt')
                if (ziel instanceof HTMLElement) lenis?.scrollTo(ziel, { offset: -88 })
              }}
              className="inline-block bg-kupfer-tief px-9 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase transition-colors hover:bg-tinte"
            >
              Termin anfragen
            </a>
            <a
              href="#arbeiten"
              onClick={(e) => {
                e.preventDefault()
                const ziel = document.querySelector('#arbeiten')
                if (ziel instanceof HTMLElement) lenis?.scrollTo(ziel, { offset: -88 })
              }}
              className="link text-sm text-tinte"
            >
              Arbeiten ansehen
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
