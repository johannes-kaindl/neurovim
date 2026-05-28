---
mission_type: briefing
links_to: "09 - Capture Operation/R-20-TRANSMISSION-Multi_Group"
locked: true
tags: [briefing, arc2, arc2-ch9]
sticker: lucide//group
color: "#00ff88"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-20 // MULTI GROUP               ║
║  Clearance: PATTERN BREAKER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"CORP asset files store names as LAST, FIRST — surname comma first name. Resistance protocol is FIRST LAST.*
> *Two groups. `\(\w\+\), \(\w\+\)` — group one is the surname, group two is the first name. Replacement: `\2 \1`.*
> *You've seen swapping. This is swapping with a structural separator involved — the comma goes away.*
> *The pattern has to account for the comma and space between. The replacement doesn't need them.*
> *I'm in this document too. You'll see my name. Fix it like the rest."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Convert all names from `SURNAME, FIRSTNAME` format to `FIRSTNAME SURNAME` format.
>
> > [!tip] SKILLS
> > `:%s/\(\w\+\), \(\w\+\)/\2 \1/g` — two groups, comma stripped in replacement
>
> > [!success] +35 XP
>
> → **[[_content/09 - Capture Operation/R-20-TRANSMISSION-Multi_Group|R-20-TRANSMISSION-Multi_Group]]** — open to begin. Timer starts on file open.
