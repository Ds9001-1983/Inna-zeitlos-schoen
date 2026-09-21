import { salon } from "@/inhalte/salon";

/**
 * Bewusst ohne Online-Kalender: Inna will vor einem Farbtermin kurz sprechen.
 * Telefon und Öffnungszeiten stehen in src/inhalte/salon.ts – solange sie dort
 * null sind, zeigt die Seite den Weg über Instagram und den Besuch im Salon.
 */
export function Kontakt() {
  return (
    <section
      id="kontakt"
      className="scroll-mt-24 bg-sand py-[var(--spacing-sektion)]"
    >
      <div className="inhalt">
        <p className="t-label">Kontakt</p>
        <h2 className="t-titel mt-4 max-w-[18ch]">
          Bereit für dein neues Haargefühl?
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
          <div>
            <p className="t-lead text-tinte/80">
              Dein Termin beginnt mit einem Gespräch. Einen Online-Kalender gibt
              es hier bewusst nicht. Wie lange dein Haar braucht, hängt von
              Ausgangsfarbe, Länge und Struktur ab – das klären wir vorher in
              zwei Minuten, statt dich in einen Slot zu setzen, der nicht passt.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {salon.telefon ? (
                <a
                  href={`tel:${salon.telefon.replace(/\s/g, "")}`}
                  className="bg-kupfer-tief px-8 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase transition-colors hover:bg-tinte"
                >
                  {salon.telefon} anrufen
                </a>
              ) : null}
              <a
                href={salon.instagram}
                target="_blank"
                rel="noreferrer"
                className={`px-8 py-4 text-[0.7rem] font-medium tracking-[0.18em] uppercase transition-colors ${
                  salon.telefon
                    ? "border border-kupfer-tief text-kupfer-tief hover:bg-kupfer-tief hover:text-leinen"
                    : "bg-kupfer-tief text-leinen hover:bg-tinte"
                }`}
              >
                Auf Instagram schreiben
              </a>
            </div>

            <p className="mt-6 text-sm text-tinte/80">
              Am schnellsten erreichst du mich über {salon.instagramName} – oder
              du kommst im Salon vorbei.
            </p>
          </div>

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

            <div className="mt-8 border-t border-greige/60 pt-6">
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
                <p className="mt-3 text-sm leading-relaxed text-tinte/80">
                  Termine nach Vereinbarung. Schreib mir, wann es dir passt –
                  wir finden einen Platz, der zu deinem Haar und zu deinem Tag
                  passt.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
