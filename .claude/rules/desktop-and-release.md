---
paths:
  - ".github/workflows/**"
  - "packages/adapter-web/src-tauri/**"
  - "scripts/bump-version.sh"
  - "scripts/setup-remotes.sh"
  - "docs/dev/how-to/release.md"
  - "docs/dev/how-to/build-desktop-app.md"
  - "docs/dev/reference/desktop-ci.md"
---

# Desktop build, release and mirror

Moved verbatim from AGENTS.md (CORE-AGENT-15); this file loads when a session reads a matching file.

**Desktop (Tauri v2):** `packages/adapter-web/src-tauri/` wraps the Vite build as a
native app (OS WebView, DMG ~3 MB). Multi-OS installers via
`.github/workflows/desktop.yml` (GitHub Actions only). Building: `docs/dev/how-to/build-desktop-app.md`
(macOS + Linux); CI matrix and secrets: `docs/dev/reference/desktop-ci.md`.

- **Desktop CI runs only on the GitHub mirror:** a release tag pushed to git.jkaindl.de
  alone never builds installers — push it to the `github` remote explicitly. A
  Forgejo→GitHub push mirror carries **branches** with some lag; whether it carries tags is
  untested. If `git push github main` is rejected with `cannot lock ref … is at <your sha>`,
  the mirror got there first — that is success; verify with `git ls-remote`, never force.
  Observations: `docs/dev/explanation/decisions.md`; procedure: `docs/dev/how-to/release.md`.

- **`npm version` reformats `package.json`:** it normalizes JSON formatting
  (e.g. expands one-line objects); that churn is expected when using
  `scripts/bump-version.sh`.
