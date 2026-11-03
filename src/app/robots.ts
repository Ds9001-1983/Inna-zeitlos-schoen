import type { MetadataRoute } from 'next'
import { seitenUrl } from '@/inhalte/seite'
import { indexierungErlaubt } from '@/inhalte/suchmaschinen'

export default function robots(): MetadataRoute.Robots {
  if (!indexierungErlaubt()) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/impressum', '/datenschutz'] },
    sitemap: `${seitenUrl}/sitemap.xml`,
  }
}
