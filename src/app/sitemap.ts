import type { MetadataRoute } from 'next'
import { seitenUrl } from '@/inhalte/seite'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: seitenUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${seitenUrl}/impressum`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${seitenUrl}/datenschutz`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
