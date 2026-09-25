#!/usr/bin/env node
/**
 * Kontrast von Text auf Bild oder Video – pixelweise gemessen.
 *
 * axe kann Text auf Fotos und Bewegtbild nicht bewerten. Dieses Skript blendet die
 * Textelemente aus, nimmt den Untergrund an mehreren Zeitpunkten des Videos auf und
 * rechnet den Kontrast der Textfarbe gegen das hellste Zwei-Prozent-Perzentil des
 * Untergrunds – also gegen den ungünstigsten Fall. Gemessen wird je Textzeile (Zeilenboxen
 * der Textknoten), nicht über den ganzen Elementkasten.
 *
 *   node scripts/kontrast-auf-bild.mjs --url http://localhost:3000 --selektoren "h1,[data-hero-zeile]" \
 *        [--zeiten 0.2,2.5,5,9.5] [--breite 1440] [--hoehe 900]
 *
 * Braucht @playwright/test (Projekt) und ffmpeg (Mac: brew install ffmpeg-full).
 * Schwellen nach WCAG 2.1 AA: 4,5:1 für Text, 3:1 für grossen Text (>= 24 px oder >= 18,66 px fett).
 */
import { chromium } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const arg = (name, standard) => {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : standard
}
const url = arg('url', 'http://localhost:3000')
const selektoren = arg('selektoren', 'h1').split(',').map((s) => s.trim())
const zeiten = arg('zeiten', '0.2,2.5,5,9.5').split(',').map(Number)
const breite = Number(arg('breite', 1440))
const hoehe = Number(arg('hoehe', 900))

const kanal = (v) => {
  v /= 255
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}
const leuchtdichte = (r, g, b) => 0.2126 * kanal(r) + 0.7152 * kanal(g) + 0.0722 * kanal(b)
const kontrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)

const tmp = mkdtempSync(join(tmpdir(), 'kontrast-'))
const browser = await chromium.launch()
const seite = await browser.newPage({ viewport: { width: breite, height: hoehe } })
await seite.goto(url, { waitUntil: 'networkidle' })
await seite.waitForTimeout(4000)

// Textelemente vermessen und ihre Farbe lesen, bevor sie ausgeblendet werden
const felder = await seite.evaluate((sel) => {
  // Jede CSS-Farbe (auch oklab/color-mix aus Tailwind-Deckkraft wie text-leinen/90) über ein
  // 1×1-Canvas in sRGB + Alpha normalisieren – ein Regex auf rgb() reicht nicht.
  const rgb = (s) => {
    const c = document.createElement('canvas')
    c.width = c.height = 1
    const ctx = c.getContext('2d')
    ctx.clearRect(0, 0, 1, 1)
    ctx.fillStyle = s
    ctx.fillRect(0, 0, 1, 1)
    const d = ctx.getImageData(0, 0, 1, 1).data
    return [d[0], d[1], d[2], d[3] / 255]
  }
  // Gemessen werden die Zeilenboxen der Textknoten, nicht der Elementkasten: Ein umbrochener
  // Absatz belegt nur links Fläche, sein Kasten aber die ganze Breite (und damit helle Bildteile).
  const zeilenboxen = (el) => {
    const boxen = []
    const lauf = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    for (let k = lauf.nextNode(); k; k = lauf.nextNode()) {
      if (!k.textContent.trim()) continue
      const bereich = document.createRange()
      bereich.selectNodeContents(k)
      for (const q of bereich.getClientRects()) {
        if (q.width < 2 || q.height < 2) continue
        boxen.push({ x: Math.max(0, Math.round(q.x)), y: Math.max(0, Math.round(q.y)), w: Math.round(Math.min(q.width, innerWidth - Math.max(0, q.x))), h: Math.round(q.height) })
      }
    }
    if (!boxen.length) {
      const r = el.getBoundingClientRect()
      boxen.push({ x: Math.max(0, Math.round(r.x)), y: Math.max(0, Math.round(r.y)), w: Math.round(Math.min(r.width, innerWidth - Math.max(0, r.x))), h: Math.round(r.height) })
    }
    return boxen
  }
  return sel.flatMap((s) =>
    Array.from(document.querySelectorAll(s)).map((el) => {
      const cs = getComputedStyle(el)
      const gross = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && Number(cs.fontWeight) >= 700)
      return {
        selektor: s,
        text: (el.textContent || '').trim().slice(0, 40),
        boxen: zeilenboxen(el),
        farbe: rgb(cs.color),
        noetig: gross ? 3 : 4.5,
      }
    }),
  )
}, selektoren)

