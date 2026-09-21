#!/usr/bin/env node
/**
 * Legt .next/cache als Symlink auf die interne Platte.
 *
 * Hintergrund: Dieses Repo liegt auf einem FAT32-Laufwerk. FAT32 kennt keine
 * erweiterten Attribute, deshalb legt macOS zu jeder Datei eine AppleDouble-Datei
 * "._<name>" daneben. Der Bild-Optimierer von Next liest das Eintrags-Verzeichnis
 * unter .next/cache/images/<hash>/ und nimmt die erste Datei - und "._…avif"
 * sortiert vor der echten Datei. Ergebnis: Ab dem zweiten Abruf liefert der Server
 * eine 4096 Byte grosse Muell-Datei statt des Bildes aus.
 *
 * next build loescht .next samt Symlink, deshalb laeuft das hier als prestart/predev.
 * Ausserhalb von macOS und ausserhalb von /Volumes passiert nichts - auf Vercel
 * ist der Aufruf wirkungslos.
 */
import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const projekt = process.cwd()
const betroffen = process.platform === 'darwin' && projekt.startsWith('/Volumes/')

if (!betroffen) {
  process.exit(0)
}

const ziel = join(homedir(), 'Library', 'Caches', 'inna-zeitlos-schoen-next')
const pfad = join(projekt, '.next', 'cache')

mkdirSync(ziel, { recursive: true })
mkdirSync(join(projekt, '.next'), { recursive: true })

if (existsSync(pfad)) {
  if (lstatSync(pfad).isSymbolicLink()) {
    process.exit(0)
  }
  rmSync(pfad, { recursive: true, force: true })
}

symlinkSync(ziel, pfad)
console.log(`.next/cache -> ${ziel} (FAT32-Umgehung)`)
