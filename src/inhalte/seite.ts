import { hauptdomain } from './suchmaschinen'

/**
 * Adresse der Seite. Production läuft auf der Hauptdomain (Go-Live 03.11.2026),
 * Previews auf der Produktions-URL des Vercel-Projekts. SITE_URL überschreibt beides.
 */
export const seitenUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_ENV === 'production'
    ? `https://${hauptdomain}`
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
