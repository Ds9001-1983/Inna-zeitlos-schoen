import Image from 'next/image'
import { ZeilenReveal } from '@/components/reveal'

/**
 * Der einzige randlose Abschnitt der Seite. Er bricht aus dem Inhaltsmaß
 * aus und gibt dem Auge eine Pause zwischen zwei Textstrecken.
 * Der Satz stammt aus Innas Brand-Board.
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
        <ZeilenReveal as="h2" className="t-titel max-w-[16ch] text-leinen">
          Ein Ort zum Ankommen. Für dich. Für dein Haar. Für deine Auszeit.
        </ZeilenReveal>
      </div>
    </section>
  )
}
