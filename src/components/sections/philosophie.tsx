import { ZeilenReveal } from '@/components/reveal'

/**
 * Texte wörtlich aus Innas finaler Fassung vom 30.10.2026. Die vier Werte mit Symbolen
 * und „Das Gefühl“ sind damit ersetzt; die Linienreihe trägt jetzt Innas drei
 * „sagen wir“-Sätze.
 */
const ehrlich = [
  'Wenn etwas möglich ist, sagen wir es.',
  'Wenn etwas Zeit braucht, sagen wir das auch.',
  'Und wenn wir der Meinung sind, dass etwas deinem Haar nicht guttun würde, sagen wir eben auch das.',
]

export function Philosophie() {
  return (
    <section id="philosophie" className="scroll-mt-24 bg-sand py-[var(--spacing-sektion)]">
      <div className="inhalt">
        <p className="t-label">Unsere Philosophie</p>
        <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20">
          <ZeilenReveal as="h2" className="t-titel max-w-[16ch]">
            Wir machen nicht einfach Haare.
          </ZeilenReveal>

          <p className="self-end leading-relaxed text-tinte/80">
            Wir lieben schönes Haar. Aber wir müssen nicht um jeden Preis jeden Wunsch in einem
            einzigen Termin erfüllen.
          </p>
        </div>

        <ul className="mt-14 grid border-t border-greige/60 lg:grid-cols-3">
          {ehrlich.map((satz) => (
            <li
              key={satz}
              className="font-display border-b border-greige/60 py-8 text-2xl leading-snug font-light text-tinte lg:border-r lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:border-r-0"
            >
              {satz}
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20">
          <div className="max-w-[62ch] space-y-5 leading-relaxed text-tinte/80">
            <p>Das gehört für uns zu ehrlicher Beratung und gutem Friseurhandwerk dazu.</p>
            <p>
              Wir arbeiten sorgfältig, individuell und mit hochwertigen Produkten. Wir bilden uns
              weiter, hinterfragen Techniken und entscheiden nicht danach, was gerade den schönsten
              Namen hat, sondern danach, was für dein Haar funktioniert.
            </p>
          </div>
          <p className="t-aussage self-end text-tinte">
            Haarqualität geht vor einem schnellen Ergebnis.
          </p>
        </div>

        <div className="mt-16 border-t border-greige/60 pt-12">
          <p className="leading-relaxed text-tinte/80">
            Und vielleicht beschreibt genau das INNA – Zeitlos schön am besten:
          </p>
          <p className="t-aussage mt-6 max-w-[40ch] text-tinte">
            Wir möchten dich nicht verändern, damit du irgendeinem Ideal entsprichst.
          </p>
          <p className="t-aussage mt-6 max-w-[40ch] text-tinte italic">
            Wir möchten, dass du du bleibst.
            <br />
            Nur vielleicht ein kleines bisschen zeitlos schöner 😉
          </p>
        </div>
      </div>
    </section>
  )
}
