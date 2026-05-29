# Brand assets

SVG sources for the NeuroVim mark + social card. Rendered to PNG with
`rsvg-convert` (librsvg). Kuro palette: bg `#0b0e0c`, accent `#39ff7a`.

| Source | Render | Used for |
|---|---|---|
| `icon.svg` | `icon-1024.png` | App icon — `>_` on a dark squircle. Feed to `npx tauri icon`. |
| `og.svg` | → `packages/adapter-web/public/og.png` (1200×630) | OpenGraph / Twitter card |
| `favicon.svg` | copied to `packages/adapter-web/public/favicon.svg` | Browser favicon |

## Regenerate

```bash
cd docs/design-source/brand
rsvg-convert -w 1024 -h 1024 icon.svg -o icon-1024.png
rsvg-convert -w 1200 -h 630  og.svg   -o ../../../packages/adapter-web/public/og.png
cp favicon.svg ../../../packages/adapter-web/public/favicon.svg

# App icons (.icns/.ico/.png in src-tauri/icons) from the 1024 source:
cd ../../../packages/adapter-web
npx tauri icon ../../docs/design-source/brand/icon-1024.png
rm -rf src-tauri/icons/android   # we don't ship Android
```

Fonts in the SVGs use `Menlo, monospace` for rsvg rendering (JetBrains Mono is
not a system font here). For the running web app, the bundled JetBrains Mono is
used instead — see `packages/adapter-web/src/fonts/`.
