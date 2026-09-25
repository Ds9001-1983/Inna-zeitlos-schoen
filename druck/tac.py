#!/usr/bin/env python3
"""
Farbprüfung einer Druck-PDF – aufgerufen von pruefen.mjs.

  python3 tac.py <pdf> <icc-profil> '<json: erlaubte CMYK-Werte in Prozent>'

Gibt JSON aus:
  farbauftragMax   höchster Farbauftrag je Pixel in Prozent (gs-Rendering tiff32nc, 150 dpi bzw. 30 dpi)
  cmykWerte        alle im Inhalt gesetzten CMYK-Farben (Prozent)
  fremdeWerte      CMYK-Werte, die nicht in farben.mjs stehen
  andereFarbraeume RGB- oder Grau-Operatoren (dürfen in PDF/X-3 mit CMYK-Ausgabe nicht vorkommen)
  transparenz      Hinweise auf Transparenz (SMask, CA/ca < 1, Füllmethoden)
  outputIntent     Kennung des Output-Intents, falls vorhanden
"""

import json
import re
import subprocess
import sys
import tempfile
import zlib
from pathlib import Path

from PIL import Image

ZAHL = rb"(-?\d*\.?\d+)"
CMYK_OP = re.compile(ZAHL + rb"\s+" + ZAHL + rb"\s+" + ZAHL + rb"\s+" + ZAHL + rb"\s+(k|K|sc|SC|scn|SCN)\b")
RGB_OP = re.compile(ZAHL + rb"\s+" + ZAHL + rb"\s+" + ZAHL + rb"\s+(rg|RG)\b")
GRAU_OP = re.compile(rb"(?<![\d.])" + ZAHL + rb"\s+(g|G)\b")


def stroeme(daten):
    for m in re.finditer(rb"(?<!end)stream\r?\n", daten):
        start = m.end()
        ende = daten.find(b"endstream", start)
        if ende < 0:
            continue
        roh = daten[start:ende]
        try:
            yield zlib.decompress(roh)
        except zlib.error:
            yield roh


def ist_inhalt(strom):
    """Seiteninhalt erkennen: Zeichenoperatoren vorhanden, keine Schrift- oder ICC-Datei.
    Textstrings können binäre Glyphen-IDs enthalten, deshalb nur grob auf ASCII prüfen."""
    if not strom or strom[:4] in (b"\x00\x01\x00\x00", b"true", b"OTTO") or b"acsp" in strom[:64]:
        return False
    druckbar = sum(1 for b in strom[:4000] if 9 <= b <= 126)
    operatoren = re.search(rb"(\sre\s|\sBT\s|\sTf\s|\s[mlc]\s|\s[fSB]\s)", strom)
    return druckbar / min(len(strom), 4000) > 0.8 and operatoren is not None


def main():
    pdf, icc, erlaubt_json = sys.argv[1], sys.argv[2], sys.argv[3]
    erlaubt = [tuple(w) for w in json.loads(erlaubt_json)]
    daten = Path(pdf).read_bytes()

    cmyk, rgb, grau = set(), 0, 0
    for strom in stroeme(daten):
        if not ist_inhalt(strom):
            continue
        for m in CMYK_OP.finditer(strom):
            werte = tuple(round(float(m.group(i)) * 100, 1) for i in range(1, 5))
            if all(0 <= v <= 100 for v in werte):
                cmyk.add(werte)
        rgb += len(RGB_OP.findall(strom))
        grau += len(GRAU_OP.findall(strom))

    fremd = [w for w in cmyk if not any(all(abs(a - b) <= 0.6 for a, b in zip(w, e)) for e in erlaubt)]

    transparenz = []
    for muster, name in [(rb"/SMask\s*<<", "SMask"), (rb"/BM\s*/(?!Normal|Compatible)", "Füllmethode"), (rb"/(CA|ca)\s+0?\.\d+", "Deckkraft < 1")]:
        if re.search(muster, daten):
            transparenz.append(name)

    intent = re.search(rb"/OutputConditionIdentifier\s*\(([^)]*)\)", daten)
    pdfx = re.search(rb"/GTS_PDFXVersion\s*\(([^)]*)\)", daten)

    # Farbauftrag: CMYK-Rendering ohne Farbumrechnung
    groesse = Path(pdf).stat().st_size
    with tempfile.TemporaryDirectory() as tmp:
        muster = str(Path(tmp) / "seite-%d.tif")
        seiten_mm = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
        breit = float(re.search(r"Page size:\s+([\d.]+)", seiten_mm).group(1)) / 72 * 25.4
        dpi = 150 if breit < 200 else 30
        subprocess.run(
            ["gs", "-q", "-dSAFER", "-dBATCH", "-dNOPAUSE", "-sDEVICE=tiff32nc", f"-r{dpi}",
             f"--permit-file-read={Path(icc).parent}/", f"-sDefaultCMYKProfile={icc}", f"-sOutputICCProfile={icc}",
             f"-sOutputFile={muster}", pdf],
            check=True,
        )
        maximum = 0
        for tif in sorted(Path(tmp).glob("seite-*.tif")):
            bild = Image.open(tif).convert("CMYK")
            kanaele = [list(k.getdata()) for k in bild.split()]
            for c, m, y, k in zip(*kanaele):
                s = c + m + y + k
                if s > maximum:
                    maximum = s

    print(json.dumps({
        "farbauftragMax": round(maximum / 2.55, 1),
        "renderDpi": dpi,
        "cmykWerte": sorted(cmyk),
        "fremdeWerte": sorted(fremd),
        "andereFarbraeume": {"rgb": rgb, "grau": grau},
        "transparenz": transparenz,
        "outputIntent": intent.group(1).decode("latin1") if intent else None,
        "pdfx": pdfx.group(1).decode("latin1") if pdfx else None,
        "dateigroesseKb": round(groesse / 1024),
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
