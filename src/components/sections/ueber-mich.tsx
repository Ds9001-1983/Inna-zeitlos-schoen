import Image from 'next/image'

/** Texte wörtlich aus Innas Entwurf und Brand-Board. */
export function UeberMich() {
  return (
    <section id="ueber-mich" className="scroll-mt-24 bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div className="relative aspect-7/10 w-full overflow-hidden">
          <Image
            src="/arbeiten/handwerk-straehne.jpg"
            alt="Innas Hand hält eine Strähne hoch, um den Übergang vom Ansatz in die Längen zu prüfen."
            fill
            sizes="(max-width: 1024px) 100vw, 26rem"
            className="object-cover"
          />
        </div>

        <div>
          <p className="t-label">Über mich</p>
          <h2 className="t-titel mt-4 max-w-[20ch]">
            Schönheit beginnt dort, wo du dich selbst wiedererkennst.
          </h2>

          <div className="mt-6 space-y-5 text-tinte/80">
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

          <p className="t-signatur mt-8 text-[2.5rem] text-tinte">
            Inna <span className="text-kupfer-tief">♡</span>
          </p>
        </div>
      </div>
    </section>
  )
}
