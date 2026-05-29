---
title: Agent-Scaffolding (AGENTS.md, CLAUDE.md, .claude/logs, claude/memory)
date: 2026-05-29
status: abgeschlossen
---

## Was erledigt wurde

neurovim-standalone auf den gleichen Agenten-Doku-Standard wie die anderen
Code-Projekte unter `/Users/Shared/code/` (perlin-studio, hyperforge,
synthwave-surfer) gebracht.

- **`AGENTS.md`** (Root) — substanzielle Konventions-Doku: TL;DR, Adapter-Pattern
  mit allen 4 Ports (Tabelle obsidian↔web-Impl), File-Layout, Build/Test-Befehle
  (alle aus Root), Konventionen (Core-Reinheit, React→Preact-Alias, Content-SSOT,
  CSS-Tokens, Bundle-Budget), Glossar, Remotes/Distribution, „Wenn du etwas änderst",
  Roadmap. Inhalt aus echtem Code-Read abgeleitet (Ports, package.jsons, build.mjs,
  esbuild/vite/jest-Configs, DESIGN-SPEC, PLUGIN-SWAP).
- **`CLAUDE.md`** (Root) — reiner Pointer → `See @AGENTS.md`.
- **`.claude/logs/`** — Session-Log-Ordner (Frontmatter title/date/status), dieses Log.
- **`claude/memory/`** — `MEMORY.md`-Index + `project_neurovim_standalone.md`
  (Projektstand) + `project_architektur.md` (Adapter-Pattern-Kurzform).

**Verifiziert vor dem Dokumentieren:** `npm run typecheck` grün (4 Workspaces),
`npm test` grün (150 Tests: core 136 / content 8 / adapter-obsidian 6).

## Erkenntnis

- README-Statuszeile („Skelett (Phase 2), kein portierter Code") ist **veraltet** —
  tatsächlich ist Phase 3 quasi durch. In AGENTS.md + Memory als Altlast vermerkt.

## Offen für nächste Session

- [ ] **README.md-Status korrigieren** (Phase-2-Skelett-Zeile → Phase-3-Stand).
- [ ] **Polish-Pass adapter-web** — eigentlicher nächster Arbeitsschritt, Brief in
      `docs/DESIGN-SPEC.md`. Frischer Context empfohlen (großer visueller Pass).
- [ ] **Remotes + CI** (Codeberg primary / GitHub mirror / Forgejo-Actions) — ADR-001 D5.
