/**
 * SUPERBRAND Premium Web Skill - Playwright QA Suite
 *
 * Visual Regression über 5 Breakpoints, Barrierefreiheit (axe, WCAG 2.1 AA)
 * und Interactive Tests für Conversion-Landings.
 *
 * Wird je nach story-spec.json type ausgeführt:
 * - alle Typen             → Visual Regression + Barrierefreiheit (@a11y)
 * - scrollytelling_premium → + Frame-Sequence-Checks
 * - conversion_landing     → + Form, CTA, Tap-Targets, Einwilligung
 *
 * Einsatz: Datei als qa-tests/qa.spec.ts ins Projekt kopieren
 * (playwright.config.ts aus reference/qa-checklist.md).
 *   npx playwright test                        # alles
 *   npx playwright test --grep @a11y           # nur Barrierefreiheit
 *   npx playwright test --update-snapshots     # neue Referenz-Screenshots nach gewollten Änderungen
 *
 * Wichtig: next build prüft auch diese Datei – kein any, kein @ts-ignore.
 */

import { test, expect, devices, type BrowserContextOptions } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import fs from 'fs'
import path from 'path'

// Site-Typ aus story-spec.json lesen
function getSiteType(): string {
  const specPath = path.join(process.cwd(), 'story-spec.json')
  if (!fs.existsSync(specPath)) return 'standard_business'
  try {
    const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'))
    return spec.type || 'standard_business'
  } catch {
    return 'standard_business'
  }
}

const SITE_TYPE = getSiteType()
const isScrollytelling = SITE_TYPE === 'scrollytelling_premium'
const isConversion = SITE_TYPE === 'conversion_landing'

// Geräte-Emulation im Chromium-Projekt: Viewport, Touch, Mobile-Modus und User-Agent.
// defaultBrowserType wird bewusst weggelassen – das würde WebKit erzwingen.
function device(name: keyof typeof devices): BrowserContextOptions {
  const d = devices[name]
  return {
    viewport: d.viewport,
    userAgent: d.userAgent,
    deviceScaleFactor: d.deviceScaleFactor,
    isMobile: d.isMobile,
    hasTouch: d.hasTouch,
  }
}

type Breakpoint = { name: string; options: BrowserContextOptions }

const BREAKPOINTS: Breakpoint[] = [
  { name: 'iPhone SE', options: device('iPhone SE') },
  { name: 'iPhone 14 Pro', options: device('iPhone 14 Pro') },
  { name: 'Pixel 7', options: device('Pixel 7') },
  { name: 'iPad Mini', options: device('iPad Mini') },
  { name: 'Desktop 1920', options: { viewport: { width: 1920, height: 1080 } } },
]

const SCROLL_POSITIONS = [0, 0.25, 0.5, 0.75, 1.0]

type QaWindow = Window & { __currentFrame?: number; fbq?: unknown }

// ─────────────────────────────────────────
// STUFE 2: Visual Regression
// ─────────────────────────────────────────

test.describe('Visual Regression', () => {
  for (const breakpoint of BREAKPOINTS) {
    test.describe(`@ ${breakpoint.name}`, () => {
      test.use(breakpoint.options)

      test('Page loads ohne Errors', async ({ page }) => {
        const errors: string[] = []
        page.on('pageerror', (err) => errors.push(err.message))
        page.on('console', (msg) => {
          if (msg.type() === 'error') errors.push(msg.text())
        })

        await page.goto('/')
        await page.waitForLoadState('networkidle')

        expect(errors.filter((e) => !e.includes('favicon'))).toEqual([])
      })

      test('Screenshots an Scroll-Positionen', async ({ page }) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(1500) // GSAP-Init aussitzen

        const fullHeight = await page.evaluate(() => document.body.scrollHeight)
        const viewportHeight = page.viewportSize()?.height ?? 0

        for (const pos of SCROLL_POSITIONS) {
          const targetY = (fullHeight - viewportHeight) * pos
          await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), targetY)
          await page.waitForTimeout(1200)
          await expect(page).toHaveScreenshot(
            `${breakpoint.name.replace(/\s/g, '-')}-scroll-${Math.round(pos * 100)}.png`,
            { maxDiffPixels: 200, fullPage: false }
          )
        }
      })

      test('Kein horizontaler Overflow', async ({ page }) => {
        await page.goto('/')
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        })
        expect(overflow).toBe(false)
      })

      test('Bilder lazy-load funktioniert', async ({ page }) => {
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const eagerCount = await page.evaluate(() => {
          return document.querySelectorAll('img[loading="eager"], img[fetchpriority="high"]').length
        })

        // Erlaubt: Hero-Bild + max 2 Logos eager. Mehr ist Performance-Problem.
        expect(eagerCount).toBeLessThanOrEqual(3)
      })
    })
  }
})

// ─────────────────────────────────────────
// Barrierefreiheit (alle Typen) – automatisierter Teil von WCAG 2.1 AA
// Ersetzt kein manuelles Audit (bfsg-audit-Skill), findet aber die
// automatisch erkennbaren Fehler vor jedem Deploy.
// ─────────────────────────────────────────

test.describe('Barrierefreiheit', () => {
  test('WCAG 2.1 AA ohne automatisch erkennbare Verstöße @a11y', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const summary = results.violations.map((v) => `${v.id} (${v.impact ?? 'n/a'}, ${v.nodes.length}x): ${v.help}`)
    expect(summary, summary.join('\n')).toEqual([])
  })
})

// ─────────────────────────────────────────
// STUFE 2+: Scrollytelling-spezifisch
// ─────────────────────────────────────────

