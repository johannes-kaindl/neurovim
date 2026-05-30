# Fonts (self-hosted)

## JetBrains Mono — body/mono

`jetbrains-mono-400.woff2` / `jetbrains-mono-700.woff2` — Latin-subset woff2 of
[JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), Regular + Bold.

**Why bundled:** the system `ui-monospace` stack renders box-drawing glyphs
(`═ ║ ╔`) and the em-dash (`—`) at non-uniform widths, which distorts the
briefing ASCII frames. JetBrains Mono keeps them cell-aligned. ~42 KB total,
`font-display: swap`, no external request. Wired via `@font-face` in
`../styles.css` (token `--nv-mono`).

**License:** SIL Open Font License 1.1 — see `OFL.txt`. Source files retrieved
from the official JetBrains/JetBrainsMono repo (woff2 via the Fontsource subset).

## VT323 — display/wordmark

`vt323-400.woff2` — Latin-subset woff2 of [VT323](https://fonts.google.com/specimen/VT323),
Regular 400. Used for display headings and wordmark only (token `--nv-display`).
~18 KB, `font-display: swap`, no external request.

**License:** SIL Open Font License 1.1 — see `OFL.txt`. Source file retrieved
via the Fontsource CDN subset.
