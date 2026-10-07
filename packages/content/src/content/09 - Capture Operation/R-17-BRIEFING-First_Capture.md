---
mission_type: briefing
links_to: "09 - Capture Operation/R-17-TRANSMISSION-First_Capture"
locked: true
tags: [briefing, arc2, arc2-ch9]
sticker: lucide//parentheses
color: "#00ff88"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-17 // FIRST CAPTURE             ║
║  Clearance: PATTERN BREAKER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"Everything until now has been replacement. Now you capture.*
> *`\(\)` creates a capture group. Whatever it matches, Vim remembers. You reference it in the replacement with `\1`.*
> *This intercept has field designations in the wrong order: SECTOR first, then NODE. We need NODE first, then SECTOR. The data doesn't change — only the arrangement.*
> *`:%s/\(SECTOR-[A-Z]\) \(NODE-[0-9]\)/\2 \1/g` — group one is the sector, group two is the node. In the replacement: two first, then one. Swap.*
> *Capture groups are your first tool for intelligent replacement."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > In all six designation lines, swap `SECTOR-X NODE-N` to `NODE-N SECTOR-X` (e.g. `SECTOR-A NODE-1` → `NODE-1 SECTOR-A`). Everything else stays unchanged.
>
> > [!tip] SKILLS
> > `:%s/\(SECTOR-[A-Z]\) \(NODE-[0-9]\)/\2 \1/g` — capture both parts, swap with `\2 \1`
>
> > [!success] +35 XP
>
> → **[[_content/09 - Capture Operation/R-17-TRANSMISSION-First_Capture|R-17-TRANSMISSION-First_Capture]]** — open to begin. Timer starts on file open.
