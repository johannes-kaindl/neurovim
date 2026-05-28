---
mission_type: briefing
links_to: "10 - Mirror Rewrite/R-23-TRANSMISSION-Cascade"
locked: true
tags: [briefing, arc2, arc2-ch10]
sticker: lucide//zap
color: "#ff4444"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-23 // CASCADE                   ║
║  Clearance: CIPHER ANALYST  //  ARC II       ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"You need to run two operations in sequence on this document. Not one — two. Each changes the state; the second depends on the first.*
> *First: delete all NOISE lines with `:g/\[NOISE\]/d`.*
> *Second: on every remaining MIRROR line, change STATUS: PENDING to STATUS: TERMINATED with `:g/MIRROR/s/PENDING/TERMINATED/`.*
> *Run them in order. The second command only sees the document as the first command left it.*
> *Composing operations is the core skill. CORP built PROJECT MIRROR by composing simple rules. We dismantle it the same way."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Step 1: Delete all lines containing `[NOISE]`. Step 2: On MIRROR lines, change PENDING to TERMINATED.
>
> > [!tip] SKILLS
> > `:g/\[NOISE\]/d` then `:g/MIRROR/s/PENDING/TERMINATED/` — two sequential operations
>
> > [!success] +40 XP
>
> → **[[_content/10 - Mirror Rewrite/R-23-TRANSMISSION-Cascade|R-23-TRANSMISSION-Cascade]]** — open to begin. Timer starts on file open.
