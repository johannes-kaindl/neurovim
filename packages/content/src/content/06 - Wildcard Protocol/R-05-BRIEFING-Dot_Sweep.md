---
mission_type: briefing
links_to: "06 - Wildcard Protocol/R-05-TRANSMISSION-Dot_Sweep"
locked: true
tags: [briefing, arc2, arc2-ch6]
sticker: lucide//circle-dot
color: "#ff6600"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-05 // DOT SWEEP                 ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"CORP rotates agent identifiers. AGENT-A, AGENT-B, AGENT-1 — the suffix changes. The stem doesn't.*
> *You can't write a separate substitution for each one. You need a pattern that matches any single character in that position.*
> *In regex, `.` means any character. One dot, one character, anything. `AGENT-.` matches AGENT-A, AGENT-B, AGENT-1, AGENT-X. All of them.*
> *Replace them all with the Resistance designation. One pass."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace every `AGENT-?` variant (where `?` is any single character) with `OPERATIVE`.
>
> > [!tip] SKILLS
> > `:%s/AGENT-.//g` — `.` matches exactly one character (any)
>
> > [!success] +25 XP
>
> → **[[_content/06 - Wildcard Protocol/R-05-TRANSMISSION-Dot_Sweep|R-05-TRANSMISSION-Dot_Sweep]]** — open to begin. Timer starts on file open.
