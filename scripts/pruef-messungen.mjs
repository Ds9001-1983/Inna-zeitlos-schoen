#!/usr/bin/env node
/**
 * Messungen der Prüfung (Phase 6), die axe und Lighthouse nicht abdecken:
 * Überbreite bei 360 und 640 px (640 entspricht Zoom 200 % auf 1280), Bilder beim zweiten
 * Aufruf (Cache HIT des Bild-Optimierers), Video-Zustand und Reduced Motion, Platzhalterwörter
 * im gerenderten Text, doppelte Motive, Tastaturfokus. Dazu Vollbild-Aufnahmen bei 1440 und
 * 390 px für die Sichtprüfung.
 *
 *   node scripts/pruef-messungen.mjs [--url http://localhost:3000] [--ziel qa-reports/messungen]
 *
 * Gescrollt wird per Mausrad – Lenis fängt window.scrollTo ab, das Rad nicht. Auf img.decode()
 * wird nicht gewartet (hängt bei lazy geladenen Bildern), sondern auf img.complete mit Timeout.
 * Exit 1, wenn eine harte Messung durchfällt; doppelte Motive sind nur ein Hinweis für Sichtfrage 4.
 */
import { chromium } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const arg = (name, standard) => {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : standard
}
const url = arg('url', 'http://localhost:3000')
const ziel = arg('ziel', 'qa-reports/messungen')
mkdirSync(ziel, { recursive: true })
const log = (...a) => console.error(new Date().toISOString().slice(11, 19), ...a)

const browser = await chromium.launch()
const ergebnis = { url, datum: new Date().toISOString().slice(0, 10) }

async function laden(p) {
  await p.goto(url, { waitUntil: 'load' })
  await p.waitForTimeout(1500)
}
async function durchscrollen(p) {
  const h = await p.evaluate(() => document.documentElement.scrollHeight)
  await p.mouse.move(200, 300)
  for (let y = 0; y < h; y += 400) {
    await p.mouse.wheel(0, 400)
    await p.waitForTimeout(90)
  }
  await p.waitForTimeout(1200)
  await p
    .waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 15000 })
    .catch(() => log('  nicht alle Bilder complete nach 15 s'))
}
const nachOben = async (p) => {
  await p.mouse.wheel(0, -1000000)
  await p.waitForTimeout(800)
}
const ueberbreite = (p) => p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)

for (const w of [360, 640]) {
  log('Breite', w)
  const p = await browser.newPage({ viewport: { width: w, height: 800 } })
  await laden(p)
  await durchscrollen(p)
  ergebnis[`ueberbreite_${w}`] = await ueberbreite(p)
  await p.close()
}

{
  log('1440, erster Aufruf')
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const p1 = await ctx.newPage()
  await laden(p1)
  await durchscrollen(p1)
  await p1.close()
  log('1440, zweiter Aufruf (Cache HIT)')
  const p2 = await ctx.newPage()
  await laden(p2)
  await durchscrollen(p2)
  ergebnis.bilder_zweiter_aufruf = await p2.evaluate(() => ({
    gesamt: document.images.length,
    leer: Array.from(document.images).filter((i) => i.naturalWidth === 0).length,
  }))
  ergebnis.video = await p2.evaluate(() => {
    const v = document.querySelector('video')
    return v ? { vorhanden: true, laeuft: !v.paused, quelle: v.currentSrc.replace(location.origin, '') } : { vorhanden: false }
  })
  ergebnis.platzhalter = await p2.evaluate(() => {
    const t = document.body.innerText
    return ['folgt', 'folgen', 'auf Anfrage', 'im Gespräch', 'Lorem', 'wird ergänzt'].filter((w) => new RegExp(`\\b${w}\\b`, 'i').test(t))
  })
  ergebnis.doppelte_motive = await p2.evaluate(() => {
    const q = Array.from(document.images).map((i) => decodeURIComponent((i.currentSrc.match(/url=([^&]+)/) || [])[1] || i.currentSrc))
    return [...new Set(q.filter((s, i) => q.indexOf(s) !== i))]
  })
  log('Tastatur')
  await nachOben(p2)
  const fokus = []
  for (let i = 0; i < 60; i++) {
    await p2.keyboard.press('Tab')
    const f = await p2.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      return {
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30),
        sichtbar: (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none',
        imViewport: r.top >= 0 && r.bottom <= innerHeight,
      }
    })
    if (!f) break
    fokus.push(f)
  }
  ergebnis.tastatur = {
    elemente: fokus.length,
    ohne_sichtbaren_fokus: fokus.filter((f) => !f.sichtbar).map((f) => `${f.tag}:${f.text}`),
    ausserhalb_viewport: fokus.filter((f) => !f.imViewport).length,
  }
  log('Aufnahme 1440')
  await nachOben(p2)
  await p2.screenshot({ path: join(ziel, 'desktop-1440.png'), fullPage: true })
  await ctx.close()
}

