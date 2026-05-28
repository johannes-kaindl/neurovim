#!/usr/bin/env bash
#
# setup-remotes.sh — Codeberg (primary) + GitHub (mirror) remotes verdrahten.
#
# Dieses Script erstellt KEINE Accounts und KEINE Repos und pusht NICHTS.
# Es setzt nur die git-Remotes. Repos vorher in den Web-UIs anlegen, Push
# danach selbst auslösen (siehe Ausgabe am Ende).
#
# Benutzung:
#   1. CODEBERG_USER / GITHUB_USER unten ausfüllen.
#   2. Leere Repos "neurovim-standalone" auf codeberg.org + github.com anlegen.
#   3. bash scripts/setup-remotes.sh
#   4. Die zwei git-push-Befehle aus der Ausgabe selbst ausführen.
#
set -euo pipefail

# ── Ausfüllen ──────────────────────────────────────────────────
CODEBERG_USER="CHANGEME"   # ← Codeberg-Username oder Org
GITHUB_USER="CHANGEME"     # ← GitHub-Username oder Org
REPO="neurovim-standalone"
# ───────────────────────────────────────────────────────────────

if [[ "$CODEBERG_USER" == "CHANGEME" || "$GITHUB_USER" == "CHANGEME" ]]; then
  echo "✗ Bitte zuerst CODEBERG_USER und GITHUB_USER oben im Script ausfüllen." >&2
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

set_remote origin "git@codeberg.org:${CODEBERG_USER}/${REPO}.git"
set_remote github "git@github.com:${GITHUB_USER}/${REPO}.git"

echo "✓ Remotes gesetzt:"
git remote -v
echo
echo "Jetzt selbst pushen (Branch: $(git branch --show-current)):"
echo "  git push -u origin main      # primary  → Codeberg"
echo "  git push github main         # mirror   → GitHub"
echo
echo "Mirror automatisieren (optional, eine der beiden Varianten):"
echo "  • Codeberg → Settings → Repository Mirroring (Push-Mirror auf GitHub)"
echo "  • git remote set-url --add --push origin git@github.com:${GITHUB_USER}/${REPO}.git"
