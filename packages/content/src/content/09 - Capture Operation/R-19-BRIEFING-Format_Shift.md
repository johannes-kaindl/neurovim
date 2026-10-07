---
mission_type: briefing
links_to: "09 - Capture Operation/R-19-TRANSMISSION-Format_Shift"
locked: true
tags: [briefing, arc2, arc2-ch9]
sticker: lucide//calendar-arrow-right
color: "#00ff88"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-19 // FORMAT SHIFT              ║
║  Clearance: PATTERN BREAKER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"CORP timestamps use ISO format: `2047-06-03`. Resistance logging protocol uses day-first: `03.06.2047`.*
> *Three captured groups. Year in `\1`, month in `\2`, day in `\3`. In the replacement: `\3.\2.\1`.*
> *Use `\v` for very magic — clean syntax for digit groups: `(\d{4})-(\d{2})-(\d{2})`.*
> *`:%s/\v(\d{4})-(\d{2})-(\d{2})/\3.\2.\1/g`*
> *This is the real power of capture groups: not just reordering characters, but restructuring data."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Convert all 7 dates from `YYYY-MM-DD` (CORP format) to `DD.MM.YYYY` (Resistance format): the header `Timestamp` plus the six timeline entries. Change nothing else.
>
> > [!tip] SKILLS
> > `:%s/\v(\d{4})-(\d{2})-(\d{2})/\3.\2.\1/g` — three groups, reversed order in replacement
>
> > [!success] +35 XP
>
> → **[[_content/09 - Capture Operation/R-19-TRANSMISSION-Format_Shift|R-19-TRANSMISSION-Format_Shift]]** — open to begin. Timer starts on file open.
