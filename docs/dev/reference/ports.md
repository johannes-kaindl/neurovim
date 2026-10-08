# Reference — The five ports

> **Diátaxis: Reference.** The interfaces in `packages/core/src/ports/` — their exact
> members and who implements them. Why the core is split this way is in
> [Explanation → Architecture](../explanation/architecture.md).

All five are exported through the core barrel `packages/core/src/index.ts`. The engines
(`MissionEngine`, `ProgressionEngine`, `GlitchEngine`, `MetricsTracker`, …) are pure and do
**not** consume ports; adapters wire ports to engines (D17/D19e).

## Overview

| Port | File | Responsibility | `adapter-web` | `neurovim-obsidian` (Obsidian consumer) |
|---|---|---|---|---|
| `VimModeSource` | `VimModeSource.ts` | Vim mode + classified actions | no class; `ui/cm6-theme.ts` listens to `@replit/codemirror-vim`'s `vim-mode-change` directly | no class; `keystrokeCounter.ts` counts keydowns inside `.cm-editor` via the core's `countsAsKeystroke`, no mode listener |
| `StoragePort` | `StoragePort.ts` | persistence of `PluginData` and side keys | `ports/WebStorage.ts` (`class WebStorage implements StoragePort`) | `storage/ObsidianStorage.ts` over `loadData()` / `saveData()` → `data.json` |
| `ContentPort` | `ContentPort.ts` | missions + lore | no class; the UI imports the synchronous helpers of `@neurovim/content` (`listMissions`, `getMission`, `listLore`, `getLore`, …) | `content/BundledContent.ts` — the vendored `@neurovim/content`, not the vault |
| `UiHost` | `UiHost.ts` | mount point for Preact trees | no class; `main.tsx` calls Preact `render(<App />, root)` | no class; `HubView` (`ItemView`) + `ResultModal` (`Modal`) |
| `LlmPort` | `LlmPort.ts` | one streaming LLM completion | `ports/WebLlm.ts` (`class WebLlm implements LlmPort`), wired in `uplink.ts` | `llm/CorePortAdapter.ts` over `CipherClient` (obsidian-kit chat client) + `EndpointResolver` |

## `VimModeSource`

```ts
type VimMode = 'normal' | 'insert' | 'visual' | 'command-line';
type VimAction =
  | 'delete' | 'yank' | 'change' | 'paste'
  | 'motion-forward' | 'motion-back' | 'goto-start' | 'goto-end'
  | 'undo' | 'redo';

interface VimModeSource {
  getCurrentMode(): VimMode;                               // pull
  onModeChange(cb: (mode: VimMode) => void): () => void;   // push; returns unsubscribe
  onAction(cb: (action: VimAction) => void): () => void;   // push; returns unsubscribe
}
```

## `StoragePort`

```ts
interface StoragePort {
  loadData<T>(key?: string): Promise<T | null>;   // null = nothing stored
  saveData<T>(data: T, key?: string): Promise<void>;
  keys(): Promise<string[]>;
  delete(key: string): Promise<void>;
}
```

| Implementation detail (`WebStorage`) | Value |
|---|---|
| IndexedDB database | `neurovim` (version 1) |
| Object store | `kv` |
| Default key (main state) | `pluginData` |

Not stored through this port: device-local preferences in `localStorage` —
`neurovim:ui` (display + audio, `ui/settings.ts`) and `neurovim:uplink` (endpoint + model,
`uplink.ts`).

## `ContentPort`

```ts
interface MissionSummary extends MissionFrontmatter { arc: 'I' | 'II'; chapter: string; }
interface MissionDoc extends MissionSummary {
  briefingBody: string;
  transmissionBody: string;
  solution?: string;     // target text for diff validation
  corrupted?: string;
}
interface LoreDoc {
  id: string;
  kind: 'fragment' | 'loot' | 'character' | 'organization' | 'ref';
  title: string;
  body: string;
}

interface ContentPort {
  listMissions(arc?: 'I' | 'II'): Promise<MissionSummary[]>;
  getMission(id: string): Promise<MissionDoc>;
  getLore(id: string): Promise<LoreDoc>;
  getRaw?(path: string): Promise<string>;   // optional
}
```

`MissionFrontmatter` is defined in `packages/core/src/types.ts`; its fields are listed in
[Content format](content-format.md#frontmatter--transmissions-and-katas).

## `UiHost`

```ts
interface UiHost {
  mount(node: ComponentChild): () => void;   // returns unmount
}
```

`ComponentChild` is Preact's type.

## `LlmPort`

```ts
interface LlmMessage { role: 'system' | 'user' | 'assistant'; content: string; }

type LlmFailure = 'aborted' | 'timeout' | 'unavailable' | 'failed';

type LlmResult =
  | { ok: true; content: string }
  | { ok: false; kind: LlmFailure; detail: string; partial: string };

interface LlmPort {
  complete(
    messages: LlmMessage[],
    opts?: { onToken?: (t: string) => void; signal?: AbortSignal },
  ): Promise<LlmResult>;
}
```

| `LlmFailure` | Meaning |
|---|---|
| `aborted` | the caller's `AbortSignal` fired |
| `timeout` | the consumer's own deadline elapsed |
| `unavailable` | nothing answered — unreachable, unconfigured, no endpoint |
| `failed` | something answered, but not with a usable completion |

`complete()` never throws. `partial` carries whatever streamed before a failure. The port has
no HTTP member: status lines go into `detail`.

| In-core callers | File |
|---|---|
| `CipherUplink` (CIPHER chat + debrief) | `packages/core/src/llm/CipherUplink.ts` |
| `MissionGenerator` (authoring-side KATA drafts) | `packages/core/src/llm/MissionGenerator.ts` |

| Implementation | Config |
|---|---|
| `WebLlm` | `{ endpoint: { type: 'ollama' \| 'openai'; baseUrl; apiKey? }, model, timeoutMs? }`; deps `{ fetchFn?, userAgent? }` for tests |
| `scripts/generate-kata.mjs` | inline object over `fetch`, non-streaming; see [generate a KATA draft](../how-to/generate-kata-draft.md) |
