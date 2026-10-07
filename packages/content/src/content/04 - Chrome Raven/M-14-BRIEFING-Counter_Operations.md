---
mission_type: briefing
links_to: "04 - Chrome Raven/M-14-TRANSMISSION-Counter_Operations"
locked: true
tags: [briefing, tier-4]
sticker: lucide//hash
color: "#cc66ff"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: M-14 // COUNTER-OPERATIONS        ║
║  Clearance: CHROME RAVEN                     ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"Second fragment from RAVEN's channel. GHOST's decoder gave us coordinates, but CORP's grid uses per-sector offsets. RAVEN encoded the true values relative to those offsets. You apply the offset-keys to read.*
> *Per-column increments. Five waypoints, two columns — REF and MARK. Each column has its own offset-key. All rows in that column take the same shift.*
> *`Ctrl+a` adds to the next number on the line, `Ctrl+x` subtracts. Prefix a count: `3<C-x>` shifts by 3 in one stroke. Then `j` drops a row and `.` repeats the same shift.*
> *Watch the dash. To Vim, `REF-4217` is minus 4217 — `3<C-a>` drives it down to `REF-4214`. Count the other way: `3<C-x>` makes it `REF-4220`.*
> *Two passes. REF column first with its offset. MARK column second.*
> *RAVEN's note is at the bottom. Read it after the matrix is clean."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Add **+3** to all five `REF-` numbers (`REF-4217` → `REF-4220` … `REF-4237` → `REF-4240`) and **+7** to all five `MARK-` numbers (`MARK-1378` → `MARK-1385` … `MARK-1398` → `MARK-1405`). Keep prefixes and spacing; touch nothing else.
>
> > [!tip] SKILLS
> > `Ctrl+a` / `Ctrl+x` (increment / decrement), count-prefix (`3<C-x>`, `7<C-x>`), `j` + `.` (repeat down the column)
>
> > [!success] +60 XP
>
> → **[[_content/04 - Chrome Raven/M-14-TRANSMISSION-Counter_Operations|M-14-TRANSMISSION-Counter_Operations]]** — open to begin. Timer starts on file open.
