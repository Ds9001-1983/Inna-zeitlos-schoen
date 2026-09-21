import { salon } from '@/inhalte/salon'
import { ZeilenReveal } from '@/components/reveal'

/** Satz unter den Kontakt-Knöpfen – je nachdem, welche Wege schon feststehen. */
function kontaktSatz() {
  if (salon.telefon) return 'Am schnellsten erreichst du mich telefonisch – oder du kommst im Salon vorbei.'
  if (salon.email) return 'Schreib mir eine E-Mail – oder komm im Salon vorbei.'
  if (salon.instagram) return 'Schreib mir auf Instagram – oder komm im Salon vorbei.'
  return `Am einfachsten kommst du direkt im Salon vorbei – ${salon.strasse} in ${salon.ort}.`
}

/**
 * Bewusst ohne Online-Kalender: Inna will vor einem Farbtermin kurz sprechen.
 * Telefon und Öffnungszeiten stehen in src/inhalte/salon.ts – solange sie dort
 * null sind, zeigt die Seite den Weg über Instagram und den Besuch im Salon.
 */
/**
 * Ablauf eines Farbtermins. Vorschlag auf Basis dessen, was Inna in ihren
 * Beiträgen beschreibt – muss von ihr bestätigt werden, bevor es live geht.
 */
const ablauf = [
  {
    nummer: '01',
    titel: 'Sag mir, was du dir wünschst',
    text: 'Am liebsten mit zwei Fotos: eins, das dir gefällt – und eins von deinem Haar heute, bei Tageslicht und ungestylt. Damit sehe ich sofort, was möglich ist.',
  },
  {
    nummer: '02',
    titel: 'Wir sehen uns dein Haar an',
    text: 'Struktur, Vorbehandlung, wie viel Aufhellung deine Längen tragen. Erst danach steht fest, wie lange dein Termin dauert und was er kostet.',
  },
  {
    nummer: '03',
    titel: 'Der Termin – ohne Hektik',
    text: 'Komm mit trockenem, ungestyltem Haar. Plan lieber etwas mehr Zeit ein als zu wenig: Ein Verlauf, der herauswachsen darf, lässt sich nicht beschleunigen.',
  },
]

export function Kontakt() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-sand py-[var(--spacing-sektion)]">
      <div className="inhalt">
        <p className="t-label">Kontakt</p>
        <ZeilenReveal as="h2" className="t-titel mt-4 max-w-[18ch]">
          Bereit für dein neues Haargefühl?
        </ZeilenReveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
          <div>
            <p className="t-lead text-tinte/80">
              Dein Termin beginnt mit einem Gespräch. Einen Online-Kalender gibt es hier bewusst
              nicht. Wie lange dein Haar braucht, hängt von Ausgangsfarbe, Länge und Struktur ab –
              das klären wir vorher in zwei Minuten, statt dich in einen Slot zu setzen, der nicht
              passt.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {salon.telefon ? (
                <a
                  href={`tel:${salon.telefon.replace(/\s/g, '')}`}
                  className="bg-kupfer-tief px-8 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase transition-colors hover:bg-tinte"
                >
                  {salon.telefon} anrufen
                </a>
              ) : null}
              {salon.email ? (
                <a
                  href={`mailto:${salon.email}`}
                  className={`px-8 py-4 text-[0.7rem] font-medium tracking-[0.18em] uppercase transition-colors ${
                    salon.telefon
                      ? 'border border-kupfer-tief text-kupfer-tief hover:bg-kupfer-tief hover:text-leinen'
                      : 'bg-kupfer-tief text-leinen hover:bg-tinte'
                  }`}
                >
                  E-Mail schreiben
                </a>
              ) : null}
              {salon.instagram ? (
                <a
                  href={salon.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-kupfer-tief px-8 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-kupfer-tief uppercase transition-colors hover:bg-kupfer-tief hover:text-leinen"
                >
                  Auf Instagram schreiben
                </a>
              ) : null}
              {!salon.telefon && !salon.email && !salon.instagram ? (
                <a
                  href={salon.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-kupfer-tief px-8 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase transition-colors hover:bg-tinte"
                >
                  Weg zum Salon
                </a>
              ) : null}
            </div>

            <p className="mt-6 text-sm text-tinte/80">{kontaktSatz()}</p>
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
                  Termine nach Vereinbarung. Sag mir, wann es dir passt – wir finden einen
                  Platz, der zu deinem Haar und zu deinem Tag passt.
                </p>
              )}
            </div>
          </div>
        </div>
        <ol className="raster mt-20 gap-y-10 border-t border-greige/60 pt-10">
          {ablauf.map((schritt) => (
            <li key={schritt.nummer} className="col-span-6 lg:col-span-4">
              <span className="font-display block text-3xl leading-none font-light text-kupfer-tief">
                {schritt.nummer}
              </span>
              <h3 className="font-display mt-4 text-xl leading-tight font-light">
                {schritt.titel}
              </h3>
              <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-tinte/80">
                {schritt.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
