---
mission_type: briefing
links_to: "07 - Codex Matrix/R-11-TRANSMISSION-Inverse_Filter"
locked: true
tags: [briefing, arc2, arc2-ch7]
sticker: lucide//filter-x
color: "#cc00ff"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-11 // INVERSE FILTER            ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"You know `:g/pattern/d` — delete every line that matches. Now flip it.*
> *`:g!/pattern/d` — delete every line that does NOT match. The `!` inverts the filter.*
> *CORP scrambled a clearance log by embedding noise lines between the valid entries. Every valid entry contains the word CLEARANCE. The noise lines don't.*
> *One command deletes everything that isn't valid. `:g!/CLEARANCE/d`.*
> *Keep what matters. Delete the rest."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Delete every line that does NOT contain `CLEARANCE` — the header block (ASCII box, CIPHER note, `---`, blank lines) and all 6 noise lines. Exactly 5 entries remain, unchanged and in order: `WRAITH`, `GHOST`, `REN VOSS`, `CIPHER`, `SHADOW-7`.
>
> > [!tip] SKILLS
> > `:g!/CLEARANCE/d` — delete all lines NOT matching the pattern
>
> > [!success] +30 XP
>
> → **[[_content/07 - Codex Matrix/R-11-TRANSMISSION-Inverse_Filter|R-11-TRANSMISSION-Inverse_Filter]]** — open to begin. Timer starts on file open.
