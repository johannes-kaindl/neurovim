// Data export for consumers that do not run TypeScript (the Lua port in neurovim.nvim).
// Everything here comes from the existing single sources — the Markdown content via
// @neurovim/content and the tables in packages/core/src/data — so a consumer reads the
// same missions and numbers as the web app, never a copy someone maintains by hand.
import { join } from 'node:path';
import { loadTs } from './load-ts.mjs';

export const EXPORT_SCHEMA = 1;

/** One exported mission. Throws instead of emitting a record without a solution:
 *  JSON.stringify would silently drop an undefined field (CORE-DATA-01). */
export function missionRecord(summary, doc) {
  if (typeof doc.solution !== 'string' || doc.solution.length === 0) {
    throw new Error(`export: mission ${summary.mission_id} has no solution`);
  }
  return {
    id: summary.mission_id,
    kata: summary.mission_id.startsWith('KATA-'),
    title: summary.title,
    category: summary.category,
    tier: summary.tier,
    difficulty: summary.difficulty ?? null,
    par_keystrokes: summary.par_keystrokes ?? null,
    xp_reward: summary.xp_reward,
    arc: summary.arc,
    chapter: summary.chapter,
    objective: summary.objective ?? [],
    transmission: doc.transmissionBody,
    briefing: doc.briefingBody,
    solution: doc.solution,
  };
}

export async function buildExport(root) {
  const core = join(root, 'packages', 'core', 'src');
  const [content, levels, chapters, cheatsheet, types] = await Promise.all([
    loadTs(join(root, 'packages', 'content', 'src', 'index.ts')),
    loadTs(join(core, 'data', 'levels.ts')),
    loadTs(join(core, 'data', 'chapters.ts')),
    loadTs(join(core, 'data', 'cheatsheet.ts')),
    loadTs(join(core, 'types.ts')),
  ]);
  return {
    schema: EXPORT_SCHEMA,
    missions: content.listMissions().map((s) => missionRecord(s, content.getMission(s.mission_id))),
    // Vault paths in chapters.ts are Obsidian-specific; a consumer needs order and labels only.
    chapters: chapters.ALL_CHAPTERS.map((c) => ({ id: c.id, label: c.label, missions: c.missions.map((m) => m.id) })),
    levels: levels.LEVELS,
    unlock_map: levels.UNLOCK_MAP,
    default_unlocked: types.DEFAULT_PLUGIN_DATA.unlocked,
    // A fresh save, field for field — a consumer starts a player from this, never from its own copy.
    default_plugin_data: types.DEFAULT_PLUGIN_DATA,
    cheatsheet: cheatsheet.CHEATSHEET,
  };
}

export function serializeExport(e) {
  return JSON.stringify(e, null, 2) + '\n';
}
