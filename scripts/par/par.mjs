// Measures key sequences in real Neovim (neurovim.nvim) against this repo's current content.
// usage: npm run par -- <runs.json> <out.json> [--plugin <dir>]
//        npm run par -- --self-test [--plugin <dir>]
// Never touches the plugin repo or the player's save: it plays a throwaway copy with this repo's
// export swapped in, under a temporary XDG_DATA_HOME (set in run.lua).
import { cpSync, mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const argv = process.argv.slice(2);
const flag = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv.splice(i, 2)[1] : null; };
const plugin = resolve(ROOT, flag('--plugin') ?? '../../nvim-plugins/neurovim.nvim');
const selfTest = argv.includes('--self-test');
if (!existsSync(join(plugin, 'lua', 'neurovim', 'ui', 'mission.lua'))) {
  console.error(`par: no neurovim.nvim at ${plugin} — pass --plugin <dir>`);
  process.exit(2);
}
const exportFile = join(ROOT, 'packages', 'content', 'export', 'neurovim-data.json');

export function play(runs) {
  const tmp = mkdtempSync(join(tmpdir(), 'neurovim-par-'));
  try {
    const copy = join(tmp, 'plugin');
    cpSync(plugin, copy, { recursive: true, filter: (src) => !src.includes(`${join(plugin, '.git')}`) });
    cpSync(exportFile, join(copy, 'data', 'neurovim-data.json'));
    const runsFile = join(tmp, 'runs.json');
    const outFile = join(tmp, 'out.json');
    writeFileSync(runsFile, JSON.stringify(runs));
    execFileSync('nvim', ['--headless', '-u', 'NONE', '-l', join(ROOT, 'scripts', 'par', 'run.lua'), copy, runsFile, outFile], { stdio: 'inherit' });
    return JSON.parse(readFileSync(outFile, 'utf8'));
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

if (selfTest) {
  // Known run from neurovim.nvim's tests/e2e_spec.lua: 19 keys, solved. Plus a run that must fail.
  const [good, bad] = play([
    { id: 'M-01', keys: 'gg0qa/\\C[XZ]<CR>xq29@a' },
    { id: 'M-01', keys: 'gg0x' },
  ]);
  const ok = good.solved && good.keys === 19 && !bad.solved && bad.keys === 4;
  console.log(ok ? 'par self-test: ok (19 keys solved, 4 keys unsolved)' : `par self-test: FAILED ${JSON.stringify([good, bad])}`);
  process.exit(ok ? 0 : 1);
} else {
  const [runsPath, outPath] = argv;
  if (!runsPath || !outPath) { console.error('usage: npm run par -- <runs.json> <out.json>'); process.exit(2); }
  const out = play(JSON.parse(readFileSync(runsPath, 'utf8')));
  writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  for (const r of out) console.log(`${r.id}\t${r.solved ? 'solved' : `UNSOLVED (${r.lines_off} lines off)`}\t${r.keys} keys${r.error ? `\t${r.error}` : ''}`);
}
