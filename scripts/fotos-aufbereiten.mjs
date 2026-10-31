#!/usr/bin/env node
/**
 * Innas Originalfotos (projekt/fotos/original-2026-10-13/, nicht im Repo) → Web-Fassungen in public/arbeiten/.
 *
 * Dreht nach EXIF und schreibt ohne Metadaten (kein GPS, kein Gerät). Die Vorher/Nachher-Paare werden auf
 * 7:10 zugeschnitten, je Bild mit eigenem Ausschnitt: Kopf und Schulterlinie sollen in beiden Bildern an
 * derselben Stelle sitzen, sonst springt das Bild beim Ziehen des Reglers (design-plan.md, 21.09.2026).
 *
 * Die Portraits von Inna und Nursah (original-portraits-2026-10-31/) landen in public/team/.
 *
 *   node scripts/fotos-aufbereiten.mjs [--pruefbilder <ordner>]
 *
 * --pruefbilder legt je Paar ein Vergleichsbild an: vorher | nachher | beide zu 50 % überblendet.
 * Ausschnitt: x und y = linke obere Ecke, b = Breite, alles als Anteil am gedrehten Original.
 */
import sharp from 'sharp'
import { mkdirSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const quelle = 'projekt/fotos/original-2026-10-13'
const ziel = 'public/arbeiten'
const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : null
}
const pruefbilder = arg('pruefbilder')

/** Volle Höhe, mittig – der Ausgangspunkt für jeden Ausschnitt eines 3:4-Originals. */
const mittig = { x: 0.0333, y: 0, b: 0.9333 }

const paare = [
  // Paarauswahl von Inna, 31.10.2026. Scheitel, Kopfbreite und Mitte je Paar angeglichen, damit der Kopf beim Ziehen nicht springt
  { name: '1-blond', vorher: ['dc2c226b', { x: 0.159, y: 0, b: 0.72 }], nachher: ['b8e79bd1', { x: 0, y: 0.0265, b: 0.84 }] },
  { name: '2-farbe', vorher: ['4a560a01', { x: 0.069, y: 0.02, b: 0.9 }], nachher: ['24b1b8cf', { x: 0.1, y: 0, b: 0.785 }] },
  { name: '3-farbkorrektur', vorher: ['8ae59f8e', { x: 0.112, y: 0, b: 0.76 }], nachher: ['fa6e4356', { x: 0.035, y: 0.0175, b: 0.91 }] },
  { name: '4-tressen', vorher: ['ed0b2190', { x: 0.043, y: 0.0336, b: 0.88 }], nachher: ['60544736', { x: 0.1255, y: 0, b: 0.76 }] },
  { name: '5-schnitt-styling', vorher: ['072768a3', { x: 0.088, y: 0, b: 0.74 }], nachher: ['462fe25a', { x: 0.078, y: 0.099, b: 0.84 }] },
]

/**
 * Die Portraits kamen stark komprimiert (rund 800 px breit): nicht vergrößern, höhere Qualität, 7:10.
 * inna-frontal und nursah stehen im Team nebeneinander, die Augen liegen auf gleicher Höhe.
 */
const portraitQuelle = 'projekt/fotos/original-portraits-2026-10-31'
const portraits = [
  { datei: 'Inna-01.jpeg', ziel: 'inna-seitlich.jpg', ausschnitt: { x: 0, y: 0, b: 1 } },
  { datei: 'Inna-02.jpeg', ziel: 'inna-frontal.jpg', ausschnitt: { x: 0, y: 0.02, b: 1 } },
  { datei: 'Nursahs.jpeg', ziel: 'nursah.jpg', ausschnitt: { x: 0.14, y: 0.225, b: 0.86 } },
]

const dateien = readdirSync(quelle).filter((f) => !f.startsWith('._'))
const pfad = (id) => {
  const datei = dateien.find((f) => f.startsWith(id))
  if (!datei) throw new Error(`Foto ${id} fehlt in ${quelle}`)
  return join(quelle, datei)
}

const breite = 1120
const hoehe = 1600

async function zuschnitt(id, { x, y, b }) {
  const gedreht = await sharp(pfad(id)).rotate().toBuffer({ resolveWithObject: true })
  const { width, height } = gedreht.info
  const w = Math.round(width * b)
  const h = Math.round((w * 10) / 7)
  const left = Math.round(width * x)
  const top = Math.round(height * y)
  if (left + w > width || top + h > height) {
    throw new Error(`Ausschnitt von ${id} ragt über das Bild hinaus (${left}+${w}/${width}, ${top}+${h}/${height})`)
  }
  return sharp(gedreht.data).extract({ left, top, width: w, height: h }).resize(breite, hoehe)
}

for (const paar of paare) {
  const seiten = {}
  for (const seite of ['vorher', 'nachher']) {
    const [id, ausschnitt] = paar[seite]
    const datei = join(ziel, 'vorher-nachher', `${paar.name}-${seite}.jpg`)
    mkdirSync(dirname(datei), { recursive: true })
    seiten[seite] = await (await zuschnitt(id, ausschnitt)).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
    await sharp(seiten[seite]).toFile(datei)
    console.log('✓', datei)
  }

  if (pruefbilder) {
    mkdirSync(pruefbilder, { recursive: true })
    const klein = async (buf, opacity = 1) =>
      sharp(buf)
        .resize(420, 600)
        .ensureAlpha(opacity)
        .png()
        .toBuffer()
    await sharp({ create: { width: 1260, height: 600, channels: 4, background: '#ffffff' } })
      .composite([
        { input: await klein(seiten.vorher), left: 0, top: 0 },
        { input: await klein(seiten.nachher), left: 420, top: 0 },
        { input: await klein(seiten.vorher), left: 840, top: 0 },
        { input: await klein(seiten.nachher, 0.5), left: 840, top: 0 },
      ])
      .jpeg({ quality: 80 })
      .toFile(join(pruefbilder, `${paar.name}.jpg`))
  }
}

mkdirSync('public/team', { recursive: true })
for (const { datei, ziel: name, ausschnitt: { x, y, b } } of portraits) {
  const eingabe = join(portraitQuelle, datei)
  const { width, height } = await sharp(eingabe).metadata()
  const w = Math.round(width * b)
  const ausgabe = join('public/team', name)
  await sharp(eingabe)
    .extract({ left: Math.round(width * x), top: Math.round(height * y), width: w, height: Math.round((w * 10) / 7) })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(ausgabe)
  console.log('✓', ausgabe)
}
