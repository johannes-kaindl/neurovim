#!/usr/bin/env bash
#
# swap-obsidian-plugin.sh — den frisch gebauten adapter-obsidian main.js in das
# Live-NeuroVim-Vault-Plugin tauschen, mit automatischem Timestamp-Backup.
#
# SELBST ausführen (das Script schreibt in den Vault). Es tauscht NUR main.js —
# manifest.json, styles.css und data.json (Spielstand!) bleiben unangetastet.
#
# Vorher:  npm run build:plugin     (erzeugt packages/adapter-obsidian/dist/main.js)
# Danach:  Obsidian → Plugin aus/an (oder Cmd+R), dann Smoke-Test (siehe docs/PLUGIN-SWAP.md)
#
set -euo pipefail

VAULT_PLUGIN="/Users/Shared/10_ObsidianVaults/32_NeuroVim/.obsidian/plugins/neurovim-trainer"
BUILT="$(cd "$(dirname "$0")/.." && pwd)/packages/adapter-obsidian/dist/main.js"

[[ -f "$BUILT" ]] || { echo "✗ Build fehlt: $BUILT — erst 'npm run build:plugin'." >&2; exit 1; }
[[ -d "$VAULT_PLUGIN" ]] || { echo "✗ Plugin-Dir nicht gefunden: $VAULT_PLUGIN" >&2; exit 1; }

STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="${VAULT_PLUGIN}.backup-${STAMP}"
cp -R "$VAULT_PLUGIN" "$BACKUP"
echo "✓ Backup angelegt: $BACKUP"

cp "$BUILT" "${VAULT_PLUGIN}/main.js"
echo "✓ main.js getauscht ($(wc -c < "$BUILT") bytes) — manifest/styles/data unangetastet."
echo
echo "Jetzt in Obsidian neu laden: Settings → Community Plugins → NeuroVim Trainer aus/an"
echo "(oder Cmd+R / 'Reload app without saving'). Dann Smoke-Test: docs/PLUGIN-SWAP.md"
echo
echo "Rollback bei Problemen:"
echo "  cp \"${BACKUP}/main.js\" \"${VAULT_PLUGIN}/main.js\"   # danach Plugin neu laden"
