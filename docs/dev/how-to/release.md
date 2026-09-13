# How-to — Cut a release

> **Diátaxis: How-to.** Bump the version, tag, build the installers and publish them. What
> the CI does with the tag is listed in [Reference → Desktop CI](../reference/desktop-ci.md).

**Prerequisites:**

- a clean `main` with `npm run typecheck && npm test` green
- both remotes configured: `origin` (git.jkaindl.de, primary) and `github` (the GitHub mirror,
  runs the desktop CI) — check with `git remote -v`; add a missing one with
  `git remote add github <mirror-url>`
- push rights on both

## 1 · Bump the version

1. Run the bump script with an explicit version or a level:

   ```bash
   bash scripts/bump-version.sh patch     # or minor | major | X.Y.Z
   ```

   It updates `package.json` (root + workspaces), `packages/adapter-web/src-tauri/tauri.conf.json`,
   `src-tauri/Cargo.toml` and the `neurovim` entry in `src-tauri/Cargo.lock`, then prints a
   ✓/✗ line per file.
2. **On Linux** the script stops at `Cargo.toml` with
   `sed: can't read s/^version = …: No such file or directory` — it uses the BSD form
   `sed -i ''`. The `package.json` files and `tauri.conf.json` are already updated at that
   point. Set `version = "X.Y.Z"` by hand in `src-tauri/Cargo.toml` (the `[package]` line) and
   in `src-tauri/Cargo.lock` (the line under `name = "neurovim"`).
3. Review the diff. `npm version` reformats `package.json` (e.g. expands one-line objects);
   that churn is expected.

## 2 · Update the changelog

1. In `CHANGELOG.md`, rename `## [Unreleased]` to `## [X.Y.Z] — YYYY-MM-DD` and open a new
   empty `## [Unreleased]` above it.

## 3 · Commit and tag

```bash
git add -- CHANGELOG.md package.json package-lock.json packages/*/package.json \
  packages/adapter-web/src-tauri/{tauri.conf.json,Cargo.toml,Cargo.lock}
git commit -m "chore(release): vX.Y.Z"
git tag vX.Y.Z
```

Tags keep the `v` prefix — the CI trigger is `v*`.

## 4 · Push to both remotes

1. Push the branch and the tag to the primary:

   ```bash
   git push origin main
   git push origin vX.Y.Z
   ```

2. Push both explicitly to the mirror — a tag that reaches only `origin` builds nothing:

   ```bash
   git push github main
   git push github vX.Y.Z
   ```

3. Verify instead of re-pushing:

   ```bash
   git ls-remote github main refs/tags/vX.Y.Z
   ```

   Both must show your SHAs. If `git push github main` was rejected with
   `cannot lock ref 'refs/heads/main': is at <your-sha> but expected <old-sha>`, the push
   mirror landed the commit first — that is success. Never force.

## 5 · Publish the GitHub release

1. Wait for the `desktop` workflow run on the tag to finish on GitHub Actions.
2. Open the repository's **Releases** page: the run created a **draft** named
   `NeuroVim vX.Y.Z` with the installers attached.
3. Check that all three platforms' artifacts are present, add release notes (from
   `CHANGELOG.md`), and press **Publish release**.

## 6 · Mirror the installers to Forgejo

The player docs link to <https://git.jkaindl.de/jkaindl/NeuroVIM/releases>.

1. Download the installers from the published GitHub release.
2. On git.jkaindl.de open **Releases → New release**, select the existing tag `vX.Y.Z`, set
   the title `NeuroVim vX.Y.Z` and the notes.
3. Attach the installer files and publish.

The same is possible over the Forgejo API: `POST /api/v1/repos/jkaindl/NeuroVIM/releases`
creates the release, `POST /api/v1/repos/jkaindl/NeuroVIM/releases/{id}/assets` uploads one
file per call (multipart field `attachment`), both with an access token.

## 7 · Deploy the web app

Two independent targets:

| Target | How it updates |
|---|---|
| <https://pages.jkaindl.de/neurovim-standalone/> | manually: `bash scripts/deploy-page.sh` |
| <https://johannes-kaindl.github.io/NeuroVIM/> | automatically: `.github/workflows/pages.yml` on every push to `main` of the GitHub mirror |

`scripts/deploy-page.sh` needs:

- a clean working tree (it refuses otherwise)
- rsync 3.x — the script defaults to `/opt/homebrew/bin/rsync`; elsewhere set
  `RSYNC=$(command -v rsync)`
- the `pages-deploy` SSH host alias in `~/.ssh/config` with the deploy key

It runs `npm install`, `build:content`, `build:web` and rsyncs `packages/adapter-web/dist/` to the
pages server with `--delete`.
