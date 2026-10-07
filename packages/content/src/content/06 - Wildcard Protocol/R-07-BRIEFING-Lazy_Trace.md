---
mission_type: briefing
links_to: "06 - Wildcard Protocol/R-07-TRANSMISSION-Lazy_Trace"
locked: true
tags: [briefing, arc2, arc2-ch6]
sticker: lucide//minimize-2
color: "#ff6600"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-07 // LAZY TRACE                ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"Greedy quantifiers consume as much as possible. `.*` will match from the first `<` to the last `>` on the line — swallowing everything between.*
> *That's usually wrong. You want the shortest possible match. That's lazy: `.\{-}` instead of `.*`.*
> *CORP wraps encoded payloads in angle brackets. `<ENCRYPTED>data</ENCRYPTED>` — you need to strip the tags without destroying what's inside. Lazy match or you'll eat the content too."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Delete all 14 tags (`<HEADER>`, `<ENCRYPTED>`, `<NODE>`, `<ASSET>` and their `</...>` closers) on the 7 payload lines. The text between the tags stays exactly as it is, with no extra spaces.
>
> > [!tip] SKILLS
> > `:%s/<.\{-}>//g` — lazy quantifier `\{-}` matches the shortest possible content between `<` and `>`
>
> > [!success] +25 XP
>
> → **[[_content/06 - Wildcard Protocol/R-07-TRANSMISSION-Lazy_Trace|R-07-TRANSMISSION-Lazy_Trace]]** — open to begin. Timer starts on file open.
