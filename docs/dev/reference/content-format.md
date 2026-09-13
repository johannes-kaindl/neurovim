# Reference — Content format

> **Diátaxis: Reference.** The Markdown source of truth in `packages/content/src/`: layout,
> file names, frontmatter, and what the build and the tests make of it. To author a mission
> step by step, see [How-to → Write a mission](../how-to/write-a-mission.md).

## Directory layout

| Path | Contents | Scanned by `build.mjs` |
|---|---|---|
| `src/content/01 - Indoctrination/` … `src/content/10 - Mirror Rewrite/` | story missions: one `BRIEFING` + one `TRANSMISSION` file per mission (`M-xx` in chapters 01–04, `R-xx` in 05–10) | yes |
| `src/content/KATAS/` | drills — `TRANSMISSION` only, no briefing | yes |
| `src/content/LOOT/` | lore rewards `LOOT-xx` | yes |
| `src/content/FRAGMENTS/` | lore fragments `FRAGMENT-xx` | yes |
| `src/content/REF/` | reference artifacts (`99-THE_RAVEN.md`, `REF-EN-Quick_Reference.md`, `REF-DE-Schnellreferenz.md`) | yes |
| `src/solutions/` | clean target text per mission, `<ID>-SOLUTION-<Title>.md` | yes (as `solution` entries) |
| `src/sandbox/raven-original.md` + `raven-glitches.json` | THE RAVEN sandbox text + glitch pool | yes → `generated/sandbox.ts` |
| `src/welcome.md` | Welcome view intro | yes → `generated/welcome.ts` |
| `src/_drafts/` | output of `npm run generate:kata` (git-ignored) | **no** |
| `src/generated/` | build output — never edit | — |

Counts asserted by `test/content.test.ts`: 173 manifest entries — 40 transmission, 40 briefing,
14 kata, 9 loot, 14 fragment, 3 ref, 53 solution. 54 playable missions (40 transmissions +
14 KATAs). `M-08` (THE RAVEN) is the one mission without a solution file.

## File names and classification

`build.mjs` classifies each file by name and path, first match wins:

| Rule | Role | Kind |
|---|---|---|
| file name contains `-BRIEFING-` | `briefing` | mission |
| path contains `/KATAS/` | `kata` | mission |
| file name contains `-TRANSMISSION-` | `transmission` | mission |
| path contains `/LOOT/` **or** frontmatter has `loot_id` | `loot` | lore |
| path contains `/FRAGMENTS/` | `fragment` | lore |
| path contains `/REF/` (and any other file) | `ref` | lore |
| any file under `src/solutions/` | `solution` | mission |

**ID derivation**, in order: frontmatter `mission_id` → frontmatter `loot_id` → file-name
prefix `M-NN` / `R-NN` / `KATA-NN` → the file name without `.md`. Briefings carry no
`mission_id`; their ID comes from the file-name prefix and must equal the transmission's
`mission_id`. The slug after the role may differ between briefing and transmission
(`M-01-BRIEFING-Induction_Order.md` ↔ `M-01-TRANSMISSION-The_Three_Modes.md`).

**Arc:** `II` when `mission_id` starts with `R-`, otherwise `I`. **Chapter:** the directory
relative to `src/content/`.

## Frontmatter — transmissions and KATAs

Fields read by `@neurovim/content` (`toSummary` in `src/index.ts`) and typed as
`MissionFrontmatter` in `packages/core/src/types.ts`:

| Field | Type | Required | Default if absent | Meaning |
|---|---|---|---|---|
| `mission_id` | string | yes | the derived ID | `M-NN`, `R-NN` or `KATA-NN` |
| `mission_type` | `practice` \| `briefing` \| `loot` \| `sandbox` | yes | `practice` | all 54 playable files use `practice` |
| `title` | string | yes | the ID | display title |
| `category` | string | yes | `''` | skill category, e.g. `fundamentals`, `navigation`, `text-objects` |
| `xp_reward` | number | yes | `0` | XP on completion |
| `locked` | boolean | yes | `false` | |
| `tier` | string | yes | `''` | tier label, e.g. `"🔴 INDOCTRINATION"`, `"⬛ KATA"` |
| `difficulty` | number | no | — | drives the computed par: `20 + difficulty × 20` |
| `par_keystrokes` | number | no | — | hand-tuned gold threshold; overrides the computed par |
| `summary` | string | no | — | one-line mission summary |
| `why` | string | no | — | authored CIPHER "why this skill matters" line |
| `generated_by` | string | no | — | provenance stamp of machine-generated drills, e.g. `MissionGenerator/1`; absent on authored content |

Non-scalar values (maps, lists) in string fields fall back to the default (`asString` in
`src/frontmatter.ts`).

Also present in the source files but **not read** by `@neurovim/content` (kept in the
manifest's raw `frontmatter`): `completed`, `tags`, `sticker`, `color`, `unlock_requirement`.

## Frontmatter — briefings

| Field | Type | Meaning |
|---|---|---|
| `mission_type` | `briefing` | |
| `links_to` | string | chapter-relative path of the transmission |
| `locked` | boolean | |
| `tags`, `sticker`, `color` | — | not read by `@neurovim/content` |

## Frontmatter — lore

| Role | Fields read | Other fields present |
|---|---|---|
| `loot` | `loot_id` (ID), `title`, `summary`, `unlock_level` (number → `LoreSummary.unlockLevel`) | `mission_type: loot`, `loot_type`, `locked`, `tags`, `sticker`, `color` |
| `fragment` | `title`, `summary` | `tags`, `sticker`, `color` |
| `ref` | `title`, `summary` | `type`, `tags`, `sticker`, `color` |

## Solutions

- One file per mission in `src/solutions/`, named `<ID>-SOLUTION-<Title>.md`; only the ID
  prefix is used for pairing.
- **No frontmatter.** The body is the exact target text.
- `getMission(id)` returns it as `solution`; the game completes the mission when the editor
  buffer matches it.

## Unlocks are not in the frontmatter

Which level reveals a mission or loot is defined in `packages/core/src/data/levels.ts`
(`UNLOCK_MAP`), plus the Level-1 defaults in `DEFAULT_PLUGIN_DATA.unlocked`
(`packages/core/src/types.ts`: `M-01`–`M-04`, `KATA-01`). An ID in neither stays locked.

## Generated files

All three start with an `AUTO-GENERATED by build.mjs — do not edit by hand` header.

| File | Exports |
|---|---|
| `src/generated/content.ts` | `interface RawContentEntry { id; role; kind; arc; chapter; frontmatter; body; path }`, `ENTRIES: RawContentEntry[]` |
| `src/generated/sandbox.ts` | `RAVEN_ORIGINAL: string`, `RAVEN_GLITCH_POOL: GlitchDefinition[]` |
| `src/generated/welcome.ts` | `WELCOME_BODY: string` |

## Content gates

Enforced by `packages/content/test/content.test.ts`:

| Gate | Fails when | Allowlist |
|---|---|---|
| Mission start state | a mission's transmission body equals its solution (presolved on open) | none |
| Solution derivability — lines | a non-empty solution line has no verbatim or near-verbatim (bigram similarity > 0.5) line in the transmission | `EXPLAINED_ORPHANS` |
| Solution derivability — tokens | a solution token has no source token (exact or similarity > 0.5) in transmission + briefing | `EXPLAINED_TOKENS` |

Allowlist entries carry one line of reasoning each. The full audit is
`packages/content/CONTENT-AUDIT-solution-derivability.md`.
