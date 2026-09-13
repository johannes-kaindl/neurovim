# Explanation — why NeuroVim is shaped this way

> **Diátaxis: Explanation.** Background and design rationale — the *why* behind the
> game, not how to play it. For tasks see the [How-to guides](../how-to/index.md); for
> the architecture aimed at contributors, see
> [Architecture](../../dev/explanation/architecture.md).

## Why a game to learn Vim?

Vim is famously worth learning and famously hard to start. The classic on-ramps —
`vimtutor`, cheatsheets, "just use it for a week" — all front-load the pain: you pay in
frustration now for fluency much later. Most people quit during the payment.

NeuroVim's bet is that the fastest way past that wall is to **stop framing it as
practice**. If each exercise is a *mission* with stakes, a voice, and a reward, your
attention is on the story and the clock — and the Vim goes in almost by accident,
through repetition you didn't experience as drilling. The learning is the **disguised
core loop**; the spy-thriller is the motivation layer wrapped around it.

## The core loop: fix text, diff against a solution

Every mission reduces to one mechanic: **a document arrives corrupted, and you restore
it.** CORP — the antagonist — injects character-level noise, capitalises words, drops in
propaganda lines. You undo the damage with Vim, and the game checks your buffer against
a hidden solution, completing the moment they match.

This single verb is deliberately narrow. It means:

- **Every Vim skill maps to it.** Deleting a stray char is `x`; removing a propaganda
  line is `dd`; fixing a mistyped word is `ciw`; rewriting many lines is a macro or
  `:g`. The same "restore the file" goal teaches motions, operators, text objects,
  search-and-replace, registers, visual-block, and global commands without changing the
  rules.
- **Validation is unambiguous.** There is no rubric and no partial credit — the text
  either matches or it doesn't — so feedback is instant and honest.
- **It has a known limit.** Skills that *don't* change text (folding, window jumps,
  marks as navigation) are hard to express as "fix the file", which is why they are not
  yet first-class missions. Teaching them needs a new gameplay verb.

## Why a real editor, not a fake terminal

NeuroVim runs **CodeMirror 6 with real Vim keybindings**, not a scripted "type the
right key" simulation. That is a deliberate cost: real Vim means real edge cases and a
real learning surface. The payoff is **transfer** — the muscle memory you build in a
mission is the same muscle memory that works in your actual editor afterwards. A
simulation that only accepts the "intended" keystroke would teach you the game, not the
tool.

## Why progress is gated (Story-Mode)

Early builds unlocked everything at once. It demoed well and taught badly: a wall of 40
missions is paralysing, and nothing signals what to learn next. NeuroVim now **unlocks
content progressively** — finish a chapter, rank up, and the next set appears. The
gating is pedagogy disguised as progression: it sequences the curriculum (modes →
motions → operators → text objects → search → macros/registers → visual-block → global
commands → regex) so each mission builds on the last, and it turns "what do I do next?"
into a non-question.

## Why keystroke par-tiers

Completing a mission proves you *can* do the edit. The **par-tier** (gold/silver/bronze,
scored by keystroke count) pushes the next thing: doing it *economically*. Vim's whole
value proposition is leverage — one well-chosen command replacing ten keypresses — so
the scoring rewards exactly that. It is intentionally generous (you can finish without a
medal) so it motivates the curious without blocking the learner. Replaying a mission to
shave keystrokes is where `.`, counts, and text objects stop being trivia and become
habit.

## Why the story, and who CIPHER is

The narrative exists to **carry motivation across the dull parts of practice**. A
briefing gives each exercise a reason to care; CIPHER's coaching turns a hint into a
character beat; unlockable **LOOT** and **FRAGMENT** lore rewards give completion a
payoff beyond a number going up. The coaching is **adaptive** — loud for beginners,
fading as you rank up — so guidance is there when you're lost and out of the way once
you're not.

CIPHER is your handler, the diegetic voice that assigns missions. (Who CIPHER actually
*is* is a question the lore answers as you play — no spoilers here.)

## Why it plays everywhere

NeuroVim is one codebase delivered three ways — an **Obsidian plugin** (its origin), a
**standalone web app**, and a **native desktop app**. The reasoning is reach without
fragmentation: the platform-neutral game logic is shared, and only thin
platform-specific shells differ. For you as a player it means the same game whether you
play in a browser tab or a 3 MB desktop app; for the project it means one place to fix a
bug. The full architecture rationale lives in
[Architecture](../../dev/explanation/architecture.md).

## Why your progress stays on your device

NeuroVim has no account, no server-side save and no sign-up. Your XP, unlocks and best
times live in your browser's own database, and the desktop app keeps its own copy the
same way. That is a deliberate trade. Nothing about how you learn — how long a mission
took you, how many keystrokes you wasted — ever leaves your machine, and the game works
the same offline as online.

The price is that progress does not follow you. A different browser, a different device
or a private window starts at Level 1, because as far as the game can tell, it is a
different player. For a game whose only reward is the skill in your own hands, that
seemed the right way round: the skill travels with you anyway; the save file does not
have to.

Settings that describe your *machine* rather than your *progress* — like the address of
a local model server — are kept apart from the save for the same reason. An address on
your network says nothing about how far you have come, and it has no business ending up
anywhere your progress might one day be exported.

## Why the uplink is off by default

The CIPHER uplink talks to a model server on your own computer. To do that, a web page
has to reach your local network, and modern browsers ask you first. The catch is how
that question behaves: a permission prompt that pops up while you are busy with
something else gets dismissed by reflex — and in Chrome, one dismissal is remembered for
the site. From then on, every attempt fails silently, and the page itself has no way to
ask again.

So NeuroVim never lets that prompt appear unasked. The uplink starts switched off, the
game makes no attempt to reach anything when it loads, and the first request goes out
only when you press **Connect** — the one moment you know exactly what the browser is
asking about. For the same reason there is no "try again" button: after a refusal a
retry cannot succeed, so the panel points you to the browser's own site settings
instead of pretending otherwise.
