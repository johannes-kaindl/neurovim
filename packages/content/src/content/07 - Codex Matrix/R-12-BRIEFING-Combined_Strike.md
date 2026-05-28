---
mission_type: briefing
links_to: "07 - Codex Matrix/R-12-TRANSMISSION-Combined_Strike"
locked: true
tags: [briefing, arc2, arc2-ch7]
sticker: lucide//combine
color: "#cc00ff"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-12 // COMBINED STRIKE           ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"CORP uses 8-character hexadecimal hashes to tag every document internally. They look like: `3F2A9B4C`. Eight characters, all hex: `[0-9A-F]`.*
> *A length constraint uses `\{n\}` — exactly n repetitions. `[0-9A-F]\{8\}` matches exactly 8 hex characters.*
> *Combined with your class knowledge, this is precise matching. Not any 8 characters — exactly 8 hex characters. No false positives.*
> *Find every hash. Redact every hash. Leave everything else intact."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace every 8-character hexadecimal hash (characters `0-9` and `A-F` only) with `[HASH-REDACTED]`.
>
> > [!tip] SKILLS
> > `:%s/[0-9A-F]\{8\}/[HASH-REDACTED]/g` — exact-length hex match
>
> > [!success] +30 XP
>
> → **[[_content/07 - Codex Matrix/R-12-TRANSMISSION-Combined_Strike|R-12-TRANSMISSION-Combined_Strike]]** — open to begin. Timer starts on file open.
