import Image from 'next/image'
import { BildReveal, ZeilenReveal } from '@/components/reveal'

/** Texte wörtlich aus Innas Entwurf und Brand-Board. */
export function UeberMich() {
  return (
    <section id="ueber-mich" className="scroll-mt-24 bg-sand py-[var(--spacing-sektion)]">
      <div className="inhalt raster items-center gap-y-12">
        <BildReveal className="col-span-6 lg:col-span-5">
          <div className="relative aspect-7/10 w-full">
            <Image
              src="/arbeiten/handwerk-straehne.jpg"
              alt="Innas Hand hält eine Strähne hoch, um den Übergang vom Ansatz in die Längen zu prüfen."
              fill
              sizes="(max-width: 1024px) 100vw, 34rem"
              className="object-cover"
              data-bild
            />
          </div>
        </BildReveal>

        <div className="col-span-6 lg:col-start-7 lg:col-end-13">
          <p className="t-label">Über mich</p>
          <ZeilenReveal as="h2" className="t-titel mt-4">
            Schönheit beginnt dort, wo du dich selbst wiedererkennst.
          </ZeilenReveal>

          <div className="mt-8 space-y-6 text-tinte/80">
            <p className="t-lead">
              Ich glaube daran, dass echte Schönheit Zeit braucht. Deshalb arbeite ich bewusst
              ohne Fließband. Jeder Termin bekommt den Raum, den er verdient. Damit Haarfarbe
              nicht nur schön aussieht, sondern sich auch nach Monaten noch richtig anfühlt.
            </p>
            <p className="t-lead">
              Blond, Kupfer, Grey Blending oder Naturton – entscheidend ist das Ergebnis, das zu
              dir passt. Ich arbeite mit besonderem Augenmerk auf Pflege, Struktur und
              Haltbarkeit, denn schönes Haar beginnt mit gesunder Haarqualität.
            </p>
          </div>

          <p className="t-signatur mt-10 text-[clamp(2.75rem,5vw,3.75rem)] text-tinte">
            Inna <span className="text-kupfer-tief">♡</span>
          </p>
        </div>
      </div>
    </section>
  )
}
