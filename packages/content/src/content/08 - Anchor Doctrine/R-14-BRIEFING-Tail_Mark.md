---
mission_type: briefing
links_to: "08 - Anchor Doctrine/R-14-TRANSMISSION-Tail_Mark"
locked: true
tags: [briefing, arc2, arc2-ch8]
sticker: lucide//arrow-left-to-line
color: "#ff0066"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-14 // TAIL MARK                 ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"You stripped the prefix. Now strip the suffix.*
> *`$` anchors to the end of the line. ` \[CORP-SIG\]$` matches that exact string, but only when it appears at the end.*
> *CORP appends an authentication signature to every line in this document. ` [CORP-SIG]` — space, then the marker. It appears nowhere else. `$` makes it exact.*
> *Start and end. Two anchors. You now have both."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Remove the ` [CORP-SIG]` suffix from the end of every line that has it.
>
> > [!tip] SKILLS
> > `:%s/ \[CORP-SIG\]$//g` — `$` anchors to line end
>
> > [!success] +30 XP
>
> → **[[_content/08 - Anchor Doctrine/R-14-TRANSMISSION-Tail_Mark|R-14-TRANSMISSION-Tail_Mark]]** — open to begin. Timer starts on file open.
