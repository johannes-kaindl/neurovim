---
mission_type: briefing
links_to: "07 - Codex Matrix/R-10-TRANSMISSION-Digit_Sweep"
locked: true
tags: [briefing, arc2, arc2-ch7]
sticker: lucide//hash
color: "#cc00ff"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-10 // DIGIT SWEEP               ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"Writing `[0-9]` works. But Vim gives you a shorthand: `\d` means any digit. `\w` means any word character — letters, digits, underscore. `\s` means any whitespace.*
> *Shorthands are worth knowing. They compress patterns you'd otherwise write out character by character.*
> *This log has timestamps — numeric sequences that need to be redacted before the document goes out. Replace every sequence of digits with `[REDACTED]`.*
> *`\d\+` — one or more digits. That's the whole pattern."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace every sequence of digits in the document with `[REDACTED]`.
>
> > [!tip] SKILLS
> > `:%s/\d\+/[REDACTED]/g` — `\d` matches any digit, `\+` means one or more
>
> > [!success] +30 XP
>
> → **[[_content/07 - Codex Matrix/R-10-TRANSMISSION-Digit_Sweep|R-10-TRANSMISSION-Digit_Sweep]]** — open to begin. Timer starts on file open.
