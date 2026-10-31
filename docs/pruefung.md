# Prüfung: INNA – Zeitlos schön – 21.09.2026

Erste Prüfung nach Skill v4 (Phase 6). Stand: nach Entfernen des fremden Instagram-Profils und
Umbau der Leistungen-Kacheln. Quelle des Abgleichs: `projekt/auftrag.md`.

**Aktualisiert 25.09.2026** vor dem Push von drei Commits: Nacharbeiten nach der APFS-Umstellung
des Sticks, Drucksachen (Entwurf) und fontkit. An der Seite selbst ändert sich nichts. `auftrag.md`
ist seit dem 21.09. unverändert, Telefon, E-Mail, Öffnungszeiten und Domain sind weiter leer.

**Aktualisiert 30.10.2026** nach Innas finaler Textfassung: alle Texte ersetzt (Wir-Form), Vorher & Nachher
als Regler zurück (sechs Paare aus Innas Fotos vom 13.10.), Leistungen mit Aufklappliste, neue Abschnitte
„Neu bei uns“ und „Termine“ (WhatsApp für Neukundinnen, Onlinebuchung für Stammkundinnen, Link offen).
Vorher per Merge das Sicherheitsupdate Next.js 16.4.3 von GitHub geholt. Messungen siehe C, Nachmessung 30.10.

**Aktualisiert 31.10.2026, Nachtrag:** Innas Korrektur per WhatsApp: Bildreihe über den Leistungen gestrichen, Vorher/Nachher beim Aufklappen der Leistung (Paare von Inna ausgewählt), eigener Abschnitt und Menüpunkt entfallen. Instagram-Link eingetragen (@innazeitlosschoen).

**Aktualisiert 31.10.2026:** Portraits eingebaut: Inna auf „Über uns“, Inna und Nursah im Team (Dateinamen = Rufnamen). Messungen siehe C, Nachmessung 31.10.

**Aktualisiert 21.10.2026:** Telefon, E-Mail und Domain eingetragen (Website, Impressum, Schema, Visitenkarte), Visitenkarte im Design des Schilds druckfertig.

**Aktualisiert 19.10.2026** nach der Korrekturrunde von Inna (Anmerkungen vom 13.10.): Verwandlung,
Arbeiten und Preise gestrichen, Leistungen als Bildreihe ohne Text, Wortmarke statt Unterschrift,
neuer Kontakttext. `auftrag.md` ist nachgezogen (Abschnitt „Korrekturen“). Lint/Build grün, die Seite
im Browser geprüft: Navigation mit vier Punkten, keine toten Sprungmarken, Druckentwurf läuft unverändert.
Teil B und C stammen vom 21.09. und beziehen sich noch auf die längere Seite.

## A Abgleich mit dem Auftrag

