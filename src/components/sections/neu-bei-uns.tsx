import { ZeilenReveal } from '@/components/reveal'
import { WhatsappKnopf } from '@/components/whatsapp-knopf'

/**
 * Texte wörtlich aus Innas finaler Fassung vom 30.10.2026: „Neu bei uns?“ und
 * „Deine persönliche Beratung“. Die Schritte tragen nur Innas Sätze, keine eigenen Überschriften.
 */
const beratung = [
  {
    nummer: '01',
    kopf: 'Wir sprechen darüber, was du dir wünschst und was dir an deinem Haar gefällt – oder eben nicht mehr gefällt.',
  },
  {
    nummer: '02',
    kopf: 'Dann schauen wir hin.',
    text: 'Wie ist deine Haarstruktur? Wie ist die Ausgangsfarbe? Was wurde bisher gemacht? Wie belastbar ist dein Haar? Und passt dein Wunsch tatsächlich zu deiner Ausgangslage?',
  },
  {
    nummer: '03',
    kopf: 'Danach sprechen wir darüber, was möglich ist, welche Behandlung sinnvoll ist und ob wir dein Ziel in einem Termin erreichen können oder besser Schritt für Schritt arbeiten.',
    text: 'Und natürlich darfst du Fragen stellen.',
  },
]

export function NeuBeiUns() {
  return (
    <section id="neu-bei-uns" className="scroll-mt-24 bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt">
        <p className="t-label">Neu bei uns?</p>
        <ZeilenReveal as="h2" className="t-titel mt-4 max-w-[18ch]">
          Dann lernen wir uns erst einmal kennen.
        </ZeilenReveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
          <div>
            <div className="max-w-[62ch] space-y-5 leading-relaxed text-tinte/80">
              <p className="t-lead text-tinte">
                Bei Blond, größeren Farbveränderungen, Farbkorrekturen sowie Haarverdichtungen und
                Haarverlängerungen möchten wir dich und dein Haar persönlich kennenlernen, bevor wir
                einen Behandlungstermin planen.
              </p>
              <p>
                Deshalb beginnt dein Weg zu uns mit einem persönlichen Beratungstermin im Salon.
              </p>
              <p>
                Diesen kannst du per WhatsApp anfragen. Beratungstermine für Neukundinnen vergeben
                wir nach Verfügbarkeit.
              </p>
            </div>

            <WhatsappKnopf className="mt-8" />

            <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-tinte/80">
              Die Beratung selbst findet ganz bewusst nicht per WhatsApp, Telefon oder E-Mail statt.
            </p>
          </div>

          <div className="self-end">
            <p className="t-aussage text-tinte">
              Denn Haare muss man sehen. Anfassen. Die Struktur fühlen. Die Ausgangslage
              beurteilen.
            </p>
            <p className="mt-5 leading-relaxed text-tinte/80">
              Alles andere wäre für uns keine vernünftige Beratung.
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-greige/60 pt-12">
          <p className="t-label">Deine persönliche Beratung</p>
          <h3 className="t-aussage mt-4 text-tinte">Erst verstehen. Dann machen.</h3>

          <ol className="raster mt-10 gap-y-10">
            {beratung.map((schritt) => (
              <li key={schritt.nummer} className="col-span-6 lg:col-span-4">
                <span className="font-display block text-3xl leading-none font-light text-kupfer-tief">
                  {schritt.nummer}
                </span>
                <p className="font-display mt-4 max-w-[34ch] text-xl leading-snug text-tinte">
                  {schritt.kopf}
                </p>
                {schritt.text ? (
                  <p className="mt-3 max-w-[38ch] leading-relaxed text-tinte/80">{schritt.text}</p>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
            <div className="max-w-[62ch] space-y-5 leading-relaxed text-tinte/80">
              <p>Am Ende sollst du nicht mit irgendwelchen Fachbegriffen nach Hause gehen.</p>
              <p>Du sollst wissen:</p>
              <p className="t-aussage text-tinte">
                Was machen wir?
                <br />
                Warum machen wir es so?
                <br />
                Und wo wollen wir gemeinsam hin?
              </p>
            </div>
            <p className="font-display self-end text-2xl leading-snug text-tinte">
              Erst danach planen wir deinen Behandlungstermin.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
