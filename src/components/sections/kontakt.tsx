import Image from 'next/image'
import { salon } from '@/inhalte/salon'
import { BildReveal, ZeilenReveal } from '@/components/reveal'
import { WhatsappKnopf } from '@/components/whatsapp-knopf'

/**
 * Ziel aller „Termin anfragen“-Knöpfe. Zwei Wege (Inna, 30.10.2026): Neukundinnen fragen
 * per WhatsApp einen Beratungstermin an, Stammkundinnen buchen online. Die Beratung
 * läuft bewusst nicht per Telefon oder E-Mail – deshalb stehen hier keine Knöpfe dafür,
 * Nummer und Adresse stehen in der Fußzeile.
 * Der Buchungsknopf erscheint, sobald `salon.buchung` in src/inhalte/salon.ts steht – ebenso
 * alle „Termin anfragen“-Knöpfe in Kopfzeile, Hero und Handy-Leiste (Dennis, 02.11.2026).
 *
 * Das Salonfoto steht wie der Abschluss in Innas Seitenentwurf links neben dem Text (seit 02.11.2026).
 * Am Handy kommt es nach dem Text, damit die Termin-Knöpfe beim Sprung hierher oben stehen.
 */
export function Kontakt() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-sand py-[var(--spacing-sektion)]">
      <div className="inhalt raster items-start gap-y-12">
        <figure className="order-last col-span-6 lg:order-none lg:col-span-5">
          <BildReveal>
            <div className="relative aspect-7/10 w-full">
              <Image
                src="/salon/salon.jpg"
                alt="Blick in den Salon: Blumen auf dem Steintresen, dahinter cognacfarbene Sessel, der Waschplatz und warmes Licht."
                fill
                sizes="(max-width: 1024px) 100vw, 34rem"
                quality={90}
                className="object-cover"
                data-bild
              />
            </div>
          </BildReveal>
        </figure>

        <div className="col-span-6 lg:col-start-7 lg:col-end-13">
          <ZeilenReveal as="h2" className="t-titel">
            Termine
          </ZeilenReveal>

          <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-1">
            <div>
              <h3 className="font-display text-3xl leading-tight font-light text-tinte">
                Neu bei uns?
              </h3>
              <p className="mt-4 leading-relaxed text-tinte/80">
                Dein Weg zu uns beginnt mit einem persönlichen Beratungstermin im Salon.
                Beratungstermine für Neukundinnen vergeben wir nach Verfügbarkeit.
              </p>
              <WhatsappKnopf className="mt-6" />
            </div>

            <div>
              <h3 className="font-display text-3xl leading-tight font-light text-tinte">
                Schon bei uns?
              </h3>
              <p className="mt-4 leading-relaxed text-tinte/80">
                Unsere Stammkundinnen können ihre gewohnten Termine bequem über unsere
                Onlinebuchung vereinbaren.
              </p>
              {salon.buchung ? (
                <a
                  href={salon.buchung}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block border border-kupfer-tief px-8 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-kupfer-tief uppercase transition-colors hover:bg-kupfer-tief hover:text-leinen"
                >
                  Online Termin buchen
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-12 grid gap-10 border-t border-greige/60 pt-10 sm:grid-cols-2">
            <div>
              <p className="t-label">Salon</p>
              <address className="mt-4 text-base leading-relaxed not-italic">
                <span className="font-display text-2xl leading-tight">
                  {salon.strasse}
                  <br />
                  {salon.plz} {salon.ort}
                </span>
              </address>
              <a
                href={salon.maps}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-kupfer-dunkel underline underline-offset-4"
              >
                Auf Google Maps ansehen
              </a>
            </div>

            <div>
              <p className="t-label">Öffnungszeiten</p>
              {salon.oeffnungszeiten ? (
                <dl className="mt-4 space-y-2 text-sm">
                  {salon.oeffnungszeiten.map((zeit) => (
                    <div key={zeit.tag} className="flex justify-between gap-6">
                      <dt className="text-tinte/80">{zeit.tag}</dt>
                      <dd>{zeit.zeit}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-tinte/80">
                  Termine nach Vereinbarung.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
