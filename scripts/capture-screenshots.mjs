/**
 * capture-screenshots.mjs — reproducible headless capture of the web views into
 * docs/screenshots/ (CORE-META-03). Replaces the throwaway /tmp script the
 * DESIGN-SPEC §10 referred to.
 *
 *   npm run capture:screenshots                 # build, serve, shoot all views
 *   node scripts/capture-screenshots.mjs --no-build   # reuse existing dist (fast iteration)
 *   node scripts/capture-screenshots.mjs --only 05-result-modal,06-sandbox
 *
 * Uses playwright-core with `channel: 'chrome'` — no bundled browser is downloaded;
 * it drives the system Google Chrome. The app is served from a fresh `vite preview`
 * (a non-5173 port to dodge a squatting dev server), seeded via IndexedDB to a
 * representative Story-Mode save so the NEXUS/Archive render populated.
 *
 * Desktop shots: 1280×860 @2× → 2560×1720. Mobile: 390×844 @3× → 1170×2532.
 */
/* global indexedDB, document */ // used inside page.evaluate() callbacks (browser context)
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WEB = join(ROOT, 'packages', 'adapter-web');
const OUT = process.env.NV_SHOT_OUT || join(ROOT, 'docs', 'screenshots');
const PORT = 4317;
const URL = `http://localhost:${PORT}/`;

const args = process.argv.slice(2);
const NO_BUILD = args.includes('--no-build');
const ONLY = (() => {
  const i = args.indexOf('--only');
  return i >= 0 && args[i + 1] ? new Set(args[i + 1].split(',')) : null;
})();

const DESKTOP = { width: 1280, height: 860, deviceScaleFactor: 2 };
const MOBILE = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

// ── Seed states ──────────────────────────────────────────────
// A believable mid-game save: level 6, chapter 1 mostly cleared (M-01..M-09 with
// personal-best records → tiers + times), a streak, a sandbox PB. `unlocked` is left
// to the app's backfillUnlocks(), which expands it from total_xp on load.
function richSeed() {
  const done = ['M-01', 'M-02', 'M-03', 'M-04', 'M-05', 'M-06', 'M-07', 'M-08', 'M-09'];
  const ks = [34, 41, 58, 47, 72, 63, 96, 81, 110];
  const ms = [21800, 26400, 38900, 31200, 52700, 44100, 68500, 59300, 77400];
  const missions = {};
  done.forEach((id, i) => {
    missions[id] = {
      best_time_ms: ms[i], best_keystrokes: ks[i],
      best_ks_per_min: Math.round((ks[i] / (ms[i] / 60000)) * 10) / 10,
      runs: 1 + (i % 3), last_run: '2026-06-14',
    };
  });
  return {
    missions,
    total_xp: 850, // → level 6 (SIGNAL HUNTER); backfill unlocks arc-I + R-01..R-08 + LOOT-01..05
    streak_current: 4,
    streak_last_date: '2026-06-14',
    sidebar_module_state: { mission: true, cheatsheet: false, progress: false },
    unlocked: ['M-01', 'M-02', 'M-03', 'M-04', 'KATA-01'],
    completed_missions: done,
    sandbox_bests: { easy: null, normal: 58800, hard: null },
    onboarded: true,
    healedFrontmatters: {},
    ambient_enabled: false,
    vimPrimerSeen: true,
    railPin: null,
  };
}

// First-run state: nothing done, audio hint still pending → it renders on the NEXUS.
// vimPrimerSeen:true keeps the Welcome clean (the primer isn't one of the captured views).
function firstRunSeed() {
  return {
    missions: {}, total_xp: 0, streak_current: 0, streak_last_date: '',
    sidebar_module_state: { mission: true, cheatsheet: false, progress: false },
    unlocked: ['M-01', 'M-02', 'M-03', 'M-04', 'KATA-01'],
    completed_missions: [], sandbox_bests: { easy: null, normal: null, hard: null },
    onboarded: false, healedFrontmatters: {}, ambient_enabled: false,
    vimPrimerSeen: true, railPin: null,
  };
}

// ── In-page IndexedDB seed (matches WebStorage: db 'neurovim' v1, store 'kv', key 'pluginData') ──
function seedFn(data) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('neurovim', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('kv');
    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction('kv', 'readwrite');
      tx.objectStore('kv').put(data, 'pluginData');
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    };
    req.onerror = () => reject(req.error);
  });
}

async function applySeed(page, data) {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(seedFn, data);
  await page.goto(URL, { waitUntil: 'networkidle' }); // reload so the app reads the seed
  await page.waitForTimeout(350); // let loadData()/backfillUnlocks settle
}

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(650); // CRT/reveal motion → capture a steady frame
}

