/**
 * MissionGenerator — the second consumer of LlmPort, and the first at a
 * non-chat call site.
 *
 * It does not ask a model for an exercise. It asks for a *clean* document plus
 * typed corruptions, then lets GlitchEngine derive the exercise from those. So
 * the solution is the clean text by identity, not by inspection, and the drill
 * cannot be presolved or underivable the way three waves of hand-written
 * missions were (2026-06-10, 2026-07-24, 2026-07-29).
 *
 * One hole remains open by construction, and it is guarded here rather than in
 * the engine: `applyGlitches` silently drops any corruption whose
 * `target_line_pattern` is absent from the text. A model that hallucinates one
 * pattern ships a drill with fewer corruptions than announced — in the limit, a
 * presolved one. `glitch-miss` is that guard.
 *
 * No retry lives here. The caller decides: an author wants to see what went
 * wrong, a runtime would silently roll again.
 */
import { GlitchEngine } from '../engine/GlitchEngine';
import type { GlitchDefinition, MissionFrontmatter } from '../types';
import type { LlmPort } from '../ports/LlmPort';
import {
  buildKataMessages, CATEGORY_GLITCHES, isGeneratableCategory, type GlitchType, type KataSpec,
} from './kataPrompt';

/** Stamped into every generated draft's frontmatter. Bump with the contract. */
export const GENERATOR_ID = 'MissionGenerator/1';

export interface KataFrontmatter extends MissionFrontmatter {
  tags: string[];
  sticker: string;
  color: string;
  completed: boolean;
  generated_by: string;
}

export interface GeneratedKata {
  frontmatter: KataFrontmatter;
  /** The corrupted document the operator starts from. */
  transmission: string;
  /** The repaired document — identical to the model's clean text. */
  solution: string;
  /** The corruptions that actually landed, with their inverse vim keys. */
  glitches: GlitchDefinition[];
}

export type GenerationFailure =
  /** The port reported a failure; its kind is in `detail`. */
  | 'llm'
  /** The answer held no JSON object at all. */
  | 'unparseable'
  /** JSON, but not the shape the prompt asked for. */
  | 'schema'
  /** The category has no inverse vocabulary — declined before spending a call. */
  | 'unsupported-category'
  /** A corruption whose inverse does not belong to the category. */
  | 'skill-mismatch'
  /** A corruption did not land — a hallucinated pattern. See the file header. */
  | 'glitch-miss'
  /** The corruptions left the text unchanged: an instantly-won drill. */
  | 'presolved';

export type GenerationResult =
  | { ok: true; kata: GeneratedKata }
  | { ok: false; reason: GenerationFailure; detail: string };

const fail = (reason: GenerationFailure, detail: string): GenerationResult =>
  ({ ok: false, reason, detail });

const isStr = (v: unknown): v is string => typeof v === 'string' && v.length > 0;

/** Find the JSON object in an answer that may carry prose, a markdown fence or
 *  a reasoning model's narration around it.
 *
 *  Not "first { to last }": a model that *talks about* JSON writes braces in
 *  its prose, and that cut then spans two unrelated objects. Instead every
 *  brace is tried as a start, the balanced span from it is parsed, and the
 *  longest one that actually parses wins — the answer is reliably longer than
 *  anything the narration sketches. */
function extractJson(content: string): unknown | null {
  let best: unknown | null = null;
  let bestLen = 0;

  for (let i = 0; i < content.length; i++) {
    if (content[i] !== '{') continue;
    const span = balancedSpan(content, i);
    if (span === null || span.length <= bestLen) continue;
    try {
      const parsed: unknown = JSON.parse(span);
      if (typeof parsed === 'object' && parsed !== null) {
        best = parsed;
        bestLen = span.length;
      }
    } catch {
      /* not this one */
    }
  }
  return best;
}

/** The substring from `start` to its matching brace, string- and escape-aware,
 *  or null if it never closes. */
function balancedSpan(s: string, start: number): string | null {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return s.slice(start, i + 1);
  }
  return null;
}

interface RawAnswer {
  title: string; summary: string; why: string;
  tags: string[]; targetText: string; glitches: GlitchDefinition[];
}

