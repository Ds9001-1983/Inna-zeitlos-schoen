@AGENTS.md

# INNA – Zeitlos schön (SUPERBRAND)

Friseursalon von Inna. Gebaut nach dem Skill superband-premium-web
(Phasenablauf, siehe ~/.claude/skills/superband-premium-web/SKILL.md).

## Verbindlich
- Design: docs/design-plan.md – keine Farbe, Schrift oder Bewegung, die dort nicht steht.
  Änderungen zuerst im Plan (Abschnitt „Revidiert").
- Texte: docs/design-brief.md (Tonalität, Du-Form) und reference/copy-rules.md des Skills.
- Technik: Versionen exakt wie in package.json (Quelle: reference/stack.json des Skills).
  Nicht auf React 19.3, TypeScript 7, ESLint 10 oder Node 26 anheben.
- Nur Node.js-Runtime, kein Edge. ViewTransition aus 'react'. proxy.ts statt middleware.ts.
  preload statt priority bei next/image.
- Next.js-Fragen zuerst in node_modules/next/dist/docs/ klären (siehe AGENTS.md).
- Vor jedem Commit: npm run lint && npm run build grün.

## Lokale Umgebung
Das Repo liegt auf einem FAT-Laufwerk. Node 24 kommt über nvm:
`export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"`.
`._*`-Dateien sind macOS-Artefakte des Dateisystems und in .gitignore.

## Site-Typ
standard_business – story-spec.json ist die Spezifikation.

## Status
Aktuelle Phase: 3 (Hero-Prototyp gebaut, Freigabe steht aus).
