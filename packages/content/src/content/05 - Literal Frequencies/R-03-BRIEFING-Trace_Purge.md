---
mission_type: briefing
links_to: "05 - Literal Frequencies/R-03-TRANSMISSION-Trace_Purge"
locked: true
tags: [briefing, arc2, arc2-ch5]
sticker: lucide//trash-2
color: "#00ccff"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-03 // TRACE PURGE               ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"CORP injects tracking markers into every document they process. They look like log lines — `[TRACK]` at the start. The actual intelligence is between them.*
> *You don't need to delete line by line. `:g` does it in one shot. It runs a command on every line that matches a pattern. The command is `d`. Delete.*
> *`:g/TRACK/d` — every line containing TRACK disappears. That's global delete. Learn it. You'll use it often."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Delete every line containing `[TRACK]`. Leave the intelligence lines intact.
>
> > [!tip] SKILLS
> > `:g/\[TRACK\]/d` — global delete of matching lines (brackets need escaping in default magic)
>
> > [!success] +20 XP
>
> → **[[_content/05 - Literal Frequencies/R-03-TRANSMISSION-Trace_Purge|R-03-TRANSMISSION-Trace_Purge]]** — open to begin. Timer starts on file open.
