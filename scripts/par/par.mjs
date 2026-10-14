// Measures key sequences in real Neovim (neurovim.nvim) against this repo's current content.
// usage: npm run par -- <runs.json> <out.json> [--plugin <dir>]
//        npm run par -- --self-test [--plugin <dir>]
// Never touches the plugin repo or the player's save: it plays a throwaway copy with this repo's
// export swapped in, under a temporary XDG_DATA_HOME (set in run.lua).
import { cpSync, mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const RUN_TIMEOUT_MS = 60000;
const argv = process.argv.slice(2);
const flag = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv.splice(i, 2)[1] : null; };
const plugin = resolve(ROOT, flag('--plugin') ?? '../../nvim-plugins/neurovim.nvim');
const selfTest = argv.includes('--self-test');
if (!existsSync(join(plugin, 'lua', 'neurovim', 'ui', 'mission.lua'))) {
  console.error(`par: no neurovim.nvim at ${plugin} — pass --plugin <dir>`);
  process.exit(2);
}
const exportFile = join(ROOT, 'packages', 'content', 'export', 'neurovim-data.json');
if (!existsSync(exportFile)) {
  console.error('par: no export — run `npm run build:content` first');
  process.exit(2);
}

// Rejects a batch that cannot be played before anything is copied or started, so one bad entry
// (an id that is not in the export, keys that are not a string) does not cost the whole batch.
function validate(runs) {
  const known = new Set(JSON.parse(readFileSync(exportFile, 'utf8')).missions.map((m) => m.id));
  const problems = [];
  if (!Array.isArray(runs)) problems.push('runs must be a JSON array');
  else {
    runs.forEach((r, i) => {
      if (typeof r?.id !== 'string' || !known.has(r.id)) problems.push(`run ${i + 1}: unknown mission id ${JSON.stringify(r?.id)}`);
      if (typeof r?.keys !== 'string') problems.push(`run ${i + 1}: keys must be a string`);
    });
  }
  if (problems.length) {
    console.error(`par: ${problems.join('\n     ')}`);
    process.exit(2);
  }
}

// Plays a batch in one nvim process. A failure of that process (timeout, a crash in run.lua)
// becomes the `error` of every run in the batch instead of ending the whole measurement.
function playBatch(copy, tmp, index, batch) {
  const runsFile = join(tmp, `runs-${index}.json`);
  const outFile = join(tmp, `out-${index}.json`);
  writeFileSync(runsFile, JSON.stringify(batch));
  try {
    execFileSync('nvim', ['--headless', '-u', 'NONE', '-l', join(ROOT, 'scripts', 'par', 'run.lua'), copy, runsFile, outFile], { stdio: 'inherit', timeout: RUN_TIMEOUT_MS, killSignal: 'SIGKILL' });
    return JSON.parse(readFileSync(outFile, 'utf8'));
  } catch (err) {
    const error = err.code === 'ETIMEDOUT' ? 'timeout' : `nvim failed (${err.status ?? err.code ?? err.message})`;
    return batch.map((r) => ({ id: r.id, solved: false, keys: null, lines_off: null, error, text: null }));
  }
}

function play(runs) {
  validate(runs);
  const tmp = mkdtempSync(join(tmpdir(), 'neurovim-par-'));
  try {
    const copy = join(tmp, 'plugin');
    const gitDir = join(plugin, '.git');
    cpSync(plugin, copy, { recursive: true, filter: (src) => src !== gitDir && !src.startsWith(gitDir + sep) });
    cpSync(exportFile, join(copy, 'data', 'neurovim-data.json'));
    // One nvim process per run: registers, the last search, marks, options and history would
    // otherwise carry over from one run to the next, and a later run would cost less than a
    // fresh player pays.
    return runs.map((run, i) => playBatch(copy, tmp, i, [run])[0]);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

if (selfTest) {
  // Known run from neurovim.nvim's tests/e2e_spec.lua: 19 keys, solved. Plus a run that must fail.
  // The last two prove isolation: `gg029@a` replays register a, which the first run recorded. In a
  // shared process it ends one line off; in a fresh one the register is empty and the text stays
  // as it was, so it must end exactly where an untouched mission ends.
  const [good, bad, replay, untouched] = play([
    { id: 'M-01', keys: 'gg0qa/\\C[XZ]<CR>xq29@a' },
    { id: 'M-01', keys: 'gg0x' },
    { id: 'M-01', keys: 'gg029@a' },
    { id: 'M-01', keys: '' },
  ]);
  const ok = good.solved && good.keys === 19 && !bad.solved && bad.keys === 4 && !replay.solved && replay.lines_off === untouched.lines_off;
  console.log(ok ? 'par self-test: ok (19 keys solved, 4 keys unsolved)' : `par self-test: FAILED ${JSON.stringify([good, bad, replay, untouched])}`);
  process.exit(ok ? 0 : 1);
} else {
  const [runsPath, outPath] = argv;
  if (!runsPath || !outPath) { console.error('usage: npm run par -- <runs.json> <out.json>'); process.exit(2); }
  const out = play(JSON.parse(readFileSync(runsPath, 'utf8')));
  writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  for (const r of out) console.log(`${r.id}\t${r.solved ? 'solved' : r.lines_off === null ? 'NO RESULT' : `UNSOLVED (${r.lines_off} lines off)`}\t${r.keys ?? '-'} keys${r.error ? `\t${r.error}` : ''}`);
}
