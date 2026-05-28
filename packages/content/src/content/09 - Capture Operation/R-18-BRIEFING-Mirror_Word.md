---
mission_type: briefing
links_to: "09 - Capture Operation/R-18-TRANSMISSION-Mirror_Word"
locked: true
tags: [briefing, arc2, arc2-ch9]
sticker: lucide//copy-x
color: "#00ff88"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-18 // MIRROR WORD               ║
║  Clearance: PATTERN BREAKER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"Capture groups aren't just for swapping. You can use `\1` in the pattern itself — to match the same thing twice.*
> *`\(\w\+\) \1` matches a word followed by a space followed by the exact same word. Duplicates.*
> *CORP's transcription system stutters. Duplicate words appear throughout this intercept. `\1` finds them. Remove the second instance.*
> *This is backreference: the pattern refers to itself. The match is only valid when both sides are identical."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Remove all duplicate words — where the same word appears twice in a row, keep only one.
>
> > [!tip] SKILLS
> > `:%s/\(\w\+\) \1/\1/g` — `\1` backreferences the first group; replacement keeps only one copy
>
> > [!success] +35 XP
>
> → **[[_content/09 - Capture Operation/R-18-TRANSMISSION-Mirror_Word|R-18-TRANSMISSION-Mirror_Word]]** — open to begin. Timer starts on file open.
