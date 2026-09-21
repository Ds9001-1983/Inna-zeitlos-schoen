# INNA – Zeitlos schön

Website des Friseursalons von Inna. Gebaut nach dem SUPERBRAND-Skill
`superband-premium-web` (Site-Typ: Standard Business Site).

## Entwicklung

Node 24 wird vorausgesetzt (`.nvmrc`). Auf diesem Rechner über nvm:

```bash
export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"
npm install
npm run dev
```

Vor jedem Commit:

```bash
npm run lint && npm run build
```

Läuft gerade ein `npm run start`, vorher stoppen – sonst hält der Server den
Turbopack-Cache und der Build bricht mit „Failed to open database" ab.

## Unterlagen

- `docs/design-brief.md` – woraus die Gestaltung kommt
- `docs/design-plan.md` – Farben, Schriften, Layout, der eine mutige Moment
- `story-spec.json` – Spezifikation des Projekts
- `CLAUDE.md` – verbindliche Regeln für die Arbeit im Repo

---

Made with ❤️ by [SUPERBRAND.marketing](https://superbrand.marketing) – Dein Superheld für deine Werbung.
