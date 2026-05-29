# AGENTS.md — neurovim-standalone

> **Rolle:** Kontext für AI-Agenten (Claude Code, Cursor, …), die in diesem
> Repo arbeiten. Menschen finden den Einstieg in [`README.md`](README.md),
> die Architektur-Begründung im ADR und den Design-Brief in
> [`docs/DESIGN-SPEC.md`](docs/DESIGN-SPEC.md).
>
> **Sprache:** Doku + Code-Kommentare **Deutsch**, Identifier + Commit-Messages
> **English** (Conventional Commits, z.B. `feat(adapter-web): …`). Vim-/Tech-Terms
> behalten ihre Standardform.

## TL;DR

**NeuroVim** ist ein Vim-Lernspiel im Cyberpunk-Spy-Thriller-Gewand: Ein
KI-Handler **CIPHER** vergibt „Missionen", die in Wahrheit Vim-Übungen sind
(korrupte CORP-Dokumente restaurieren, geglitchte Transmissions fixen, gegen die
Uhr). Vim lernen ist der getarnte Core-Loop, die Story ist die Motivations-Schicht.

**Eine Codebase, zwei Auslieferungs-Targets:** plattform-neutraler Core + dünne
Adapter über vier Port-Interfaces. Target 1 = Obsidian-Plugin (Herkunft), Target
2 = Standalone-Web-App (neu).

> **Status (Stand 2026-05-29):** Phase 3 weitgehend abgeschlossen — Core voll
> portiert, beide Adapter funktional, Web-App feature-complete (Welcome → NEXUS
> → Briefing → Editor → Result + Sandbox). 150 Tests grün, 4-Workspace-Typecheck
> grün. **Hinweis:** Die `README.md` sagt noch „Skelett (Phase 2), kein Code" —
> das ist **veraltet** und sollte beim nächsten Touch korrigiert werden.

## Architektur — Adapter-Pattern (ADR-001)

Plattform-neutraler **Core** + zwei **Adapter**, entkoppelt über **vier
Port-Interfaces**. Der Core hängt **niemals** an `obsidian` oder an Browser-DOM —
Plattform-Spezifik kommt ausschließlich über die Ports, die die Adapter
implementieren.

```
@neurovim/content ──┐
                    ├──> @neurovim/core <──implements── @neurovim/adapter-obsidian
(Markdown SSOT      │    (Game-Logic,                   (Obsidian-Plugin, main.js)
 → typed JSON)      │     Web-Audio,
                    │     Preact-UI,        <──implements── @neurovim/adapter-web
                    │     Ports)                           (Vite-SPA, Browser)
                    └──> (web bündelt content direkt)
```

### Die vier Ports (`packages/core/src/ports/`)

| Port | Verantwortung | obsidian-Impl | web-Impl |
|---|---|---|---|
| `VimModeSource` | Vim-Mode + klassifizierte Actions (push/pull) | `vim-mode-change` via `MarkdownView.editor.cm` + `CommandListener` | CodeMirror 6 + `@replit/codemirror-vim` (gleiches Event) |
| `StoragePort` | Persistenz von `PluginData` (generisch `<T>`) | `plugin.loadData/saveData` → `data.json` | IndexedDB (+ `data.json`-Import für Bestand) |
| `ContentPort` | Missionen + Lore-Artefakte laden | Vault-File-API + `data/chapters.ts` | gebündeltes `@neurovim/content` |
| `UiHost` | Mount-Container für Preact-Trees | `ItemView` / `Modal` / MarkdownPostProcessor | DOM-`<div>`-Overlays / Routen |

**Wichtig (D17/D19e):** Die Engines sind **reine Funktionen** und konsumieren die
Ports **nicht** direkt — die Adapter verdrahten Ports ↔ Engines. Ein `AudioPort`
existierte mal, wurde aber entfernt: `AudioEngine` ist bereits plattform-neutral
+ injizierbar, der Wrapper war redundant.

→ Volle Begründung: ADR-001 unter
`/Users/Shared/20_Claude/neurovim-standalone-prep/40_deliverables/ADR-001-Adapter-Architektur.md`
· Decisions-Log (D1–D26): `…/neurovim-standalone-prep/90_workflow-log/decisions.md`

## File-Layout

