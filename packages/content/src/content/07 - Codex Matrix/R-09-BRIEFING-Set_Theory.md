---
mission_type: briefing
links_to: "07 - Codex Matrix/R-09-TRANSMISSION-Set_Theory"
locked: true
tags: [briefing, arc2, arc2-ch7]
sticker: lucide//brackets
color: "#cc00ff"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-09 // SET THEORY                ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"`.` matches anything. But what if you only want to match specific characters?*
> *Character sets: `[XYZ]` matches X, Y, or Z — exactly one character, but only from that set. `[a-z]` matches any lowercase letter. `[0-9A-F]` matches hex digits.*
> *CORP uses three status codes: X, Y, Z. They mean nothing to us. They need to be replaced with CLEAN.*
> *One pattern. Three possible characters. `[XYZ]` covers all three."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace every status code `X`, `Y`, or `Z` (appearing alone as status fields) with `CLEAN`.
>
> > [!tip] SKILLS
> > `:%s/: [XYZ]$/: CLEAN/g` — character set `[XYZ]` matches one of those three; `$` anchors to line end
>
> > [!success] +30 XP
>
> → **[[_content/07 - Codex Matrix/R-09-TRANSMISSION-Set_Theory|R-09-TRANSMISSION-Set_Theory]]** — open to begin. Timer starts on file open.
