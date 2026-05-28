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

Pattern Archive — Q3 2047 (Resistance-format)

## Classification: CONFIRMED
Pattern 01 (0147) — byte-position skew
Pattern 02 (0148) — inter-injection deviation
Pattern 04 (0150) — output-layer manipulation

## Classification: PENDING
Pattern 03 (0149) — substring concordance
Pattern 05 (0151) — endpoint diversity elevation

```
>_ RAVEN-SIGNAL — decoded fragment 03
   Shape is older than syntax. CORP reads what you say.
   I write in how you say it. You found the shape.
   The next turn is mine.
   — RVN
```

---

Note: Three substitutions to restructure.
- Entry-lines: `[ENTRY-NNNN]: pattern-NN description` → `Pattern NN (NNNN) — description`. Use `\v` very-magic mode and three capture-groups.
- Classification-headers: `[CLASSIFICATION: STATUS]` → `## Classification: STATUS`. One capture-group.
- Archive-header: `CORP-format` → `Resistance-format`. Literal substitution (no capture-group needed).
- The RAVEN-signal fragment is clean. Do not modify.
