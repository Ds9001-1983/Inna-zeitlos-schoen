/**
 * Regeln für Suchmaschinen (globale Regel SUPERBRAND, 02.11.2026).
 *
 * - Indexierbar nur, wenn NEXT_PUBLIC_ALLOW_INDEXING=true gesetzt ist (nur in Vercel Production).
 * - Auch dann nur auf der Hauptdomain: inna-zeitlos.vercel.app und alle Previews tragen
 *   X-Robots-Tag noindex (next.config.ts).
 *
 * Eigene Datei ohne Alias-Importe, weil next.config.ts sie mitliest.
 */

export const hauptdomain = 'inna-zeitlosschoen.de'

/** Wird beim Build gelesen (robots.txt, Metadaten, Header). */
export function indexierungErlaubt(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'
}
