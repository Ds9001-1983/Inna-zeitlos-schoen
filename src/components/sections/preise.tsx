import { preise } from '@/inhalte/salon'
import { ZeilenReveal } from '@/components/reveal'

// Solange keine Preise hinterlegt sind, bleibt die Spalte ganz weg.
// Achtmal „im Gespräch“ auf der Seite ist genau das „Preise auf Anfrage“,
// das der Design-Brief als Vertrauensbruch ausschließt.
const preiseVorhanden = preise.some((posten) => posten.preis !== null)

export function Preise() {
  return (
    <section id="preise" className="scroll-mt-24 bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <p className="t-label">Preise</p>
          <ZeilenReveal as="h2" className="t-titel mt-4 max-w-[16ch]">
            Was dein Termin kostet, hängt von deinem Haar ab.
          </ZeilenReveal>
          <p className="t-lead mt-5 text-tinte/80">
            Eine Aufhellung auf schulterlangem Naturhaar ist eine andere Arbeit als eine
            Farbkorrektur auf langem, vorbehandeltem Blond. Deshalb nenne ich dir den Preis, bevor
            wir anfangen – nicht danach.
          </p>
        </div>

        <dl className="divide-y divide-greige/60 border-t border-greige/60">
          {preise.map((posten) => (
            <div key={posten.leistung} className="flex items-baseline justify-between gap-6 py-5">
              <dt>
                <span className="font-display block text-xl font-light">{posten.leistung}</span>
                <span className="mt-1 block text-sm leading-relaxed text-tinte/80">
                  {posten.hinweis}
                </span>
              </dt>
              {preiseVorhanden ? (
                <dd className="shrink-0 text-right text-sm whitespace-nowrap text-tinte/80">
                  {posten.preis}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
