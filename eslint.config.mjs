import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // macOS legt auf FAT-Laufwerken AppleDouble-Dateien an – ESLint liest die .gitignore nicht
    '**/._*',
    '.vercel/**',
    'qa-reports/**',
    'test-results/**',
    'playwright-report/**',
    '.lighthouseci/**',
  ]),
])
