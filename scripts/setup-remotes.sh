#!/usr/bin/env bash
#
# setup-remotes.sh — wire up the Forgejo (primary) + GitHub (mirror) remotes.
#
# This script creates NO accounts and NO repos and pushes NOTHING.
# It only sets the git remotes. Create the repos in the web UIs first, then run
# the pushes yourself (see the output at the end).
#
# Usage:
#   1. Fill in FORGEJO_USER / GITHUB_USER below.
#   2. Create empty "neurovim-standalone" repos on git.jkaindl.de + github.com.
#   3. bash scripts/setup-remotes.sh
#   4. Run the two git push commands from the output yourself.
#
set -euo pipefail

# ── Fill in ────────────────────────────────────────────────────
FORGEJO_USER="CHANGEME"    # ← Forgejo (git.jkaindl.de) username or org
GITHUB_USER="CHANGEME"     # ← GitHub username or org
REPO="neurovim-standalone"
# ───────────────────────────────────────────────────────────────

if [[ "$FORGEJO_USER" == "CHANGEME" || "$GITHUB_USER" == "CHANGEME" ]]; then
  echo "✗ Please fill in FORGEJO_USER and GITHUB_USER at the top of the script first." >&2
  exit 1
fi

cd "$(dirname "$0")/.."

set_remote() {
  local name="$1" url="$2"
  if git remote | grep -qx "$name"; then
    git remote set-url "$name" "$url"
  else
    git remote add "$name" "$url"
  fi
}

set_remote origin "git@git.jkaindl.de:${FORGEJO_USER}/${REPO}.git"
set_remote github "git@github.com:${GITHUB_USER}/${REPO}.git"

echo "✓ Remotes set:"
git remote -v
echo
echo "Now push yourself (branch: $(git branch --show-current)):"
echo "  git push -u origin main      # primary  → Forgejo"
echo "  git push github main         # mirror   → GitHub"
echo
echo "Automate the mirror (optional, one of the two options):"
echo "  • Forgejo → Settings → Repository Mirroring (push mirror to GitHub)"
echo "  • git remote set-url --add --push origin git@github.com:${GITHUB_USER}/${REPO}.git"
