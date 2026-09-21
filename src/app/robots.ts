import type { MetadataRoute } from 'next'
import { seitenUrl } from '@/inhalte/seite'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/impressum', '/datenschutz'] },
    sitemap: `${seitenUrl}/sitemap.xml`,
  }
}