// ── Navigation helpers (each starts from the freshly-seeded Welcome) ──
const enterNexus = async (page) => {
  await page.click('.nv-welcome-enter');
  await page.waitForSelector('.nv-nexus');
  await page.waitForTimeout(300);
};
const openMission = async (page, id) => {
  await enterNexus(page);
  await page.locator('.nv-row', { has: page.locator('.nv-row-id', { hasText: new RegExp(`^${id}$`) }) }).first().click();
  await page.waitForSelector('button:has-text("Begin Mission")');
};
const beginMission = async (page) => {
  await page.click('button.nv-submit:has-text("Begin Mission")');
  await page.waitForSelector('.nv-cm-host .cm-content');
  await page.waitForTimeout(400);
};
const solveAndSubmit = async (page) => {
  await page.click('.nv-cm-host .cm-content');
  await page.keyboard.press('Escape');
  for (const cmd of [':%s/X//g', ':%s/Z//g']) {
    await page.keyboard.type(cmd);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(120);
  }
  await page.keyboard.press('Escape');
  await page.click('button.nv-submit:has-text("Submit")');
  await page.waitForSelector('.nv-modal');
  await page.waitForTimeout(300);
};
const openRaven = async (page) => {
  await enterNexus(page);
  await page.locator('.nv-row', { has: page.locator('.nv-row-id', { hasText: /^RAVEN$/ }) }).click();
  await page.waitForSelector('.nv-sandbox-diffs');
};
const openLore = async (page) => {
  await enterNexus(page);
  await page.locator('.nv-row', { has: page.locator('.nv-row-id', { hasText: /^LORE$/ }) }).click();
  await page.waitForSelector('.nv-archive');
};
const openCheatsheet = async (page) => {
  await enterNexus(page);
  await page.click('.nv-controls .nv-ctl[aria-label="Vim cheatsheet"]');
  await page.waitForSelector('.nv-sheet-backdrop');
  await page.waitForTimeout(250);
};

const DESKTOP_SHOTS = [
  { name: '01-welcome', seed: richSeed, nav: async () => {} },
  { name: '02-nexus-picker', seed: richSeed, nav: enterNexus },
  { name: '03-briefing', seed: richSeed, nav: (p) => openMission(p, 'M-01') },
  { name: '04-editor', seed: richSeed, nav: async (p) => { await openMission(p, 'M-01'); await beginMission(p); } },
  { name: '05-result-modal', seed: richSeed, nav: async (p) => { await openMission(p, 'M-01'); await beginMission(p); await solveAndSubmit(p); } },
  { name: '06-sandbox', seed: richSeed, nav: openRaven },
  { name: '07-archive-index', seed: richSeed, nav: openLore },
  { name: '08-archive-reader', seed: richSeed, nav: async (p) => { await openLore(p); await p.locator('button.nv-card').first().click(); await p.waitForSelector('.nv-doc .nv-md'); } },
  { name: '09-cheatsheet', seed: richSeed, nav: openCheatsheet },
  { name: '10-first-run-hint', seed: firstRunSeed, nav: async (p) => { await enterNexus(p); await p.waitForSelector('.nv-audiohint'); } },
];

const MOBILE_SHOTS = [
  { name: '11-mobile-nexus', seed: richSeed, nav: enterNexus },
];

// ── Server ───────────────────────────────────────────────────
function run(cmd, cmdArgs, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, cmdArgs, { stdio: 'inherit', ...opts });
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${cmdArgs.join(' ')} → ${code}`))));
    p.on('error', reject);
  });
}

async function waitForServer(timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(URL);
      if (r.ok) return;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`vite preview did not come up on ${URL}`);
}

async function shoot(context, shots) {
  const page = await context.newPage();
  for (const shot of shots) {
    if (ONLY && !ONLY.has(shot.name)) continue;
    await applySeed(page, shot.seed());
    await shot.nav(page);
    await settle(page);
    await page.screenshot({ path: join(OUT, `${shot.name}.png`) });
    console.log(`  ✓ ${shot.name}.png`);
  }
  await page.close();
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  if (!NO_BUILD) {
    console.log('building content + web…');
    await run('npm', ['run', 'build:content'], { cwd: ROOT });
    await run('npm', ['run', 'build:web'], { cwd: ROOT });
  }

  console.log(`serving ${WEB}/dist on ${URL}`);
  const server = spawn(
    'npm',
    ['run', 'preview', '--workspace', '@neurovim/adapter-web', '--', '--port', String(PORT), '--strictPort'],
    { cwd: ROOT, stdio: 'ignore' },
  );

  let browser;
  try {
    await waitForServer();
    browser = await chromium.launch({ channel: 'chrome' });

    console.log('desktop views (2560×1720):');
    const dctx = await browser.newContext({ viewport: { width: DESKTOP.width, height: DESKTOP.height }, deviceScaleFactor: DESKTOP.deviceScaleFactor });
    await shoot(dctx, DESKTOP_SHOTS);
    await dctx.close();

    console.log('mobile views (1170×2532):');
    const mctx = await browser.newContext({ viewport: { width: MOBILE.width, height: MOBILE.height }, deviceScaleFactor: MOBILE.deviceScaleFactor, isMobile: MOBILE.isMobile, hasTouch: MOBILE.hasTouch });
    await shoot(mctx, MOBILE_SHOTS);
    await mctx.close();
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
  console.log('done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
