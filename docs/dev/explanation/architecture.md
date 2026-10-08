# Explanation — Architecture: one core, thin adapters

> **Diátaxis: Explanation.** Why the codebase is cut the way it is. For the exact port
> signatures see [Reference → Ports](../reference/ports.md); for the commands see
> [Reference → Commands](../reference/commands.md).

## The problem the shape answers

NeuroVim ships to three places — a standalone web app, a native desktop app, and an
Obsidian plugin — and the game has to be *the same game* in all of them. The rules,
the missions, CIPHER's voice, the scoring: none of that should exist three times,
because three copies drift, and a bug fixed in one target stays alive in the other two.

What genuinely differs between targets is small and sharply bounded: where the editor
comes from, where state is saved, how content is loaded, where a UI tree gets mounted,
and how an HTTP stream reaches a language model. So the codebase is cut exactly along
that line (ADR-001).

```
@neurovim/content ──┐
                    ├──> @neurovim/core <──implements── @neurovim/adapter-web
(Markdown SSOT      │    (game logic,                   (Vite SPA, browser + Tauri)
 → typed JSON)      │     Web Audio,
                    │     Preact UI,        <──vendors───── neurovim-obsidian (separate repo)
                    │     ports)                            (Obsidian plugin)
                    └──> (web bundles content directly)
```

## Ports are the only way in

The core never imports `obsidian` and never touches the browser DOM. Everything
platform-specific enters through five port interfaces — `VimModeSource`,
`StoragePort`, `ContentPort`, `UiHost`, `LlmPort` — which each adapter implements.
A new platform need becomes a new port method, not a special case inside the core.

The payoff is that a platform question can be asked in exactly one place. "How does
Obsidian persist data?" is answered in the consumer's `StoragePort`; the progression
logic that produces the data never has to know.

## Engines are pure, and do not see the ports

A tempting shortcut would be to let `MissionEngine` or `ProgressionEngine` call
`StoragePort.save()` directly. They don't (decisions D17/D19e). The engines are pure
functions: state in, state out. The **adapters** wire ports to engines.

Two things follow. The engines are trivially testable — no fakes, no async, no
platform — which is why `core` carries by far the largest share of the test suite.
And the engines cannot accidentally grow a dependency on how a particular target
stores or loads things.

The same reasoning removed a port. An `AudioPort` once existed, but `AudioEngine`
was already platform-neutral and injectable; wrapping it in a port added a layer
that decided nothing. A port earns its place only where targets genuinely differ.

## Preact, and why the alias is load-bearing

The UI is Preact 10, not React — the whole app has a tight bundle budget, and the
views are simple enough that the React runtime's weight buys nothing. Libraries that
import `react` still work because every build and test config maps `react` and
`react-dom` to `preact/compat`.

That mapping is invisible until it is missing. A new Jest project or bundler preset
without it does not fail with "alias missing"; it fails with hook or JSX type errors
far away from the cause. That is why the conventions insist on carrying the alias
into every new config.

## Content is Markdown, compiled to types

Missions and lore are authored as Markdown with frontmatter — the form a writer
can edit, diff and review. `packages/content/build.mjs` turns them into a typed
TypeScript manifest, so the core consumes data a compiler has checked rather than
strings it has to trust. The generated files are an artefact of the Markdown, which
is why they are never edited by hand: an edit there is overwritten by the next build.
The format itself is in [Reference → Content format](../reference/content-format.md).

## Why there is a build step at all

The editor is the product, and CodeMirror 6 only exists as an npm module graph —
there is no single-file drop-in. On top of that, one source tree has to come out as
several artefacts: a lazy-loading web bundle, the static assets the Tauri shell wraps,
and a core another repository vendors. A bundler is what keeps that one codebase
instead of three.

## Web-first, logic parity only

Sharing the core buys **functional** parity between targets, not visual parity. The
v0.2.0 cinematic CRT overhaul was deliberately web-only, and new UI work lands in
`adapter-web` first without being back-ported. The Obsidian plugin looks different on
purpose; it plays the same because the rules come from the same engines.

Traffic between the targets runs both ways, though: capabilities that began in the
Obsidian consumer have moved *up* into the core when they turned out to concern the
game. How that is decided is the subject of
[The upstream contract](upstream-contract.md).

## The desktop app is the web app

The native app is a Tauri v2 wrapper around the same Vite build, rendered by the
operating system's own WebView (WKWebView, WebView2, WebKitGTK). That is why the
installers are a few megabytes rather than the ~100 MB an Electron build would weigh,
and why there is no separate desktop codebase to maintain. The price is that each OS
renders with a different engine — a behaviour difference between targets is usually
a WebView difference, not a code difference.
