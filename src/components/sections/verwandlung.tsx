"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Der eine mutige Moment der Seite (docs/design-plan.md).
 * Bedienbar mit Maus, Finger und Tastatur – der Regler ist ein echtes
 * <input type="range">, das nur unsichtbar über dem Bildpaar liegt.
 *
 * Bilder und Text stammen aus Innas Instagram-Beitrag vom 26.07.2026.
 * Vor dem Live-Gang: Einwilligung der Kundin für Foto und Zitat einholen.
 */
export function Verwandlung() {
  const [position, setPosition] = useState(50);
  const [fokus, setFokus] = useState(false);

  return (
    <section
      id="verwandlung"
      className="relative z-0 bg-sand pt-[clamp(7rem,14vw,11rem)] pb-[var(--spacing-sektion)]"
    >
      <div className="inhalt grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-20">
        <div>
          <p className="t-label">Die Verwandlung</p>
          <h2 className="t-titel mt-4 max-w-[20ch]">
            Manchmal bedeutet eine Farbkorrektur nicht, heller zu werden.
          </h2>
          <p className="t-lead mt-5 text-tinte/80">
            Diese Kundin kam nach mehreren enttäuschenden Friseurbesuchen zu mir
            – das Haar strapaziert, die Längen unruhig. Noch mehr Blond wäre
            keine verantwortungsvolle Entscheidung gewesen. Zieh den Regler.
          </p>

          <blockquote className="mt-10 max-w-[34rem] border-l border-kupfer-tief pl-6">
            <p className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] leading-snug">
              &bdquo;Du hast mir nicht nur meine Haare gerettet, sondern mir
              auch mein Strahlen zurückgegeben.&ldquo;
            </p>
            <footer className="mt-3 text-sm text-tinte/60">
              Kundin nach der Farbkorrektur, Juli 2026
            </footer>
          </blockquote>
        </div>

        <figure>
          <div className="relative aspect-7/10 w-full overflow-hidden select-none">
            <Image
              src="/arbeiten/farbkorrektur-vorher.jpg"
              alt="Vor dem Termin: strohig aufgehelltes Haar mit harter Ansatzkante und ausgefransten Spitzen."
              fill
              sizes="(max-width: 1024px) 100vw, 82rem"
              className="object-cover"
            />

            <div
              className="absolute inset-0 transition-[clip-path] duration-150 ease-out"
              style={{ clipPath: `inset(0 0 0 ${position}%)` }}
            >
              <Image
                src="/arbeiten/farbkorrektur-nachher.jpg"
                alt="Nach der Farbkorrektur: dieselbe Länge mit eingebetteten hellen Partien, weichem Übergang und sichtbarer Tiefe."
                fill
                sizes="(max-width: 1024px) 100vw, 82rem"
                className="object-cover"
              />
            </div>

            <span className="pointer-events-none absolute bottom-4 left-4 bg-tinte/70 px-3 py-1 text-[0.65rem] font-medium tracking-[0.18em] text-leinen uppercase">
              vorher
            </span>
            <span className="pointer-events-none absolute right-4 bottom-4 bg-tinte/70 px-3 py-1 text-[0.65rem] font-medium tracking-[0.18em] text-leinen uppercase">
              nachher
            </span>

            {/* Trennkante und Griff folgen dem Reglerwert */}
            <div
              className="pointer-events-none absolute inset-y-0 w-px bg-leinen transition-[left] duration-150 ease-out"
              style={{ left: `${position}%` }}
            >
              <span
                className={`absolute top-1/2 left-1/2 block h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-kupfer-tief bg-leinen ${
                  fokus ? "ring-2 ring-kupfer-tief ring-offset-2" : ""
                }`}
              />
            </div>

            <label className="absolute inset-0 cursor-ew-resize">
              <span className="sr-only">
                Vergleich zwischen vorher und nachher – mit den Pfeiltasten
                verschiebbar
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={position}
                onChange={(event) => setPosition(Number(event.target.value))}
                onFocus={() => setFokus(true)}
                onBlur={() => setFokus(false)}
                className="h-full w-full cursor-ew-resize opacity-0"
                aria-valuetext={`${position} Prozent nachher sichtbar`}
              />
            </label>
          </div>

          <figcaption className="mt-6 max-w-[52ch] text-sm leading-relaxed text-tinte/70">
            Airtouch rückwärts: Die hellen Bereiche wurden gezielt eingebettet,
            harte Übergänge ausgeglichen, das Gesamtbild wieder ruhig aufgebaut.
            Mehr Tiefe, mehr Natürlichkeit, mehr Harmonie.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
