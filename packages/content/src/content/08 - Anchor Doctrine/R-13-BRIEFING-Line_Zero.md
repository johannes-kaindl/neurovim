---
mission_type: briefing
links_to: "08 - Anchor Doctrine/R-13-TRANSMISSION-Line_Zero"
locked: true
tags: [briefing, arc2, arc2-ch8]
sticker: lucide//arrow-right-to-line
color: "#ff0066"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-13 // LINE ZERO                 ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"Anchors pin your pattern to a position. `^` is the start of the line. `$` is the end.*
> *Without `^`, `s/\[TRACK\] //` would match `[TRACK] ` anywhere in a line — including the middle. With `^`, it only matches when the line starts with `[TRACK] `.*
> *CORP prepends a tracking prefix to every line: `[TRACK] `. The actual content follows. Strip the prefix — but only where it appears at the line start.*
> *Position is a constraint. Use it."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Delete the `[TRACK] ` prefix (with its trailing space) from the start of all six report lines (6×). Leave the header box and the CIPHER note untouched.
>
> > [!tip] SKILLS
> > `:%s/^\[TRACK\] //g` — `^` anchors to line start; brackets need escaping in default magic
>
> > [!success] +30 XP
>
> → **[[_content/08 - Anchor Doctrine/R-13-TRANSMISSION-Line_Zero|R-13-TRANSMISSION-Line_Zero]]** — open to begin. Timer starts on file open.
