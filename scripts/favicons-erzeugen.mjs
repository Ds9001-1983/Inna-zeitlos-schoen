#!/usr/bin/env node
/**
 * src/app/icon.svg → src/app/favicon.ico (16, 32, 48 px) und src/app/apple-icon.png (180 px).
 *
 * Moderne Browser nehmen das SVG. Safari, der iPhone-Startbildschirm und manche Dienste fragen aber
 * nach /favicon.ico bzw. /apple-icon.png und zeigen ohne die Dateien gar kein Icon (03.11.2026).
 * Next.js bindet beide Dateien selbst ein. Nach jeder Änderung an icon.svg neu erzeugen:
 *
 *   node scripts/favicons-erzeugen.mjs
 *
 * Die ICO-Datei enthält PNG-Bilder statt Bitmaps – das verstehen alle aktuellen Browser.
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'node:fs'

const svg = readFileSync('src/app/icon.svg')
const png = (groesse) => sharp(svg, { density: 72 * (groesse / 32) * 4 }).resize(groesse, groesse).png().toBuffer()

const groessen = [16, 32, 48]
const bilder = await Promise.all(groessen.map(png))

// ICO-Kopf (6 Byte), je Bild ein Verzeichniseintrag (16 Byte), dann die PNG-Daten
const kopf = Buffer.alloc(6 + 16 * bilder.length)
kopf.writeUInt16LE(0, 0)
kopf.writeUInt16LE(1, 2)
kopf.writeUInt16LE(bilder.length, 4)
let versatz = kopf.length
bilder.forEach((bild, i) => {
  const eintrag = 6 + 16 * i
  kopf.writeUInt8(groessen[i], eintrag)
  kopf.writeUInt8(groessen[i], eintrag + 1)
  kopf.writeUInt16LE(1, eintrag + 4)
  kopf.writeUInt16LE(32, eintrag + 6)
  kopf.writeUInt32LE(bild.length, eintrag + 8)
  kopf.writeUInt32LE(versatz, eintrag + 12)
  versatz += bild.length
})
writeFileSync('src/app/favicon.ico', Buffer.concat([kopf, ...bilder]))
writeFileSync('src/app/apple-icon.png', await png(180))

console.log(`favicon.ico (${groessen.join(', ')} px) und apple-icon.png (180 px) in src/app/ geschrieben`)
