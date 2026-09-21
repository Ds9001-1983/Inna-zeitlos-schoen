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
            Vier Wege zu Haar, das zu dir passt.
          </ZeilenReveal>
          <p className="t-lead col-span-6 text-tinte/80 lg:col-start-9 lg:col-end-13">
            Schönheit beginnt mit dem Verständnis für den Menschen. Ich nehme mir Zeit, um dich
            und dein Haar wirklich zu verstehen – für Ergebnisse, die zu dir passen, heute und in
            Zukunft.
          </p>
        </div>

        <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {leistungen.map((leistung) => (
            <li key={leistung.titel}>
              <article>
                {/* Text steht unter dem Bild, nicht darin: kein Verlauf, der das Haar zudeckt */}
                <BildReveal>
                  <div className="relative aspect-7/10 w-full overflow-hidden bg-sand">
                    {/* Enger Textur-Ausschnitt wie in Innas Entwurf – das ganze Foto zeigt die Galerie */}
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

                <h3 className="font-display mt-5 text-2xl leading-tight font-light">
                  {leistung.titel}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-tinte/80">
                  {leistung.beschreibung}
                </p>

                {leistung.dauer || leistung.haltbarkeit ? (
                  <dl className="mt-4 space-y-1 text-xs text-tinte/80">
                    {leistung.dauer ? (
                      <div className="flex gap-3">
                        <dt className="w-20 text-tinte/80">Dauer</dt>
                        <dd>{leistung.dauer}</dd>
                      </div>
                    ) : null}
                    {leistung.haltbarkeit ? (
                      <div className="flex gap-3">
                        <dt className="w-20 text-tinte/80">Haltbarkeit</dt>
                        <dd>{leistung.haltbarkeit}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
