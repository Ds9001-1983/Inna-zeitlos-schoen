# Drucksachen: Schild und Visitenkarte

Stand: 23.09.2026 · Druckerei: Flyeralarm · Quelle der Fakten: `src/inhalte/salon.ts`
Farben und Schriften: `docs/design-plan.md`, Abschnitt „Revidiert 23.09.2026 – Drucksachen"

## Produkte

| | Schild vor dem Eingang | Visitenkarte |
|---|---|---|
| Flyeralarm-Produkt | Schilder mit Foliendruck im Wunschformat (Alu-Verbund, Folie, UV- und wetterfest) | Visitenkarte plano, Querformat, 4/4-farbig |
| Endformat | 600 × 500 mm quer | 85 × 55 mm quer |
| Datenformat (PDF-Seite) | 606 × 506 mm | 87 × 57 mm |
| Beschnitt | 3 mm – **Annahme**, Datenblatt der Bestellung prüfen | 1 mm (Datenblatt `vk_mass_q`) |
| Sicherheitsabstand | eigener Satzrand 30 mm | 3 mm |
| Farbprofil | ISO Coated v2 (ECI) – Werbetechnik, Digitaldruck | ISO Coated v2 300 % (ECI) |
| Datei | PDF/X-3:2002, CMYK, Output-Intent FOGRA39, Schriften eingebettet, keine Schnittmarken | ebenso, 2 Seiten: 1 = vorne, 2 = hinten |

Der Beschnitt des Schilds ist der einzige unbestätigte Wert. Flyeralarm liefert das Datenblatt für
Wunschformate erst im Konfigurator. Weicht es ab, ändert man `beschnitt` in `druck/formate.mjs` und
erzeugt neu. Satz und Prüfung passen sich an.

## Entwürfe

| Datei in `druck/ausgabe/` | Inhalt |
|---|---|
| `schild` | Mittelachse wie die Karte in Innas Entwurf, hell auf Leinen |
| `visitenkarte` | vorn Wortmarke auf Leinen, hinten Unterschrift, Beruf, Telefon, E-Mail, Web, Adresse, QR-Code |
| `visitenkarte-cognac-beige` | Innas Wunsch vom 24.09.2026: vorn Cognac (Kupfer tief) mit beiger Schrift (Leinen), hinten wie oben |
| `visitenkarte-cognac-schwarz` | vorn Cognac (Kupfer) mit schwarzer Schrift, überdruckt; hinten wie oben |

Module: `druck/entwuerfe/schild.mjs` und `druck/entwuerfe/visitenkarte.mjs`. Drei Richter (Marke,
Druck, Kundin) haben aus drei Schild- und zwei Kartenvarianten einstimmig ausgewählt. Die Begründung
steht im Design-Plan unter „Revidiert". Am 23.09.2026 hat Dennis entschieden: Das Schild wird hell
auf Leinen, die Karte eine Kontaktkarte. Die dunkle Fassung und die Terminkarte entfallen.
Für die Vorderseite der Karte wählt Inna noch zwischen Leinen, Cognac-Beige und Cognac-Schwarz.
Die beiden nicht gewählten Fassungen fliegen danach aus `visitenkarte.mjs`.

Wie der Satz auf echte Angaben reagiert (getestet am 23.09.2026 mit typischen, langen und
überlangen Werten):

- **Schild:** Bis drei Zeilen Öffnungszeiten stehen im normalen Takt, bei vier Zeilen wird es enger.
  Ab fünf Zeilen bricht der Satz mit einer Meldung ab. Dann die Tage zusammenfassen, z. B.
  „Di – Fr". Passen Telefon und Website nicht in eine Zeile, stehen sie zentriert untereinander.
- **Kontaktkarte:** Reichen E-Mail oder Website bis an den QR-Code, rückt er nach oben rechts neben
  die Unterschrift.
- Was auch so nicht passt, bricht mit einer Meldung ab, die Maß und Platz nennt. Die übrigen Produkte
  entstehen trotzdem.
- Schmale Leerzeichen, geschützte Bindestriche und ein versehentliches `https://` werden bereinigt.
  Zeichen, die eine Schrift nicht hat, brechen den Satz ab, statt als Kasten gedruckt zu werden.

## Befehle

```sh
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"
npm --prefix druck ci                  # einmalig: pdfkit, qrcode
sh druck/profile/laden.sh              # einmalig: ECI-Profile (nicht im Repo)
python3 druck/farben-berechnen.py      # nur wenn sich eine Farbe im Design-Plan ändert

npm --prefix druck run entwurf         # Entwürfe mit Platzhaltern + Vorschau → druck/ausgabe/entwurf/
npm --prefix druck run final           # Druck-PDFs (PDF/X-3) → druck/ausgabe/final/
npm --prefix druck run pruefen         # Preflight der Druck-PDFs
```

`final` bricht ab und nennt die Felder, solange ein Pflichtfeld in `salon.ts` leer ist. Platzhalter
gelangen nie in eine Druckdatei.

## Offene Angaben

| Feld in `salon.ts` | Schild | Visitenkarte |
|---|---|---|
| `telefon` | Pflicht | Pflicht |
| `email` | – | Pflicht |
| `domain` (Website, auch für den QR-Code) | Pflicht | Pflicht |
| `oeffnungszeiten` | Pflicht | – |

Instagram steht auf keiner Drucksache, bis Innas eigenes Profil im Auftrag steht.

## Was `pruefen` misst

- MediaBox = Datenformat, TrimBox = Endformat
- alle Schriften eingebettet
- nur DeviceCMYK und nur die CMYK-Werte aus `druck/farben.mjs`
- Farbauftrag höchstens 300 %, keine Transparenz
- PDF/X-3 mit Output-Intent FOGRA39
- Satzregeln aus dem Register:
  - nichts im Sicherheitsabstand
  - Schrift ≥ 6 pt; unter 12 pt nur reines K oder Leinen-Aussparung ab 7 pt
  - Linien ≥ 0,25 pt (K) bzw. 0,5 pt (farbig)
  - Mindest-Versalhöhen auf dem Schild
  - jeder Text stammt aus `druck/inhalte.mjs`
  - nichts überschneidet sich (Text, QR-Code samt Ruhezone, Punkte), QR-Module ≥ 0,4 mm
- ob die Druck-PDFs noch zum Stand von `salon.ts` passen. Eine geänderte Nummer macht sie „veraltet".

`final` schreibt nur regelkonforme Druck-PDFs und entfernt vorher die Dateien früherer Läufe. Nach
einem Abbruch liegt also nichts Veraltetes in `druck/ausgabe/final/`.

## Bestellung – Empfehlung

- **Schild:** matte Laminierung statt glänzend. Das Schild hängt draußen, Glanz spiegelt Himmel
  und Straße. Montage (Bohrungen, Abstandshalter, Schiene) vor der Bestellung mit Inna klären. Der
  Satzrand von 30 mm hält die Ecken frei.
- **Visitenkarte:** matt gestrichenes Papier ab 300 g/m² (Bilderdruck matt), ohne Glanzlack. Das
  passt zur ruhigen Marke und zum Flyeralarm-Profil ISO Coated v2 300 %.

## Vor dem Upload

1. Pflichtfelder in `src/inhalte/salon.ts` gefüllt, `npm --prefix druck run final` läuft durch.
2. `npm --prefix druck run pruefen` ohne ✗.
3. Beschnitt des Schilds gegen das Datenblatt der Bestellung.
4. Vorschau-PNGs aus `druck/ausgabe/final/` einmal mit Inna ansehen (Telefonnummer, Zeiten, Domain).
