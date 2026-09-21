# Design-Plan: INNA – Zeitlos schön

Stand: 21.09.2026 · Grundlage: `docs/design-brief.md` · Site-Typ: Standard Business Site

Keine Farbe, keine Schrift und keine Bewegung im Code, die nicht hier steht.
Änderungen zuerst hier eintragen (Abschnitt „Revidiert" am Ende).

---

## Farben

Die Palette kommt vollständig aus Innas Brand-Board. Jede Farbe hat genau eine Rolle.

| Name | Hex | Rolle |
|---|---|---|
| Leinen | `#F6F3EE` | Grundfläche der ganzen Seite |
| Sand | `#D8C8B5` | zweite Fläche – hebt Abschnitte ab, ohne sie einzurahmen |
| Greige | `#B4ABA1` | Haarlinien, Rahmen, ruhige Flächen, deaktivierte Zustände |
| Kupfer | `#A56A43` | Marke. Große Flächen, Icons, dekorative Linien |
| Kupfer tief | `#8F5A38` | dieselbe Farbe für Text, Links und Buttons – 5,2:1 auf Leinen |
| Tinte | `#2F2F2F` | Fließtext, Überschriften, Footer-Fläche |

Kupfer tief ist keine neue Marken-Farbe, sondern die barrierefreie Variante des Kupfers.
Das Original erreicht auf Leinen nur 3,98:1 und verfehlt damit AA für Fließtext.

---

## Typografie

Beide Familien kommen aus dem Brand-Board, die Schreibschrift ist dort als Signatur gesetzt.

- **Display – Cormorant Garamond**, Schnitt 300 und 400.
  Passt zum Gegenstand, weil ihre Strichstärke selbst ein Verlauf ist: dünn nach dick und
  zurück, wie ein Farbübergang im Haar. Bei 300 in großen Graden wirkt sie leicht statt feierlich.
- **Text – Montserrat**, Schnitt 300/400/500. Geometrisch, ruhig, hält den Ton sachlich,
  wo die Serif sonst ins Pathos kippt.
- **Signatur – Parisienne**, genau zwei Einsätze auf der ganzen Seite:
  die zweite Hero-Zeile und Innas Unterschrift im Abschnitt „Über mich". Sonst nie.

**Skala:** Basis 18 px / Zeilenhöhe 1,7 / Zeilenlänge max. 66 Zeichen.
Display `clamp(3.25rem, 9vw, 7.5rem)`, Abschnittstitel `clamp(2rem, 4vw, 3.25rem)`.
Labels: Montserrat 12 px, Versalien, Laufweite 0,18em – nur als Abschnittsname, nie als Schmuck.

**Typo als Gestaltung:** Die Hero-Zeile bricht nach „Zeitlos" um. Dadurch steht „schön."
allein auf der zweiten Zeile und die Schreibschrift darunter setzt direkt an.
Der Umbruch ist gesetzt, nicht dem Zufall überlassen.

---

## Layout

**Konzept in einem Satz:** Die Seite zeigt erst die Arbeit und dann die Person – Rückansicht vor
Gesicht, Verwandlung vor Versprechen.

**Ausrichtung:** durchgehend linksbündig. Zentriert wird nichts, auch keine Abschnittstitel.
Begründung: Eine Preisliste, eine Leistungsliste und ein Öffnungszeiten-Block werden gelesen,
nicht betrachtet – und linksbündiger Text liest sich schneller. Der einzige Bruch ist das
Hero-Bild, das nach rechts und oben aus dem Raster läuft.

### Hero, Desktop (ab 1024 px)

```
┌───────────────────────────────────────────────────────────┐
│ INNA          Über mich · Leistungen · …  ☎  [Termin]     │  transparent über Bild
├──────────────────────────────┬────────────────────────────┤
│                              │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│                              │▒▒  Rückansicht,          ▒▒│
│  Zeitlos                     │▒▒  Haar füllt den Rahmen ▒▒│
│  schön.                      │▒▒  randabfallend rechts  ▒▒│
│  ᴵ So natürlich wie du.      │▒▒                        ▒▒│
│                              │▒▒                        ▒▒│
│  Ich nehme mir Zeit für      │▒▒                        ▒▒│
│  dein Haar, deine Wünsche    │▒▒                        ▒▒│
│  und deine Persönlichkeit.   │▒▒                        ▒▒│
│                              │▒▒                        ▒▒│
│  [ Termin buchen ]           │▒▒                        ▒▒│
├──────────────────────────────┤▒▒  ← Bild läuft über die  │
│  nächster Abschnitt beginnt  │▒▒     Hero-Kante hinaus   │
│                              │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
└──────────────────────────────┴────────────────────────────┘
```

Das Bild endet nicht mit dem Hero, sondern ragt in den nächsten Abschnitt. Die Länge des Haars
wird dadurch erst beim Scrollen ganz sichtbar – das ist die eine formale Pointe des Layouts.

### Hero, Mobil (360–768 px)

```
┌─────────────────────┐
│ INNA           ☰    │
├─────────────────────┤
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│▒▒  Rückansicht,   ▒▒│  58 vh, randabfallend
│▒▒  oben beschnitten▒│
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
├─────────────────────┤
│ Zeitlos             │
│ schön.              │
│ ᴵ So natürlich…     │
│                     │
│ Ich nehme mir Zeit… │
│ [ Termin buchen ]   │
└─────────────────────┘
```

Reihenfolge Bild → Text, weil am Handy zuerst die Arbeit überzeugt.
Der Termin-Button bleibt ab dem Scrollen aus dem Hero als Leiste am unteren Rand erreichbar.

### Die Verwandlung (Kernsektion 2)

```
┌───────────────────────────────────────────────────────────┐
│  Die Verwandlung                                          │
│  Dieselbe Kundin, 4 Stunden dazwischen. Zieh den Regler.  │
│                                                           │
│  ┌────────────────────────┃────────────────────────────┐  │
│  │      vorher            ┃            nachher         │  │
│  │                        ┃  ←  ⬤  →                   │  │
│  │                        ┃                            │  │
│  └────────────────────────┃────────────────────────────┘  │
│  Airtouch, 4 Stunden · Naturbasis 6 auf 8 aufgehellt      │
└───────────────────────────────────────────────────────────┘
```

Ein Bildpaar, ein Regler, eine Bildunterschrift mit Technik und Dauer.
Kein Karussell, keine Galerie – eine Arbeit, dafür ganz.

---

## Der eine mutige Moment

**Die Verwandlung.** Ein ganzseitiges Vorher/Nachher, das man mit dem Finger aufzieht.
Es ist das einzige Element der Seite, das etwas verlangt – und das einzige, das den Beweis
liefert, um den es bei einer Farbspezialistin geht. Alles andere bleibt ruhig: keine Hover-Effekte
auf Karten, keine Zähler, keine zweite Interaktion.

---

## Bewegung

**Eine orchestrierte Sequenz:** der Aufbau des Heros beim Laden.
Bild fährt aus einer Maske von oben auf, danach steigen die drei Textzeilen versetzt ein
(GSAP-Timeline, 900 ms gesamt, Ease `power2.out`).

**Sonst nur als Antwort auf eine Aktion:** der Regler der Verwandlung, das Ausklappen des
Mobil-Menüs, der Fokusring bei Tastaturbedienung. Kein Fade-and-slide-up an jedem Abschnitt.

Sanftes Scrollen über Lenis, mit `prefers-reduced-motion` komplett abgeschaltet:
Dann erscheint der Hero fertig aufgebaut, und der Regler springt statt zu gleiten.

---

## Prinzipien

1. Die Arbeit spricht zuerst, die Person danach – deshalb öffnet die Seite mit einer Rückansicht
   und nicht mit einem Lächeln in die Kamera.
2. Ruhe ist das Versprechen des Salons („ein Termin ohne Hektik") – die Seite hält sich daran
   und bewegt sich nur, wenn jemand etwas tut.
3. Nichts wird versteckt: Preise, Öffnungszeiten und Telefonnummer stehen offen da,
   weil Vertrauen bei einer Farbspezialistin über Offenheit entsteht, nicht über Inszenierung.

---

## Austauschbarkeits-Prüfung (Phase 2b)

Derselbe Brief für einen anderen Salon – käme ich beim gleichen Plan an?

| Frage | Befund | Konsequenz |
|---|---|---|
| Würde ich diese Palette für jeden Salon wählen? | Creme + Serif + Kupfer ist der bekannteste KI-Look 2026 und steht auf der Tell-Liste. | **Der Brief gewinnt.** Die Kundin hat die Palette selbst entworfen und mitgeschickt; sie ist ihre Marke, keine Setzung von uns. Unverändert übernommen, nur um Kupfer tief für Kontrast ergänzt. |
| Ist die Schrift eine, die ich „immer" nehme? | Cormorant und Montserrat sind verbreitet. | **Der Brief gewinnt** – beide stehen im Brand-Board. Eigenheit entsteht über den Schnitt (Cormorant 300 statt 600) und den gesetzten Umbruch, nicht über eine andere Familie. |
| Ist der Hero „Headline + Text + Button"? | Im ersten Entwurf ja. | **Revidiert:** Das Hero-Bild läuft über die Abschnittskante in den nächsten Abschnitt hinaus. Der Hero öffnet mit dem Material (Haar, Länge, Übergang), nicht mit einer Aussage über den Salon. |
| Steht etwas auf der Tell-Liste? | Vier gleiche Leistungs-Karten mit Radius und Schatten waren geplant. | **Revidiert:** Die Leistungen werden zu randabfallenden Bildflächen in vier unterschiedlichen Breiten, gewichtet nach Bedeutung (Blond am größten). Kein Radius, kein Schatten. |
| | Drei Testimonial-Karten mit Sternen. | **Revidiert:** gestrichen. Stattdessen eine einzige Kundenstimme im Fließtext neben der Arbeit, auf die sie sich bezieht. |
| Gibt es mehr als einen mutigen Moment? | Zuerst waren Hero-Sequenz, Verwandlung und eine Scroll-Galerie geplant. | **Revidiert:** Die Galerie fällt weg. Die Verwandlung bleibt der einzige mutige Moment. |

**Bewusst gegen die Copy-Regel entschieden:** Versal-Labels („ÜBER MICH", „MEINE LEISTUNGEN")
bleiben, obwohl die Regel Satzschreibweise verlangt. Sie sind im Brand-Board durchgehend das
typografische System der Marke und tragen hier Information – sie benennen die Abschnitte,
auf die auch die Navigation springt.

---

## Revidiert

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
