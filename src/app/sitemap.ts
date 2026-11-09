import type { MetadataRoute } from 'next'
import { seitenUrl } from '@/inhalte/seite'

/**
 * Nur die Startseite. Impressum und Datenschutz sperrt die robots.txt – stünden sie
 * hier, meldete die Search Console „durch robots.txt blockiert“ (09.11.2026).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: seitenUrl, changeFrequency: 'monthly', priority: 1 }]
}