| Auftrag | Urteil | Anmerkung |
|---|---|---|
| Marke „INNA – Zeitlos schön", Schulstraße 1, 51674 Wiehl | umgesetzt | Header, Kontakt, Footer, Impressum, LocalBusiness-Schema |
| Seitenentwurf 1:1 (F2): Hero, Über mich, Leistungen, Team, Philosophie, Abschluss | umgesetzt | Layout, Palette und Schriften wie die Vorlage; seit 30.10. Innas finale Texte auf die Abschnitte verteilt, Abschluss in der Fußzeile; Arbeiten und Preise am 13.10.2026 gestrichen |
| Innas finale Textfassung (30.10.2026) | umgesetzt | wörtlich, Wir-Form; Marke einheitlich „INNA – Zeitlos schön“ (Inna schreibt „Schön“); funktionale Überschriften nur dort, wo Inna keine geliefert hat („Vorher & Nachher“, „Termine“) |
| Hero mit Portrait von Inna (Vorlage) | bewusst anders | Bewegtbild aus der Rückansicht einer Kundin (Kling) bleibt; Portraits seit 31.10. auf „Über uns“ und im Team |
| Brand-Board: Farben und Schriften | umgesetzt | Sand/Leinen/Kupfer/Tinte, Cormorant + Grotesk + Signatur; Kupfer für Text als dunklere Schwester (AA) |
| Design-Plan in der v4-Form (Maßstab aus Referenzen, Bildhaushalt, Signature Moves) | umgesetzt | 21.09.2026 nachgezogen: Muster 1, 2, 3, 5, 6, 8; Moves 16, 01, 17 |
| Business-Seite, eine Seite mit Sprungmarken plus Impressum/Datenschutz (F1, F6) | umgesetzt | |
| Leistungen | umgesetzt | Innas Texte als Aufklappliste (Blond, Farbe, Farbkorrekturen, Tressen, Schnitt & Styling), aufgeklappt je ein Vorher/Nachher, Bildreihe am 31.10. auf Innas Wunsch gestrichen; Überschrift „Haar, das zu dir passt.“ |
| Vorher & Nachher zum Wischen (Inna, 30.10.) | umgesetzt | seit 31.10. in den Leistungen, Paare von Inna ausgewählt (fünf Paare, je Leistung eines), Regler mit Maus, Finger und Tastatur |
| Preise | entfallen | Abschnitt gestrichen (Inna, 13.10.2026) |
| Telefon | umgesetzt | 0170 66 19 452: Fußzeile (tel:+491706619452), Impressum, LocalBusiness-Schema, Visitenkarte; der Knopf im Kontakt entfällt seit 30.10. (Beratung bewusst nicht per Telefon) |
| E-Mail info@inna-zeitlosschoen.de | umgesetzt | Fußzeile, Impressum, Datenschutz (Kontaktaufnahme), Visitenkarte; Knopf im Kontakt entfällt seit 30.10. |
| WhatsApp für Neukundinnen (30.10.) | umgesetzt | Knopf „Beratung per WhatsApp anfragen“ in „Neu bei uns“ und „Termine“ (wa.me/491706619452), Datenschutz-Abschnitt WhatsApp |
| Onlinebuchung für Stammkundinnen (30.10.) | **offen** | Innas Satz steht im Abschnitt Termine; Knopf „Online Termin buchen“ und Datenschutz-Abschnitt erscheinen, sobald `salon.buchung` gesetzt ist; Anbieter dann im Datenschutz ergänzen |
| Domain inna-zeitlosschoen.de | **teilweise** | steht auf der Visitenkarte samt QR-Code. Liegt bei Alfahosting, A-Record zeigt noch nicht auf Vercel – vor dem Druck der Karten in Vercel hinzufügen und DNS umstellen |
| Öffnungszeiten | offen | ohne Zeiten steht „Termine nach Vereinbarung“ |
| Instagram | umgesetzt | @innazeitlosschoen seit 31.10. unter den Leistungen, in der Fußzeile, im Impressum und im Schema |
| Kein Buchungssystem (F4) | abgelöst | seit 30.10. externe Onlinebuchung für Stammkundinnen (Link offen); „Termin anfragen“ führt zum Abschnitt Termine mit beiden Wegen |
| Team Inna & Nursah | umgesetzt | Innas Text vom 30.10.; Portraits seit 31.10. nebeneinander mit Namen, Nursah links, Inna rechts (Innas Wunsch); Nursahs Nachname offen |
| Philosophie | umgesetzt | seit 30.10. Innas Text statt der vier Werte |
| Arbeiten / Referenzen (B1) | entfallen | gestrichen (Inna, 13.10.2026); Vorher & Nachher seit 30.10. zurück, siehe oben |
| Über uns (vorher Über mich) | umgesetzt | Innas Text vom 30.10.; neues Foto aus ihren Arbeiten statt der Strähne – von Inna absegnen lassen |
| Neukundinnen: Beratungstermin im Salon | umgesetzt | Abschnitt „Neu bei uns“ mit Innas Text und „Deine persönliche Beratung“ (01–03) |
| Du-Form (F7), Wir-Perspektive | umgesetzt | keine Ich-Form mehr im Seitentext (geprüft per grep) |
| Vercel (F8) | umgesetzt | Mit dem Repo verbunden (korrigiert 25.09.2026): Jeder Push auf `main` deployt nach Production auf inna-zeitlos.vercel.app (Region fra1). Eigene Domain offen |
| Drucksachen: Schild 600 × 500 mm, Visitenkarte (Flyeralarm) | beide druckfertig | Auftrag von Dennis vom 23.09., nicht in `auftrag.md`. Varianten entschieden (Design-Plan „Revidiert"), Doku in `docs/druck.md`. Schild seit 19.10. nach Innas Wunsch nur Wortmarke auf Cognac → `druck/ausgabe/final/schild.pdf`, Preflight ok, Beschnitt 3 mm angenommen. Karte seit 21.10. im Design des Schilds mit Telefon und Adresse → `druck/ausgabe/final/visitenkarte.pdf`, Preflight ok; E-Mail, Website und QR-Code kommen dazu, sobald sie feststehen |
| Rechtsname, USt-IdNr./Kleinunternehmer, Kammer | offen | Impressum zeigt 12 markierte Lücken, Datenschutz 2 – so geht die Rechtsseite nicht live |
| Einwilligungen (Kundinnenfotos, KI-Video) | erledigt | laut Dennis (31.10.2026) liegen sie bei Inna, Nursah hat zugestimmt; die Originale liegen nicht im (öffentlichen) Repo |
| Portraits Inna und Nursah | umgesetzt | seit 31.10.; Dateien nur rund 800 px breit, höher aufgelöste Originale wären besser |
| Credit-Rahmen 100 | umgesetzt | 63 verbraucht (9 × Upscaling, 6 × Video) |
| Git: Ds9001-1983, deutsch, kein Hinweis auf Claude | umgesetzt | |

## B Sichtprüfung

Runde 1 – Vollbild bei 1440 und 390 px, Abschnitte bei 1440:

1. **Tote Fläche:** keine über Rasterbreite. Über mich: die rechte Spalte endet bei rund 60 % der Bildhöhe – editorial, belassen.
2. **System:** ein Raster, eine Typo-Skala (Display, Titel, Aussage, Lead, Label), Bildformate 7:10 und Vollbild, alles auf derselben linken Kante. Ja.
3. **Roter Faden:** Hero → Verwandlung (Beweis) → Arbeiten (Beweis) → Über mich (Person) → Leistungen → Bildkapitel (Ort) → Team → Philosophie → Preise → Kontakt (Weg zum Termin). Ja.
4. **Bild doppelt:** **ja.** Die vier Kacheln zeigten dieselben Ausschnitte wie die Galerie direkt darüber → behoben: enge Textur-Ausschnitte mit eigenem Fokuspunkt, wie in Innas Entwurf. Bleiben: Farbkorrektur-nachher (Verwandlung + Galerie), Strähne (Über mich + Galerie), Salonlicht (Team + Galerie), Farbtransformation (Bildkapitel + Galerie + Kachel). Neun Fotos für sechzehn Bildplätze – ohne neue Fotos nicht lösbar → offen.
5. **Platzhalterwörter:** Startseite keine (gemessen). Impressum 12 und Datenschutz 2 Markierungen „[… – wird ergänzt]" – auf Rechtsseiten bewusst sichtbar (copy-rules § Rechtstexte), müssen vor dem Live-Gang gefüllt sein.
6. **Unfertig:** Kontakt ohne direkten Kanal (siehe A). Zweimal „Schreib mir" ohne Schreibweg → kanalneutral („Sag mir") umformuliert.
7. **Tells:** Eyebrow-Labels, Serif auf Creme, Kupfer – kommen aus der Vorlage und aus den Branchenreferenzen (Muster 1, 2, 8), also keine Tells. Reveals dosiert (Hero lang, Titel kurz, Bilder als Maske) – belassen.

