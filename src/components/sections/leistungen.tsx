import Image from "next/image";
import { leistungen } from "@/inhalte/salon";

export function Leistungen() {
  return (
    <section
      id="leistungen"
      className="scroll-mt-24 bg-sand py-[var(--spacing-sektion)]"
    >
      <div className="inhalt">
        <p className="t-label">Meine Leistungen</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
          <h2 className="t-titel max-w-[22ch]">
            Vier Wege zu Haar, das zu dir passt.
          </h2>
          <p className="t-lead self-end text-tinte/80">
            Schönheit beginnt mit dem Verständnis für den Menschen. Ich nehme
            mir Zeit, um dich und dein Haar wirklich zu verstehen – für
            Ergebnisse, die zu dir passen, heute und in Zukunft.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leistungen.map((leistung) => (
            <li key={leistung.titel}>
              <article className="relative aspect-3/4 overflow-hidden">
                <Image
                  src={leistung.bild}
                  alt={leistung.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                {/* Verlauf trägt hier eine Aufgabe: ohne ihn ist die Schrift auf hellem Haar nicht lesbar */}
                <div className="absolute inset-0 bg-gradient-to-t from-tinte/95 from-35% via-tinte/70 via-60% to-tinte/10" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-leinen">
                  <h3 className="font-display text-[1.6rem] leading-tight font-light">
                    {leistung.titel}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-leinen/90">
                    {leistung.beschreibung}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
