@AGENTS.md

# INNA – Zeitlos schön (SUPERBRAND)

Friseursalon von Inna. Gebaut nach dem Skill superband-premium-web v4
(Phasenablauf, siehe ~/.claude/skills/superband-premium-web/SKILL.md).

## Verbindlich
- Auftrag: projekt/auftrag.md – einzige Quelle für Fakten (Adresse, Zeiten, Preise, Kontaktwege).
  Im Code stehen Fakten nur in src/inhalte/*.ts. Leere Felder = offene Angaben, nie erfinden.
- Design: docs/design-plan.md – keine Farbe, Schrift oder Bewegung, die dort nicht steht.
  Änderungen zuerst im Plan (Abschnitt „Revidiert").
- Texte: docs/design-brief.md (Tonalität, Du-Form) und reference/copy-rules.md des Skills.
- Technik: Versionen exakt wie in package.json (Quelle: reference/stack.json des Skills).
  Nicht auf React 19.3, TypeScript 7, ESLint 10 oder Node 26 anheben.
- Nur Node.js-Runtime, kein Edge. ViewTransition aus 'react'. proxy.ts statt middleware.ts.
  preload statt priority bei next/image.
- Next.js-Fragen zuerst in node_modules/next/dist/docs/ klären (siehe AGENTS.md).
- Vor jedem Commit: npm run lint && npm run build grün. Vor jedem Push: docs/pruefung.md Teil A
  (Abgleich mit dem Auftrag) aktualisieren.
- Git-Autor Ds9001-1983, Commit-Messages deutsch, kein Hinweis auf Claude.

## Lokale Umgebung
Das Repo liegt auf dem USB-Stick „MAC BACKUP“, seit 25.09.2026 APFS (vorher FAT32). Node 24 kommt
über nvm: `export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"`.
`._*` bleibt als Schutz in .gitignore und ESLint, falls Dateien über FAT/exFAT hereinkommen.

## Projektart
Business-Seite (story-spec.json: standard_business). Die Vorlage der Kundin in projekt/vorlagen/ ist
die Spezifikation; Referenzen liegen in projekt/referenzen/.

## Status
Aktuelle Phase: 6 (Prüfung) – Bericht in docs/pruefung.md. Preview-Übergabe am 21.09.2026.
Offene Kundenangaben: die leeren Felder in projekt/auftrag.md (Zeiten, Buchungslink,
Rechtsname, Instagram, Einwilligungen). Kein Freigabe-Stopp. Portraits seit 31.10.2026 auf der Seite.
Seit 31.10. Vorher/Nachher aufgeklappt in den Leistungen, Bildreihe und eigener Abschnitt entfallen.
Korrekturrunde 13.10.2026 umgesetzt (19.10.): Verwandlung, Arbeiten, Preise gestrichen – siehe
docs/design-plan.md „Revidiert“. Seit 30.10.2026 Innas finale Texte (Wir-Form), Vorher & Nachher als Regler
zurück, Neukundinnen per WhatsApp, Onlinebuchung für Stammkundinnen (Link offen: `salon.buchung`).
Innas Originalfotos liegen in projekt/fotos/original-2026-10-13/ (gitignored, Repo ist öffentlich);
Web-Fassungen erzeugt `node scripts/fotos-aufbereiten.mjs`.
Drucksachen (Schild 600 × 500 mm Cognac, Kontakt-Visitenkarte, Flyeralarm): druck/, Doku docs/druck.md –
Schild seit 19.10.2026 druckfertig (nur Wortmarke in Tiefschwarz auf Cognac, wie die Karte;
npm --prefix druck run final -- --nur schild). Visitenkarte seit 21.10.2026 im selben Design
druckfertig (Telefon, E-Mail, Website, Adresse, QR-Code). Domain inna-zeitlosschoen.de liegt bei
Alfahosting und zeigt noch nicht auf Vercel.