```
.
├── package.json            # npm workspaces (kein pnpm — D1) + Root-Scripts
├── tsconfig.base.json      # TS project references, strict, jsx=preact
├── README.md               # Mensch-Einstieg (Status-Zeile veraltet, s.o.)
├── AGENTS.md               # diese Datei
├── docs/
│   ├── DESIGN-SPEC.md      # Polish-Pass-Brief für adapter-web (Tokens, Views, Motion)
│   ├── PLUGIN-SWAP.md      # HOWTO: refaktorierten Plugin-Build in Jays Vault tauschen
│   └── screenshots/        # 6 headless Captures der Web-Views (für DESIGN-SPEC)
├── scripts/
│   ├── setup-remotes.sh    # Codeberg-primary + GitHub-mirror Remotes (ADR-001 D5)
│   └── swap-obsidian-plugin.sh  # main.js-Swap + Backup (von Jay manuell ausgeführt)
├── experiments/
│   ├── vim-regex-findings.md    # Regex-Flavor-Parität Obsidian↔CM6 (D1)
│   └── vim-regex-harness/
└── packages/
    ├── core/               # @neurovim/core — plattform-neutraler Kern
    │   └── src/
    │       ├── ports/      # VimModeSource, StoragePort, ContentPort, UiHost
    │       ├── engine/     # MissionEngine, ProgressionEngine, GlitchEngine, MetricsTracker (reine Logik)
    │       ├── audio/      # AudioEngine, SoundCues, AmbientLayer, CommandListener (Web-Audio)
    │       ├── views/      # Preact-UI: FloatHUD, SandboxHUD, modules/*, components/*
    │       ├── data/       # chapters, levels, cheatsheet, cipher-quotes
    │       ├── utils/      # diff, time, hints, chapterNav
    │       ├── types.ts    # kanonisches State-Schema (PluginData = StoragePort-Payload)
    │       └── index.ts    # Barrel — re-exportiert alles, hängt NIE an obsidian
    ├── content/            # @neurovim/content — Markdown SSOT → typed JSON
    │   ├── src/content/    # Missionen (BRIEFING/TRANSMISSION), KATAS, LOOT, FRAGMENTS, REF
    │   ├── src/solutions/  # Dev-SOLUTIONS (Soll-Lösungen für Diff-Validierung)
    │   ├── src/generated/  # content.ts / sandbox.ts / welcome.ts — von build.mjs erzeugt
    │   ├── src/welcome.md   # Welcome-Intro-Quelle
    │   └── build.mjs       # gray-matter → typisiertes TS-Manifest (D15, bundler-tauglich)
    ├── adapter-obsidian/   # @neurovim/adapter-obsidian — esbuild → dist/main.js
    │   └── src/            # main.ts, views/ (SidebarView, AsciiCodeBlockProcessor),
    │                       #   modals/, ports/ObsidianContent.ts, audio/VimModeWatcher.ts
    └── adapter-web/        # @neurovim/adapter-web — Vite-SPA
        └── src/            # main.tsx, ui/ (App=NEXUS, Welcome/Briefing/Mission/Sandbox/Result),
                            #   ports/WebStorage.ts, styles.css (alle App-Styles, 6 --nv-* Tokens)
```

## Build & Test — Befehle (alle aus Repo-Root)

```bash
npm install                  # workspaces installieren
npm run typecheck            # alle 4 Workspaces (tsc --noEmit) — muss grün bleiben
npm test                     # jest in core/content/adapter-obsidian (150 Tests) — adapter-web hat keine

npm run dev                  # adapter-web Vite-Dev-Server → http://localhost:5173/ (HMR)
npm run build:content        # content/build.mjs — IMMER zuerst (erzeugt src/generated/*)
npm run build:plugin         # esbuild → packages/adapter-obsidian/dist/main.js
npm run build:web            # vite build → packages/adapter-web/dist/
npm run build                # content → plugin → web (in dieser Reihenfolge)

npm run desktop:dev          # Tauri-Desktop-App mit HMR (braucht Rust + Xcode CLT)
npm run build:dmg            # native App + macOS-DMG (Tauri v2) → packages/adapter-web/src-tauri/target/…
```

**Desktop (Tauri v2):** `packages/adapter-web/src-tauri/` verpackt den Vite-Build als
native App (OS-WebView, DMG ~3 MB). Multi-OS-Installer via `.github/workflows/desktop.yml`
(nur GitHub Actions). Details: `docs/DESKTOP.md`.

**Test-Verteilung:** `core` 136, `content` 8, `adapter-obsidian` 6 (= 150).
`adapter-web` hat keine Test-Suite (UI-Layer; verifiziert via dev-Server + Typecheck).

**Quality-Gate vor jedem Commit:** `npm run typecheck && npm test` müssen grün
sein. Bei content-Änderungen zusätzlich `npm run build:content`, sonst sind
`src/generated/*` stale.

## Konventionen

- **Tooling-Stabilität:** npm workspaces (kein pnpm — nicht installiert, D1),
  TS project references, esbuild (Lib/Plugin) / Vite (web), Preact 10. **Keine
  Tooling-Migration** (Webpack, Tailwind, CSS-in-JS, UI-Kit) ohne Rücksprache.
- **React → Preact-Alias:** überall `react`/`react-dom` → `preact/compat` (in
  esbuild.config, vite preset, jest moduleNameMapper, tsconfig `jsxImportSource`).
  Beim Hinzufügen neuer Build-/Test-Configs den Alias mitziehen.
