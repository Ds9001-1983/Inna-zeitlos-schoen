export function Rechtstext({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="bg-leinen py-[var(--spacing-sektion)]">
      <div className="inhalt max-w-[46rem]">
        <h1 className="t-titel">{titel}</h1>
        <div className="mt-10 space-y-8 text-tinte/80 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-light [&_h2]:text-tinte [&_p]:mt-2 [&_p]:leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  )
}

/** Sichtbar markierte Lücke – steht nur im Entwurf und muss vor dem Live-Gang gefüllt sein. */
export function Offen({ was }: { was: string }) {
  return (
    <span className="bg-sand px-2 py-0.5 text-sm text-tinte/80">[{was} – wird ergänzt]</span>
  )
}
