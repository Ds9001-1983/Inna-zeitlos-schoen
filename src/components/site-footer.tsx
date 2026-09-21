export function SiteFooter() {
  return (
    <footer className="bg-tinte py-10 text-center text-leinen">
      <div className="inhalt">
        <p className="font-display text-xl tracking-[0.3em]">INNA – ZEITLOS SCHÖN</p>
        <p className="mt-3 text-[0.7rem] tracking-[0.18em] text-leinen/70 uppercase">
          Typgerechte Schönheit. Gesundes Haar. Ergebnisse, die zu dir passen.
        </p>
        <p className="mt-8 text-sm text-leinen/60">
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
