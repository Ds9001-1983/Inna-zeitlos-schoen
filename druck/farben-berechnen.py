#!/usr/bin/env python3
"""
Rechnet die Markenfarben aus docs/design-plan.md (sRGB) in CMYK um und schreibt farben.mjs.

  python3 farben-berechnen.py

Umrechnung mit littleCMS (PIL.ImageCms): sRGB -> ISO Coated v2 (ECI) bzw. ISO Coated v2 300 % (ECI),
relativ farbmetrisch mit Tiefenkompensierung. Die Werte werden auf ganze Prozent gerundet, Kanäle
unter 3 % fallen weg (so kleine Rasterpunkte druckt keine Maschine sauber).

"Tinte Text" ist keine neue Farbe, sondern die Separation von Tinte für kleine Schrift: reines K,
dessen gedrucktes L* dem gedruckten L* der vierfarbigen Tinte am nächsten kommt. Flyeralarm verlangt
Texte in Schwarz, weil vierfarbige Kleinschrift bei Passerschwankungen unscharf wird.
"""

import json
from pathlib import Path

from PIL import Image, ImageCms

HIER = Path(__file__).parent

# Quelle: docs/design-plan.md, Abschnitt Farben
TOKENS = {
    "leinen": "#F6F3EE",
    "sand": "#D8C8B5",
    "greige": "#B4ABA1",
    "kupfer": "#A56A43",
    "kupferTief": "#8F5A38",
    "kupferDunkel": "#6E4429",
    "kupferHell": "#C98A5E",
    "tinte": "#2F2F2F",
}

PROFILE = {
    "isoCoatedV2": HIER / "profile" / "ISOcoated_v2_eci.icc",
    "isoCoatedV2_300": HIER / "profile" / "ISOcoated_v2_300_eci.icc",
}

MINDEST_KANAL = 3  # Prozent

SRGB = ImageCms.createProfile("sRGB")
LAB = ImageCms.createProfile("LAB")
RELATIV = ImageCms.Intent.RELATIVE_COLORIMETRIC
BPC = ImageCms.Flags.BLACKPOINTCOMPENSATION


def hex_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def pixel(mode, wert):
    return Image.new(mode, (1, 1), wert)


def lab_aus_pil(px):
    # PIL speichert L als 0..255 und a/b mit Versatz 128
    l, a, b = px
    return round(l / 2.55, 1), a - 128, b - 128


def runden(cmyk_255):
    prozent = [round(v / 2.55) for v in cmyk_255]
    return [0 if p < MINDEST_KANAL else p for p in prozent]


def main():
    ergebnis = {"quelle": "docs/design-plan.md", "profile": {}}
    for name, pfad in PROFILE.items():
        cmyk_profil = ImageCms.getOpenProfile(str(pfad))
        zu_cmyk = ImageCms.buildTransform(SRGB, cmyk_profil, "RGB", "CMYK", RELATIV, BPC)
        zu_lab = ImageCms.buildTransform(cmyk_profil, LAB, "CMYK", "LAB", RELATIV)
        farben = {}
        for token, hexwert in TOKENS.items():
            roh = zu_cmyk.apply(pixel("RGB", hex_rgb(hexwert))).getpixel((0, 0))
            cmyk = runden(roh)
            lab = lab_aus_pil(
                zu_lab.apply(pixel("CMYK", tuple(round(v * 2.55) for v in cmyk))).getpixel((0, 0))
            )
            farben[token] = {"hex": hexwert, "cmyk": cmyk, "summe": sum(cmyk), "lab": lab}

        # Tinte Text: reines K mit dem L* der vierfarbigen Tinte
        ziel_l = farben["tinte"]["lab"][0]
        beste = None
        for k in range(50, 101):
            l = lab_aus_pil(zu_lab.apply(pixel("CMYK", (0, 0, 0, round(k * 2.55)))).getpixel((0, 0)))[0]
            if beste is None or abs(l - ziel_l) < abs(beste[1] - ziel_l):
                beste = (k, l)
        farben["tinteText"] = {
            "hex": TOKENS["tinte"],
            "cmyk": [0, 0, 0, beste[0]],
            "summe": beste[0],
            "lab": (beste[1], 0, 0),
            "hinweis": f"reines K, L* {beste[1]} gegen L* {ziel_l} der vierfarbigen Tinte",
        }
        ergebnis["profile"][name] = {"datei": pfad.name, "farben": farben}

    kopf = (
        "// ERZEUGT von farben-berechnen.py – nicht von Hand ändern.\n"
        "// Hex aus docs/design-plan.md, CMYK in Prozent je Flyeralarm-Profil (relativ farbmetrisch, Tiefenkompensierung).\n"
        "// tinteText = Separation von Tinte für kleine Schrift, reines K (keine neue Markenfarbe).\n"
    )
    (HIER / "farben.mjs").write_text(
        kopf + "export const farbtabelle = " + json.dumps(ergebnis, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    for name, p in ergebnis["profile"].items():
        print(f"\n{name} ({p['datei']})")
        for token, f in p["farben"].items():
            print(f"  {token:13} {f['hex']}  CMYK {str(f['cmyk']):18} Summe {f['summe']:3}%  L*a*b* {f['lab']}")


if __name__ == "__main__":
    main()
