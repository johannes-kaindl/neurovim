#!/usr/bin/env bash
#
# bump-version.sh — sync the project version across every file that carries one.
#
# Updates, in this order:
#   package.json                                   (root)
#   packages/*/package.json                        (all 4 workspaces)
#   packages/adapter-web/src-tauri/tauri.conf.json (Tauri app version → Info.plist)
#   packages/adapter-web/src-tauri/Cargo.toml
#   packages/adapter-web/src-tauri/Cargo.lock      (the "neurovim" package entry)
#
# Tauri generates the macOS Info.plist (CFBundleShortVersionString) from
# tauri.conf.json at build time, so that file is the native version source.
#
# Usage:
#   bash scripts/bump-version.sh 0.2.4        # explicit version
#   bash scripts/bump-version.sh patch        # 0.2.3 → 0.2.4
#   bash scripts/bump-version.sh minor        # 0.2.3 → 0.3.0
#   bash scripts/bump-version.sh major        # 0.2.3 → 1.0.0
#
# The script only edits files — review the diff, then commit and tag yourself.
#
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ $# -ne 1 ]]; then
  echo "Usage: bash scripts/bump-version.sh <semver|patch|minor|major>" >&2
  exit 1
fi

CURRENT="$(node -p "require('./package.json').version")"

case "$1" in
  patch|minor|major)
    NEW="$(node -e "
      const [ma, mi, pa] = '$CURRENT'.split('.').map(Number);
      const out = { major: [ma+1,0,0], minor: [ma,mi+1,0], patch: [ma,mi,pa+1] };
      console.log(out['$1'].join('.'));
    ")"
    ;;
  *)
    NEW="$1"
    if [[ ! "$NEW" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
      echo "✗ '$NEW' is not a plain semver (X.Y.Z)." >&2
      exit 1
    fi
    ;;
esac

echo "Bumping version: $CURRENT → $NEW"

# package.json — root + all workspaces (no git tag, no commit; that stays manual)
npm version "$NEW" --no-git-tag-version --allow-same-version > /dev/null
npm version "$NEW" --no-git-tag-version --allow-same-version --workspaces > /dev/null

# tauri.conf.json — edit as JSON, preserve 2-space formatting
node -e "
  const fs = require('fs');
  const p = 'packages/adapter-web/src-tauri/tauri.conf.json';
  const conf = JSON.parse(fs.readFileSync(p, 'utf8'));
  conf.version = '$NEW';
  fs.writeFileSync(p, JSON.stringify(conf, null, 2) + '\n');
"

# Cargo.toml — the [package] version line. Anchored to the exact current version;
# deps never carry the app's 0.x.y, so this anchored substitution is unambiguous.
# NB: macOS ships BSD sed, which does NOT support GNU's `0,/re/` address — using it
# here silently left Cargo.toml unchanged.
sed -i '' "s/^version = \"$CURRENT\"\$/version = \"$NEW\"/" \
  packages/adapter-web/src-tauri/Cargo.toml

# Cargo.lock — only the version line directly under the "neurovim" package
awk -v new="$NEW" '
  /^name = "neurovim"$/ { print; getline; sub(/version = ".*"/, "version = \"" new "\""); print; next }
  { print }
' packages/adapter-web/src-tauri/Cargo.lock > /tmp/Cargo.lock.bump \
  && mv /tmp/Cargo.lock.bump packages/adapter-web/src-tauri/Cargo.lock

# Verify: every tracked version must now agree
echo
FAIL=0
for f in package.json packages/core/package.json packages/content/package.json \
         packages/adapter-web/package.json \
         packages/adapter-web/src-tauri/tauri.conf.json; do
  GOT="$(node -p "require('./$f').version")"
  [[ "$GOT" == "$NEW" ]] && MARK="✓" || { MARK="✗"; FAIL=1; }
  printf "  %s %-55s %s\n" "$MARK" "$f" "$GOT"
done
GOT="$(grep -m1 '^version = ' packages/adapter-web/src-tauri/Cargo.toml | cut -d'"' -f2)"
[[ "$GOT" == "$NEW" ]] && MARK="✓" || { MARK="✗"; FAIL=1; }
printf "  %s %-55s %s\n" "$MARK" "src-tauri/Cargo.toml" "$GOT"
GOT="$(awk '/^name = "neurovim"$/{getline; print}' packages/adapter-web/src-tauri/Cargo.lock | cut -d'"' -f2)"
[[ "$GOT" == "$NEW" ]] && MARK="✓" || { MARK="✗"; FAIL=1; }
printf "  %s %-55s %s\n" "$MARK" "src-tauri/Cargo.lock (neurovim)" "$GOT"

if [[ $FAIL -ne 0 ]]; then
  echo "✗ Version sync incomplete — check the files above." >&2
  exit 1
fi

echo
echo "Done. Next steps (manual):"
echo "  git add -- package.json package-lock.json packages/*/package.json packages/adapter-web/src-tauri/{tauri.conf.json,Cargo.toml,Cargo.lock}"
echo "  git commit -m \"chore(release): v$NEW\""
echo "  git tag v$NEW   # tag push triggers the desktop CI on GitHub"
