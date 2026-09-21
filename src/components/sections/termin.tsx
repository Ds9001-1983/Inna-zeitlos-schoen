/**
 * Bewusst ohne Online-Kalender: Inna will vor einem Farbtermin kurz sprechen.
 * Telefon und Öffnungszeiten stehen noch aus und sind hier sichtbar als offen
 * markiert, damit im Entwurf nichts Erfundenes steht.
 */
export function Termin() {
  return (
    <section id="termin" className="bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt grid gap-14 lg:grid-cols-[1fr_auto] lg:gap-24">
        <div>
          <p className="t-label">Termin</p>
          <h2 className="t-titel mt-4 max-w-[16ch]">Dein Termin beginnt mit einem Gespräch.</h2>
          <p className="t-lead mt-5 text-tinte/80">
            Einen Online-Kalender gibt es hier bewusst nicht. Wie lange dein Haar braucht, hängt
            von Ausgangsfarbe, Länge und Struktur ab – das klären wir vorher in zwei Minuten am
            Telefon, statt dich in einen Slot zu setzen, der nicht passt.
          </p>
        </div>

        <address className="text-base leading-relaxed not-italic">
          <p className="t-label mb-4">Salon</p>
          <p className="font-display text-2xl leading-tight">
            Schulstraße 1
            <br />
            51674 Wiehl
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Schulstra%C3%9Fe+1%2C+51674+Wiehl"
            className="mt-4 inline-block text-kupfer-tief underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Auf Google Maps ansehen
          </a>

          <dl className="mt-8 space-y-2 text-sm text-tinte/60">
            <div className="flex gap-3">
              <dt className="w-28">Telefon</dt>
              <dd className="text-greige">folgt</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28">Öffnungszeiten</dt>
              <dd className="text-greige">folgen</dd>
            </div>
          </dl>
        </address>
      </div>
    </section>
  )
}
