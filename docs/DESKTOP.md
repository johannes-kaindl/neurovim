# Desktop-App (Tauri)

NeuroVim als native Desktop-App — derselbe Web-Build (`@neurovim/adapter-web`),
verpackt mit [Tauri v2](https://tauri.app). Tauri nutzt das **OS-eigene WebView**
(WKWebView/WebView2/WebKitGTK), daher sind die Installer klein (~8–15 MB statt
~100 MB bei Electron). Tauri-Projekt: `packages/adapter-web/src-tauri/`.

## Lokal bauen

**Voraussetzungen:** Node + npm, Rust (`rustup`), Xcode Command Line Tools (macOS).

```bash
npm install
npm run build:dmg        # = build:content + tauri build (→ vite build + Bundle)
```

Ergebnis (macOS):
- `.app`: `packages/adapter-web/src-tauri/target/release/bundle/macos/NeuroVim.app`
- `.dmg`: `packages/adapter-web/src-tauri/target/release/bundle/dmg/NeuroVim_<version>_<arch>.dmg`

Entwicklung mit Hot-Reload im nativen Fenster:

```bash
npm run desktop:dev      # = build:content + tauri dev (Vite-HMR im WebView)
```

## Unsigniert — Gatekeeper-Hinweis

Die Builds sind **nicht code-signiert/notarisiert** (kein Apple-Developer-Account).
Beim ersten Start meldet macOS „unbekannter Entwickler". Öffnen per:

- **Rechtsklick auf die App → „Öffnen"** → im Dialog „Öffnen" bestätigen, **oder**
- Quarantäne-Flag entfernen:
  ```bash
  xattr -dr com.apple.quarantine /Applications/NeuroVim.app
  ```

Für einen warnungsfreien Start bräuchte es einen Apple-Developer-Account (99 $/Jahr)
+ Developer-ID-Signing + Notarization.

## CI — alle Plattformen

`.github/workflows/desktop.yml` baut bei einem `v*`-Tag (oder manuell) macOS-DMG
(universal), Windows-.exe/.msi und Linux-.AppImage/.deb und legt sie als
Draft-GitHub-Release ab.

> **Läuft nur auf GitHub Actions.** macOS-/Windows-Installer brauchen macOS-/Windows-
> Runner, die Codeberg/Forgejo-Shared-Runner nicht bieten. Der Workflow greift,
> sobald der GitHub-Mirror existiert (ADR-001 D5). Auf Codeberg ließe sich höchstens
> das Linux-Artefakt via Forgejo-Actions bauen.

Release auslösen:

```bash
git tag v0.1.0 && git push github v0.1.0   # bzw. den Mirror-Remote-Namen
```

## Icons

Aktuell die Tauri-Default-Icons (`src-tauri/icons/`). Für ein echtes `>_`-NeuroVim-Mark:
ein 1024×1024-PNG bereitstellen und `npx tauri icon <pfad.png>` (regeneriert alle
Größen inkl. `.icns`/`.ico`).
