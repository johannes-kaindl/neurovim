---
mission_type: briefing
links_to: "05 - Literal Frequencies/R-01-TRANSMISSION-Signal_Substitution"
locked: true
tags: [briefing, arc2, arc2-ch5]
sticker: lucide//replace
color: "#00ccff"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-01 // SIGNAL SUBSTITUTION       ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"You're reading this because you passed field training. That means NEXUS trusts you.*
> *CORP is watching us. Not individually — they built something called PROJECT MIRROR. A surveillance engine that scans communication intercepts for keyword patterns. We don't know its full shape yet.*
> *First step: the intercept log below has been garbled. CORP's relay system substituted our codename — NEXUS — with a dead-drop alias — PHANTOM. Nine instances. I need you to fix them.*
> *One command. Global substitution. This is what `:s` was built for."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace every `PHANTOM` with `NEXUS` in the intercept log (9×). Change nothing else.
>
> > [!tip] SKILLS
> > `:%s/PHANTOM/NEXUS/g` — substitute all occurrences across the file
>
> > [!success] +20 XP
>
> → **[[_content/05 - Literal Frequencies/R-01-TRANSMISSION-Signal_Substitution|R-01-TRANSMISSION-Signal_Substitution]]** — open to begin. Timer starts on file open.
