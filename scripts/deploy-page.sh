#!/usr/bin/env bash
# Deploy the web app to pages.jkaindl.de.
#
# Builds packages/adapter-web/dist and rsyncs it to the pages server
# (/srv/pages/neurovim-standalone/, served at
# https://pages.jkaindl.de/neurovim-standalone/). Replaces the old Forgejo
# workflow that pushed a pages branch to Codeberg (.forgejo/workflows/pages.yml,
# removed — the self-hosted Forgejo runs no CI runner by design).
# The GitHub Pages mirror (.github/workflows/pages.yml) is unaffected.
#
# Auth is via the dedicated deploy key behind the `pages-deploy` SSH host alias
# (~/.ssh/config) — restricted server-side to rsync into /srv/pages only.
#
# Requires real rsync 3.x — macOS ships openrsync, which is incompatible with
# the server-side rrsync wrapper: brew install rsync
#
# Usage: bash scripts/deploy-page.sh

set -euo pipefail

RSYNC="${RSYNC:-/opt/homebrew/bin/rsync}"
# No pipe here: grep -q + pipefail would turn rsync's SIGPIPE into a failure.
case "$("$RSYNC" --version 2>/dev/null || true)" in
  *"version 3."*) ;;
  *)
    echo "ERROR: $RSYNC is not rsync 3.x (macOS openrsync won't work): brew install rsync" >&2
    exit 1
    ;;
esac

DEST="pages-deploy:neurovim-standalone/"

cd "$(git rev-parse --show-toplevel)"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "ERROR: working tree not clean — commit or stash before deploying." >&2
  exit 1
fi

echo "=== Building web app ==="
npm install
npm run build:content
npm run build:web

DIST="packages/adapter-web/dist"
if [[ ! -f "$DIST/index.html" ]]; then
  echo "ERROR: $DIST/index.html missing after build." >&2
  exit 1
fi

echo ""
echo "=== Publishing $DIST via rsync ==="
"$RSYNC" -az --delete "$DIST"/ "$DEST"

echo ""
echo "✓ Deployed. Live: https://pages.jkaindl.de/neurovim-standalone/"
