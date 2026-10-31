# Design-Plan: INNA – Zeitlos schön

Stand: 21.09.2026, in die v4-Form gebracht · Grundlage: `projekt/auftrag.md`, `projekt/vorlagen/`,
`projekt/referenzen/notizen.md`, `docs/material-inventar.md` · Projektart: Business-Seite

Keine Farbe, keine Schrift und keine Bewegung im Code, die nicht hier steht.
Änderungen zuerst hier eintragen (Abschnitt „Revidiert" am Ende).

---

## Maßstab

Vollbild-Hero mit Text unten links auf Bewegtbild wie Muster 3 und 5 (Display-Text auf dem Foto).
Flächenwechsel Sand/Leinen je Abschnitt wie Muster 1. Werkgalerie als Reihe mit Titel, Technik und
Datum darunter wie Muster 1 und 2. Diptychon für die Verwandlung wie das FEMALE/MALE-Paar in Muster 1.
Preisliste als Linien-Tabelle wie Muster 3, Vollbild-Bildkapitel wie Muster 6, Adresse und Termin-Knopf
im Header wie Muster 8. Mobil eigene Reihenfolge und ein Knopf je Abschnitt wie Muster 2.
**Eigen:** die Rückansicht als Leitmotiv – bei einer Farbspezialistin ist die Länge das Portfolio;
kein Muster zeigt das. Nicht übernommen: Muster 4 und 7 (Karten-Kit, SaaS-Grammatik).

---

## Vorlage

Der Seitenentwurf der Kundin ist die Spezifikation: Hero → Über mich → Leistungen (vier Kacheln) →
Team „Inna & Nursah" → Philosophie (vier Werte) → Abschluss „Bereit für dein neues Haargefühl?".
Das Brand-Board füllt Farben, Schriften, Vokabular. Ergänzt aus dem Fragenkatalog (B1): Verwandlung,
Arbeiten, Preise, Kontakt, dazu Impressum und Datenschutz.

Abweichungen von der Vorlage, jede mit Grund:

| Vorlage | Seite | Grund |
|---|---|---|
| Hero mit Portrait von Inna | Bewegtbild aus der Rückansicht einer Kundin | kein Portrait vorhanden (Material) – Portrait bleibt offener Punkt |
| Teamfoto Inna & Nursah | Stellvertreterbild (Salonlicht) neben dem Text | kein Teamfoto (Material) |
| Knopf „Termin buchen" | „Termin anfragen" | kein Buchungssystem – der Knopf verspricht nur, was passiert |
| Kacheln mit Haar-Nahaufnahmen | Textur-Ausschnitte derselben Fotos, die die Galerie ganz zeigt | neun Fotos für sechzehn Plätze |

---

## Farben

Quelle: Brand-Board. Die dunkleren Schwestern sind Kontrastvarianten, keine neuen Markenfarben.

| Token | Hex | Rolle | Kontrast |
|---|---|---|---|
| Leinen | `#F6F3EE` | Grundfläche | – |
| Sand | `#D8C8B5` | zweite Fläche, Wechsel je Abschnitt | – |
| Greige | `#B4ABA1` | nur Haarlinien und Rahmen, nie Text | 2,04:1 auf Leinen – als Text gestrichen |
| Kupfer | `#A56A43` | Marke: Flächen, Symbole, Linien | 3,98:1 auf Leinen – nicht für Fließtext |
| Kupfer tief | `#8F5A38` | Text, Links, Knöpfe auf Leinen | 5,2:1 |
| Kupfer dunkel | `#6E4429` | Labels (11 px) auf Sand | AA – Kupfer tief kam auf Sand nur auf 3,5:1 |
| Kupfer hell | `#C98A5E` | Kupfer auf Tinte und auf dem Video (Signaturzeile) | 4,34:1 auf dem Video, gemessen |
| Tinte | `#2F2F2F` | Fließtext, Überschriften, Fußzeile | 12,6:1 auf Leinen |

Textabstufungen: Tinte/80 für Nebentext, Leinen/70 in der Fußzeile – nichts darunter.

---

## Typografie

- **Display, Titel, Aussage – Cormorant Garamond** 300/400 mit Kursiv (`style: ['normal', 'italic']`).
  Ihre Strichstärke ist selbst ein Verlauf, wie ein Farbübergang im Haar.
- **Fließtext, Labels – Montserrat** 300/400/500.
- **Signatur – Parisienne**, genau zwei Einsätze: die zweite Hero-Zeile und Innas Unterschrift.

Fünf Grade mit echtem Sprung: Fließtext 16 px (`.t-lead` 17 px) · Aussage `clamp(1.5rem, 2.6vw, 2.25rem)` ·
Titel `clamp(2.25rem, 5.6vw, 4.75rem)` · Display `clamp(3.5rem, 11vw, 9.5rem)` · Label 11 px Versalien,
Laufweite 0,18em. Zeilenlänge höchstens 66 Zeichen, `text-wrap: balance` auf Überschriften, weiche
Trennstellen in langen Komposita. Der Hero-Umbruch ist gesetzt: „Zeitlos / schön."

---

## Raster

`.inhalt` (max. Breite, Innenabstand), `.raster` mit 6 Spalten am Handy und 12 ab 64 rem, `.randlos` für
Bildkapitel und den Auslauf der Galerie. Alle Abschnitte sitzen auf derselben linken Kante, durchgehend
linksbündig – Preisliste, Leistungen und Zeiten werden gelesen, nicht betrachtet.

---

## Abschnittsfolge und Höhen

Hero (Kapitel: `100svh − Header`, min. 560 px, Video) → Verwandlung (Sand) → Arbeiten (Leinen) →
Über mich (Sand) → Leistungen (Leinen) → Bildkapitel (Kapitel: `min(72vh, 640px)`, Vollbild) →
Team (Leinen) → Philosophie (Sand) → Preise (Leinen) → Kontakt (Sand) → Fußzeile (Tinte).

Erzählung: Beweis (Verwandlung, Arbeiten) vor Person (Über mich) vor Leistung vor Weg zum Termin.
Höhen: „normal" = `--spacing-sektion` `clamp(5rem, 10vw, 9rem)`, „Kapitel" = Hero und Bildkapitel.
Die Stufe „knapp" ist nicht in Gebrauch – Preise und Philosophie laufen normal; wer sie braucht, trägt
sie zuerst hier ein. Rhythmus: Sand und Leinen im Wechsel, zwei dunkle Kapitel als Takt.

---

## Bildhaushalt

Aus `docs/material-inventar.md`: neun Fotos (acht Instagram-Ausschnitte, eine Rückansicht), alle auf 4K
hochskaliert und mit 1687 × 2400 px ausgeliefert; `next/image` liefert AVIF/WebP.

| Ort | Motiv | Format |
|---|---|---|
| Hero | Rückansicht → Video (Kling), Standbild = LCP | Vollbild |
| Verwandlung | Farbkorrektur vorher / nachher | 7:10, Diptychon |
| Arbeiten | acht Arbeiten mit Titel, Technik, Datum | 7:10, Reihe |
| Über mich | Strähne in Innas Hand | 7:10 |
| Leistungen | Textur-Ausschnitte von vier Galerie-Fotos (`ausschnitt` in `salon.ts`) | 7:10 |
| Bildkapitel | Farbtransformation als Textur | Vollbild |
| Team | Salonlicht als Stellvertreter, bis das Teamfoto da ist | 7:10 |

Bekannte Doppelungen: Farbkorrektur-nachher, Strähne, Salonlicht, Farbtransformation – neun Fotos für
sechzehn Plätze. Aufgelöst wird das mit dem Shooting (Portraits, Team, Salon), siehe `docs/pruefung.md` B4.

---

## Signature Moves

- **16 Bewegtes Hero-Bild** – Hero. Muster 3 und 5 öffnen mit Vollbild und Text darauf; das Material
  trägt es erst nach der Hochskalierung. Ping-Pong-Loop, WebM 992 KB, MP4 als Rückfall, Standbild als
  LCP, bei reduzierter Bewegung wird kein Video angefragt. *Grad: lang.*
- **01 Split-Text Reveal** – Hero-Titel als Timeline (Bild aus der Maske, drei Zeilen versetzt, 900 ms),
  alle Abschnittstitel zeilenweise aus der Maske; Bilder werden einmalig aus einer Maske aufgedeckt
  (`ZeilenReveal`, `BildReveal`). Muster 1 und 2 arbeiten mit Zeilen-Reveals. *Grad: kurz, Bilder minimal.*
- **17 Werkgalerie mit Schnapp-Scrollen** – Arbeiten, nach der Verwandlung. Muster 1 und 2 zeigen
  Arbeiten als Reihe mit Titeln darunter. Nativ am Handy, Pfeile am Rechner, `scroll-pl` auf der
  Rasterkante.

Nicht gewählt und nicht gebaut: 05 magnetische Knöpfe, 06 eigener Zeiger, 07 Laufband, 13 Parallax.
Diptychon, Bildkapitel und die Termin-Leiste am Handy sind Layout und Mobilstrategie, keine Moves.

---

## Text auf Bild oder Video

Hero: ein Verlauf von unten trägt den Textblock, einer von links die Schriftseite, rechts bleibt das
Haar hell und offen. Bildkapitel: Verlauf von links für die Aussage. Jedes Textelement auf Bild trägt
`data-auf-bild`; `npm run qa:kontrast` misst pixelweise je Zeile an vier Zeitpunkten des Videos.
Stand 21.09.2026: Titel 6,75:1, Signaturzeile 4,34:1 (nötig 3:1), Lead 8,60:1 (nötig 4,5:1).

---

## Tokens

`src/app/globals.css`: Farben als `--color-*` im `@theme inline`, shadcn-Tokens auf die Marke gemappt;
Schriften über `next/font` an `--font-display`, `--font-sans`, `--font-signatur`; Skala als `.t-display`,
`.t-titel`, `.t-aussage`, `.t-lead`, `.t-label`, `.t-signatur`; Raster `.inhalt`, `.raster`, `.randlos`;
eine Hover-Grammatik `.link`; `--spacing-sektion`; `prefers-reduced-motion` schaltet Übergänge und das
Video ab.

---

## Revidiert

**30.10.2026 – Innas finale Texte, Vorher/Nachher zurück, zwei Wege zum Termin (Inna, über Dennis).**
Layout, Farben und Gestaltung bleiben; Innas Texte ersetzen die bisherigen und sind auf die Abschnitte
verteilt. Neue Folge: Hero → Über uns (Sand) → Leistungen (Leinen) → Vorher & Nachher (Sand) →
Bildkapitel → Team (Leinen) → Philosophie (Sand) → Neu bei uns (Leinen) → Termine (Sand) → Fußzeile.
- *Wir-Form statt Ich-Form.* Inna und Nursah treten als Team auf; Navigation „Über uns“, „Unsere Leistungen“.
- *Vorher & Nachher als Regler, wieder.* Am 21.09. war der Wischregler gestrichen, weil die beiden Fotos
  verschieden gerahmt waren. Jetzt sind sechs Paare aus Innas neuen Fotos so zugeschnitten
  (`scripts/fotos-aufbereiten.mjs`), dass Scheitel und Haarbreite übereinanderliegen. Der Regler ist
  derselbe wie damals (`<input type="range">`, Griff mit Kupfer-Haarlinie). Neu: sechs Vorschaubilder zur
  Auswahl, am Handy als Wischreihe unter dem Regler.
- *Leistungen:* fünf Kacheln (Blond, Farbe, Farbkorrekturen, Tressen, Schnitt & Styling) aus Innas neuen
  Fotos, darunter eine Aufklappliste (`<details>`): Titel und Innas erster Satz offen, der Rest auf Wunsch.
  Einzige neue Bewegung: Das Plus dreht beim Öffnen um 45° (300 ms, entfällt bei reduzierter Bewegung).
  Am Handy läuft die fünfte Kachel quer über beide Spalten.
- *Über uns* zeigt eine neue Arbeit statt der Strähne. *Team:* längerer Text, das Bild steht am Rechner
  fest (sticky), die Wortmarke steht jetzt unter „Das sind wir.“
- *Philosophie:* Die vier Werte mit Symbolen und „Das Gefühl“ entfallen; die Linienreihe trägt Innas drei
  „sagen wir“-Sätze, ohne Symbole. Ihr Schlusssatz steht in Cormorant Kursiv, samt „😉“.
- *Bildkapitel:* Innas Satz „Mit Erfahrung … Sondern sich auch morgen noch nach dir anfühlen.“ statt
  „Ein Ort zum Ankommen“. Lead auf Bild gemessen: 5,35:1 (1440 px), 5,62:1 (390 px).
- *Termine:* Neukundinnen fragen per WhatsApp einen Beratungstermin an, Stammkundinnen buchen online
  (Knopf erscheint, sobald der Link in `salon.ts` steht). Knöpfe für Telefon und E-Mail entfallen,
  Nummer und Adresse stehen in der Fußzeile. Der Ablauf 01–03 ist jetzt Innas „Deine persönliche
  Beratung“ im neuen Abschnitt „Neu bei uns“.
- Keine neue Farbe, keine neue Schrift.

**21.10.2026 – Visitenkarte im Design des Schilds (Dennis).**
Die Karte ist jetzt beidseitig Cognac mit Tiefschwarz (K 100, überdruckt), Cormorant Regular und
Montserrat Medium wie auf dem Schild. Die drei Vorderseiten-Fassungen (Leinen, Cognac-Beige,
Cognac-Schwarz mit K 94) entfallen. Auf der Rückseite steht oben Innas Satz „Du bist zeitlos schön.“ in Cormorant Kursiv 17 pt (ihr Wunsch: nicht zweimal der Name) statt als
Parisienne-Unterschrift, weil Inna die Unterschrift auf der Website gestrichen hat. Die Telefonnummer ist
mit 10 pt Medium die stärkste Zeile, die Kleinschrift steht in 9 statt 8 pt, weil Tiefschwarz auf
Cognac (3,8:1) weniger Kontrast hat als Tinte auf Leinen. E-Mail, Website und QR-Code sind optional.
Damit ersetzt dieser Eintrag die frühere Begründung „Rückseite bleibt Leinen“ (24.09.).
Nachtrag am selben Tag: Beruf und Schwerpunkt sind von der Rückseite gestrichen. Dazu gekommen sind
E-Mail, Website und rechts der QR-Code auf die Website, Tiefschwarz auf Cognac.

**19.10.2026 – Schild wie die Karte (Inna, 13.10.2026: „Schild wie Karte", Schrift dunkler).**
Das Schild zeigt nur noch die Wortmarke auf Cognac (Kupfer), in den Proportionen der
Kartenvorderseite Cognac-Schwarz. Claim, Leistungen, Öffnungszeiten und Kontakt entfallen.
- *Dunkler:* Die Schrift ist reines K 100 statt K 94 und wird überdruckt. Auf dem Kupfer druckt das ein
  warmes Tiefschwarz mit L* 13 statt 17 (3,8:1 statt 3,4:1 gegen den Grund). Vierfarbiges Tiefschwarz
  käme nur auf L* 12, dafür mit Blitzer-Gefahr. Dazu kommen kräftigere Schnitte: Cormorant Regular statt
  Light, Montserrat Medium statt Regular.
- *Neues Druck-Token `schwarz`* (K 100). Es ist keine neue Markenfarbe, sondern Tinte in der dunkelsten
  Fassung, nur zum Überdrucken auf Kupfer. Erzeugt von `druck/farben-berechnen.py`.
- Die Mindest-Versalhöhe der Wortmarke auf dem Schild sinkt von 80 auf 50 mm. INNA steht wie auf der
  Karte bei rund der halben Schildbreite (51 mm) und ist damit gut 15 m weit lesbar.

**19.10.2026 – Korrekturrunde von Inna (Anmerkungen auf der Preview vom 13.10., über Dennis).**
Die Seite wird kürzer: Hero → Über mich → Leistungen → Bildkapitel → Team → Philosophie → Kontakt.
- *Gestrichen:* Die Verwandlung (Diptychon samt Kundenstimme), Die Arbeiten (Werkgalerie, Move 17) und
  die Preise (Linien-Tabelle). Damit entfallen in der Navigation „Arbeiten“ und „Preise“. Der Hero-Link
  heißt jetzt „Leistungen ansehen“. Die Abschnittsfolge, der Bildhaushalt und Move 17 weiter oben sind damit überholt.
- *Leistungen:* Die Überschrift heißt „Haar, was zu dir passt.“ (Wortlaut von Inna). Die vier Kacheln
  stehen ohne Titel und Beschreibung, also als reine Bildreihe. Die Titel bleiben im Alt-Text und auf dem Schild.
- *Über mich:* Die Wortmarke ersetzt die Unterschrift „Inna ♡“, gleiche Schriften, nur größer
  (`Wortmarke groesse="gross"`). Parisienne kommt damit nur noch in der Hero-Zeile vor.
  Das Foto (Strähne) bleibt, bis Inna einen Ersatz schickt.
- *Kontakt:* Der Text beginnt mit dem Neukunden-Termin: erst das Gespräch, ca. 30 Minuten. Der Satz zum
  Online-Kalender und „in zwei Minuten“ sind raus.
- Keine neue Farbe, Schrift oder Bewegung.

**24.09.2026 – Innas Wunsch: Visitenkarte vorn in Cognac, mit beiger oder schwarzer Schrift.**
Keine neue Farbe. Cognac sind die beiden Kupfer-Töne, und jede Schriftfarbe bekommt den Ton, auf dem
sie lesbar bleibt:
- *Beige* ist Leinen (Creme) auf Kupfer tief, 5,2:1. Sand wäre echtes Beige, kommt auf Kupfer tief
  aber nur auf 3,5:1, und ZEITLOS SCHÖN mit 8,6 pt würde als vierfarbige Tönung unsauber. Weil die
  Schrift ausgespart wird, stehen die Schnitte hier eine Stufe kräftiger: Cormorant 400 und
  Montserrat 500. Feinere Haarstriche würden im Druck zulaufen.
- *Schwarz* ist reines K auf dem helleren Kupfer, 3,0:1. Auf Kupfer tief wären es nur 2,3:1. Die
  Schrift wird überdruckt statt ausgespart (Flyeralarm-Empfehlung für kleine schwarze Schrift). So
  entstehen keine Blitzer, und es druckt ein warmes Tiefbraun (20/53/70/94, 237 %).

Die Rückseite bleibt in allen Fassungen Leinen. Dort stehen 8-pt-Kleinschrift und der QR-Code, und
beide brauchen hellen Grund. Inna wählt zwischen Leinen, Cognac-Beige und Cognac-Schwarz.

**23.09.2026 – Entscheidung Drucksachen (Dennis):** Das Schild wird hell auf Leinen, die Karte eine
Kontaktkarte. Die dunkle Schildfassung und die Terminkarte entfallen. Dadurch gibt es auf Papier
kein Kupfer hell mehr, und die Unterschrift ist das einzige Kupfer der Kartenrückseite.

**23.09.2026 – Drucksachen: Schild 600 × 500 mm und Visitenkarte 85 × 55 mm (Flyeralarm):**

Keine neue Farbe und keine neue Schrift. Die Tokens oben gelten auf Papier weiter, dazu ihre
CMYK-Separation. Gerechnet mit littleCMS, relativ farbmetrisch mit Tiefenkompensierung
(`druck/farben-berechnen.py` → `druck/farben.mjs`). Kanäle unter 3 % entfallen.

| Token | ISO Coated v2 (ECI) – Schild | ISO Coated v2 300 % (ECI) – Karte |
|---|---|---|
| Leinen | 4 / 4 / 7 / 0 | 4 / 4 / 7 / 0 |
| Sand | 16 / 20 / 29 / 3 | 15 / 19 / 28 / 4 |
| Greige | 29 / 27 / 32 / 9 | 28 / 26 / 31 / 11 |
| Kupfer | 22 / 55 / 71 / 26 | 20 / 53 / 70 / 28 |
| Kupfer tief | 28 / 58 / 74 / 35 | 24 / 56 / 72 / 38 |
| Kupfer dunkel | 36 / 64 / 78 / 50 | 31 / 60 / 74 / 54 |
| Kupfer hell | 14 / 47 / 63 / 11 | 13 / 47 / 62 / 13 |
| Tinte (Flächen, Schrift ab 12 pt) | 71 / 61 / 58 / 67 | 65 / 55 / 52 / 71 |
| Tinte Text (Schrift unter 12 pt) | 0 / 0 / 0 / 94 | 0 / 0 / 0 / 94 |

- *Tinte Text* ist keine neue Farbe, sondern die Separation von Tinte für Kleinschrift. Es ist
  reines K mit demselben gedruckten L\* (24) wie die vierfarbige Tinte. Flyeralarm verlangt Texte in
  Schwarz, weil vierfarbige Kleinschrift bei Passerschwankungen unscharf wird.
- *Kupfer auf Papier* nur für Flächen, Linien ab 0,5 pt und Schrift ab 12 pt. Kleinschrift auf
  dunklem Grund nur als Leinen-Aussparung ab 7 pt.
- *Cormorant auf dem Schild in 400, nicht 300.* Die Haarstriche des Light-Schnitts brechen draußen
  auf Distanz weg. Mindest-Versalhöhen für 2–6 m Leseabstand: Wortmarke 80 mm, Leistungen 20 mm,
  Angaben 15 mm, Labels 12 mm, Claim (Parisienne) 12 mm x-Höhe.
- *Parisienne behält ihre zwei Rollen:* auf dem Schild der Claim „So natürlich wie du." wie die
  zweite Hero-Zeile, auf der Karte Innas Unterschrift wie in „Über mich".
- *Keine Fotos.* Die Einwilligungen der Kundinnen fehlen, und Außenwerbung ginge über die Website
  hinaus. Die Drucksachen sind rein typografisch, wie die Karte in Innas eigenem Seitenentwurf.
- *ZEITLOS SCHÖN auf Papier in Montserrat 400 statt 500.* Die Website setzt 500 in tinte/70. Papier
  kennt keine Deckkraft, deshalb übernimmt der leichtere Schnitt die Abstufung. Die Zeile ist so
  breit wie INNA, wie in der Wortmarke der Website.
- *Innas Unterschrift auf der Karte in Kupfer tief* (Website: Tinte). Sie ist das einzige Kupfer
  der Kontaktseite. Auf der Terminkarte übernimmt die Überschrift „Dein nächster Termin" diese Rolle.
- *Schild, gewählt nach Jury (3 Varianten, 3 Richter, einstimmig):* eine Mittelachse wie die Karte
  in Innas Entwurf, hell auf Leinen, dazu dieselbe Aufteilung dunkel auf Tinte als Alternative. Grade:
  INNA 88 mm, ZEITLOS SCHÖN 27,5 mm (so breit wie INNA), Claim 13 mm x-Höhe in Kupfer tief,
  „Zwei Friseurmeisterinnen. Ein Anspruch." 15 mm Cormorant Kursiv, Leistungen 20 mm in zwei
  INNA-breiten Zeilen mit gezeichneten Kupferpunkten (Ø 5 mm), Öffnungszeiten 15 mm als
  Linien-Tabelle wie die Preisliste, Telefon und Website 16 mm.
- *Visitenkarte, gewählt nach Jury:* vorn die Wortmarke zentriert auf Leinen (INNA 7,2 mm
  Versalhöhe, rund 45 % der Kartenbreite). Hinten eine linke Kante, Kleinschrift einheitlich 8 pt,
  Versalien 7 pt, QR-Code auf die Website rechts. Die Terminkarte hat drei Schreibzeilen für Datum
  und Uhrzeit im Abstand von 7 mm.

**21.09.2026 – Plan in die v4-Form gebracht:**

Struktur nach `design-plan.md` des Skills v4: Maßstab aus den Referenzen, Bildhaushalt, Signature Moves
mit Nummer, Ort und Grund. Gestrichen, weil vom Skill nicht mehr verlangt oder überholt:
Austauschbarkeits-Prüfung, „der eine mutige Moment", „Bewegung nur als Antwort auf eine Aktion"
(seit der Recherche fahren Titel und Bilder aus Masken). Korrigiert, was nicht mehr stimmte: Die
Verwandlung ist ein Diptychon, kein Wischregler (zwei verschieden gerahmte Fotos lasen sich als zwei
Frauen); die Galerie ist zurück; Team steht mit Stellvertreterbild statt als typografische Fläche;
Leistungen sind Textur-Ausschnitte; Instagram ist raus. Die früheren Einträge bleiben als Geschichte.

**21.09.2026 - Hero wird vollflaechig und bewegt:**

Die halbe Bildspalte war zu zaghaft. Der Hero ist jetzt ein ganzer Bildschirm Haar.

- *Vollflaechiges Video statt Bildspalte.* Innas eigenes Foto, in Bewegung gesetzt mit
  Kling 3.0: eine langsame Fahrt in die Laengen hinein, bis das Haar den ganzen Rahmen
  fuellt. Vier Varianten gerechnet, die sauberste genommen - eine andere lief am Ende in
  einen Helligkeits-Artefakt.
- *Nahtlose Schleife durch Vorwaerts-Rueckwaerts.* Der Clip laeuft hin und zurueck, dadurch
  endet er genau dort, wo er anfaengt. Kein Sprung beim Neustart, und die Fahrt wirkt wie
  ein ruhiges Atmen. 10 Sekunden, 992 KB als WebM.
- *Zwei Verlaeufe mit Aufgabe:* von unten fuer den Textblock, von links fuer die
  Schriftseite. Rechts bleibt das Haar hell und offen.
- *Nachgemessen statt behauptet.* Der Kontrast des Textes gegen den Untergrund wurde an vier
  Zeitpunkten des Videos pixelweise gemessen (hellstes Zweiprozent-Perzentil):
  Headline schlechtestenfalls 5,10:1 (noetig 3), Signatur 8,94:1 (noetig 3),
  Fliesstext 9,73:1 (noetig 4,5). axe kann Text auf Bewegtbild nicht bewerten.
- *Das Standbild bleibt das LCP-Element* - es ist das erste Bild des Clips, dadurch springt
  der Uebergang nicht. Bei `prefers-reduced-motion` und im Datensparmodus wird das Video gar
  nicht erst angefragt.
- *Offen:* Das Video ist eine KI-Animation eines echten Kundinnenfotos. Die Einwilligung muss
  das mit abdecken. Sobald eine echte Aufnahme aus dem Salon vorliegt, ersetzt sie den Clip -
  Dateiname bleibt public/video/hero.mp4.

**21.09.2026 - nach der Recherche zu Spitzen-Seiten der Branche:**

Der Kunde hat den Stand als "weiterhin nur Standard" zurueckgewiesen. Eine Recherche ueber
fuenf Bloecke (praemierte Salon-Seiten, High-End-Coloristen, Beauty-Marken, Animationstechnik,
Luecken-Abgleich) hat die Ursachen benannt. Umgesetzt:

- *Alle neun Fotos auf 4K hochskaliert* (Higgsfield, 2 Credits je Bild) und auf 1687x2400 fuer
  das Web gerechnet. Vorher 760 px - zu wenig fuer grossflaechige Nutzung. Einzelne Straehnen
  sind jetzt scharf; erst dadurch traegt das randlose Bildkapitel.
- *Typo-Skala mit echtem Sprung.* Vorher lagen zwischen 18 px Fliesstext und 52 px Titel keine
  Zwischenstufe, und der groesste Grad kam genau einmal vor. Jetzt: Fliesstext 16 px, neuer
  Mittelgrad `.t-aussage`, Titel bis 76 px, Display bis 152 px.
- *Ein Raster fuer die ganze Seite* (`.raster`, 6 bzw. 12 Spalten). Vorher erfand jede Sektion
  ihre Aufteilung neu, dadurch lag nichts auf einer gemeinsamen Kante.
- *Scroll-Reveals.* ScrollTrigger war registriert, wurde aber nach dem Hero nie benutzt - die
  Seite bewegte sich sieben Abschnitte lang nicht mehr. Jetzt faehrt jede Abschnitts-Ueberschrift
  zeilenweise aus einer Maske (GSAP SplitText, `mask: lines`, `aria: auto`), Bilder werden aus
  einer Maske aufgedeckt. Beides nur bei `prefers-reduced-motion: no-preference`.
- *Neue Sektion "Die Arbeiten".* Eine Coloristen-Seite ohne durchblaetterbares Werk ist wie ein
  Architekturbuero ohne Projekte. Waagerechtes Schnapp-Scrollen ohne Bibliothek, acht Arbeiten
  mit eigenem Titel, Technik, Datum und einer Notiz zum Ergebnis.
- *Randloses Bildkapitel* mit Innas Satz "Ein Ort zum Ankommen" aus dem Brand-Board.
- *Leistungs-Text aus dem Bild heraus.* Kein Verlauf mehr, der das Haar zudeckt - Titel und
  Beschreibung stehen unter dem Foto.
- *Ablauf-Strecke im Kontakt* (01-03), damit der Weg zum Termin beschrieben ist und nicht nur
  ein Instagram-Knopf dasteht. Die drei Schritte sind ein Vorschlag und brauchen Innas Bestaetigung.
- *Greige als Textfarbe gestrichen* - erreichte auf Leinen nur 2,04:1. axe meldet auf allen
  Seiten und Breiten null Verstoesse.

**21.09.2026 - nach der Rueckmeldung des Kunden zum Prototyp:**

Der Kunde hat den Prototyp als unfertig zurueckgewiesen - zu Recht. Drei Abschnitte ohne
Navigation gegen einen Kundenentwurf mit acht Abschnitten ist kein Ergebnis, sondern ein
Geruest. Der Phasen-Stopp bei Phase 3 ist deshalb aus dem Skill entfernt worden.

- *Die Seite ist jetzt vollstaendig.* Navigation mit Mobilmenue, Ueber mich, Leistungen,
  Inna & Nursah, Philosophie, Preise, Kontakt, Fusszeile, Impressum und Datenschutz.
- *Die Austauschbarkeits-Pruefung wird fuer dieses Projekt ausgesetzt.* Innas Entwurf ist die
  Spezifikation. Die gestrichenen Leistungskacheln und die Team-Sektion sind zurueck.
- *Zwei Farben ergaenzt, beide aus Kontrastgruenden, keine neuen Markenfarben:*
  Kupfer dunkel `#6E4429` fuer die 12px-Labels (das Kupfer tief kam auf Sand nur auf 3,5:1),
  Kupfer hell `#C98A5E` fuer Kupfer auf der dunklen Flaeche (dort nur 3,1:1).
- *Alle Texte in Tinte/60 und Tinte/70 auf Tinte/80 angehoben*, Fusszeile von Leinen/50 auf
  Leinen/70. axe meldet auf allen drei Seiten und beiden Breiten null Verstoesse.
- *Der Knopf heisst jetzt "Termin anfragen".* Es gibt kein Buchungssystem - "Termin buchen"
  haette etwas versprochen, was die Seite nicht einloest.
- *Team-Abschnitt bewusst ohne Foto*, als typografische Flaeche auf Tinte gebaut. Von Inna und
  Nursah liegt kein echtes Portrait vor, und ein Stockfoto waere eine Luege ueber zwei reale
  Personen. Das Foto kommt links neben den Text, sobald es da ist.
- *"Das Gefuehl" aus dem Brand-Board* steht neben der Philosophie, statt die Spalte leer zu lassen.

**21.09.2026 – aus der Screenshot-Kritik (Phase 3):**

- *Header liegt nicht mehr über dem Hero-Bild, sondern auf Leinen darüber.* Die dunkle Wortmarke
  war auf dem Haarfoto unlesbar; ein Schleier hinter dem Header wäre Dekoration mit Alibi-Aufgabe.
- *Der Griff des Reglers hat Schatten und Pfeil-Icon verloren.* Beides schmückte nur – der graue
  Schatten steht zudem auf der Tell-Liste. Geblieben ist ein Kreis mit Kupfer-Haarlinie.
- *Der „Anrufen"-Link im Header ist raus.* Er zeigte auf eine Nummer, die es nicht gibt.
  Er kommt als `tel:`-Link zurück, sobald Innas Nummer vorliegt.
- *Hero-Bild auf Mobil von 58 vh auf 46 vh.* Vorher lag der Termin-Button zu weit unter der Kante.

**21.09.2026 – nach Eingang der echten Arbeiten:**

- *Platzhalter raus, echte Arbeiten rein.* Hero und Verwandlung zeigen Innas eigene Farbarbeiten
  aus dem Instagram-Profil.
- *Die Verwandlung steht jetzt zweispaltig, das Bildpaar im Hochformat 7:10.* Im vorherigen
  16:10-Rahmen wurden die Hochkant-Fotos auf den Oberkopf beschnitten – ausgerechnet die Längen,
  um die es geht, fielen aus dem Bild.
- *Die Kundenstimme ist von „später irgendwo" in die Verwandlung gewandert.* Sie bezieht sich auf
  genau diese Arbeit; daneben steht sie im Kontext statt als Deko.
- *Abschnitt „Termin" ergänzt.* Der Button brauchte ein Ziel. Dass es keinen Online-Kalender gibt,
  wird dort zum Argument statt zur Lücke.

**31.10.2026 – Portraits (Dennis):**
- „Über uns“ zeigt Inna statt einer Arbeit, das Team Inna und Nursah nebeneinander statt Salonlicht: Bild links, Text
  rechts wie in Innas Seitenentwurf. Das ersetzt die Stellvertreter aus den Tabellen oben.
- Team am Rechner: Bilder über sechs Spalten, Text über fünf, Inna und Nursah im Text untereinander.
- Name als `t-label` unter jedem Portrait. Keine neue Farbe, Schrift oder Bewegung.

**31.10.2026 – Bildreihe der Leistungen gestrichen (Inna per WhatsApp, über Dennis):** Überschrift und Aufklappliste bleiben,
die fünf Kacheln und ihre Bilddateien entfallen.

**31.10.2026 – Vorher/Nachher in den Leistungen (Inna per WhatsApp, über Dennis):** „01 Blond, Beschreibung, Vorher/Nachher“,
„etwas komprimierter und nicht zu viele Bilder von Haaren“. Der eigene Abschnitt mit Vorschaubildern und sein Menüpunkt
entfallen. Der Regler steht aufgeklappt neben dem Text (am Rechner drei Spalten, am Handy darunter), ein Paar je Leistung.
Griff und Beschriftung etwas kleiner als zuvor, sonst keine neue
Farbe, Schrift oder Bewegung. Die Paare hat Inna ausgewählt, bei Blond und Schnitt & Styling dasselbe (`projekt/fotos/README.md`).

**31.10.2026 – Team (Inna per WhatsApp, über Dennis):** Portraits samt Namen getauscht, Nursah links, Inna rechts, wegen der
Bildausschnitte. Die Überschrift und die Texte bleiben in der Reihenfolge Inna, Nursah.
