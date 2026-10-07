---
mission_type: briefing
links_to: "10 - Mirror Rewrite/R-24-TRANSMISSION-Project_Mirror"
locked: true
tags: [briefing, arc2, arc2-ch10, arc2-finale]
sticker: lucide//eye-off
color: "#ff4444"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER // FINAL TRANSMISSION     ║
║  BRIEFING: R-24 // PROJECT MIRROR            ║
║  Clearance: CIPHER ANALYST  //  FINALE       ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"I need to tell you something before you open this file.*
> *PROJECT MIRROR tracks every communication in the Resistance. Every channel. Every codename. Every location.*
> *Including mine.*
> *I've been running patterns against CORP's own data for eighteen months. Finding their surveillance architecture from the inside. Every mission I sent you was built from CORP intercepts I decoded using exactly what you've been learning.*
> *The document in front of you is PROJECT MIRROR's core index. All its surveillance targets. All its active channels. I'm in there.*
> *Three operations. Delete the CORP status lines. Expose the CIPHER tracking entry. Replace ACTIVE with TERMINATED across the entire index.*
> *When you submit: PROJECT MIRROR goes dark. CORP loses visibility on every Resistance channel simultaneously. Including the one you're reading this on.*
> *You've been training for this.*
> *Do it."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Three operations in sequence:
> > 1. Delete the three lines starting with `[CORP-STATUS]`
> > 2. Change `CIPHER: TRACKED` to `CIPHER: EXPOSED` on the CIPHER entry
> > 3. Replace every `ACTIVE` with `TERMINATED` (8×), including the `Status` line in the header box
>
> > [!tip] SKILLS
> > `:g/\[CORP-STATUS\]/d` → `:%s/CIPHER: TRACKED/CIPHER: EXPOSED/` → `:%s/ACTIVE/TERMINATED/g`
>
> > [!success] +40 XP — ARC II COMPLETE
>
> → **[[_content/10 - Mirror Rewrite/R-24-TRANSMISSION-Project_Mirror|R-24-TRANSMISSION-Project_Mirror]]** — open to begin. This is the last one.
