---
title: Brand-Icon + OpenGraph-Card + GitHub-Mirror
date: 2026-05-29
status: abgeschlossen
---

## Was erledigt wurde

- **App-Icon** `>_` Kuro-Mark: SVG-Quelle `docs/design-source/brand/icon.svg` →
  `icon-1024.png` (rsvg-convert) → `npx tauri icon` → ersetzt das Default-Tauri-Logo
  in `src-tauri/icons/`. android/ + ios/ Sets entfernt (nur Desktop). DMG mit neuem
  Icon neu gebaut (3,3 MB).
- **OpenGraph-Card** 1200×630: `brand/og.svg` → `packages/adapter-web/public/og.png`.
  `favicon.svg` ebenfalls nach public/. `index.html`: echtes Favicon + volle
  OG-/Twitter-Tags + theme-color.
- **GitHub-Mirror live:** `github.com/johannes-kaindl/NeuroVIM` als remote `github`.
  Push auf beide (codeberg + github). Desktop-CI (`.github/workflows/desktop.yml`)
  ist damit auf GitHub aktiv.
- Tools: `rsvg-convert` (librsvg) war bereits installiert.

## Caveats

- **OG-Image-Host** in `index.html` zeigt auf `jkaindl.codeberg.page/NeuroVIM/`
  (Platzhalter) — auf finale Deploy-URL anpassen, sonst zeigen Unfurls kein Bild.
- **Fonts in den Brand-SVGs** = `Menlo, monospace` (rsvg hat kein JetBrains Mono);
  die laufende Web-App nutzt weiterhin das gebündelte JetBrains Mono.
- **DMG-Bundling flaky:** `bundle_dmg.sh` (Finder-AppleScript) brach einmal ab, weil
  ein verwaistes DMG-Volume gemountet war → `hdiutil detach` + Retry löste es.

## Offen für nächste Session

- [ ] **CI testen:** Tag `v0.1.0` auf GitHub pushen → baut macOS/Windows/Linux-Installer
      als Draft-Release. (`git tag v0.1.0 && git push github v0.1.0`)
- [ ] OG-Host + ggf. Pages-Deployment finalisieren.
- [ ] Optional: Signing/Notarization; Icon visuell gegenchecken.
