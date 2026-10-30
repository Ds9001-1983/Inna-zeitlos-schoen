import { whatsappLink } from '@/inhalte/salon'

/**
 * Neukundinnen fragen ihren Beratungstermin per WhatsApp an (Inna, 30.10.2026).
 * Steht in „Neu bei uns“ und im Abschnitt Termine. Ohne Nummer in salon.ts kein Knopf.
 */
export function WhatsappKnopf({ className = '' }: { className?: string }) {
  if (!whatsappLink) return null
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      className={`inline-block bg-kupfer-tief px-8 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase transition-colors hover:bg-tinte ${className}`}
    >
      Beratung per WhatsApp anfragen
    </a>
  )
}
