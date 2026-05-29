---
name: neurovim-standalone — Desktop/Tauri
description: Tauri-v2-Desktop-Wrapper um adapter-web; lokaler DMG-Build + Multi-OS-CI
type: project
---

**Desktop-App via Tauri v2** (2026-05-29). Projekt: `packages/adapter-web/src-tauri/`.
Verpackt den bestehenden Vite-Build (`frontendDist: ../dist`), nutzt das OS-eigene
WebView → macOS-DMG ist nur **~3 MB**. Kein Backend, kein Custom-Rust (Default-Template
+ tauri-plugin-log). Identifier `com.jkaindl.neurovim`, Fenster 1100×820 zentriert.

**Bauen:**
- `npm run build:dmg` (Root) = `build:content` + `tauri build` (→ vite build + Bundle).
- `npm run desktop:dev` = HMR im nativen Fenster.
- Artefakte: `…/src-tauri/target/release/bundle/{macos/NeuroVim.app, dmg/NeuroVim_<v>_<arch>.dmg}`.
- Voraussetzung: Rust (rustup, lokal installiert in `~/.cargo`), Xcode CLT.

**CI:** `.github/workflows/desktop.yml` — `tauri-action`-Matrix baut bei Tag `v*`
macOS (universal DMG) / Windows (.exe/.msi) / Linux (.AppImage/.deb) als Draft-Release.
**Nur GitHub Actions** — Codeberg/Forgejo-Shared-Runner sind Linux-only, können kein
mac/win. Greift erst, wenn der GitHub-Mirror existiert (ADR-001 D5, noch TODO).

**Unsigniert** (kein Apple-Developer-Account) → Gatekeeper-Warnung beim ersten Start
(Rechtsklick→Öffnen oder `xattr -dr com.apple.quarantine`). Doku: `docs/DESKTOP.md`.

**TODO:** echtes `>_`-Icon (`tauri icon <png>` statt Default-Tauri-Logo); GitHub-Mirror
für die CI; ggf. Signing/Notarization wenn warnungsfreie Distribution gewünscht.
