import Image from 'next/image'
import { leistungen } from '@/inhalte/salon'
import { BildReveal, ZeilenReveal } from '@/components/reveal'

export function Leistungen() {
  return (
    <section id="leistungen" className="scroll-mt-24 bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt">
        <p className="t-label">Meine Leistungen</p>
        <div className="raster mt-4 items-end gap-y-8">
          <ZeilenReveal as="h2" className="t-titel col-span-6 lg:col-span-7">
            Haar, was zu dir passt.
          </ZeilenReveal>
          <p className="t-lead col-span-6 text-tinte/80 lg:col-start-9 lg:col-end-13">
            Schönheit beginnt mit dem Verständnis für den Menschen. Ich nehme mir Zeit, um dich
            und dein Haar wirklich zu verstehen – für Ergebnisse, die zu dir passen, heute und in
            Zukunft.
          </p>
        </div>

        {/* Korrektur 13.10.2026: nur die Bilder, kein Text darunter */}
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leistungen.map((leistung) => (
            <li key={leistung.titel}>
              <BildReveal>
                <div className="relative aspect-7/10 w-full overflow-hidden bg-sand">
                  {/* Enger Textur-Ausschnitt wie in Innas Entwurf */}
                  <Image
                    src={leistung.bild}
                    alt={leistung.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="scale-[1.7] object-cover"
                    style={{ objectPosition: leistung.ausschnitt }}
                    data-bild
                  />
                </div>
              </BildReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
