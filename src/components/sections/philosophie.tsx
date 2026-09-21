import { Clock, Droplet, Heart, Leaf } from "lucide-react";
import { philosophie } from "@/inhalte/salon";

const symbole = {
  blatt: Leaf,
  tropfen: Droplet,
  herz: Heart,
  uhr: Clock,
} as const;

export function Philosophie() {
  return (
    <section
      id="philosophie"
      className="scroll-mt-24 bg-sand py-[var(--spacing-sektion)]"
    >
      <div className="inhalt">
        <p className="t-label">Meine Philosophie</p>
        <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
          <h2 className="t-titel max-w-[24ch]">
            Vier Dinge, auf die du dich bei jedem Termin verlassen kannst.
          </h2>

          <div className="self-end">
            <p className="t-label">Das Gefühl</p>
            <ul className="mt-4 space-y-1.5 text-tinte/75">
              {[
                "gesehen werden",
                "verstanden werden",
                "sich wohlfühlen",
                "loslassen",
                "strahlen",
              ].map((gefuehl) => (
                <li key={gefuehl} className="flex items-baseline gap-3">
                  <span aria-hidden className="text-kupfer-tief">
                    ♡
                  </span>
                  {gefuehl}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-14 grid gap-px border-t border-greige/60 sm:grid-cols-2 lg:grid-cols-4">
          {philosophie.map((punkt) => {
            const Symbol = symbole[punkt.symbol];
            return (
              <div
                key={punkt.titel}
                className="border-b border-greige/60 py-8 lg:border-r lg:border-b-0 lg:pr-8 lg:pl-8 lg:first:pl-0 lg:last:border-r-0"
              >
                <Symbol
                  size={26}
                  strokeWidth={1}
                  className="text-kupfer-tief"
                  aria-hidden
                />
                <dt className="font-display mt-5 text-2xl font-light">
                  {punkt.titel}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-tinte/80">
                  {punkt.text}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