Runde 2: nicht nötig. Offen bleiben 4 (Fotos), 5 (Rechtsseiten), 6 (Kanal).

## C Messungen

Lint/Build grün · axe 0 Verstöße (`qa:a11y`) · Lighthouse, 3 Läufe: 100/100/100/100, LCP 0,7 s, CLS 0, TBT 0 ms, 1.699 KiB ·
Kontrast auf dem Video (`qa:kontrast`, vier Zeitpunkte, Zeilenboxen, hellstes 2 %): Titel 6,75:1, Signaturzeile 4,34:1 (nötig 3:1), Lead 8,60:1 (nötig 4,5:1) ·
Überbreite bei 360 px: 0, bei 640 px (entspricht Zoom 200 % auf 1280): 0 · Bilder beim zweiten Aufruf: 18/18 geladen ·
Video läuft (`hero.webm`), bei reduzierter Bewegung 0 Videoanfragen · Tastatur: 23 fokussierbare Elemente, alle mit sichtbarem Fokus, keins außerhalb des Viewports.

Nachmessung 25.09.2026 nach der APFS-Umstellung: Lint/Build grün, `next start` und `next dev` mit je
97 Bild-URLs × AVIF/WebP/JPEG × 3 Abrufen = 873/873 korrekt (MISS → HIT, gleiche Bytes).

