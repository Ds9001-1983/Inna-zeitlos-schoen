import type { NextConfig } from 'next'
import { hauptdomain, indexierungErlaubt } from './src/inhalte/suchmaschinen'

const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'higgsfield-prod.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'cdn.runpod.io' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*).webp',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Suchmaschinen: nur die Hauptdomain in Production darf in den Index (src/inhalte/suchmaschinen.ts).
      indexierungErlaubt()
        ? { source: '/(.*)', missing: [{ type: 'host' as const, value: hauptdomain }], headers: noindex }
        : { source: '/(.*)', headers: noindex },
    ]
  },
}

export default nextConfig
