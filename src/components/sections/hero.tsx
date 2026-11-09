'use client'

import Link from 'next/link'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { HeroMedien } from '@/components/hero-medien'
import { salon } from '@/inhalte/salon'
import { useSprung } from '@/lib/sprung'

gsap.registerPlugin(useGSAP, SplitText)

export function Hero() {
  const container = useRef<HTMLElement>(null)
  const springe = useSprung()

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
          768–1535 px etwas dichter, weil der Textblock mit dem Termin-Knopf höher steht
          (Kontrast, Design-Plan „Revidiert 09.11.2026“).
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-kupfer-dunkel/85 from-5% via-kupfer-dunkel/45 via-45% to-kupfer/0 to-80% md:max-2xl:via-kupfer-dunkel/60 max-md:via-kupfer-dunkel/75 max-md:via-60% max-md:to-kupfer-dunkel/40 max-md:to-100%" />
        <div className="absolute inset-0 bg-gradient-to-r from-kupfer-dunkel/55 md:max-2xl:from-kupfer-dunkel/65 via-kupfer-dunkel/10 via-45% to-transparent" />

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
              className="t-signatur mt-3 text-[clamp(1.875rem,4vw,3rem)] text-sand"
            >
              So individuell wie du.
            </p>

            <p data-hero-zeile data-auf-bild className="t-lead mt-6 text-leinen">
              Haare sind persönlich. Deshalb geht es bei uns nicht darum, jedem Trend zu folgen.
              Sondern darum, herauszufinden, was wirklich zu dir, deinem Haar und deinem Alltag
              passt.
            </p>

            <div data-hero-zeile className="mt-9 flex flex-wrap items-center gap-8">
              {/* Termin-Knopf erst, wenn der Link der Onlinebuchung da ist (Dennis, 02.11.2026) */}
              {salon.buchung ? (
                <Link
                  href="/#kontakt"
                  onClick={(e) => springe(e, '#kontakt')}
                  className="inline-block bg-leinen px-9 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-tinte uppercase transition-colors hover:bg-kupfer-tief hover:text-leinen"
                >
                  Termin anfragen
                </Link>
              ) : null}
              <Link
                href="/#leistungen"
                onClick={(e) => springe(e, '#leistungen')}
                className="link text-sm text-leinen"
              >
                Leistungen ansehen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
