/**
 * Wortmarke aus dem Brand-Board. Bis die Vektordatei von Inna da ist,
 * als Typo gesetzt – dieselben Schriften, dieselbe Laufweite.
 * „gross“ steht am Ende des Team-Abschnitts unter „Das sind wir.“
 */
const groessen = {
  kopf: { marke: 'text-[1.65rem]', zusatz: 'mt-1 text-[0.5rem]' },
  gross: { marke: 'text-[2.75rem]', zusatz: 'mt-2 text-[0.8rem]' },
} as const

export function Wortmarke({
  className = '',
  groesse = 'kopf',
}: {
  className?: string
  groesse?: keyof typeof groessen
}) {
  const g = groessen[groesse]
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className={`font-display ${g.marke} font-light tracking-[0.34em] text-tinte`}>
        INNA
      </span>
      <span className={`${g.zusatz} font-medium tracking-[0.36em] text-tinte/70`}>
        ZEITLOS SCHÖN
      </span>
    </span>
  )
}