function checkShape(v: unknown): string | null {
  if (typeof v !== 'object' || v === null) return 'not an object';
  const a = v as Record<string, unknown>;
  for (const key of ['title', 'summary', 'why', 'targetText'] as const) {
    if (!isStr(a[key])) return `missing or empty: ${key}`;
  }
  if (!Array.isArray(a.tags) || !a.tags.every(isStr)) return 'tags must be a string array';
  if (!Array.isArray(a.glitches) || a.glitches.length === 0) return 'glitches must be a non-empty array';
  for (const g of a.glitches as Record<string, unknown>[]) {
    for (const key of ['id', 'type', 'target_line_pattern', 'vim_move', 'hint'] as const) {
      if (!isStr(g[key])) return `glitch ${String(g.id)}: missing ${key}`;
    }
    if (!KNOWN_TYPES.has(g.type as string)) return `unknown glitch type: ${String(g.type)}`;
  }
  return null;
}

const KNOWN_TYPES = new Set<string>(
  Object.values(CATEGORY_GLITCHES).flat(),
);

export class MissionGenerator {
  constructor(private readonly llm: LlmPort) {}

  async generate(spec: KataSpec, missionId: string): Promise<GenerationResult> {
    if (!isGeneratableCategory(spec.category)) {
      return fail('unsupported-category',
        `${spec.category} has no reversible glitch vocabulary — authored content only`);
    }

    const res = await this.llm.complete(buildKataMessages(spec));
    if (!res.ok) return fail('llm', `${res.kind}: ${res.detail}`);

    const parsed = extractJson(res.content);
    if (parsed === null) return fail('unparseable', 'no JSON object in the answer');

    const problem = checkShape(parsed);
    if (problem) return fail('schema', problem);
    const answer = parsed as unknown as RawAnswer;

    const allowed: GlitchType[] = CATEGORY_GLITCHES[spec.category];
    const stray = answer.glitches.find(g => !allowed.includes(g.type));
    if (stray) {
      return fail('skill-mismatch',
        `${stray.type} does not practise ${spec.category} (allowed: ${allowed.join(', ')})`);
    }

    const { text, glitches } = GlitchEngine.applyGlitches(answer.targetText, answer.glitches);
    if (glitches.length !== answer.glitches.length) {
      const landed = new Set(glitches.map(g => g.definition.id));
      const missed = answer.glitches.filter(g => !landed.has(g.id));
      return fail('glitch-miss',
        `pattern not found in targetText: ${missed.map(g => `${g.id} "${g.target_line_pattern}"`).join(', ')}`);
    }
    if (text === answer.targetText) {
      return fail('presolved', 'corruptions left the document unchanged');
    }

    return {
      ok: true,
      kata: {
        frontmatter: {
          mission_id: missionId,
          title: answer.title,
          tier: '⬛ KATA',
          xp_reward: spec.difficulty >= 3 ? 15 : 10,
          completed: false,
          difficulty: spec.difficulty,
          category: spec.category,
          tags: answer.tags,
          sticker: 'lucide//zap',
          color: '#444444',
          summary: answer.summary,
          why: answer.why,
          mission_type: 'practice',
          locked: false,
          generated_by: GENERATOR_ID,
        },
        transmission: text,
        solution: answer.targetText,
        glitches: answer.glitches,
      },
    };
  }
}

/** YAML-safe double quoting for free-text fields. */
const q = (s: string): string => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

/** Render a generated drill as a content-shaped markdown file. The solution is
 *  written separately and carries no frontmatter, matching `src/solutions/`. */
export function renderKataMarkdown(kata: GeneratedKata): string {
  const fm = kata.frontmatter;
  const lines = [
    '---',
    `mission_id: ${fm.mission_id}`,
    `title: ${q(fm.title)}`,
    `tier: ${q(fm.tier)}`,
    `xp_reward: ${fm.xp_reward}`,
    `completed: ${fm.completed}`,
    `difficulty: ${fm.difficulty}`,
    `category: ${fm.category}`,
    'tags:',
    ...fm.tags.map(t => `  - ${t}`),
    `sticker: ${fm.sticker}`,
    `color: ${q(fm.color)}`,
    `summary: ${q(fm.summary ?? '')}`,
    `why: ${q(fm.why ?? '')}`,
    `mission_type: ${fm.mission_type}`,
    `locked: ${fm.locked}`,
    `generated_by: ${fm.generated_by}`,
    '---',
    '',
    kata.transmission,
    '',
  ];
  return lines.join('\n');
}
