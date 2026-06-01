# Security Policy

## Scope

NeuroVim is a client-side application with no backend and no accounts. The web app
runs entirely in the browser; player progress is stored locally (IndexedDB). The
desktop build is a Tauri wrapper around the same static assets. There is no server
to attack and no user data leaves the device.

The most relevant surface is the Markdown renderer in the web app, which uses
`dangerouslySetInnerHTML` on **build-time-bundled, trusted content only** (no user
input). If you find a way to inject untrusted HTML/script through normal usage,
that's a bug worth reporting.

## Reporting a vulnerability

Please report privately rather than opening a public issue:

- Open a confidential issue on Codeberg (`codeberg.org/jkaindl/NeuroVIM`), or
- Contact the maintainer directly.

Include steps to reproduce and the affected target (web / Obsidian plugin /
desktop). You'll get an acknowledgement as soon as possible.

## Note on desktop builds

CI release installers are currently **unsigned** — the GitHub Actions workflow is
not yet wired for code signing. A **notarized** macOS build (Developer ID + Apple
notarization) can be produced locally; see `docs/DESKTOP.md`. Verify downloads come
from the official releases.
