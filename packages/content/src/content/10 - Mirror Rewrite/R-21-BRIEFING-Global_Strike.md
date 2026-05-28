---
mission_type: briefing
links_to: "10 - Mirror Rewrite/R-21-TRANSMISSION-Global_Strike"
locked: true
tags: [briefing, arc2, arc2-ch10]
sticker: lucide//target
color: "#ff4444"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-21 // GLOBAL STRIKE             ║
║  Clearance: CIPHER ANALYST  //  ARC II       ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"We're close to the core now. PROJECT MIRROR's database uses a compound structure — you need to find lines that match one pattern, then perform a substitution on those lines.*
> *`:g/pattern/s/old/new/` — global finds the line, then substitute runs on each match. They compose.*
> *This registry has ENCRYPTED entries — those that are ENCRYPTED should have their STATUS changed from ACTIVE to EXPOSED. Non-encrypted entries stay as-is.*
> *`:g/ENCRYPTED/s/STATUS: ACTIVE/STATUS: EXPOSED/`*
> *Two conditions. One command. This is the full power of `:g`."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > On every line containing `ENCRYPTED`, change `STATUS: ACTIVE` to `STATUS: EXPOSED`.
>
> > [!tip] SKILLS
> > `:g/ENCRYPTED/s/STATUS: ACTIVE/STATUS: EXPOSED/` — global-then-substitute composition
>
> > [!success] +40 XP
>
> → **[[_content/10 - Mirror Rewrite/R-21-TRANSMISSION-Global_Strike|R-21-TRANSMISSION-Global_Strike]]** — open to begin. Timer starts on file open.
