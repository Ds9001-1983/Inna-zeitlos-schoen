/**
 * Wortmarke aus dem Brand-Board. Bis die Vektordatei von Inna da ist,
 * als Typo gesetzt – dieselben Schriften, dieselbe Laufweite.
 */
export function Wortmarke({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="font-display text-[1.65rem] font-light tracking-[0.34em] text-tinte">
        INNA
      </span>
      <span className="mt-1 text-[0.5rem] font-medium tracking-[0.36em] text-tinte/70">
        ZEITLOS SCHÖN
      </span>
    </span>
  )
}
