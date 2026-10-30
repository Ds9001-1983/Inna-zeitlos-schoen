import Image from 'next/image'
import { BildReveal, ZeilenReveal } from '@/components/reveal'

/**
 * Texte wörtlich aus Innas finaler Fassung vom 30.10.2026 (Wir-Form, Inna und Nursah).
 * Das Foto ersetzt die Strähne, auf der das Haar aus Innas Sicht kaputt aussah (13.10.2026).
 */
export function UeberUns() {
  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-sand py-[var(--spacing-sektion)]">
      <div className="inhalt raster items-start gap-y-12">
        <BildReveal className="col-span-6 lg:sticky lg:top-28 lg:col-span-5">
          <div className="relative aspect-7/10 w-full">
            <Image
              src="/arbeiten/ueber-uns.jpg"
              alt="Gestuftes, glänzendes Blond mit hellen Partien, seitlich fotografiert im Salon."
              fill
              sizes="(max-width: 1024px) 100vw, 34rem"
              className="object-cover object-[50%_40%]"
              data-bild
            />
          </div>
        </BildReveal>

        <div className="col-span-6 lg:col-start-7 lg:col-end-13">
          <p className="t-label">Über uns</p>
          <ZeilenReveal as="h2" className="t-titel mt-4">
            Schön, dass du da bist.
          </ZeilenReveal>

          <div className="mt-8 space-y-5 text-tinte/80">
            <p className="t-lead text-tinte">
              INNA – Zeitlos schön ist ein kleiner Salon mit einem großen Anspruch.
            </p>
            <p className="leading-relaxed">
              Wir arbeiten persönlich, individuell und ohne Fließbandgefühl. Dabei bringt jede von
              uns ihre eigenen Stärken und Erfahrungen mit – und genau das macht uns als Team aus.
            </p>
            <p className="leading-relaxed">
              Wir hören zu, schauen genau hin und nehmen uns Zeit. Denn bevor wir darüber sprechen,
              wie wir etwas machen, möchten wir verstehen, wo du eigentlich hinmöchtest.
            </p>
            <p className="leading-relaxed">
              Nicht jede Technik passt zu jedem Haar. Nicht jeder Trend passt zu jeder Frau. Und
              manchmal ist weniger tatsächlich mehr.
            </p>
            <p className="leading-relaxed">
              Natürlichkeit, Haarqualität und ein Ergebnis, das langfristig zu dir passt, stehen
              für uns immer im Mittelpunkt.
            </p>
          </div>

          <p className="t-aussage mt-10 text-tinte">
            Wir machen aus dir niemand anderen.
            <br />
            Wir holen nur das Schönste aus dir heraus.
          </p>

          <p className="mt-8 leading-relaxed text-tinte/80">
            Denn am Ende zählt für uns nicht die Technik.
            <br />
            <span className="font-display text-2xl text-tinte">Sondern das Ergebnis.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
