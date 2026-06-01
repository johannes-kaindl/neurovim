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

## Code signing & notarization

A **notarized** build (Developer ID-signed, Apple-notarized, stapled) opens with
no Gatekeeper warning — online or offline. Signing + notarization are driven by
environment variables at `tauri build` time; without them the build is unsigned
(fine for local development — if macOS blocks an unsigned build, clear the
quarantine flag: `xattr -dr com.apple.quarantine /Applications/NeuroVim.app`).

A notarized build needs a **Developer ID Application** certificate in the login
keychain plus notarization credentials. The recommended secret-free path uses an
**App Store Connect API key** (`.p8`):

```bash
export APPLE_SIGNING_IDENTITY="Developer ID Application: <NAME> (<TEAM_ID>)"
export APPLE_API_ISSUER="<issuer-uuid>"
export APPLE_API_KEY="<key-id>"
export APPLE_API_KEY_PATH="$HOME/.appstoreconnect/private_keys/AuthKey_<key-id>.p8"
npm run build:dmg
```

(Alternative credential: an app-specific password — `APPLE_ID` + `APPLE_PASSWORD`
+ `APPLE_TEAM_ID` instead of the three `APPLE_API_*` vars.) Tauri then signs with
the Hardened Runtime + a secure timestamp, notarizes, and staples both the `.app`
and the `.dmg`. Verify: `spctl -a -t exec <app>` → `accepted, source=Notarized
Developer ID`.

> **CI releases are not signed yet.** The `desktop.yml` GitHub Actions workflow
> builds and publishes installers **unsigned** — wiring it for signing means
> adding the Developer ID cert (base64) and the API key as repository secrets and
> exporting the same `APPLE_*` vars in the macOS job.

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

The app icon (the Chrome Raven mark) in `src-tauri/icons/` is generated from the
brand kit at `docs/brand/`. To regenerate from the 1024×1024 source:

```bash
cd packages/adapter-web && npx tauri icon ../../docs/brand/icon-1024.png
rm -rf src-tauri/icons/android src-tauri/icons/ios   # desktop-only
```
