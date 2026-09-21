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
Das Repo liegt auf einem FAT-Laufwerk. Node 24 kommt über nvm:
`export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"`.
`._*`-Dateien sind macOS-Artefakte des Dateisystems und in .gitignore.

## Projektart
Business-Seite (story-spec.json: standard_business). Die Vorlage der Kundin in projekt/vorlagen/ ist
die Spezifikation; Referenzen liegen in projekt/referenzen/.

## Status
Aktuelle Phase: 6 (Prüfung) – Bericht in docs/pruefung.md. Preview-Übergabe am 21.09.2026.
Offene Kundenangaben: die leeren Felder in projekt/auftrag.md (Telefon, E-Mail, Zeiten, Preise,
Rechtsname, Instagram, Portraits, Einwilligungen). Kein Freigabe-Stopp.
