"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const container = useRef<HTMLElement>(null);
  const lenis = useLenis();

  // Die eine orchestrierte Sequenz der Seite: Bild fährt auf, Zeilen steigen versetzt ein.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .from("[data-hero-bild]", {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.9,
          })
          .from(
            "[data-hero-zeile]",
            { y: 28, autoAlpha: 0, duration: 0.7, stagger: 0.12 },
            0.25,
          );
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative z-10 bg-leinen">
      <div
        data-hero-bild
        className="relative h-[46vh] min-h-[320px] w-full overflow-hidden lg:absolute lg:top-0 lg:right-0 lg:bottom-[-6rem] lg:h-auto lg:w-[46%] lg:min-h-0"
      >
        <Image
          src="/arbeiten/rueckansicht-hero.jpg"
          alt="Rückansicht einer Kundin: langes Haar, das vom dunklen Ansatz ohne harte Kante in helle, gewellte Spitzen übergeht."
          fill
          preload
          sizes="(max-width: 1024px) 100vw, 46vw"
          className="object-cover object-[50%_25%]"
        />
      </div>

      <div className="inhalt relative">
        <div className="py-14 lg:flex lg:min-h-[78vh] lg:w-[52%] lg:flex-col lg:justify-center lg:py-32">
          <h1 data-hero-zeile className="t-display">
            Zeitlos
            <br />
            schön.
          </h1>

          <p
            data-hero-zeile
            className="t-signatur mt-3 text-[clamp(1.75rem,3.6vw,2.75rem)] text-kupfer-tief"
          >
            So natürlich wie du.
          </p>

          <p data-hero-zeile className="t-lead mt-9">
            Ich nehme mir Zeit für dein Haar, deine Wünsche und deine
            Persönlichkeit – damit du den Salon nicht nur schöner, sondern auch
            mit einem guten Gefühl verlässt.
          </p>

          <div data-hero-zeile className="mt-10">
            <a
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault();
                const ziel = document.querySelector("#kontakt");
                if (ziel instanceof HTMLElement)
                  lenis?.scrollTo(ziel, { offset: -88 });
              }}
              className="inline-block bg-kupfer-tief px-9 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-leinen uppercase transition-colors hover:bg-tinte"
            >
              Termin anfragen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
