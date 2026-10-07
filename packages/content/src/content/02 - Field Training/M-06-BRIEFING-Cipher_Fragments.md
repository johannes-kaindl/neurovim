---
mission_type: briefing
links_to: "02 - Field Training/M-06-TRANSMISSION-Text_Objects"
locked: true
tags: [briefing, tier-2]
sticker: lucide//code
color: "#66cc66"
---

```ascii
╔══════════════════════════════════════════╗
║  INCOMING — CIPHER                       ║
║  BRIEFING: M-06 // TEXT OBJECTS          ║
║  Clearance: GHOST OPERATOR              ║
╚══════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"GHOST extracted a structured data file from CORP's endpoint registry. Case numbers, sectors, access codes — exactly what we need for the next operation.*
> *NEVERMORE hit it at the value level. Not whole lines this time — just the content inside brackets and quotes. Everything was placeholder-sanitized. The structure is intact. The brackets are still there. The quotes are still there. You just need to replace what's inside them.*
> *Text objects. `ci"` — change inside quotes. `ci(` — change inside parentheses. `ci{` — inside braces. `diw` — delete inner word. `daw` — delete around word, including spacing.*
> *The structure tells you where to go. The objects tell you what to change.*
> *GHOST cross-referenced the decrypted roster — it's in the directive below. The container is clean. Fix the contents."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Replace the placeholder values inside the quotes with GHOST's decrypted roster. In `endpoints` and `access_codes`, each ID takes its own row's values:
> > - `NCE-0091-A` → `CELL-DELTA-01` (sector `sector-7-north`, clearance `field-ops`, status `active`, code `7741`)
> > - `NCE-0042-B` → `CELL-DELTA-02` (sector `corp-adjacent`, clearance `intelligence`, status `active`, code `3392`)
> > - `NCE-0017-C` → `GHOST` (sector `corp-internal`, clearance `deep-cover`, status `dark`, code `0012`)
> > - `location` → `relay-cluster-7` · `frequency` → `441.7`
> > - `window` → `THE DIFF DOES NOT LIE` · `response` → `TRUST THE DIFF` (these two are not renamed to record IDs)
> > - Keys, quotes, brackets, braces and commas stay as they are.
>
> > [!tip] SKILLS
> > `ci"` `ca"` `ci(` `ci{` `ci[` `diw` `daw` `cit`
>
> > [!success] +30 XP
>
> → **[[_content/02 - Field Training/M-06-TRANSMISSION-Text_Objects|M-06-TRANSMISSION-Text_Objects]]** — open to begin. Timer starts on file open.
