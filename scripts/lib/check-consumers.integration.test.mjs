// Runs the real gate against the consumers on disk. A consumer that is not checked
// out here is out of reach; the test then skips instead of measuring nothing.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const config = JSON.parse(readFileSync(join(ROOT, 'consumers.json'), 'utf8'));

for (const c of config.consumers) {
  const present = existsSync(join(resolve(ROOT, c.path), c.vendorJson));
  test(`gate actually checks ${c.name} when it is on disk`, { skip: present ? false : 'not on disk' }, () => {
    const out = execFileSync('node', ['scripts/check-consumers.mjs'], { cwd: ROOT, encoding: 'utf8' });
    const line = out.split('\n').find((l) => l.includes(`check-consumers: ${c.name} —`));
    assert.ok(line, `no gate line for ${c.name}`);
    assert.doesNotMatch(line, /skipped/, `gate skipped a consumer that is on disk: ${line}`);
  });
}
