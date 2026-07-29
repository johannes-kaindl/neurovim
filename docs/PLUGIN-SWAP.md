# Obsidian Plugin Swap — HOWTO (5 min, for Jay)

Swaps the **refactored** `@neurovim/adapter-obsidian` build in for the existing
`neurovim-trainer` plugin in the NeuroVim vault. Reversible via backup.

> **Why manual?** Cowork can't visually inspect Obsidian and works READ-ONLY on
> the vault. The swap writes to the vault — you do that part. Cowork only keeps
> the build current and provides the script & checklist.

## What happens

- Only **`main.js`** is swapped (the monorepo ships no manifest/styles of its own).
- **Untouched:** `manifest.json`, `styles.css` and `data.json` (= your save game!).
- Beforehand, the entire plugin folder is copied to `…neurovim-trainer.backup-<timestamp>`.

## Steps

1. Pull a fresh build (from the repo root):
   ```bash
   npm run build:plugin
   ```
2. Swap + backup (one command):
   ```bash
   bash scripts/swap-obsidian-plugin.sh
   ```
3. Reload in Obsidian: **Settings → Community Plugins → NeuroVim Trainer** off and back on (or `Cmd+R` / "Reload app without saving").

## Smoke test checklist

After the reload, check in order — on *any* ✗ → rollback (below):

- [ ] Plugin loads without errors (console `Cmd+Opt+I` → no red NeuroVim errors)
- [ ] Open `00-NEXUS.md` → sidebar HUD/dashboard appears, XP/level are correct (save game from `data.json` present)
- [ ] Open a mission (e.g. M-01) → timer/HUD starts, Vim mode active
- [ ] Vim editing works (`i`/`Esc`/`x`), solve mission → Submit → XP/completion is recorded
- [ ] Highscore/metrics are displayed and persisted (reload → they remain)
- [ ] Open `99-THE_RAVEN.md` (sandbox) → difficulty selectable, glitches injectable, Submit counts
- [ ] ASCII-art fences (CORP documents) render as usual

## Rollback (if something is ✗)

The script prints the exact command with the backup path at the end. Generically:

```bash
# <vault> = root of the NeuroVim Obsidian vault
PLUGIN="<vault>/.obsidian/plugins/neurovim-trainer"
cp "${PLUGIN}.backup-<timestamp>/main.js" "${PLUGIN}/main.js"
# then reload the plugin in Obsidian
```

`data.json` was never touched — the save game is safe in any case.

## Known risk

Phase 3 was "extract package, keep behavior" — the CSS classes should be unchanged,
so the existing `styles.css` matches the new `main.js`. If the styling looks broken:
that's the most likely break point → rollback + report to Cowork (then the swap will
also need a new `styles.css` from the monorepo).
