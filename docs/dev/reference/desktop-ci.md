# Reference — Desktop CI

> **Diátaxis: Reference.** The Tauri installer pipeline in `.github/workflows/desktop.yml`.
> To cut a release, follow [How-to → Release](../how-to/release.md); to build locally,
> [How-to → Build the desktop app](../how-to/build-desktop-app.md).

## Where it runs

| Property | Value |
|---|---|
| Workflow | `.github/workflows/desktop.yml` (`name: desktop`) |
| Runner platform | **GitHub Actions only** — the Forgejo shared runners are Linux-only and cannot build macOS or Windows installers |
| Triggers | push of a tag matching `v*`; manual `workflow_dispatch` |
| Tag source | the `github` remote — a tag pushed only to `origin` (git.jkaindl.de) builds nothing |
| Permissions | `contents: write` |
| Result | a **draft** GitHub release named `NeuroVim <tag>` with the installers attached (`releaseDraft: true`, `prerelease: false`) |

## Build matrix

`fail-fast: false` — one failing platform does not cancel the others.

| `platform` | Tauri `args` | Rust targets | Artifacts (per workflow header) |
|---|---|---|---|
| `macos-latest` | `--target universal-apple-darwin` | `aarch64-apple-darwin`, `x86_64-apple-darwin` | `.dmg` (universal) |
| `ubuntu-22.04` | — | — | `.AppImage`, `.deb` |
| `windows-latest` | — | — | `.exe`, `.msi` |

`tauri.conf.json` sets `bundle.targets: "all"`, so each platform emits every bundle format its
Tauri version supports.

## Steps

| # | Step | Detail |
|---|---|---|
| 1 | `actions/checkout@v6` | |
| 2 | Install Linux system deps | Ubuntu only: `libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf` |
| 3 | `actions/setup-node@v6` | Node 20, npm cache |
| 4 | `dtolnay/rust-toolchain@stable` | with the matrix Rust targets |
| 5 | `swatinem/rust-cache@v2` | workspace `./packages/adapter-web/src-tauri -> target` |
| 6 | `npm ci` | |
| 7 | `npm run build:content` | |
| 8 | `tauri-apps/tauri-action@v0` | `projectPath: packages/adapter-web`; Tauri's `beforeBuildCommand` builds the web app |

## Signing

| Platform | Status |
|---|---|
| macOS | Developer ID-signed + notarized when the `APPLE_*` secrets are set; **unsigned without failing** when they are not |
| Windows | unsigned |
| Linux | unsigned |

Repository secrets (**GitHub → Settings → Secrets and variables → Actions**), all plain strings,
passed to `tauri-action` as environment variables and consumed only by the macOS job:

| Secret | Content |
|---|---|
| `APPLE_CERTIFICATE` | base64 of the exported **Developer ID Application** `.p12` — containing only that one identity |
| `APPLE_CERTIFICATE_PASSWORD` | password set when exporting the `.p12` |
| `APPLE_SIGNING_IDENTITY` | `Developer ID Application: <NAME> (<TEAM_ID>)` |
| `APPLE_ID` | Apple ID email |
| `APPLE_PASSWORD` | app-specific password (appleid.apple.com → Sign-In & Security) |
| `APPLE_TEAM_ID` | 10-character Developer Team ID |

`GITHUB_TOKEN` is the workflow's built-in token.

## Known failure

| Symptom | Cause |
|---|---|
| `certificate … does not match provided identity` | the `.p12` bundles more than one identity (e.g. exported with `security export -t identities`); export the single Developer ID cert from Keychain Access instead |
