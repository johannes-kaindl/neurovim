---
mission_type: briefing
links_to: "06 - Wildcard Protocol/R-06-TRANSMISSION-Frequency_Match"
locked: true
tags: [briefing, arc2, arc2-ch6]
sticker: lucide//radio
color: "#ff6600"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-06 // FREQUENCY MATCH           ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"`.` matches one character. But what if you need to match one or more? Or zero or more?*
> *`\+` means one or more of the preceding item. `\*` means zero or more. `\?` means zero or one.*
> *CORP uses numeric IDs of varying length: ID-7, ID-42, ID-1337. You need `[0-9]\+` — one or more digits.*
> *This is the difference between matching and not matching. A pattern that expects exactly one digit fails on two. Quantifiers are precision tools."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace every `ID-` followed by one or more digits with `ID-REDACTED`.
>
> > [!tip] SKILLS
> > `:%s/ID-[0-9]\+/ID-REDACTED/g` — `[0-9]\+` = one or more digits
>
> > [!success] +25 XP
>
> → **[[_content/06 - Wildcard Protocol/R-06-TRANSMISSION-Frequency_Match|R-06-TRANSMISSION-Frequency_Match]]** — open to begin. Timer starts on file open.
