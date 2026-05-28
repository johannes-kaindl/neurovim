import { App, MarkdownView, WorkspaceLeaf } from 'obsidian';
import { AudioEngine } from '@neurovim/core';
import { SoundCues } from '@neurovim/core';

export class VimModeWatcher {
  private engine: AudioEngine;
  private app: App;
  private currentMode = 'normal';
  private disposed = false;
  private vimHandler: ((e: { mode: string }) => void) | null = null;
  private currentCm: any = null;
  private readonly leafRef: (leaf: WorkspaceLeaf | null) => void;

  constructor(engine: AudioEngine, app: App) {
    this.engine = engine;
    this.app = app;
    this.leafRef = this.onLeafChange.bind(this);
    this.app.workspace.on('active-leaf-change', this.leafRef);
  }

  get mode(): string { return this.currentMode; }

  private onLeafChange(leaf: WorkspaceLeaf | null): void {
    if (this.disposed) return;
    this.detachFromCm();
    if (!leaf) return;
    const view = leaf.view;
    if (!(view instanceof MarkdownView)) return;
    const cm = (view.editor as any)?.cm;
    if (!cm) return;
    this.currentCm = cm;
    this.vimHandler = (e: { mode: string }) => {
      this.currentMode = e.mode;
      if (!this.engine.isReady) return;
      switch (e.mode) {
        case 'normal':  SoundCues.vimModeNormal(this.engine);  break;
        case 'insert':  SoundCues.vimModeInsert(this.engine);  break;
        case 'visual':        SoundCues.vimModeVisual(this.engine);   break;
        case 'command-line':  SoundCues.vimModeCommand(this.engine);  break;
      }
    };
    cm.on('vim-mode-change', this.vimHandler);
  }

  private detachFromCm(): void {
    if (this.currentCm && this.vimHandler) {
      this.currentCm.off('vim-mode-change', this.vimHandler);
    }
    this.currentCm = null;
    this.vimHandler = null;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.detachFromCm();
    this.app.workspace.off('active-leaf-change', this.leafRef);
  }
}
