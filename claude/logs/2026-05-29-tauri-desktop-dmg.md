---
title: Tauri-Desktop-App + Multi-OS-CI (DMG)
date: 2026-05-29
status: abgeschlossen
---

## Was erledigt wurde

NeuroVim als native Desktop-App via **Tauri v2** verpackt (User-Wunsch: DMG).

- **Rust** via rustup installiert (1.96, `~/.cargo`), Xcode CLT war da.
- **Tauri v2** in `packages/adapter-web/src-tauri/` (tauri init --ci, frontendDist `../dist`,
  devUrl :5173, identifier `com.jkaindl.neurovim`, Fenster 1100×820 zentriert).
  `@tauri-apps/cli` als devDep in adapter-web.
- **Scripts:** Root `build:dmg` / `desktop:dev`; adapter-web `tauri`/`desktop:dev`/`desktop:build`.
- **Lokaler DMG gebaut + verifiziert:** `NeuroVim_0.1.0_aarch64.dmg` (**3,3 MB**) +
  `NeuroVim.app`. Build exit 0, ~2,5 min (erster Rust-Compile).
- **CI:** `.github/workflows/desktop.yml` — `tauri-action`-Matrix macOS (universal DMG) /
  Windows (.exe/.msi) / Linux (.AppImage/.deb), Tag `v*` → Draft-Release.
- **Doku:** `docs/DESKTOP.md` (lokaler Build, Gatekeeper-Hinweis, CI, Icons),
  Memory `project_desktop.md`, AGENTS.md ergänzt.

## Wichtige Entscheidungen / Caveats

- **Tauri statt Electron** (User-Wahl): cross-platform + schlank (3 MB statt ~100 MB).
- **CI nur auf GitHub Actions** — Codeberg/Forgejo-Shared-Runner sind Linux-only, können
  kein macOS/Windows. Workflow greift erst mit GitHub-Mirror (ADR-001 D5, noch TODO).
- **Unsigniert** — Gatekeeper-Warnung beim ersten Start (kein Apple-Dev-Account).
- **Default-Icons** (Tauri-Logo) — echtes `>_`-Mark via `tauri icon <png>` als Follow-up.

## Offen für nächste Session

- [ ] **GitHub-Mirror** anlegen → CI baut dann automatisch alle Installer.
- [ ] **App-Icon** `>_` (1024×1024 PNG → `npx tauri icon`).
- [ ] Optional: erster Release-Tag `v0.1.0` zum CI-Test (nach Mirror).
- [ ] Optional: Signing/Notarization für warnungsfreien Start.
