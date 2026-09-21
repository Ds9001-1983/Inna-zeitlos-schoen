import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './qa-tests',
  fullyParallel: true,
  reporter: [['html', { outputFolder: 'qa-reports/playwright', open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  // Die Geräte-Breakpoints steuert qa.spec.ts selbst. Hier nur ein Chromium-Projekt:
  // iPhone-/iPad-Profile als eigene Projekte würden WebKit verlangen, das nicht installiert ist.
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Startet den Produktions-Server automatisch (nutzt einen laufenden Server mit)
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
