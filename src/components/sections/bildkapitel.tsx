import Image from 'next/image'
import { ZeilenReveal } from '@/components/reveal'

/**
 * Der einzige randlose Abschnitt der Seite. Er bricht aus dem Inhaltsmaß
 * aus und gibt dem Auge eine Pause zwischen zwei Textstrecken.
 * Die Sätze stammen aus Innas Einstiegstext (finale Fassung, 30.10.2026).
 */
export function Bildkapitel() {
  return (
    <section className="randlos relative flex min-h-[min(72vh,640px)] items-end overflow-hidden">
      <Image
        src="/arbeiten/farb-transformation.jpg"
        alt="Weicher Farbverlauf über die gesamte Länge, warm ausgeleuchtet im Salon."
        fill
        sizes="100vw"
        className="object-cover object-[50%_38%]"
      />
      {/* Verlauf mit Aufgabe: ohne ihn ist die Schrift auf hellem Haar nicht lesbar */}
      <div className="absolute inset-0 bg-gradient-to-t from-tinte/85 via-tinte/35 to-tinte/5" />

      <div className="inhalt relative pb-14">
        <p data-auf-bild className="t-lead text-leinen/90">
          Mit Erfahrung, ehrlicher Beratung und ganz viel Liebe zu unserem Handwerk schaffen wir
          Ergebnisse, die nicht nur heute schön sind.
        </p>
        <ZeilenReveal as="h2" className="t-titel mt-5 max-w-[16ch] text-leinen">
          Sondern sich auch morgen noch nach dir anfühlen.
        </ZeilenReveal>
      </div>
    </section>
  )
}
