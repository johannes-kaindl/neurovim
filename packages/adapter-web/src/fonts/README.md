# Fonts — JetBrains Mono (self-hosted)

`jetbrains-mono-400.woff2` / `jetbrains-mono-700.woff2` — Latin-subset woff2 of
[JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), Regular + Bold.

**Why bundled:** the system `ui-monospace` stack renders box-drawing glyphs
(`═ ║ ╔`) and the em-dash (`—`) at non-uniform widths, which distorts the
briefing ASCII frames. JetBrains Mono keeps them cell-aligned. ~42 KB total,
`font-display: swap`, no external request. Wired via `@font-face` in
`../styles.css` (token `--nv-mono`).

**License:** SIL Open Font License 1.1 — see `OFL.txt`. Source files retrieved
from the official JetBrains/JetBrainsMono repo (woff2 via the Fontsource subset).
