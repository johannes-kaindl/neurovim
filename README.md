<p align="center">
  <img src="docs/brand/og.png" alt="NeuroVim — a Vim-learning game wrapped in a cyberpunk spy-thriller" width="680">
</p>

<h1 align="center">NeuroVim</h1>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-AGPL--3.0-8a4dff?style=flat-square" alt="License: AGPL-3.0"></a>
  <a href="https://jkaindl.codeberg.page/neurovim/"><img src="https://img.shields.io/badge/play-in%20browser-39ff7a?style=flat-square" alt="Play in browser"></a>
</p>

<p align="center"><i>Learn Vim by playing a cyberpunk spy-thriller.</i></p>

<p align="center">
  <b>▶ <a href="https://jkaindl.codeberg.page/neurovim/">Play in the browser</a></b>
  <sub>(<a href="https://johannes-kaindl.github.io/NeuroVIM/">GitHub Pages mirror</a>)</sub>
  &nbsp;·&nbsp;
  <a href="https://github.com/johannes-kaindl/NeuroVIM/releases">Desktop downloads</a>
</p>

An AI handler named **CIPHER** assigns you "missions" that are really Vim
exercises — restore CORP-corrupted documents, fix glitched transmissions, beat
the clock. You end up learning Vim almost by accident; the spy-thriller is the
hook. Same game ships three ways from one codebase: a **web app**, an **Obsidian
plugin**, and a **native desktop app**.

## Screenshots

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/01-welcome.png" width="380" alt="Welcome"><br><sub>Welcome — CIPHER intro</sub></td>
    <td align="center"><img src="docs/screenshots/02-nexus-picker.png" width="380" alt="NEXUS"><br><sub>NEXUS — mission picker + status</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/03-briefing.png" width="380" alt="Briefing"><br><sub>Briefing — story before each mission</sub></td>
    <td align="center"><img src="docs/screenshots/04-editor.png" width="380" alt="Editor"><br><sub>Editor — CodeMirror 6 + Vim</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/05-result-modal.png" width="380" alt="Result"><br><sub>Result — mission complete</sub></td>
    <td align="center"><img src="docs/screenshots/06-sandbox.png" width="380" alt="Sandbox"><br><sub>THE RAVEN — free-play sandbox</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screenshots/07-archive-index.png" width="380" alt="Lore Archive"><br><sub>Archive — unlockable lore &amp; loot</sub></td>
    <td align="center"><img src="docs/screenshots/09-cheatsheet.png" width="380" alt="Cheatsheet"><br><sub>Cheatsheet — Vim keymap overlay</sub></td>
  </tr>
</table>

## Features

- **Story-driven campaign** — a curriculum of Vim missions (motions, operators,
  text objects, search & replace, macros, registers, regex) wrapped in a narrative.
- **Real editor** — CodeMirror 6 with actual Vim keybindings, not a fake terminal.
- **THE RAVEN sandbox** — free-play: fix N injected glitches against the clock,
  beat your best (EASY / NORMAL / HARD).
- **Progression** — XP, levels, streaks, per-mission best times; progress saved
  locally in your browser.
- **Terminal / CRT aesthetic** — restrained phosphor-green "Kuro" theme, monospace,
  optional scanline.
- **Plays anywhere** — in the browser with no install, or as a ~3 MB native desktop
  app (macOS / Windows / Linux).

## Play

- **Browser:** **https://jkaindl.codeberg.page/neurovim/** — nothing to install.
- **Desktop:** download an installer from the [latest release](https://github.com/johannes-kaindl/NeuroVIM/releases)
  (macOS `.dmg`, Windows `.exe`/`.msi`, Linux `.AppImage`/`.deb`/`.rpm`). The macOS
  `.dmg` is Developer ID-signed + notarized (opens without a Gatekeeper warning); the
  Windows installer is currently unsigned — see [`docs/DESKTOP.md`](docs/DESKTOP.md).

## Run from source

```bash
npm install
npm run dev          # web app → http://localhost:5173/
```

```bash
npm run build        # full build (content → Obsidian plugin → web)
npm test             # test suite
npm run build:dmg    # native desktop app + macOS DMG (needs Rust + Xcode CLT)
```

Contributor guide: [`CONTRIBUTING.md`](CONTRIBUTING.md) · architecture & internals
for agents/maintainers: [`AGENTS.md`](AGENTS.md).

## Built with

TypeScript · [Preact](https://preactjs.com/) · [CodeMirror 6](https://codemirror.net/)
+ [@replit/codemirror-vim](https://github.com/replit/codemirror-vim) · Vite ·
[Tauri v2](https://tauri.app) · self-hosted [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (OFL).

A small monorepo (npm workspaces): a platform-neutral **core** (game logic, Web
Audio, Preact UI) with thin **adapters** for the web, Obsidian, and desktop. No
UI kit, no CSS framework. See [`AGENTS.md`](AGENTS.md) for the architecture.

## Contributing

Issues and PRs welcome on [Codeberg](https://codeberg.org/jkaindl/NeuroVIM)
(primary) or the [GitHub mirror](https://github.com/johannes-kaindl/NeuroVIM).
Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) first.

## License

NeuroVim is **dual-licensed** — see [`LICENSING.md`](LICENSING.md).

- **Open source:** [GNU AGPL-3.0](LICENSE) — copyleft with the network-use clause:
  if you host a modified version so others can use it over the network, the source
  of your variant must also be made available under the AGPL.
- **Commercial license:** for uses that the AGPL does not fit — e.g. a proprietary
  or closed-source product, or an Apple App Store build (App Store terms are
  incompatible with the AGPL) — a separate commercial license is available. See
  [`LICENSING.md`](LICENSING.md); contributions are covered by the [CLA](CLA.md).

The bundled JetBrains Mono font is under the
[SIL Open Font License](packages/adapter-web/src/fonts/OFL.txt).
