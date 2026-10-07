---
mission_type: briefing
links_to: "05 - Literal Frequencies/R-04-TRANSMISSION-Range_Strike"
locked: true
tags: [briefing, arc2, arc2-ch5]
sticker: lucide//scissors
color: "#00ccff"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-04 // RANGE STRIKE              ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"Sometimes you don't want to change the whole file. Only a section. A range.*
> *`:s` takes a range before the command. `1,8s/old/new/g` — lines 1 through 8 only. `%` is just shorthand for `1,$` — the whole file.*
> *This document has two sections. The second section is correct. The first has bad status codes — QUEUED where it should say ACTIVE. Lines 1 through 10. You don't need to touch the rest."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Upper section only (`NODE-ALPHA` through `RELAY-03`, above the first `---`): `QUEUED` → `ACTIVE` (8×). The `ARCHIVE SECTION` below keeps its three `QUEUED` lines untouched.
>
> > [!tip] SKILLS
> > `:{range}s/QUEUED/ACTIVE/` — ranged substitution. Take the range from the line numbers your editor shows (`:set number`), or select the eight lines with `V` and type `:` to get `:'<,'>`
>
> > [!success] +20 XP
>
> → **[[_content/05 - Literal Frequencies/R-04-TRANSMISSION-Range_Strike|R-04-TRANSMISSION-Range_Strike]]** — open to begin. Timer starts on file open.