Nachmessung 30.10.2026 (Next.js 16.4.3): Lint/Build grün · `qa:a11y` 1/1 bestanden (axe, 0 Verstöße) ·
`qa:kontrast` (zwei Läufe): Titel 6,70–6,74:1, Signaturzeile 4,41:1, Lead 8,60:1; Lead im Bildkapitel von Hand gemessen 5,35:1 (1440 px)
und 5,62:1 (390 px), nötig 4,5:1 – das Skript misst nur den ersten Bildschirm · `qa:messungen`: Überbreite 360 und
640 px: 0, Bilder 17/17, Video läuft, Reduced Motion 0 Videoanfragen, Platzhalter keine, Tastatur 34 Elemente, alle mit
sichtbarem Fokus · Bedienung (Playwright, eigenes Skript): Sprungmarken, Regler per Pfeiltasten, Paarwechsel, Aufklappliste,
WhatsApp-Link, Termin-Leiste am Handy – 24/24 · `qa:playwright`: 21 bestanden, 8 übersprungen (andere Seitentypen) ·
„Screenshots an Scroll-Positionen“ repariert: Im Test bleibt das Hero-Video blockiert (Standbild steht), 25 Referenzbilder liegen
in `qa-tests/qa.spec.ts-snapshots/` (nur Chromium auf dem Mac), nach gewollten Änderungen `npx playwright test --update-snapshots` ·
`qa:messungen` meldet als „doppeltes Motiv“ nur das aktive Vorher/Nachher-Paar (Regler und Vorschaubild), gewollt · Druckdaten: `npm --prefix druck run pruefen` 3/3 ok.
Gefunden und behoben: Die sr-only-Texte der Vorschaubilder verbreiterten die Seite bei 360 px um 245 px.

Nachmessung 31.10.2026 (Portraits): Lint/Build grün · `qa:playwright`: 21 bestanden, 8 übersprungen, vier volle Läufe und ein Lauf der
Screenshots mit einem Worker · Die alten Referenzbilder schlugen nach dem Einbau an, also erkennen die Tests Änderungen · Behoben: Der Test
wartete 1,2 s, `BildReveal` zoomt 1,5 s, das Foto lag noch Bruchteile eines Pixels daneben (jetzt 2 s) · `qa:messungen`: Überbreite 360 und
640 px: 0, Bilder 18/18, Video läuft, Tastatur 34 Elemente, alle mit sichtbarem Fokus · `qa:kontrast`: Titel 6,75:1, Signaturzeile 4,41:1,
Lead 8,60:1 · Druckdaten bestanden · Sichtprüfung 1440 und 390 px: Über uns, Team oben und beim Mitlaufen.

Nachmessung 31.10.2026, Nachtrag (Vorher/Nachher in den Leistungen): Lint/Build grün · `qa:playwright`: 21 bestanden, 8 übersprungen, zwei Läufe ·
`qa:messungen`: Überbreite 0, Bilder 5/5 (Bilder in zugeklappten Leistungen laden erst beim Öffnen und zählen dort nicht), Video läuft,
Tastatur 25 Elemente, alle mit sichtbarem Fokus · `qa:kontrast`: Titel 6,75:1, Signaturzeile 4,41:1, Lead 8,60:1 · Druckdaten bestanden ·
Bedienung aufgeklappt bei 1440, 390 und 360 px (eigenes Skript, 35 Punkte): fünf Regler, Pfeiltasten, Klick, Bilder laden erst beim Aufklappen,
keine Überbreite, Seitenende erreichbar, axe aufgeklappt 0 Verstöße · Köpfe je Paar auf gleiche Höhe zugeschnitten, per Vergleichsbild geprüft.

Werkzeuge: `npm run qa:a11y`, `npm run qa:lighthouse`, `npm run qa:kontrast`, `npm run qa:messungen` (Überbreite, Bilder, Video, Platzhalter, doppelte Motive, Tastatur, Aufnahmen). Zahlen vom 21.09.2026.

## Offene Punkte für Dennis

- Domain inna-zeitlosschoen.de in Vercel hinzufügen und bei Alfahosting auf Vercel zeigen lassen (A/CNAME), MX für info@ unverändert lassen
- Öffnungszeiten
- Link der Onlinebuchung für Stammkundinnen (dann in `salon.buchung`, Anbieter im Datenschutz ergänzen)
- Rechtsname, USt-IdNr. oder Kleinunternehmer, Kammer → Impressum (12 Lücken), Datenschutz (2)
- Nursahs Nachname
- Höher aufgelöste Originale der Portraits, Salonfotos
- Domain (Vercel ist verbunden, Production läuft auf inna-zeitlos.vercel.app)
- Credits verbraucht: 63 von 100
