import Link from 'next/link'
import { salon, navigation } from '@/inhalte/salon'

export function SiteFooter() {
  return (
    <footer className="bg-tinte text-leinen">
      <div className="inhalt grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl leading-none tracking-[0.3em]">INNA</p>
          <p className="mt-2 text-[0.6rem] tracking-[0.36em] text-leinen/80 uppercase">
            Zeitlos schön
          </p>
          <p className="mt-6 max-w-[28ch] text-sm leading-relaxed text-leinen/70">
            Typgerechte Schönheit. Gesundes Haar. Ergebnisse, die zu dir passen.
          </p>
        </div>

        <nav aria-label="Fußzeile">
          <p className="text-[0.65rem] tracking-[0.18em] text-leinen/70 uppercase">Seite</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.map((punkt) => (
              <li key={punkt.ziel}>
                <a href={punkt.ziel} className="text-leinen/80 underline-offset-4 hover:underline">
                  {punkt.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[0.65rem] tracking-[0.18em] text-leinen/70 uppercase">Salon</p>
          <address className="mt-4 text-sm leading-relaxed text-leinen/80 not-italic">
            {salon.strasse}
            <br />
            {salon.plz} {salon.ort}
            <br />
            <a
              href={salon.instagram}
              className="mt-2 inline-block underline-offset-4 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {salon.instagramName}
            </a>
          </address>
          <ul className="mt-6 space-y-2 text-sm">
            <li>
              <Link href="/impressum" className="text-leinen/80 underline-offset-4 hover:underline">
                Impressum
              </Link>
            </li>
            <li>
              <Link
                href="/datenschutz"
                className="text-leinen/80 underline-offset-4 hover:underline"
              >
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-leinen/15 py-6">
        <p className="inhalt text-center text-xs text-leinen/70">
          Made with ❤️ by{' '}
          <a
            href="https://superbrand.marketing"
            className="underline-offset-4 hover:underline"
            rel="noreferrer"
          >
            SUPERBRAND.marketing
          </a>{' '}
          – Dein Superheld für deine Werbung.
        </p>
      </div>
    </footer>
  )
}
