import Image from 'next/image'
import { BildReveal, ZeilenReveal } from '@/components/reveal'
import { Wortmarke } from '@/components/wortmarke'

/**
 * Aufbau wie in Innas Seitenentwurf: Bild links, Text rechts, heller Grund.
 * Texte wörtlich aus Innas finaler Fassung vom 30.10.2026. Das Bild steht am Rechner
 * fest, während der längere Text daneben läuft.
 *
 * Das Bild ist ein Platzhalter aus Innas Arbeiten - Portraits der beiden gibt es noch
 * nicht (Inna schickt sie), und ein Stockfoto wäre eine Lüge über zwei reale Personen.
 * Sobald das Foto da ist, nur die Bilddatei tauschen.
 */
export function Team() {
  return (
    <section className="bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt raster items-start gap-y-12">
        <BildReveal className="col-span-6 lg:sticky lg:top-28 lg:col-span-5">
          <div className="relative aspect-7/10 w-full">
            <Image
              src="/arbeiten/salonlicht.jpg"
              alt="Warm ausgeleuchtete Längen mit weichem Verlauf, fotografiert im Salon in Wiehl."
              fill
              sizes="(max-width: 1024px) 100vw, 26rem"
              className="object-cover"
              data-bild
            />
          </div>
        </BildReveal>

        <div className="col-span-6 lg:col-start-7 lg:col-end-13">
          <p className="t-label">Wir sind</p>
          <ZeilenReveal as="h2" className="t-titel mt-4">
            Inna &amp; Nursah
          </ZeilenReveal>

          <p className="t-aussage mt-6 text-tinte">
            Zwei Persönlichkeiten. Ein gemeinsamer Anspruch.
          </p>

          <div className="mt-6 space-y-5 leading-relaxed text-tinte/80">
            <p>Wir sind Inna und Nursah.</p>
            <p>
              Zwei Frauen, die das Friseurhandwerk schon ziemlich lange begleitet – und die trotzdem
              nicht aufgehört haben, Haare spannend zu finden.
            </p>
            <p>Wir müssen dabei nicht alles gleich machen. Im Gegenteil.</p>
          </div>

          <div className="mt-10 grid gap-8 border-t border-greige/60 pt-8 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-light text-tinte">Inna</h3>
              <p className="mt-3 leading-relaxed text-tinte/80">
                Inna liebt Blond, anspruchsvolle Farbveränderungen, Farbkorrekturen und Tressen.
                Besonders dann, wenn es nicht ganz einfach ist. Analysieren, ausprobieren,
                kombinieren und einen Weg finden, der nicht nur auf einem Inspirationsbild
                funktioniert, sondern auf dem echten Haar vor ihr – genau das ist ihr Ding.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-light text-tinte">Nursah</h3>
              <p className="mt-3 leading-relaxed text-tinte/80">
                Nursah bringt langjährige Erfahrung, sicheres Friseurhandwerk und ein feines Gespür
                für ihre Kundinnen mit. Schnitt, Farbe und ein natürlich schönes Gesamtbild gehören
                zu ihren Stärken. Ruhig, präzise und mit dem Blick dafür, was wirklich passt.
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-5 border-t border-greige/60 pt-8 leading-relaxed text-tinte/80">
            <p>Wir sind unterschiedlich – und genau das ist gut so.</p>
            <p>Was uns verbindet, ist unser Anspruch an unsere Arbeit.</p>
            <p>
              Wir möchten zuhören. Ehrlich beraten. Sauber arbeiten. Und wir möchten, dass du dich
              bei uns wohlfühlst, ohne dass wir dafür irgendeine Rolle spielen müssen.
            </p>
          </div>

          <p className="t-aussage mt-10 text-tinte">
            Kein Fließband. Kein Schema F. Kein unnötiges Drumherum.
          </p>
          <p className="mt-6 leading-relaxed text-tinte/80">
            Einfach gutes Friseurhandwerk, Persönlichkeit und ein Ergebnis, hinter dem wir beide
            stehen können.
          </p>

          <p className="font-display mt-10 text-2xl text-tinte">Das sind wir.</p>
          <Wortmarke groesse="gross" className="mt-4" />
        </div>
      </div>
    </section>
  )
}
