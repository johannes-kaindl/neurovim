---
tags: [fragment]
sticker: lucide//archive
color: "#1a1a1a"
---

*[Recovered — pre-Cascade archive // last modified: 2029-08-03 // do not modify]*

---

**Re: why do people still use Vim in 2029 lol**
*Posted to devtalk.net › tools › editors — 2029-08-03*

---

Okay I'll bite. I switched to Vim about three years ago because a coworker wouldn't stop talking about it and I got curious. Spent the first two weeks hating it. Genuinely considered uninstalling it every single day.

Then something clicked. I don't know when exactly. I think it was the day I realized `ci"` means "change inside quotes" and I just... understood the grammar of it. Like it's not shortcuts, it's a language. Verb + noun. `d` deletes, `c` changes, `y` yanks. You combine them with motion or text object and suddenly you can say *exactly* what you mean.

The mode thing isn't confusing once you stop thinking of it as a bug. Normal mode is where you *think*. Insert mode is where you *type*. They're not fighting each other, they're just different gears.

My personal favorite right now: `:%s/old/new/gc` for renaming things across a file with confirmation on each hit. I know people say "just use find-and-replace in a GUI" but doing it in Vim feels like having a conversation with the file instead of clicking around in it.

Also `gg=G` to auto-indent the whole buffer when I inherit someone else's messy config file. Saved me so much frustration last week.

Is it for everyone? Probably not. My partner tried it for a month and went back to their usual setup and I respect that. But if it clicks for you, it really clicks.

Anyway I need to go pick up my daughter from practice, so that's my TED talk on a 50-year-old text editor. Hope it helps someone.

— Mika

> *— Preserved. 2029-08-03. Whoever this was: they got it right.*
