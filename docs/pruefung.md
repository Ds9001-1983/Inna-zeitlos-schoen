# Prüfung: INNA – Zeitlos schön – 21.09.2026

Erste Prüfung nach Skill v4 (Phase 6). Stand: nach Entfernen des fremden Instagram-Profils und
Umbau der Leistungen-Kacheln. Quelle des Abgleichs: `projekt/auftrag.md`.

## A Abgleich mit dem Auftrag

| Auftrag | Urteil | Anmerkung |
|---|---|---|
| Marke „INNA – Zeitlos schön", Schulstraße 1, 51674 Wiehl | umgesetzt | Header, Kontakt, Footer, Impressum, LocalBusiness-Schema |
| Seitenentwurf 1:1 (F2): Hero, Über mich, Leistungen, Team, Philosophie, Abschluss | umgesetzt | Abschnittsfolge, Navigation, Palette und Schriften wie die Vorlage; zusätzlich Verwandlung, Arbeiten, Preise, Kontakt aus B1 |
| Hero mit Portrait von Inna (Vorlage) | bewusst anders | kein Portrait vorhanden → Bewegtbild aus der Rückansicht einer Kundin (Kling); Portrait bleibt offener Punkt |
| Brand-Board: Farben und Schriften | umgesetzt | Sand/Leinen/Kupfer/Tinte, Cormorant + Grotesk + Signatur; Kupfer für Text als dunklere Schwester (AA) |
| Business-Seite, eine Seite mit Sprungmarken plus Impressum/Datenschutz (F1, F6) | umgesetzt | |
| Leistungen: vier Kacheln, Texte wörtlich | umgesetzt | Kacheln als Textur-Ausschnitte wie in der Vorlage; Dauer und Haltbarkeit offen |
| Preise | offen | keine Preisliste – Tabelle zeigt Leistungen mit Hinweis, ohne Preis |
| Telefon, E-Mail, Öffnungszeiten | **offen – Kontaktweg** | Kontakt zeigt „Weg zum Salon" und Adresse, Impressum markiert die Lücken. Vor dem nächsten Push: Telefon oder E-Mail von Inna |
| Instagram | bewusst anders | fremdes Profil „wiehlerschoenheitsfleck" entfernt (Dennis, 21.09.2026); Innas Profil erscheint, sobald es in `auftrag.md` steht |
| Kein Buchungssystem (F4) | umgesetzt | überall „Termin anfragen", kein Buchungsversprechen |
| Team Inna & Nursah | umgesetzt | ohne Personenfoto (Material); Nursahs Nachname offen |
| Philosophie: vier Werte | umgesetzt | |
| Arbeiten / Referenzen (B1) | umgesetzt | 8 Arbeiten mit Technik und Datum aus den Beiträgen |
| Du-Form (F7) | umgesetzt | |
| Vercel (F8) | offen | Vercel-Projekt noch nicht mit dem Repo verbunden (`vercel link` oder Dashboard) |
| Rechtsname, USt-IdNr./Kleinunternehmer, Kammer | offen | Impressum zeigt 12 markierte Lücken, Datenschutz 2 – so geht die Rechtsseite nicht live |
| Einwilligungen (Kundinnenfotos, Zitat, KI-Video) | offen | schriftliche Zustimmung fehlt |
| Portraits Inna und Nursah | offen | Vorlage zeigt Menschen – Fotografin |
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

Werkzeuge: `npm run qa:a11y`, `npm run qa:lighthouse`, `npm run qa:kontrast` sowie ein Messskript für Überbreite, Bilder, Video und Tastatur. Zahlen vom 21.09.2026.

## Offene Punkte für Dennis

- Telefon oder E-Mail von Inna – Kontaktweg, vor dem nächsten Push
- Innas eigenes Instagram-Profil, falls gewünscht
- Öffnungszeiten, Preisliste, Dauer und Haltbarkeit je Leistung
- Rechtsname, USt-IdNr. oder Kleinunternehmer, Kammer → Impressum (12 Lücken), Datenschutz (2)
- Nursahs Nachname
- Portraits von Inna und Nursah, Teamfoto, Salonfotos (Fotografin) – löst auch die doppelten Motive
- Schriftliche Einwilligung: Kundinnen auf den Vorher/Nachher-Bildern, Verfasserin des Zitats, KI-Video aus dem Kundenfoto
- Vercel-Projekt verbinden, Domain
- Credits verbraucht: 63 von 100
