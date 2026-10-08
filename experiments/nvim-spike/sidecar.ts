/**
 * Spike: the NeuroVim core as a Node process next to Neovim.
 *
 * Protocol: one JSON object per line on stdin, one per line on stdout.
 *   { id, cmd: 'list' }                      → { id, ok, missions: [{ id, title, category }] }
 *   { id, cmd: 'get', mission }              → { id, ok, mission: { id, title, objective, transmission, briefing } }
 *   { id, cmd: 'verify', mission, text }     → { id, ok, result: DiffResult, divergent: number[] }
 *
 * Imports go straight to the pure modules, not the core barrel — the barrel re-exports the
 * Preact views, which a terminal host never needs.
 */
import { createInterface } from 'node:readline';
import { listMissions, getMission } from '../../packages/content/src/index';
import { MissionEngine } from '../../packages/core/src/engine/MissionEngine';
import { getDivergentLines } from '../../packages/core/src/utils/diff';

type Request = { id: number; cmd: string; mission?: string; text?: string };

function handle(req: Request): Record<string, unknown> {
  switch (req.cmd) {
    case 'list':
      return {
        missions: listMissions().map((m) => ({ id: m.mission_id, title: m.title, category: m.category })),
      };
    case 'get': {
      const m = getMission(req.mission ?? '');
      return {
        mission: {
          id: m.mission_id,
          title: m.title,
          objective: m.objective ?? [],
          transmission: m.transmissionBody,
          briefing: m.briefingBody,
        },
      };
    }
    case 'verify': {
      const m = getMission(req.mission ?? '');
      const solution = m.solution ?? '';
      return {
        result: MissionEngine.verify(req.text ?? '', solution),
        divergent: getDivergentLines(req.text ?? '', solution),
      };
    }
    default:
      throw new Error(`unknown cmd: ${req.cmd}`);
  }
}

createInterface({ input: process.stdin }).on('line', (line) => {
  let id: number | null = null;
  try {
    const req = JSON.parse(line) as Request;
    id = req.id;
    process.stdout.write(JSON.stringify({ id, ok: true, ...handle(req) }) + '\n');
  } catch (e) {
    process.stdout.write(JSON.stringify({ id, ok: false, error: String(e) }) + '\n');
  }
});