await seite.evaluate((sel) => {
  sel.forEach((s) => document.querySelectorAll(s).forEach((el) => (el.style.visibility = 'hidden')))
}, selektoren)

const hatVideo = await seite.evaluate(() => Boolean(document.querySelector('video')))
const messpunkte = hatVideo ? zeiten : [0]
const ergebnis = felder.map((f) => ({ ...f, schlechtester: Infinity }))

for (const t of messpunkte) {
  if (hatVideo) {
    await seite.evaluate((zeit) => {
      const v = document.querySelector('video')
      if (v) {
        v.pause()
        v.currentTime = zeit
      }
    }, t)
    await seite.waitForTimeout(700)
  }
  const datei = join(tmp, `u-${t}.png`)
  await seite.screenshot({ path: datei, clip: { x: 0, y: 0, width: breite, height: hoehe } })

  for (const f of ergebnis) {
    const [tr, tg, tb, ta = 1] = f.farbe
    const textL = leuchtdichte(tr, tg, tb)
    for (const b of f.boxen) {
      if (b.w < 2 || b.h < 2 || b.y >= hoehe) continue
      const h = Math.min(b.h, hoehe - b.y)
      const roh = execFileSync('ffmpeg', ['-v', 'error', '-i', datei, '-vf', `crop=${b.w}:${h}:${b.x}:${b.y}`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], {
        maxBuffer: 256 * 1024 * 1024,
      })
      const werte = []
      for (let i = 0; i + 2 < roh.length; i += 3) werte.push(leuchtdichte(roh[i], roh[i + 1], roh[i + 2]))
      werte.sort((a, b) => a - b)
      // Text hell auf dunklem Grund: hellster Grund ist der schlimmste Fall. Dunkler Text: dunkelster Grund.
      const grenzwert = textL > 0.5 ? werte[Math.floor(werte.length * 0.98)] : werte[Math.floor(werte.length * 0.02)]
      // Halbtransparenter Text mischt sich mit dem Untergrund (linear, wie die Leuchtdichte)
      const wirksam = ta * textL + (1 - ta) * grenzwert
      f.schlechtester = Math.min(f.schlechtester, kontrast(wirksam, grenzwert))
    }
  }
}

await browser.close()

mkdirSync('docs', { recursive: true })
const zeilen = ergebnis.map(
  (f) =>
    `| \`${f.selektor}\` | ${f.text} | ${f.schlechtester === Infinity ? '–' : f.schlechtester.toFixed(2) + ':1'} | ${f.noetig}:1 | ${f.schlechtester >= f.noetig ? 'bestanden' : '**durchgefallen**'} |`,
)
const bericht = `# Kontrast auf Bild/Video\n\nURL: ${url} · Breite ${breite} px · Zeitpunkte: ${messpunkte.join(', ')} s · Messgröße: hellstes bzw. dunkelstes 2 % des Untergrunds\n\n| Element | Text | schlechtester Wert | nötig | Urteil |\n|---|---|---|---|---|\n${zeilen.join('\n')}\n`
writeFileSync('docs/pruefung-kontrast.md', bericht)
console.log(bericht)
process.exit(ergebnis.every((f) => f.schlechtester >= f.noetig) ? 0 : 1)
