---
mission_id: M-15
title: "Pattern Rewriting"
tier: "🟣 CHROME RAVEN"
xp_reward: 65
completed: false
difficulty: 8
category: advanced
mission_type: practice
locked: true
unlock_requirement: "M-14 completed"
tags:
  - vim/regex
  - vim/substitute
  - vim/capture-groups
  - chrome-raven
sticker: lucide//regex
color: "#9933ee"
summary: "[LOCKED] Advanced regex with capture-groups + back-references — transform signal-archive formats. Available after M-14."
why: "Capture what you keep, drop what you don't — back-references rewrite the format instead of you retyping it."
objective:
  - "In the title line `Pattern Archive — Q3 2047 (CORP-format)` change `CORP-format` → `Resistance-format`. Only there: the `CORP-format` in the header box and in the Note at the bottom stays."
  - "Turn both classification lines into headings: `[CLASSIFICATION: CONFIRMED]` → `## Classification: CONFIRMED`, `[CLASSIFICATION: PENDING]` → `## Classification: PENDING`."
  - "Rewrite all five entry lines (5×) like `[ENTRY-0147]: pattern-01 byte-position skew` → `Pattern 01 (0147) - byte-position skew`: pattern number, entry number in parentheses, ` - ` (space, plain hyphen, space), unchanged description."
  - "Keep the entries in their current order and groups, with the same blank lines."
  - "Leave everything else exactly as it is: the header box, the CIPHER note, RAVEN's code-fenced fragment and the `Note:` block at the bottom (its `[CLASSIFICATION: STATUS]` and `[ENTRY-NNNN]` examples stay)."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CIPHER — INTEL-ARCHIVE DRAFT // WORKING                         ║
║  Source          : GHOST-decoder-chain (Signals 01+02 merged)    ║
║  Composition     : Pattern Analysis Unit entries + classification║
║  Status          : CORP-format pending restructure               ║
║  Classification  : Resistance — extraction-channel               ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Active-Planning Channel
> GHOST's decoder-chain pushed the Pattern Analysis Unit records into a single archive. Three passes to bring it into our format — two structural regex-transforms plus a header-rename.
> RAVEN's fragment 03 sits at the bottom, in code-fence. Leave it alone.

---

Pattern Archive — Q3 2047 (CORP-format)

[CLASSIFICATION: CONFIRMED]
[ENTRY-0147]: pattern-01 byte-position skew
[ENTRY-0148]: pattern-02 inter-injection deviation
[ENTRY-0150]: pattern-04 output-layer manipulation

[CLASSIFICATION: PENDING]
[ENTRY-0149]: pattern-03 substring concordance
[ENTRY-0151]: pattern-05 endpoint diversity elevation

```
>_ RAVEN-SIGNAL — decoded fragment 03
   Shape is older than syntax. CORP reads what you say.
   I write in how you say it. You found the shape.
   The next turn is mine.
   — RVN
```

---

Note: Three substitutions to restructure.
- Entry-lines: `[ENTRY-NNNN]: pattern-NN description` → `Pattern NN (NNNN) - description`. Use `\v` very-magic mode and three capture-groups.
- Classification-headers: `[CLASSIFICATION: STATUS]` → `## Classification: STATUS`. One capture-group.
- Archive-header: `CORP-format` → `Resistance-format`, in the `Pattern Archive` title line only. Literal substitution (no capture-group needed).
- The RAVEN-signal fragment, the header box and this note are clean. Do not modify.
