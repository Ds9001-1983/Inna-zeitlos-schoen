import Image from 'next/image'
import { BildReveal, ZeilenReveal } from '@/components/reveal'

/**
 * Diptychon statt Wischregler.
 *
 * Der Regler hat das Gegenteil von dem bewirkt, wofür er gedacht war: Die beiden
 * Aufnahmen sind unterschiedlich gerahmt – links Färbeumhang vor dunklen Schränken,
 * rechts Strickpullover vor heller Decke. In der Wische springt die Schulterlinie,
 * und das Paar liest sich als zwei verschiedene Personen. Nebeneinander ist der
 * Unterschied in der Rahmung erwartbar und der Vergleich trägt.
 *
 * Bilder und Text stammen aus Innas Instagram-Beitrag vom 26.07.2026.
 * Vor dem Live-Gang: Einwilligung der Kundin für Foto und Zitat einholen.
 */
const paar = [
  {
    bild: '/arbeiten/farbkorrektur-vorher.jpg',
    marke: 'vorher',
    alt: 'Vor dem Termin: strohig aufgehelltes Haar mit harter Ansatzkante und ausgefransten Spitzen.',
  },
  {
    bild: '/arbeiten/farbkorrektur-nachher.jpg',
    marke: 'nachher',
    alt: 'Nach der Farbkorrektur: dieselbe Länge mit eingebetteten hellen Partien, weichem Übergang und sichtbarer Tiefe.',
  },
]

export function Verwandlung() {
  return (
    <section
      id="verwandlung"
      className="relative z-0 bg-sand pt-[clamp(8rem,16vw,13rem)] pb-[var(--spacing-sektion)]"
    >
      <div className="inhalt raster items-start gap-y-12">
        <div className="col-span-6 lg:col-span-5">
          <p className="t-label">Die Verwandlung</p>
          <ZeilenReveal as="h2" className="t-titel mt-4">
            Manchmal bedeutet eine Farbkorrektur nicht, heller zu werden.
          </ZeilenReveal>

          <p className="t-lead mt-7 text-tinte/80">
            Diese Kundin kam nach mehreren enttäuschenden Friseurbesuchen zu mir – das Haar
            strapaziert, die Längen unruhig. Noch mehr Blond wäre keine verantwortungsvolle
            Entscheidung gewesen.
          </p>

          <blockquote className="mt-12 max-w-[34rem] border-l border-kupfer-tief pl-7">
            <p className="t-aussage [hanging-punctuation:first]">
              &bdquo;Du hast mir nicht nur meine Haare gerettet, sondern mir auch mein Strahlen
              zurückgegeben.&ldquo;
            </p>
            <footer className="mt-4 text-sm text-tinte/80">
              Kundin nach der Farbkorrektur, Juli 2026
            </footer>
          </blockquote>
        </div>

        <figure className="col-span-6 lg:col-start-7 lg:col-end-13">
          <div className="grid grid-cols-2 gap-1">
            {paar.map((seite) => (
              <BildReveal key={seite.marke}>
                <div className="relative aspect-7/10 w-full bg-sand">
                  <Image
                    src={seite.bild}
                    alt={seite.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 23rem"
                    className="object-cover"
                    data-bild
                  />
                  <span className="absolute bottom-3 left-3 bg-tinte/75 px-3 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-leinen uppercase">
                    {seite.marke}
                  </span>
                </div>
              </BildReveal>
            ))}
          </div>

          <figcaption className="mt-6 max-w-[52ch] text-sm leading-relaxed text-tinte/80">
            Airtouch rückwärts: Die hellen Bereiche wurden gezielt eingebettet, harte Übergänge
            ausgeglichen, das Gesamtbild wieder ruhig aufgebaut. Mehr Tiefe, mehr Natürlichkeit,
            mehr Harmonie.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
