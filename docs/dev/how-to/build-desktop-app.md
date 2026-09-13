# How-to — Build the desktop app

> **Diátaxis: How-to.** Build the Tauri v2 desktop app from source on macOS or Linux. The CI
> pipeline that builds release installers is described in
> [Reference → Desktop CI](../reference/desktop-ci.md).

The Tauri project is `packages/adapter-web/src-tauri/`. It wraps the web build and uses the
OS WebView (WKWebView on macOS, WebKitGTK on Linux, WebView2 on Windows). The built binary
embeds the web assets and runs offline.

- [Run the desktop app with hot reload](#run-the-desktop-app-with-hot-reload)
- [Build on macOS](#build-on-macos)
- [Build a signed and notarized macOS app](#build-a-signed-and-notarized-macos-app)
- [Build and install on Linux without root](#build-and-install-on-linux-without-root)
- [Build Linux bundles (AppImage, deb)](#build-linux-bundles-appimage-deb)
- [Regenerate the app icons](#regenerate-the-app-icons)

---

## Run the desktop app with hot reload

1. `npm install`
2. `npm run desktop:dev` — rebuilds the content manifest, starts Vite and opens the native
   window with HMR.

## Build on macOS

**Prerequisites:** Node + npm, Rust (`rustup`), Xcode Command Line Tools.

1. `npm install`
2. `npm run build:dmg`
3. Find the output:
   - `packages/adapter-web/src-tauri/target/release/bundle/macos/NeuroVim.app`
   - `packages/adapter-web/src-tauri/target/release/bundle/dmg/NeuroVim_<version>_<arch>.dmg`

Without signing variables the build is unsigned. If macOS refuses to open it, clear the
quarantine flag:

```bash
xattr -dr com.apple.quarantine /Applications/NeuroVim.app
```

## Build a signed and notarized macOS app

**Prerequisites:** a **Developer ID Application** certificate in the login keychain, and an
App Store Connect API key (`.p8`).

1. Export the signing and notarization variables:

   ```bash
   export APPLE_SIGNING_IDENTITY="Developer ID Application: <NAME> (<TEAM_ID>)"
   export APPLE_API_ISSUER="<issuer-uuid>"
   export APPLE_API_KEY="<key-id>"
   export APPLE_API_KEY_PATH="$HOME/.appstoreconnect/private_keys/AuthKey_<key-id>.p8"
   ```

   Alternative credential set: `APPLE_ID` + `APPLE_PASSWORD` (app-specific password) +
   `APPLE_TEAM_ID` instead of the three `APPLE_API_*` variables.
2. `npm run build:dmg` — Tauri signs with the Hardened Runtime, notarizes and staples the
   `.app` and the `.dmg`.
3. Verify: `spctl -a -t exec <path-to>/NeuroVim.app` must print
   `accepted, source=Notarized Developer ID`.

## Build and install on Linux without root

Builds a plain binary, without installer bundles, and installs it for the current user.
Tested on Arch Linux (Omarchy, Hyprland).

**Prerequisites:**

- Node + npm
- `webkit2gtk-4.1` and `gtk3` installed (system packages)
- a Rust toolchain — either via [mise](https://mise.jdx.dev/) (`mise install rust@stable`) or
  via `rustup` (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`)

1. From the repo root: `npm install && npm run build:content`
2. Build the release binary:

   ```bash
   cd packages/adapter-web
   npx tauri build --no-bundle
   ```

   With a mise-installed Rust that is not activated globally, prefix the command:
   `mise exec rust@stable -- npx tauri build --no-bundle`.
   The binary lands at `src-tauri/target/release/neurovim`.
3. Install binary and icons:

   ```bash
   install -Dm755 src-tauri/target/release/neurovim ~/.local/bin/neurovim
   install -Dm644 src-tauri/icons/32x32.png      ~/.local/share/icons/hicolor/32x32/apps/neurovim.png
   install -Dm644 src-tauri/icons/128x128.png    ~/.local/share/icons/hicolor/128x128/apps/neurovim.png
   install -Dm644 src-tauri/icons/128x128@2x.png ~/.local/share/icons/hicolor/256x256/apps/neurovim.png
   install -Dm644 src-tauri/icons/icon.png       ~/.local/share/icons/hicolor/512x512/apps/neurovim.png
   gtk-update-icon-cache ~/.local/share/icons/hicolor
   ```

4. Create `~/.local/share/applications/neurovim.desktop`. Use the **absolute** path in `Exec`
   — a launcher's `PATH` may not include `~/.local/bin`:

   ```ini
   [Desktop Entry]
   Version=1.0
   Type=Application
   Name=NeuroVim
   Comment=Vim-learning game — missions from CIPHER
   Exec=/home/<user>/.local/bin/neurovim
   Icon=neurovim
   Terminal=false
   Categories=Game;
   StartupWMClass=neurovim
   StartupNotify=true
   ```

5. Validate: `desktop-file-validate ~/.local/share/applications/neurovim.desktop`
6. Start NeuroVim from the application launcher.

**If the window stays black** under Wayland, start it with
`WEBKIT_DISABLE_DMABUF_RENDERER=1` (put it into `Exec` as
`env WEBKIT_DISABLE_DMABUF_RENDERER=1 /home/<user>/.local/bin/neurovim`).

**To update** after new commits: repeat steps 1–3; the `.desktop` file stays.

## Build Linux bundles (AppImage, deb)

**Prerequisites** (Debian/Ubuntu package names, as used by CI):
`libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf`, plus Rust.

1. `npm install`
2. `npm run build:dmg` — on Linux this runs `tauri build` with `bundle.targets: "all"` and
   writes the Linux bundles.
3. Find them under `packages/adapter-web/src-tauri/target/release/bundle/`.

## Regenerate the app icons

The icons in `src-tauri/icons/` are generated from the brand kit in `docs/brand/`.

1. `cd packages/adapter-web`
2. `npx tauri icon ../../docs/brand/icon-1024.png`
3. Remove the mobile sets: `rm -rf src-tauri/icons/android src-tauri/icons/ios`
