/**
 * gen-manual.mjs — generate the reference quadrant of the user manual from the
 * single source of truth in the core package, so the docs can never drift from
 * the shipped game data.
 *
 *   packages/core/src/data/cheatsheet.ts  → docs/manual/reference/vim-keymap.md
 *   packages/core/src/data/levels.ts      → docs/manual/reference/progression.md
 *
 * Run via `npm run build:manual`. The two emitted files carry a DO-NOT-EDIT
 * banner; everything else under docs/manual/ is hand-authored prose.
 *
 * No new dependency: esbuild is already hoisted from the adapter workspaces and
 * is used here only to strip TS types so the data modules can be imported.
 */
import { build } from 'esbuild';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'packages', 'core', 'src', 'data');
const OUT = join(ROOT, 'docs', 'manual', 'reference');

const BANNER =
  '<!-- AUTO-GENERATED from packages/core/src/data — do not edit by hand. Run `npm run build:manual`. -->\n';

/** Transpile a single TS data module (type-only imports elided) and import it. */
async function loadModule(absPath) {
  const result = await build({
    entryPoints: [absPath],
    bundle: false,
    write: false,
    format: 'esm',
    platform: 'node',
  });
  const code = result.outputFiles[0].text;
  const url = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
  return import(url);
}

// Mirrors how GitHub/Forgejo slug a heading: drop punctuation, then one hyphen per space.
// "SEARCH & REPLACE" → "search--replace" (the `&` goes, both spaces stay).
function headingSlug(label) {
  return label.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-');
}

function table(rows, headers) {
  const head = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map(r => `| ${r.join(' | ')} |`).join('\n');
  return `${head}\n${sep}\n${body}`;
}

/** Escape a Vim key for a Markdown table cell (so `|`, `` ` `` don't break it). */
function code(s) {
  return '`' + String(s).replace(/\|/g, '\\|') + '`';
}

async function genKeymap() {
  const { CHEATSHEET } = await loadModule(join(DATA, 'cheatsheet.ts'));
  let md = BANNER;
  md += '# Reference — Vim keymap\n\n';
  md += '> **Diátaxis: Reference.** The exact set of Vim commands NeuroVim teaches and\n';
  md += "> recognises, grouped as the in-game cheatsheet shows them. This is the game's\n";
  md += '> keymap, not a full Vim reference — but every key here is exercised by a mission\n';
  md += '> or drill. Generated from the source of truth, so it always matches the build.\n\n';
  md += 'The in-game **Reference overlay** (CIPHER → `Reference`) shows these same\n';
  md += 'categories, revealing each as you unlock the matching missions.\n\n';
  md += `**${CHEATSHEET.length} categories.** Jump to: ` +
    CHEATSHEET.map(c => `[${c.label}](#${headingSlug(c.label)})`).join(' · ') +
    '\n';
  for (const cat of CHEATSHEET) {
    md += `\n## ${cat.label}\n`;
    for (const group of cat.groups) {
      md += `\n### ${group.label}\n\n`;
      md += table(group.keys.map(k => [code(k.key), k.description]), ['Key', 'Action']);
      md += '\n';
    }
  }
  return md;
}

async function genProgression() {
  const { LEVELS, UNLOCK_MAP } = await loadModule(join(DATA, 'levels.ts'));
  let md = BANNER;
  md += '# Reference — Levels & progressive unlock\n\n';
  md += '> **Diátaxis: Reference.** The ten operator ranks, the XP each requires, and what\n';
  md += '> each level-up reveals. NeuroVim is **Story-Mode**: content unlocks as you rank up.\n\n';
  md += '## Ranks\n\n';
  md += table(
    LEVELS.map(l => [String(l.level), `**${l.title}**`, String(l.xp_required)]),
    ['Level', 'Rank', 'XP required'],
  );
  md += '\n\nYou start at **Level 1 — SIGNAL LOST** with the first chapter unlocked. XP comes\n';
  md += 'from completing missions (`xp_reward` per mission); crossing a threshold ranks you up\n';
  md += 'and reveals that level\'s missions and loot.\n\n';
  md += '## What each level-up unlocks\n\n';
  const rows = [];
  for (const lvl of Object.keys(UNLOCK_MAP).map(Number).sort((a, b) => a - b)) {
    const u = UNLOCK_MAP[lvl];
    const missions = u.missions.length ? u.missions.map(code).join(', ') : '—';
    const loot = u.loot.length ? u.loot.map(code).join(', ') : '—';
    rows.push([String(lvl), missions, loot]);
  }
  md += table(rows, ['Reaching level', 'Unlocks missions', 'Unlocks loot']);
  md += '\n\nMission IDs: `M-xx` story missions, `R-xx` later-arc operations, `KATA-xx` free\n';
  md += 'drills, `LOOT-xx` lore artifacts. See the [Vim keymap](vim-keymap.md) for the\n';
  md += 'commands each chapter teaches.\n';
  return md;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const keymap = await genKeymap();
  const progression = await genProgression();
  writeFileSync(join(OUT, 'vim-keymap.md'), keymap);
  writeFileSync(join(OUT, 'progression.md'), progression);
  console.log('manual/reference: wrote vim-keymap.md + progression.md');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
