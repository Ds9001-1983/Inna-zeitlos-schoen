import Image from 'next/image'
import { BildReveal, ZeilenReveal } from '@/components/reveal'

/**
 * Aufbau wie in Innas Seitenentwurf: Bild links, Text rechts, heller Grund.
 * Das Bild ist ein Platzhalter aus Innas Arbeiten - ein Portrait der beiden
 * gibt es noch nicht, und ein Stockfoto wäre eine Lüge über zwei reale
 * Personen. Sobald das Duo-Foto da ist, nur die Bilddatei tauschen.
 */
export function Team() {
  return (
    <section className="bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt raster items-center gap-y-12">
        <BildReveal className="col-span-6 lg:col-span-5">
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

          <div className="mt-6 space-y-5 text-tinte/80">
            <p className="text-xl leading-relaxed">
              Zwei Friseurmeisterinnen. Ein Anspruch. Wir lieben, was wir tun – und das sieht man.
            </p>
            <p className="leading-relaxed">
              Inna für Farben, Transformationen und Beratung. Nursah für klassische Schnitte,
              Farben und perfekte Ergebnisse.
            </p>
            <p className="font-display text-2xl leading-snug text-tinte">
              Gemeinsam für dich und dein schönstes Haar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
