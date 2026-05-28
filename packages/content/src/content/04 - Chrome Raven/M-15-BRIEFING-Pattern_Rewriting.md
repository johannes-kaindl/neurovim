---
mission_type: briefing
links_to: "04 - Chrome Raven/M-15-TRANSMISSION-Pattern_Rewriting"
locked: true
tags: [briefing, tier-4]
sticker: lucide//regex
color: "#cc66ff"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: M-15 // PATTERN REWRITING         ║
║  Clearance: CHROME RAVEN                     ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"Third fragment. GHOST's decoder-chain has merged the signals into a pattern-archive, but the format is still CORP's — bracketed codes, hyphenated descriptors. Restructure it into ours.*
> *Regex with capture-groups. Very-magic mode with `\v` makes the pattern readable. Parentheses around parts of the match mark capture-groups — the parts become `\1`, `\2`, `\3` in the replacement and you rearrange them.*
> *Three passes. First, restructure the entry-lines — three capture-groups in one substitute. Second, lift the classification-brackets into Markdown headings — one capture-group. Third, fix the archive-header.*
> *RAVEN's fragment 03 is at the bottom. Read it after the format is clean — it tells us what comes next."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Transform a CORP-format pattern-archive into Resistance-format using capture-group regex.
>
> > [!tip] SKILLS
> > `\v` (very-magic mode), `(...)` (capture-groups), `\1` / `\2` / `\3` (back-references), `\d{N}` / `\w+` / `.+` (character-classes with quantifiers)
>
> > [!success] +65 XP
>
> → **[[_content/04 - Chrome Raven/M-15-TRANSMISSION-Pattern_Rewriting|M-15-TRANSMISSION-Pattern_Rewriting]]** — open to begin. Timer starts on file open.
