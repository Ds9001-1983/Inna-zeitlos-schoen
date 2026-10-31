import Image from 'next/image'
import { BildReveal, ZeilenReveal } from '@/components/reveal'
import { Wortmarke } from '@/components/wortmarke'

// Reihenfolge auf Innas Wunsch wegen der Bildausschnitte (31.10.2026)
const portraits = [
  {
    name: 'Nursah',
    src: '/team/nursah.jpg',
    alt: 'Nursah mit dunklen Locken und Brille lächelt im Salon vor einem Regal mit Pflegeprodukten.',
  },
  {
    name: 'Inna',
    src: '/team/inna-frontal.jpg',
    alt: 'Inna mit langen, rotbraunen Wellen und weißem Rollkragen, sie lächelt leicht.',
  },
]

/**
 * Aufbau wie in Innas Seitenentwurf: Bilder links, Text rechts, heller Grund.
 * Texte wörtlich aus Innas finaler Fassung vom 30.10.2026. Die Portraits stehen am Rechner
 * fest, während der längere Text daneben läuft.
 */
export function Team() {
  return (
    <section className="bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt raster items-start gap-y-12">
        <div className="col-span-6 grid grid-cols-2 gap-[clamp(1rem,2vw,1.75rem)] lg:sticky lg:top-28">
          {portraits.map((p) => (
            <figure key={p.name}>
              <BildReveal>
                <div className="relative aspect-7/10 w-full">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20rem"
                    quality={90}
                    className="object-cover"
                    data-bild
                  />
                </div>
              </BildReveal>
              <figcaption className="t-label mt-3">{p.name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="col-span-6 lg:col-start-8 lg:col-end-13">
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

          <div className="mt-10 grid gap-8 border-t border-greige/60 pt-8 sm:grid-cols-2 lg:grid-cols-1">
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
