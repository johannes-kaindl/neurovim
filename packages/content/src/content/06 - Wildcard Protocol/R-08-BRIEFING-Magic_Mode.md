---
mission_type: briefing
links_to: "06 - Wildcard Protocol/R-08-TRANSMISSION-Magic_Mode"
locked: true
tags: [briefing, arc2, arc2-ch6]
sticker: lucide//wand-2
color: "#ff6600"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-08 // MAGIC MODE                ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"In default Vim regex mode, `(`, `)`, `|`, `+` are all literal — they need backslashes to become special. It's backwards from every other regex engine.*
> *`\v` — very magic mode — fixes this. After `\v`, all special characters work without escaping. Parentheses group. Pipe alternates. Plus quantifies.*
> *`\v(ALPHA|BETA|GAMMA)` — matches any of those three words. No backslash-paren. Write regex like a normal person.*
> *Use this. CORP's tier designations need to be unified. Three possible values. One replacement."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > In the seven register lines, replace every tier label `ALPHA`, `BETA` and `GAMMA` with `TIER-1` (7×). Leave names, spacing and `// role` text unchanged.
>
> > [!tip] SKILLS
> > `:%s/\v(ALPHA|BETA|GAMMA)/TIER-1/g` — `\v` enables very magic; `|` alternates without escaping
>
> > [!success] +25 XP
>
> → **[[_content/06 - Wildcard Protocol/R-08-TRANSMISSION-Magic_Mode|R-08-TRANSMISSION-Magic_Mode]]** — open to begin. Timer starts on file open.
