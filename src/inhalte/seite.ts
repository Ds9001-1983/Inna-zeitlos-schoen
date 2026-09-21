/**
 * Adresse der Seite. Sobald die Domain feststeht, SITE_URL in Vercel setzen –
 * bis dahin nimmt Next die Produktions-URL des Vercel-Projekts.
 */
export const seitenUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
