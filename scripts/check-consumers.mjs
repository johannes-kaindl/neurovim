#!/usr/bin/env node
// check-consumers.mjs — upstream-contract gate.
//
// For every consumer in consumers.json, measures two things:
//   1. how far its vendor pin lags behind the vendor surface, and
//   2. whether its vendored copy is still verbatim at that pin.
//
// Exit 1 ONLY on a verbatim violation. A stale pin is a note, not a failure:
// consumers have their own release cadence, and making staleness red would
// force a consumer release for every core commit — the exact coupling that
// vendoring exists to avoid. A consumer that is not on disk is skipped, so
// the gate stays green on CI and in foreign clones.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { parseVendorPin, classifyConsumer, diffTrees, overallExit, renderConsumersMd } from './lib/consumers.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(repoRoot, 'consumers.json'), 'utf8'));

/** Recursively maps every file under `root` to a hash of its contents. */
function hashTree(root) {
  const out = new Map();
  if (!existsSync(root)) return out;
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else out.set(relative(root, full), createHash('sha256').update(readFileSync(full)).digest('hex'));
    }
  };
  walk(root);
  return out;
}

function hashFile(path) {
  if (!existsSync(path)) return null;
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

/**
 * Extracts the vendor surface as it stood at `pin` into a scratch directory.
 * Limited to the surface paths — archiving the whole repo on every gate run
 * would be wasted work.
 */
function extractPin(pin) {
  const dir = mkdtempSync(join(tmpdir(), 'nv-pin-'));
  execFileSync('git', ['archive', '--format=tar', pin, '-o', join(dir, 'pin.tar'), '--', ...config.surface], { cwd: repoRoot });
  execFileSync('tar', ['-xf', join(dir, 'pin.tar'), '-C', dir]);
  return dir;
}

const results = [];

for (const consumer of config.consumers) {
  const root = resolve(repoRoot, consumer.path);
  const vendorJson = join(root, consumer.vendorJson);

  if (!existsSync(vendorJson)) {
    results.push({ ...classifyConsumer({ name: consumer.name, found: false }), what: consumer.what });
    continue;
  }

  const { pin, tag, version } = parseVendorPin(readFileSync(vendorJson, 'utf8'));

  // No initialisers: the try below assigns both, and its catch bails out with
  // `continue`, so any initial value would be dead.
  let commitsSincePin;
  let pinDir;
  try {
    const log = execFileSync('git', ['log', '--oneline', `${pin}..HEAD`, '--', ...config.surface], {
      cwd: repoRoot,
      encoding: 'utf8',
    });
    commitsSincePin = log.trim() === '' ? 0 : log.trim().split('\n').length;
    pinDir = extractPin(pin);
  } catch {
    results.push({
      ...classifyConsumer({ name: consumer.name, found: false }),
      what: consumer.what,
      message: `pin ${pin} is not reachable in this clone — skipped`,
    });
    continue;
  }

  const differences = [];
  try {
    for (const [source, copy] of consumer.dirs ?? []) {
      differences.push(...diffTrees(hashTree(join(pinDir, source)), hashTree(join(root, copy))).map((p) => `${copy}/${p}`));
    }
    for (const [source, copy] of consumer.files ?? []) {
      if (hashFile(join(pinDir, source)) !== hashFile(join(root, copy))) differences.push(copy);
    }
  } finally {
    rmSync(pinDir, { recursive: true, force: true });
  }

  results.push({
    ...classifyConsumer({ name: consumer.name, found: true, pin, commitsSincePin, differences }),
    what: consumer.what,
    pin,
    tag,
    version,
  });
}

// Only an explicit `--write` regenerates the tracked report. Writing it from
// `npm test` would leave a dirty working tree after every single test run.
if (process.argv.includes('--write')) {
  writeFileSync(join(repoRoot, 'CONSUMERS.md'), renderConsumersMd(results));
}

for (const r of results) {
  const stream = r.status === 'violated' ? console.error : console.log;
  stream(`check-consumers: ${r.name} — ${r.status}: ${r.message}`);
}

const code = overallExit(results);
if (code === 1) {
  console.error('→ A vendored copy was edited in place. Change it here and re-vendor there; never edit the copy.');
}
process.exit(code);
