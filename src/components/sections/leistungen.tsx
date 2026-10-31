import { Plus } from 'lucide-react'
import { leistungen, salon } from '@/inhalte/salon'
import { ZeilenReveal } from '@/components/reveal'
import { VorherNachherRegler } from '@/components/vorher-nachher-regler'

/**
 * Innas Texte (30.10.2026) als Aufklappliste: Titel und erster Satz stehen offen, der Rest
 * auf Wunsch. So bleibt der Abschnitt ruhig, obwohl die Texte länger geworden sind. Natives
 * <details> – ohne JavaScript bedienbar, und Suchmaschinen lesen den zugeklappten Text mit.
 * Aufgeklappt folgt die Vorher/Nachher-Arbeit zur Leistung. Die Bildreihe darüber hat Inna am
 * 31.10.2026 gestrichen (kompakter, nicht zu viele Haarbilder – wer mehr sehen will, geht auf
 * Instagram, der Link erscheint, sobald er in salon.instagram steht).
 */
export function Leistungen() {
  return (
    <section id="leistungen" className="scroll-mt-24 bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt">
        <p className="t-label">Unsere Leistungen</p>
        <ZeilenReveal as="h2" className="t-titel mt-4">
          Haar, das zu dir passt.
        </ZeilenReveal>

        <ol className="mt-14 border-t border-greige/60">
          {leistungen.map((leistung, i) => (
            <li key={leistung.titel} className="border-b border-greige/60">
              <details className="group">
                <summary className="raster cursor-pointer list-none items-baseline gap-y-3 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kupfer-tief [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden
                    className="font-display col-span-1 text-xl leading-none font-light text-kupfer-tief"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display col-span-4 text-3xl leading-tight font-light text-tinte lg:col-span-3">
                    {leistung.titel}
                  </span>
                  <Plus
                    size={22}
                    strokeWidth={1}
                    aria-hidden
                    className="col-start-6 mt-1 self-start justify-self-end text-kupfer-tief transition-transform duration-300 group-open:rotate-45 lg:col-start-12 lg:row-start-1"
                  />
                  <span className="font-display col-span-5 col-start-2 text-xl leading-snug text-tinte/80 lg:col-span-7 lg:col-start-5 lg:row-start-1">
                    {leistung.einstieg}
                  </span>
                </summary>

                <div className="raster items-start gap-y-8 pb-10">
                  <div className="col-span-5 col-start-2 max-w-[62ch] space-y-4 leading-relaxed text-tinte/80 lg:col-span-4 lg:col-start-5">
                    {leistung.absaetze.map((absatz) => (
                      <p key={absatz}>{absatz}</p>
                    ))}
                    {leistung.merksatz ? (
                      <p className="t-aussage pt-2 text-tinte">
                        {leistung.merksatz.map((zeile) => (
                          <span key={zeile} className="block">
                            {zeile}{' '}
                          </span>
                        ))}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-span-5 col-start-2 lg:col-span-3 lg:col-start-9">
                    <VorherNachherRegler paar={leistung.vorherNachher} titel={leistung.titel} />
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ol>

        {salon.instagram && salon.instagramName ? (
          <p className="mt-8 leading-relaxed text-tinte/80">
            Mehr Arbeiten auf Instagram:{' '}
            <a
              href={salon.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-kupfer-tief underline underline-offset-4"
            >
              {salon.instagramName}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  )
}
