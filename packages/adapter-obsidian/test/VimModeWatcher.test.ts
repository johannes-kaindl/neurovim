import { AudioEngine } from '@neurovim/core';
import { VimModeWatcher } from '../src/audio/VimModeWatcher';
import { SoundCues } from '@neurovim/core';
import { MarkdownView } from 'obsidian';
import { makeMockAudioContext } from './__mocks__/web-audio';

function makeMockApp() {
  const listeners: Record<string, Function[]> = {};
  return {
    workspace: {
      on: jest.fn((event: string, fn: Function) => {
        listeners[event] = listeners[event] ?? [];
        listeners[event].push(fn);
      }),
      off: jest.fn(),
      _emit: (event: string, ...args: any[]) => {
        (listeners[event] ?? []).forEach(fn => fn(...args));
      },
    },
  };
}

function makeEngine() {
  const mockCtx = makeMockAudioContext();
  return new AudioEngine(() => mockCtx as unknown as AudioContext);
}

function makeFakeLeafWithCm(cm: any) {
  const view = new MarkdownView();
  view.editor = { cm };
  return { view };
}

describe('VimModeWatcher', () => {
  it('registers active-leaf-change listener on construction', () => {
    const engine = makeEngine();
    const app = makeMockApp();
    new VimModeWatcher(engine, app as any);
    expect(app.workspace.on).toHaveBeenCalledWith('active-leaf-change', expect.any(Function));
  });

  it('mode defaults to normal', () => {
    const engine = makeEngine();
    const app = makeMockApp();
    const watcher = new VimModeWatcher(engine, app as any);
    expect(watcher.mode).toBe('normal');
  });

  it('dispose removes workspace listener', () => {
    const engine = makeEngine();
    const app = makeMockApp();
    const watcher = new VimModeWatcher(engine, app as any);
    watcher.dispose();
    expect(app.workspace.off).toHaveBeenCalledWith('active-leaf-change', expect.any(Function));
  });

  it('updates mode when vim-mode-change fires', () => {
    const engine = makeEngine();
    const app = makeMockApp();
    const watcher = new VimModeWatcher(engine, app as any);

    const vimListeners: Record<string, Function[]> = {};
    const cm = {
      on: jest.fn((e: string, fn: Function) => {
        vimListeners[e] = vimListeners[e] ?? [];
        vimListeners[e].push(fn);
      }),
      off: jest.fn(),
    };

    (watcher as any).onLeafChange(makeFakeLeafWithCm(cm));

    vimListeners['vim-mode-change']?.forEach(fn => fn({ mode: 'insert' }));
    expect(watcher.mode).toBe('insert');
  });

  it('fires SoundCues.vimModeInsert when mode changes to insert (engine ready)', async () => {
    const mockCtx = makeMockAudioContext();
    const engine = new AudioEngine(() => mockCtx as unknown as AudioContext);
    await engine.init();
    const app = makeMockApp();
    const watcher = new VimModeWatcher(engine, app as any);

    const vimListeners: Record<string, Function[]> = {};
    const cm = {
      on: jest.fn((e: string, fn: Function) => {
        vimListeners[e] = vimListeners[e] ?? [];
        vimListeners[e].push(fn);
      }),
      off: jest.fn(),
    };

    jest.spyOn(SoundCues, 'vimModeInsert').mockImplementation(() => {});
    (watcher as any).onLeafChange(makeFakeLeafWithCm(cm));
    vimListeners['vim-mode-change']?.forEach(fn => fn({ mode: 'insert' }));
    expect(SoundCues.vimModeInsert).toHaveBeenCalled();
    (SoundCues.vimModeInsert as jest.Mock).mockRestore();
  });

  it('does not fire SoundCues when engine not ready', () => {
    const engine = makeEngine(); // not initialized
    const app = makeMockApp();
    const watcher = new VimModeWatcher(engine, app as any);

    const vimListeners: Record<string, Function[]> = {};
    const cm = {
      on: jest.fn((e: string, fn: Function) => {
        vimListeners[e] = vimListeners[e] ?? [];
        vimListeners[e].push(fn);
      }),
      off: jest.fn(),
    };

    jest.spyOn(SoundCues, 'vimModeNormal').mockImplementation(() => {});
    (watcher as any).onLeafChange(makeFakeLeafWithCm(cm));
    vimListeners['vim-mode-change']?.forEach(fn => fn({ mode: 'normal' }));
    expect(SoundCues.vimModeNormal).not.toHaveBeenCalled();
    (SoundCues.vimModeNormal as jest.Mock).mockRestore();
  });
});
