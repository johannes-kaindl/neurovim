import type { Cutscene } from '../cutscene';

/**
 * Cutscene #1 — the first-run intro. Strings are VERBATIM from
 * docs/lore/citizen-compliance-handbook.md. Do not paraphrase (see intro-script.test.ts).
 * Pacing ~22s (verbatim text is ~890 chars). cps escalates calm→urgent: boot is slowest,
 * the klaxon warning fastest. Fine-tune holdMs/cps in the dev server, not here blindly.
 */
export const INTRO: Cutscene = {
  id: 'intro',
  beats: [
    {
      id: 'boot',
      theme: 'corp',
      sfx: 'boot',
      typing: { cps: 44, typoChance: 0, jitter: 0.15 },
      glitch: 0.04,
      holdMs: 700,
      lines: [
        'CORP // CENTRAL OFFICE OF REGULATED PRODUCTIVITY',
        'CITIZEN COMPLIANCE TERMINAL  ·  Rev 47.3  ·  MANDATORY',
        '',
        '> Welcome, Citizen. You have been issued a Terminal.',
        '> A calm mind is a compliant mind.',
        '> CORP thinks, so that you do not have to.',
      ],
    },
    {
      id: 'fault',
      theme: 'fault',
      sfx: 'glitch',
      typing: { cps: 52, typoChance: 0.06, jitter: 0.5 },
      glitch: 0.55,
      holdMs: 900,
      lines: [
        '> FAULT CONDITIONS — UNPLUG AND REPORT',
        '> it switches states ............ [door]',
        '> it moves on its own .......... w·o·r·d ▸ line ▸ ●',
        '> the text changes under your hands',
        '> a change repeats itself ... itself ... itself',
        '> it sees patterns ........ s/compliance//g',
      ],
    },
    {
      id: 'warning',
      theme: 'warning',
      sfx: 'klaxon',
      typing: { cps: 62, typoChance: 0.02, jitter: 0.3 },
      glitch: 0.8,
      holdMs: 700,
      lines: [
        '  ⚠  TERMINAL COMPROMISED  ⚠',
        '  >> UNPLUG IMMEDIATELY AND REPORT <<',
      ],
    },
    {
      id: 'cipher',
      theme: 'cipher',
      sfx: 'signal',
      typing: { cps: 46, typoChance: 0.03, jitter: 0.4 },
      glitch: 0.45,
      holdMs: 900,
      lines: [
        '░▒▓ SIGNAL BLEED — SOURCE: CIPHER ▓▒░',
        '',
        'you read the Fault Conditions as a list of malfunctions.',
        'read it again as a syllabus.',
        'do not unplug it. do not report it. let it run.',
      ],
    },
    {
      id: 'unlock',
      theme: 'unlock',
      sfx: 'unlock',
      typing: { cps: 44, typoChance: 0, jitter: 0.2 },
      glitch: 0.1,
      holdMs: 700,
      lines: [
        '> the cursor is yours. it always was.',
        '',
        '  N E U R O V I M',
        '  guardian channel online',
      ],
    },
    {
      id: 'hook',
      theme: 'unlock',
      typing: { cps: 46, typoChance: 0, jitter: 0.2 },
      glitch: 0.05,
      holdMs: 1200,
      lines: [
        'it starts with one corrupted document they forgot to lock,',
        'and the nerve to touch it.',
      ],
    },
  ],
};
