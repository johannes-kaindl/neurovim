#!/usr/bin/env bash
#
# swap-obsidian-plugin.sh — swap the freshly built adapter-obsidian main.js into
# the live NeuroVim vault plugin, with an automatic timestamped backup.
#
# Run this YOURSELF (the script writes into the vault). It swaps ONLY main.js —
# manifest.json, styles.css and data.json (your save!) are left untouched.
#
# Before:  npm run build:plugin     (produces packages/adapter-obsidian/dist/main.js)
# After:   Obsidian → toggle the plugin off/on (or Cmd+R), then smoke-test (see docs/PLUGIN-SWAP.md)
#
set -euo pipefail

VAULT_PLUGIN="/Users/Shared/10_ObsidianVaults/32_NeuroVim/.obsidian/plugins/neurovim-trainer"
BUILT="$(cd "$(dirname "$0")/.." && pwd)/packages/adapter-obsidian/dist/main.js"

[[ -f "$BUILT" ]] || { echo "✗ Build missing: $BUILT — run 'npm run build:plugin' first." >&2; exit 1; }
[[ -d "$VAULT_PLUGIN" ]] || { echo "✗ Plugin dir not found: $VAULT_PLUGIN" >&2; exit 1; }

STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="${VAULT_PLUGIN}.backup-${STAMP}"
cp -R "$VAULT_PLUGIN" "$BACKUP"
echo "✓ Backup created: $BACKUP"

cp "$BUILT" "${VAULT_PLUGIN}/main.js"
echo "✓ main.js swapped ($(wc -c < "$BUILT") bytes) — manifest/styles/data untouched."
echo
echo "Now reload in Obsidian: Settings → Community Plugins → NeuroVim Trainer off/on"
echo "(or Cmd+R / 'Reload app without saving'). Then smoke-test: docs/PLUGIN-SWAP.md"
echo
echo "Rollback if something breaks:"
echo "  cp \"${BACKUP}/main.js\" \"${VAULT_PLUGIN}/main.js\"   # then reload the plugin"