{
  log('Reduced Motion')
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const p = await ctx.newPage()
  const anfragen = []
  p.on('request', (r) => {
    if (/\/video\//.test(r.url())) anfragen.push(r.url())
  })
  await laden(p)
  await p.waitForTimeout(1500)
  ergebnis.reduced_motion_videoanfragen = anfragen.length
  await ctx.close()
}

{
  log('Aufnahme 390')
  const p = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await laden(p)
  await durchscrollen(p)
  await nachOben(p)
  await p.screenshot({ path: join(ziel, 'mobil-390.png'), fullPage: true })
  await p.close()
}
await browser.close()

writeFileSync(join(ziel, 'messungen.json'), JSON.stringify(ergebnis, null, 2))
const e = ergebnis
const fehler = []
if (e.ueberbreite_360 > 0) fehler.push(`Überbreite 360 px: ${e.ueberbreite_360}`)
if (e.ueberbreite_640 > 0) fehler.push(`Überbreite 640 px: ${e.ueberbreite_640}`)
if (e.bilder_zweiter_aufruf.leer > 0) fehler.push(`leere Bilder beim zweiten Aufruf: ${e.bilder_zweiter_aufruf.leer}`)
if (e.platzhalter.length) fehler.push(`Platzhalterwörter: ${e.platzhalter.join(', ')}`)
if (e.video.vorhanden && !e.video.laeuft) fehler.push('Video steht')
if (e.reduced_motion_videoanfragen > 0) fehler.push(`Videoanfragen trotz Reduced Motion: ${e.reduced_motion_videoanfragen}`)
if (e.tastatur.ohne_sichtbaren_fokus.length) fehler.push(`ohne sichtbaren Fokus: ${e.tastatur.ohne_sichtbaren_fokus.join(', ')}`)

console.log(
  `Überbreite 360: ${e.ueberbreite_360} · 640: ${e.ueberbreite_640} · Bilder 2. Aufruf: ${e.bilder_zweiter_aufruf.gesamt - e.bilder_zweiter_aufruf.leer}/${e.bilder_zweiter_aufruf.gesamt} · ` +
    `Video: ${e.video.vorhanden ? (e.video.laeuft ? 'läuft' : 'steht') + ' (' + e.video.quelle + ')' : 'keins'} · Reduced Motion: ${e.reduced_motion_videoanfragen} Videoanfragen · ` +
    `Platzhalter: ${e.platzhalter.length ? e.platzhalter.join(', ') : 'keine'} · Tastatur: ${e.tastatur.elemente} Elemente, ${e.tastatur.ohne_sichtbaren_fokus.length} ohne sichtbaren Fokus · ` +
    `doppelte Motive: ${e.doppelte_motive.length ? e.doppelte_motive.join(', ') : 'keine'}`,
)
console.log(`Aufnahmen: ${ziel}/desktop-1440.png, ${ziel}/mobil-390.png`)
if (fehler.length) {
  console.log('Durchgefallen: ' + fehler.join(' · '))
  process.exit(1)
}
