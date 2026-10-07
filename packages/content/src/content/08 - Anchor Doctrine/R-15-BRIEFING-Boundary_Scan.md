---
mission_type: briefing
links_to: "08 - Anchor Doctrine/R-15-TRANSMISSION-Boundary_Scan"
locked: true
tags: [briefing, arc2, arc2-ch8]
sticker: lucide//scan-text
color: "#ff0066"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-15 // BOUNDARY SCAN             ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"There's a difference between matching a word and matching a substring.*
> *`:%s/MIRROR/PROJECT MIRROR/g` would also match MIRRORING and MIRRORED — it sees MIRROR inside them.*
> *Word boundaries fix this. `\<MIRROR\>` matches MIRROR only when it stands alone — not as part of a longer word. `\<` = word start. `\>` = word end.*
> *This document has MIRROR, MIRRORING, and MIRRORED. Only the standalone MIRROR instances should be expanded to PROJECT MIRROR.*
> *Precision is what boundaries give you."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace every standalone word `MIRROR` with `PROJECT MIRROR` (4×). Do not touch `MIRRORING` or `MIRRORED`.
>
> > [!tip] SKILLS
> > `:%s/\<MIRROR\>/PROJECT MIRROR/g` — word boundary anchors
>
> > [!success] +30 XP
>
> → **[[_content/08 - Anchor Doctrine/R-15-TRANSMISSION-Boundary_Scan|R-15-TRANSMISSION-Boundary_Scan]]** — open to begin. Timer starts on file open.