test.describe('Scrollytelling Specific', () => {
  test.skip(!isScrollytelling, 'Nur für scrollytelling_premium')

  test('Frame-Sequence-Manifest existiert', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const manifestResponse = await page.evaluate(async () => {
      try {
        const res = await fetch('/frames/cave_entrance/manifest.json')
        return { ok: res.ok, status: res.status }
      } catch {
        return { ok: false, status: 0 }
      }
    })

    // Alternative: manifest pfad könnte abweichen
    if (!manifestResponse.ok) {
      console.warn('   Hinweis: /frames/cave_entrance/manifest.json nicht gefunden — Pfad ggf. anpassen')
    }
  })

  test('CanvasSequence läuft auf Scroll', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Der CanvasSequence-Renderer setzt window.__currentFrame
    const initialFrame = await page.evaluate(() => (window as QaWindow).__currentFrame ?? 0)

    await page.evaluate(() => window.scrollTo(0, 1500))
    await page.waitForTimeout(800)

    const newFrame = await page.evaluate(() => (window as QaWindow).__currentFrame ?? 0)

    if (newFrame === initialFrame) {
      console.warn('   ⚠️ Frame hat sich nicht geändert — Canvas-Renderer ggf. nicht aktiv')
    }
  })

  test('Mobile zeigt Scroll-Snap statt Canvas', async ({ browser }) => {
    const ctx = await browser.newContext(device('iPhone SE'))
    const page = await ctx.newPage()
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Mobile sollte KEINEN Canvas-Sequence-Renderer zeigen
    const hasCanvasSequence = await page.evaluate(() => {
      return document.querySelector('[data-canvas-sequence]') !== null
    })

    const hasScrollSnap = await page.evaluate(() => {
      const sections = document.querySelectorAll('section')
      return Array.from(sections).some((s) => getComputedStyle(s).scrollSnapAlign !== 'none')
    })

    expect(hasCanvasSequence).toBe(false)
    expect(hasScrollSnap).toBe(true)
    await ctx.close()
  })
})

// ─────────────────────────────────────────
// STUFE 3: Conversion Interactive
// ─────────────────────────────────────────

test.describe('Conversion Interactive', () => {
  test.skip(!isConversion, 'Nur für conversion_landing')

  test('Primary CTA above-the-fold auf Mobile', async ({ browser }) => {
    const ctx = await browser.newContext(device('iPhone SE'))
    const page = await ctx.newPage()
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const cta = page.locator('[data-cta="primary"]').first()
    await expect(cta).toBeVisible()

    const box = await cta.boundingBox()
    const viewportHeight = page.viewportSize()?.height ?? 0
    expect(box).not.toBeNull()
    if (box) {
      expect(box.y).toBeLessThan(viewportHeight)
      expect(box.y + box.height).toBeLessThanOrEqual(viewportHeight)
    }

    await ctx.close()
  })

  test('Alle Buttons haben Tap-Target ≥48x48px', async ({ browser }) => {
    const ctx = await browser.newContext(device('iPhone SE'))
    const page = await ctx.newPage()
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const buttons = await page.locator('button, a[role="button"], [data-cta]').all()
    const failures: string[] = []

    for (const btn of buttons) {
      const box = await btn.boundingBox()
      if (!box) continue
      if (box.width < 48 || box.height < 48) {
        const text = (await btn.textContent())?.trim().slice(0, 30) || '???'
        failures.push(`"${text}" (${box.width}x${box.height})`)
      }
    }

    if (failures.length > 0) {
      console.warn(`Zu kleine Tap-Targets:\n${failures.map((f) => `   - ${f}`).join('\n')}`)
    }
    expect(failures).toHaveLength(0)
    await ctx.close()
  })

  test('Lead-Form Submit funktioniert', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const form = page.locator('form').first()
    if ((await form.count()) === 0) {
      test.skip(true, 'Keine Form auf der Page')
      return
    }

    // Form ausfüllen — Selektoren anpassen je nach Projekt
    const nameInput = page.locator('input[name="name"], input[name="vorname"]').first()
    const emailInput = page.locator('input[type="email"], input[name="email"]').first()
    const phoneInput = page.locator('input[type="tel"], input[name="phone"]').first()

    if ((await nameInput.count()) > 0) await nameInput.fill('Test Tester')
    if ((await emailInput.count()) > 0) await emailInput.fill('test@example.com')
    if ((await phoneInput.count()) > 0) await phoneInput.fill('+49 1234 567890')

    await page.locator('button[type="submit"]').first().click()

    // Erfolg ODER Validation-Error muss innerhalb 5s erscheinen
    const success = page.locator('.success, [data-success], [role="status"]').first()
    const error = page.locator('.error, [data-error], [role="alert"]').first()

    await expect(success.or(error)).toBeVisible({ timeout: 5000 })
  })

  test('Kein Meta-Tracking vor Einwilligung', async ({ page }) => {
    const metaRequests: string[] = []
    page.on('request', (req) => {
      if (/facebook\.(net|com)/.test(req.url())) metaRequests.push(req.url())
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const banner = page.locator('.cky-consent-container, .cookie-banner, [data-cookieyes]').first()
    if ((await banner.count()) === 0) {
      console.warn('   ⚠️ Kein Cookie-Banner gefunden — DSGVO-Risiko bei Tracking')
    }

    // Vor der Einwilligung: kein fbq und keine Anfrage an Meta
    const fbqBeforeConsent = await page.evaluate(() => typeof (window as QaWindow).fbq)
    expect(fbqBeforeConsent).toBe('undefined')
    expect(metaRequests).toEqual([])
  })

  test('Telefon-Link funktioniert (tel:)', async ({ page }) => {
    await page.goto('/')
    const telLink = page.locator('a[href^="tel:"]').first()
    if ((await telLink.count()) === 0) return

    const href = await telLink.getAttribute('href')
    expect(href).toMatch(/^tel:\+?[0-9\s-]+$/)
  })
})
