---
mission_type: briefing
links_to: "08 - Anchor Doctrine/R-16-TRANSMISSION-Full_Anchor"
locked: true
tags: [briefing, arc2, arc2-ch8]
sticker: lucide//anchor
color: "#ff0066"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-16 // FULL ANCHOR               ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"You can combine both anchors: `^CLASSIFIED$` matches a line that contains exactly the word CLASSIFIED and nothing else.*
> *`^` requires it starts there. `$` requires it ends there. Together: the whole line must be that pattern.*
> *This document has CLASSIFIED as both a full-line marker and as part of longer lines. Only the full-line markers should be replaced with `[REDACTED]`.*
> *Combined anchors are precision at the line level. It's a different kind of boundary."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace lines that contain ONLY the word `CLASSIFIED` (nothing before or after) with `[REDACTED]`.
>
> > [!tip] SKILLS
> > `:%s/^CLASSIFIED$/[REDACTED]/g` — `^` and `$` together match the exact full line
>
> > [!success] +30 XP
>
> → **[[_content/08 - Anchor Doctrine/R-16-TRANSMISSION-Full_Anchor|R-16-TRANSMISSION-Full_Anchor]]** — open to begin. Timer starts on file open.