- **Core bleibt rein:** kein `import 'obsidian'`, kein direkter DOM-Zugriff im
  Core. Neue Plattform-Bedürfnisse → über einen Port führen, nicht im Core
  hart verdrahten. `packages/core/src/index.ts` ist das einzige Barrel.
- **Content = SSOT in Markdown:** Missionen/Lore werden als `.md` mit Frontmatter
  geschrieben; `build.mjs` generiert `src/generated/*`. **Generierte Dateien nie
  von Hand editieren** — Quelle ändern + neu builden.
- **CSS via Tokens:** alle Web-Styles in `adapter-web/src/styles.css`, sechs
  `--nv-*` Variablen (`--nv-bg/panel/border/accent/text/muted`). Neue Farben als
  `:root`-Variable, nie inline-hex (siehe DESIGN-SPEC §3/§11).
- **Bundle-Budget (web):** code-split (initial ~310 KB; CM6 ~408 KB lazy; `marked`
  ~43 KB lazy). Keine schweren Visual-Deps; CSS-Motion vor JS-Libs. Jede neue
  Dependency muss ihr Gewicht rechtfertigen + möglichst lazy sein.
- **Bestand unangetastet:** Herkunft ist das Obsidian-Plugin `neurovim-trainer`
  v1.0.0 (`32_NeuroVim/_dev/plugin-src/`). Der Bestand bleibt unverändert; dieses
  Monorepo ist der Contract. Plugin-Swap in Jays Vault macht **Jay manuell** (das
  Repo schreibt nie in den Vault) — siehe `docs/PLUGIN-SWAP.md`.

## Glossar

| Term | Bedeutung |
|---|---|
| **CIPHER** | KI-Handler-Figur; die diegetische Stimme, die Missionen vergibt |
| **NEXUS** | Hub-/Dashboard-View (Operator-Status + Missionsliste) |
| **Mission** | Vim-Übung mit Story-Briefing; Typen: `practice` / `briefing` / `loot` / `sandbox` |
| **BRIEFING / TRANSMISSION** | zwei Teile einer Mission-Note: Story-Vorspann + die eigentliche Aufgabe |
| **KATA** | freie Drill-Übung ohne Story-Arc |
| **THE RAVEN / Sandbox** | Free-Play: N injizierte Glitches gegen die Uhr fixen (EASY/NORMAL/HARD) |
| **LOOT / FRAGMENT** | Lore-Artefakte (Story-Bible-Notes), als Belohnung freischaltbar |
| **GlitchEngine** | injiziert/validiert Text-Korruptionen (Sandbox + Korrektur-Missionen) |
| **PluginData** | persistenter Spieler-State (`types.ts`) = StoragePort-Payload |
| **Port** | Interface, das ein Adapter implementiert (VimModeSource/Storage/Content/UiHost) |
| **Kuro-Theme** | visuelle Ahnenlinie: terminal/CRT, phosphor-grün `#39ff7a`, monospace |

## Remotes & Distribution (ADR-001 D5)

- **Primary:** `codeberg.org/jkaindl/NeuroVIM` (live; git remote `codeberg`, `main` getrackt)
- **Mirror:** `github.com/johannes-kaindl/NeuroVIM` (live; git remote `github`) — hier läuft die Desktop-CI
- **CI:** Codeberg/Forgejo-Actions-Stub unter `.gitea/workflows/` (Build + Typecheck) — geplant
- Setup-Helfer: `scripts/setup-remotes.sh`. Passt zur 26-039-Migration auf
  Open-Source-Hosting (df.eu/Microsoft → mailbox.org/Codeberg).

## Wenn du etwas änderst

1. **Core rein halten** — neue Plattform-Logik über einen Port, nicht im Core.
2. **Content-Änderungen** → Markdown-Quelle editieren + `npm run build:content`.
3. **Gate grün halten** — `npm run typecheck && npm test` vor jedem Commit.
4. **Web-Styling** → nur `styles.css` + inline CM6-Theme, über `--nv-*` Tokens,
   Routing/Logik nicht anfassen (DESIGN-SPEC §11).
5. **Doku-Sync** — Architektur-/Port-Änderungen hier + im Decisions-Log nachziehen.
6. **Session-Logs** in `claude/logs/` (Frontmatter `title/date/status`, committed),
   Memory schlank in `claude/memory/`. `.claude/` ist lokaler Agent-State (gitignored).

## Roadmap

- **Polish-Pass adapter-web** — visueller/UX-Pass auf Basis von `docs/DESIGN-SPEC.md`
  (Welcome-Hero, NEXUS-Tier-Gruppierung, CM6-Theme + Vim-Mode-Indikator,
  type-aware Briefing-Callouts, Result-Celebration, Audio-Toggle + visuelle Pendants).
- **README-Status korrigieren** (Phase-2-Skelett-Zeile ist veraltet).
- **Remotes + CI** anlegen (Codeberg primary, GitHub mirror, Forgejo-Actions).
- **Plugin-Swap-Verifikation** durch Jay (`docs/PLUGIN-SWAP.md`-Checkliste).
