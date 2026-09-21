import Image from 'next/image'

/**
 * Aufbau wie in Innas Seitenentwurf: Bild links, Text rechts, heller Grund.
 * Das Bild ist ein Platzhalter aus Innas Arbeiten - ein Portrait der beiden
 * gibt es noch nicht, und ein Stockfoto wäre eine Lüge über zwei reale
 * Personen. Sobald das Duo-Foto da ist, nur die Bilddatei tauschen.
 */
export function Team() {
  return (
    <section className="bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div className="relative aspect-7/10 w-full overflow-hidden">
          <Image
            src="/arbeiten/salonlicht.jpg"
            alt="Warm ausgeleuchtete Längen mit weichem Verlauf, fotografiert im Salon in Wiehl."
            fill
            sizes="(max-width: 1024px) 100vw, 26rem"
            className="object-cover"
          />
        </div>

        <div>
          <p className="t-label">Wir sind</p>
          <h2 className="font-display mt-4 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.95] font-light">
            Inna
            <span className="text-kupfer-tief"> &amp; </span>
            Nursah
          </h2>

          <div className="mt-6 space-y-5 text-tinte/80">
            <p className="text-xl leading-relaxed">
              Zwei Friseurmeisterinnen. Ein Anspruch. Wir lieben, was wir tun – und das sieht man.
            </p>
            <p className="leading-relaxed">
              Inna für Farben, Transformationen und Beratung. Nursah für klassische Schnitte,
              Farben und perfekte Ergebnisse.
            </p>
            <p className="font-display text-2xl leading-snug text-tinte">
              Gemeinsam für dich und dein schönstes Haar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
