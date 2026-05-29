# Desktop App (Tauri)

NeuroVim as a native desktop app — the same web build (`@neurovim/adapter-web`),
packaged with [Tauri v2](https://tauri.app). Tauri uses the **OS-native WebView**
(WKWebView/WebView2/WebKitGTK), so the installers are small (~8–15 MB instead of
~100 MB with Electron). Tauri project: `packages/adapter-web/src-tauri/`.

## Building locally

**Prerequisites:** Node + npm, Rust (`rustup`), Xcode Command Line Tools (macOS).

```bash
npm install
npm run build:dmg        # = build:content + tauri build (→ vite build + bundle)
```

Output (macOS):
- `.app`: `packages/adapter-web/src-tauri/target/release/bundle/macos/NeuroVim.app`
- `.dmg`: `packages/adapter-web/src-tauri/target/release/bundle/dmg/NeuroVim_<version>_<arch>.dmg`

Development with hot reload in the native window:

```bash
npm run desktop:dev      # = build:content + tauri dev (Vite HMR in the WebView)
```

## Unsigned — Gatekeeper note

The builds are **not code-signed/notarized** (no Apple Developer account).
On first launch, macOS reports an "unknown developer". Open it via:

- **Right-click the app → "Open"** → confirm "Open" in the dialog, **or**
- Remove the quarantine flag:
  ```bash
  xattr -dr com.apple.quarantine /Applications/NeuroVim.app
  ```

A warning-free launch would require an Apple Developer account ($99/year)
+ Developer ID signing + notarization.

## CI — all platforms

`.github/workflows/desktop.yml` builds a macOS DMG (universal),
Windows .exe/.msi and Linux .AppImage/.deb on a `v*` tag (or manually) and
publishes them as a draft GitHub release.

> **Runs only on GitHub Actions.** macOS/Windows installers need macOS/Windows
> runners, which the Codeberg/Forgejo shared runners don't provide. The workflow
> takes effect once the GitHub mirror exists (ADR-001 D5). On Codeberg, at most
> the Linux artifact could be built via Forgejo Actions.

Trigger a release:

```bash
git tag v0.1.0 && git push github v0.1.0   # or the mirror remote name
```

## Icons

The app icon is the `>_` NeuroVim mark in `src-tauri/icons/`, generated from
`docs/design-source/brand/icon.svg`. To regenerate after editing the source:

```bash
rsvg-convert -w 1024 -h 1024 docs/design-source/brand/icon.svg -o docs/design-source/brand/icon-1024.png
cd packages/adapter-web && npx tauri icon ../../docs/design-source/brand/icon-1024.png
rm -rf src-tauri/icons/android src-tauri/icons/ios   # desktop-only
```
