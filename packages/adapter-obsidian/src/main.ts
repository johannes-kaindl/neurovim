import {
  App, Plugin, WorkspaceLeaf, TFile, MarkdownView, Notice,
} from 'obsidian';
import { EditorView, ViewPlugin, ViewUpdate, Decoration, DecorationSet } from '@codemirror/view';
import { StateField, StateEffect, RangeSetBuilder } from '@codemirror/state';
import { createRoot } from 'react-dom/client';
type Root = ReturnType<typeof createRoot>;
import React from 'react';

import {
  MissionState, PluginData, RunResult, LevelUpResult,
  DEFAULT_PLUGIN_DATA, DEFAULT_MISSION_STATE, MissionRecord,
  SandboxState, SandboxDifficulty, DEFAULT_SANDBOX_STATE, AppliedGlitch, GlitchDefinition,
  HudMode,
} from '@neurovim/core';
import { MetricsTracker } from '@neurovim/core';
import { MissionEngine } from '@neurovim/core';
import { getMissionById, getMissionByPath, isBriefingPath, RAVEN_PATH } from '@neurovim/core';
import { ProgressionEngine } from '@neurovim/core';
import { UNLOCK_MAP } from '@neurovim/core';
import { getDiff } from '@neurovim/core';
import { FloatHUD } from '@neurovim/core';
import { SandboxHUD } from '@neurovim/core';
import { GlitchEngine } from '@neurovim/core';
import { formatTime } from '@neurovim/core';
import { NeuroVimSidebarView, VIEW_TYPE_NEUROVIM } from './views/SidebarView';
import { ResultModal } from './modals/ResultModal';
import { LevelUpModal } from './modals/LevelUpModal';
import { registerAsciiCodeBlockProcessors } from './views/AsciiCodeBlockProcessor';
import { AudioEngine } from '@neurovim/core';
import { AmbientLayer } from '@neurovim/core';
import { SoundCues } from '@neurovim/core';
import { VimModeWatcher } from './audio/VimModeWatcher';
import { CommandListener } from '@neurovim/core';

// State effect for highlighting divergent line
const highlightEffect = StateEffect.define<number | null>();

const highlightField = StateField.define<DecorationSet>({
  create() { return Decoration.none; },
  update(deco, tr) {
    for (const e of tr.effects) {
      if (e.is(highlightEffect)) {
        if (e.value === null) return Decoration.none;
        const lineNum = e.value + 1;
        if (lineNum < 1 || lineNum > tr.state.doc.lines) return Decoration.none;
        const line = tr.state.doc.line(lineNum);
        const builder = new RangeSetBuilder<Decoration>();
        builder.add(line.from, line.to, Decoration.mark({ class: 'nv-diff-line' }));
        return builder.finish();
      }
    }
    return deco.map(tr.changes);
  },
  provide: f => EditorView.decorations.from(f),
});

export default class NeuroVimPlugin extends Plugin {
  data: PluginData = { ...DEFAULT_PLUGIN_DATA };
  missionState: MissionState = { ...DEFAULT_MISSION_STATE };
  metrics = new MetricsTracker();
  private hudEl: HTMLElement | null = null;
  private hudRoot: Root | null = null;
  private tickInterval: number | null = null;
  sandboxState: SandboxState = { ...DEFAULT_SANDBOX_STATE };
  private sandboxGlitchPositions: Map<number, AppliedGlitch> = new Map();
  private sandboxOriginalText = '';
  private sandboxInjecting = false;
  audioEngine!: AudioEngine;
  ambientLayer!: AmbientLayer;
  vimModeWatcher!: VimModeWatcher;
  commandListener!: CommandListener;

  async onload() {
    await this.loadData_();

    // Register sidebar view
    this.registerView(VIEW_TYPE_NEUROVIM, (leaf) => new NeuroVimSidebarView(leaf));

    // Register ascii code-block processors (ascii, ascii-glitch, ascii-scanlines, ...)
    registerAsciiCodeBlockProcessors(this);

    // Register CM6 keystroke + diff-highlight extensions
    this.registerEditorExtension([highlightField]);

    // Cursor-based sandbox glitch hint
    const sandboxCursorListener = EditorView.updateListener.of((update: ViewUpdate) => {
      if (!update.selectionSet) return;
      if (this.sandboxState.status !== 'active') return;
      const lineNum = update.state.doc.lineAt(update.state.selection.main.head).number;
      const applied = this.sandboxGlitchPositions.get(lineNum);
      const hint = applied ? applied.definition.hint : null;
      if (hint !== this.sandboxState.cursor_hint) {
        this.sandboxState = { ...this.sandboxState, cursor_hint: hint };
        this.updateHUD(this.metrics.getElapsedMs());
      }
    });
    this.registerEditorExtension([sandboxCursorListener]);

    // Keystroke counting via keydown on document
    this.registerDomEvent(document, 'keydown' as keyof DocumentEventMap, (e: KeyboardEvent) => {
      if (this.missionState.status !== 'active') return;
      if (['Control', 'Alt', 'Meta', 'Shift', 'CapsLock'].includes(e.key)) return;
      this.metrics.addKeystroke();
    });

    // File-open event
    this.registerEvent(
      this.app.workspace.on('file-open', (file) => this.onFileOpen(file))
    );

    // Layout-change: sync HUD + restore orphaned frontmatters + enforce briefing read-only
    this.registerEvent(
      this.app.workspace.on('layout-change', () => {
        this.syncHudVisibility();
        this.restoreOrphanedFrontmatters();
        this.enforceReadMode();
      })
    );

    // Ribbon icon
    this.addRibbonIcon('terminal', 'NeuroVim', () => this.activateSidebar());

    // Commands
    this.addCommand({
      id: 'submit-mission',
      name: 'Submit Mission',
      callback: () => this.handleSubmit(),
    });

    this.addCommand({
      id: 'reset-mission',
      name: 'Reset Mission',
      callback: () => this.handleReset(),
    });

    this.addCommand({
      id: 'open-sidebar',
      name: 'Open Sidebar',
      callback: () => this.activateSidebar(),
    });

    this.addCommand({
      id: 'toggle-drill',
      name: 'Toggle Drill Mode',
      callback: () => this.toggleDrill(),
    });

    // Autostart sidebar + HUD once layout is ready
    this.app.workspace.onLayoutReady(() => {
      this.activateSidebar();
      this.syncHudVisibility();
    });

    // 500ms tick for timer
    this.tickInterval = window.setInterval(() => this.tick(), 500);

    this.audioEngine = new AudioEngine();
    this.ambientLayer = new AmbientLayer(this.audioEngine);
    this.vimModeWatcher = new VimModeWatcher(this.audioEngine, this.app);
    this.commandListener = new CommandListener(this.audioEngine, this.vimModeWatcher);
    if (this.data.ambient_enabled) {
      this.audioEngine.init().then(() => this.ambientLayer.setEnabled(true));
    }
  }

  async onunload() {
    if (this.tickInterval !== null) window.clearInterval(this.tickInterval);
    this.destroyFloatHUD();
    await this.restoreAllFrontmatters();
    this.commandListener?.dispose();
    this.vimModeWatcher?.dispose();
    this.ambientLayer?.dispose();
    this.audioEngine?.dispose();
  }

  private async loadData_() {
    const saved = await this.loadData();
    const merged: PluginData = {
      ...DEFAULT_PLUGIN_DATA,
      ...saved,
      sidebar_module_state: {
        ...DEFAULT_PLUGIN_DATA.sidebar_module_state,
        ...(saved?.sidebar_module_state ?? {}),
      },
      sandbox_bests: {
        ...DEFAULT_PLUGIN_DATA.sandbox_bests,
        ...(saved?.sandbox_bests ?? {}),
      },
      healedFrontmatters: { ...(saved?.healedFrontmatters ?? {}) },
    };
    // Ensure default unlocks are always present (forward-migration for new content)
    for (const id of DEFAULT_PLUGIN_DATA.unlocked) {
      if (!merged.unlocked.includes(id)) merged.unlocked.push(id);
    }
    // Backfill level-based unlocks — ensures new content added to UNLOCK_MAP
    // reaches existing players without requiring another level-up event
    const currentLevel = ProgressionEngine.getLevelForXp(merged.total_xp);
    for (let lvl = 2; lvl <= currentLevel; lvl++) {
      const unlocks = UNLOCK_MAP[lvl] ?? { missions: [], loot: [] };
      for (const id of [...unlocks.missions, ...unlocks.loot]) {
        if (!merged.unlocked.includes(id)) merged.unlocked.push(id);
      }
    }
    this.data = merged;
  }

  private async saveData_() {
    await this.saveData(this.data);
  }

  private tick() {
    const elapsed = this.metrics.getElapsedMs();
    this.updateSidebar(elapsed);
    const needsTick = this.missionState.status === 'active' || this.sandboxState.status === 'active';
    if (needsTick) this.updateHUD(elapsed);
  }

  private updateHUD(elapsed: number) {
    if (!this.hudRoot) return;

    if (this.sandboxState.difficulty !== null) {
      this.hudRoot.render(
        React.createElement(SandboxHUD, {
          sandboxState: this.sandboxState,
          elapsedMs: elapsed,
          sandboxBests: this.data.sandbox_bests,
          onSelectDifficulty: (d: SandboxDifficulty) => this.handleSandboxDifficultySelect(d),
          onSubmit: () => this.handleSandboxSubmit(),
          onAgain: () => this.handleSandboxAgain(),
          onHarder: () => this.handleSandboxHarder(),
        })
      );
      return;
    }

    const mode: HudMode = this.missionState.status === 'active'
      ? 'mission'
      : this.data.onboarded
        ? 'guide-idle'
        : 'guide-onboard';

    this.hudRoot.render(
      React.createElement(FloatHUD, {
        mode,
        missionState: this.missionState,
        elapsedMs: elapsed,
        hintCategory: this.missionState.category,
        onSubmit: () => this.handleSubmit(),
        onReset: () => this.handleReset(),
        onAbandon: () => this.handleAbandon(),
        onOpenSidebar: () => this.activateSidebar(),
      })
    );
  }

  private updateSidebar(elapsed: number) {
    this.app.workspace.getLeavesOfType(VIEW_TYPE_NEUROVIM).forEach(leaf => {
      if (leaf.view instanceof NeuroVimSidebarView) {
        const record = this.missionState.mission_id
          ? this.data.missions[this.missionState.mission_id] ?? null
          : null;
        leaf.view.update({
          missionState: this.missionState,
          elapsedMs: elapsed,
          pluginData: this.data,
          record,
          collapsedSections: this.data.sidebar_module_state,
          onSubmit: () => this.handleSubmit(),
          onReset: () => this.handleReset(),
          onAbandon: () => this.handleAbandon(),
          onToggleSection: (id) => this.toggleSidebarSection(id),
          onOpenFile: (path) => this.openFile(path),
          onToggleAmbient: async () => {
            if (!this.audioEngine.isReady) await this.audioEngine.init();
            const next = !this.data.ambient_enabled;
            this.data = { ...this.data, ambient_enabled: next };
            await this.saveData_();
            this.ambientLayer.setEnabled(next);
            this.updateSidebar(this.metrics.getElapsedMs());
          },
        });
      }
    });
  }

  private async onFileOpen(file: TFile | null) {
    if (!file) {
      if (this.sandboxState.difficulty !== null) this.goSandboxIdle();
      if (this.missionState.status === 'active') this.goIdle();
      return;
    }

    // Sandbox: still frontmatter-based (difficulty stored there)
    const cache = this.app.metadataCache.getFileCache(file);
    const fm = cache?.frontmatter;
    if (fm?.['mission_type'] === 'sandbox') {
      if (this.missionState.status === 'active') this.goIdle();
      const lastDifficulty = (fm['sandbox_difficulty'] as SandboxDifficulty) ?? 'normal';
      this.sandboxState = { ...DEFAULT_SANDBOX_STATE, status: null, difficulty: lastDifficulty };
      this.syncHudVisibility();
      this.updateSidebar(0);
      return;
    }
    if (this.sandboxState.difficulty !== null) this.goSandboxIdle();

    // Briefing: force reading mode, go idle
    if (isBriefingPath(file.path)) {
      if (this.missionState.status === 'active') this.goIdle();
      this.forceViewMode('preview');
      return;
    }

    // TRANSMISSION: path-based detection
    const missionDef = getMissionByPath(file.path);
    if (!missionDef) {
      if (this.missionState.status === 'active') this.goIdle();
      return;
    }

    if (!this.data.unlocked.includes(missionDef.id)) {
      this.ensureAudio();
      SoundCues.lockMessage(this.audioEngine);
      new Notice(`>_ ${missionDef.id} is locked.`);
      return;
    }

    // Heal frontmatter: read, extract, store, remove from file
    const raw = await this.app.vault.read(file);
    const fmMatch = raw.match(/^---\n[\s\S]*?\n---\n*/);
    if (fmMatch && !this.data.healedFrontmatters[file.path]) {
      this.data.healedFrontmatters[file.path] = fmMatch[0];
      await this.app.vault.modify(file, raw.slice(fmMatch[0].length));
      await this.saveData_();
    }

    // Extract category + xp from stored frontmatter (or fallback to missionDef)
    const storedFm = this.data.healedFrontmatters[file.path] ?? fmMatch?.[0] ?? '';
    const categoryMatch = storedFm.match(/^category:\s*(.+)$/m);
    const xpMatch = storedFm.match(/^xp_reward:\s*(\d+)$/m);
    const category = categoryMatch ? categoryMatch[1].trim() : (missionDef as { category?: string }).category ?? null;
    const xp_reward = xpMatch ? parseInt(xpMatch[1]) : (missionDef as { xp_reward: number }).xp_reward;

    this.missionState = {
      status: 'active',
      mission_id: missionDef.id,
      file_path: file.path,
      solution_path: missionDef.solution_path,
      corrupted_path: missionDef.corrupted_path,
      category,
      xp_reward,
      drill_mode: false,
      drill_count: 0,
    };
    const ambCtx = missionDef.id.startsWith('R-') ? 'arc2' : 'arc1';
    this.ambientLayer.setContext(ambCtx);
    const attachListener = () => {
      const view = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (view) {
        const editorEl = (view.editor as any)?.cm?.dom ?? view.contentEl;
        this.commandListener.attach(editorEl);
      }
    };
    attachListener();
    // Fallback: defer one tick in case workspace hasn't promoted the leaf yet
    if (!this.commandListener.isAttached) {
      setTimeout(attachListener, 0);
    }
    this.metrics.reset();
    this.metrics.start();
    this.forceViewMode('source');
    this.syncHudVisibility();
    this.updateSidebar(0);
  }

  private ensureAudio(): void {
    if (!this.audioEngine.isReady) {
      this.audioEngine.init().catch(() => { /* user gesture required, silent fail */ });
    }
  }

  private goIdle() {
    const path = this.missionState.file_path;
    this.ambientLayer.setContext('idle');
    this.commandListener.detach();
    this.missionState = { ...DEFAULT_MISSION_STATE };
    this.metrics.reset();
    this.syncHudVisibility();
    this.updateSidebar(0);
    if (path) this.restoreFrontmatter(path);
  }

  async handleSubmit() {
    if (this.missionState.status !== 'active') return;
    const { mission_id, file_path, category, xp_reward, drill_mode } = this.missionState;
    if (!mission_id || !file_path) return;

    const file = this.app.vault.getAbstractFileByPath(file_path);
    if (!(file instanceof TFile)) return;

    // Capture time before async I/O to avoid inflating the record
    const elapsed_ms = this.metrics.getElapsedMs();

    const [rawContent, solutionContent] = await Promise.all([
      this.app.vault.read(file),
      this.loadSolution(),
    ]);

    const currentContent = rawContent.replace(/^---\n[\s\S]*?\n---\n*/, '');
    const diff = MissionEngine.verify(currentContent, solutionContent);

    if (!diff.matches) {
      this.highlightDivergentLine(diff.first_divergent_line);
      this.ensureAudio();
      SoundCues.wrongAttempt(this.audioEngine);
      new Notice(`>_ ${diff.lines_off} line${diff.lines_off !== 1 ? 's' : ''} differ — keep going`);
      return;
    }

    this.clearHighlight();
    const metricsResult = this.metrics.getResult(elapsed_ms);
    const oldRecord = this.data.missions[mission_id];

    // is_new_best_* / delta_* describe THIS run vs the previous record (consumed by
    // the ResultModal). The stored record itself comes from the shared core function
    // so Obsidian and web persist identical bests — notably best_ks_per_min is the
    // max throughput ever, not the value tied to the fastest time (the old divergence).
    const is_new_best_time = !oldRecord || elapsed_ms < oldRecord.best_time_ms;
    const is_new_best_ks = !oldRecord || metricsResult.keystrokes < oldRecord.best_keystrokes;

    const runResult: RunResult = {
      mission_id,
      elapsed_ms,
      keystrokes: metricsResult.keystrokes,
      ks_per_min: metricsResult.ks_per_min,
      xp_earned: xp_reward,
      is_new_best_time,
      is_new_best_ks,
      delta_time_ms: oldRecord ? elapsed_ms - oldRecord.best_time_ms : 0,
      delta_keystrokes: oldRecord ? metricsResult.keystrokes - oldRecord.best_keystrokes : 0,
      delta_ks_per_min: oldRecord ? metricsResult.ks_per_min - oldRecord.best_ks_per_min : 0,
    };

    const newRecord: MissionRecord = ProgressionEngine.recordMissionRun(oldRecord, metricsResult);

    this.data = {
      ...this.data,
      missions: { ...this.data.missions, [mission_id]: newRecord },
    };

    const { new_data, level_up } = ProgressionEngine.addXp(this.data, xp_reward);
    if (!drill_mode) { this.ensureAudio(); SoundCues.xpGain(this.audioEngine); }
    this.data = ProgressionEngine.recordCompletion(new_data);

    if (!this.data.completed_missions.includes(mission_id)) {
      this.data = {
        ...this.data,
        completed_missions: [...this.data.completed_missions, mission_id],
      };
    }

    if (level_up) await this.unlockFiles(level_up);

    await this.saveData_();

    this.missionState = { ...this.missionState, status: 'result' };
    this.destroyFloatHUD();

    const savedMissionState = { ...this.missionState };

    const resultModal = new ResultModal(
      this.app,
      runResult,
      savedMissionState,
      () => this.startDrill(),
      () => this.backToNexus(),
      level_up && !drill_mode
        ? () => { SoundCues.levelUp(this.audioEngine); new LevelUpModal(this.app, level_up!, () => this.goIdle()).open(); }
        : () => { if (!drill_mode) this.goIdle(); },
    );
    this.ensureAudio();
    SoundCues.missionComplete(this.audioEngine);
    resultModal.open();
  }

  private async loadSolution(): Promise<string> {
    const path = this.missionState.solution_path;
    if (!path) throw new Error(`No solution path for mission ${this.missionState.mission_id}`);
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof TFile)) throw new Error(`Solution not found: ${path}`);
    return this.app.vault.read(file);
  }

  private async loadCorrupted(): Promise<string> {
    const path = this.missionState.corrupted_path;
    if (!path) throw new Error(`No corrupted path for mission ${this.missionState.mission_id}`);
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof TFile)) throw new Error(`Corrupted source not found: ${path}`);
    return this.app.vault.read(file);
  }

  async handleReset() {
    if (this.missionState.status !== 'active') return;
    const { mission_id, file_path } = this.missionState;
    if (!mission_id || !file_path) return;
    const file = this.app.vault.getAbstractFileByPath(file_path);
    if (!(file instanceof TFile)) return;
    try {
      const corrupted = await this.loadCorrupted();
      const current = await this.app.vault.read(file);
      const fmMatch = current.match(/^---\n[\s\S]*?\n---\n*/);
      const frontmatter = fmMatch ? fmMatch[0] : '';
      await this.app.vault.modify(file, frontmatter + corrupted);
    } catch (e) {
      new Notice(`>_ Reset failed: ${(e as Error).message}`);
      return;
    }
    this.clearHighlight();
    this.metrics.reset();
    this.metrics.start();
    this.ensureAudio();
    SoundCues.missionReset(this.audioEngine);
    new Notice('>_ File reset. Timer restarted.');
  }

  async handleAbandon() {
    if (this.missionState.status !== 'active') return;
    const { mission_id } = this.missionState;
    this.clearHighlight();
    this.goIdle();
    if (mission_id) {
      const def = getMissionById(mission_id);
      const briefingPath = def && 'briefing_path' in def ? def.briefing_path : null;
      if (briefingPath) {
        const briefing = this.app.vault.getAbstractFileByPath(briefingPath);
        if (briefing instanceof TFile) {
          await this.app.workspace.getLeaf().openFile(briefing);
        }
      }
    }
    new Notice('>_ Mission aborted.');
  }

  private async startDrill() {
    this.missionState = {
      ...this.missionState,
      status: 'active',
      drill_mode: true,
      drill_count: this.missionState.drill_count + 1,
    };
    await this.handleReset();
    this.syncHudVisibility();
  }

  private toggleDrill() {
    this.ensureAudio();
    SoundCues.drillToggle(this.audioEngine);
    if (this.missionState.drill_mode) {
      this.missionState = { ...this.missionState, drill_mode: false };
      new Notice('>_ Drill mode off.');
    } else {
      this.startDrill();
      new Notice('>_ Drill mode on.');
    }
  }

  private async backToNexus() {
    this.goIdle();
    const nexus = this.app.vault.getAbstractFileByPath('00-NEXUS.md');
    if (nexus instanceof TFile) {
      await this.app.workspace.getLeaf().openFile(nexus);
    }
  }

  private async unlockFiles(levelUp: LevelUpResult) {
    const ids = [...levelUp.unlocked_missions, ...levelUp.unlocked_loot];
    for (const id of ids) {
      const files = this.app.vault.getMarkdownFiles().filter(f => {
        const fm = this.app.metadataCache.getFileCache(f)?.frontmatter;
        return fm?.['mission_id'] === id || fm?.['loot_id'] === id;
      });
      for (const file of files) {
        await this.app.fileManager.processFrontMatter(file, fm => {
          fm['locked'] = false;
        });
      }
    }
  }

  private enforceReadMode() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view?.file) return;
    const path = view.file.path;
    const isEditable = getMissionByPath(path) !== undefined || path === RAVEN_PATH;
    if (isEditable) return;
    if (view.getState().mode !== 'preview') {
      view.setState({ mode: 'preview' }, { history: false });
    }
  }

  private forceViewMode(mode: 'source' | 'preview') {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (view) view.setState({ mode }, { history: false });
  }

  private async restoreFrontmatter(path: string) {
    const stored = this.data.healedFrontmatters[path];
    if (!stored) return;
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof TFile)) {
      delete this.data.healedFrontmatters[path];
      await this.saveData_();
      return;
    }
    const content = await this.app.vault.read(file);
    if (!content.startsWith('---\n')) {
      await this.app.vault.modify(file, stored + content);
    }
    delete this.data.healedFrontmatters[path];
    await this.saveData_();
  }

  private restoreOrphanedFrontmatters() {
    const openPaths = new Set(
      this.app.workspace.getLeavesOfType('markdown')
        .map(l => (l.view as MarkdownView).file?.path)
        .filter(Boolean)
    );
    for (const path of Object.keys(this.data.healedFrontmatters)) {
      if (!openPaths.has(path) && path !== this.missionState.file_path) {
        this.restoreFrontmatter(path);
      }
    }
  }

  private async restoreAllFrontmatters() {
    for (const path of Object.keys(this.data.healedFrontmatters)) {
      await this.restoreFrontmatter(path);
    }
  }

  private highlightDivergentLine(lineIndex: number) {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) return;
    // @ts-expect-error not typed
    const editorView = view.editor.cm as EditorView;
    editorView.dispatch({ effects: [highlightEffect.of(lineIndex)] });
  }

  private clearHighlight() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) return;
    // @ts-expect-error not typed
    const editorView = view.editor.cm as EditorView;
    editorView.dispatch({ effects: [highlightEffect.of(null)] });
  }

  private syncHudVisibility() {
    this.createFloatHUD();
    this.updateHUD(this.metrics.getElapsedMs());
  }

  private createFloatHUD() {
    if (this.hudEl) return;
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView)
      ?? (this.app.workspace.getLeavesOfType('markdown')[0]?.view as MarkdownView | undefined);
    const editorEl = activeView?.contentEl.querySelector('.cm-editor');
    if (!editorEl) return;
    this.hudEl = document.createElement('div');
    this.hudEl.addClass('nv-float-hud-container');
    editorEl.appendChild(this.hudEl);
    this.hudRoot = createRoot(this.hudEl);
  }

  private destroyFloatHUD() {
    this.hudRoot?.unmount();
    this.hudRoot = null;
    this.hudEl?.remove();
    this.hudEl = null;
  }

  async activateSidebar() {
    const { workspace } = this.app;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_NEUROVIM);
    if (leaves.length > 0) {
      workspace.revealLeaf(leaves[0]);
      this.markOnboarded();
      this.syncHudVisibility();
      return;
    }
    const leaf = workspace.getRightLeaf(false);
    if (!leaf) return;
    await leaf.setViewState({ type: VIEW_TYPE_NEUROVIM, active: true });
    workspace.revealLeaf(leaf);
    this.markOnboarded();
    this.syncHudVisibility();
    this.updateSidebar(this.metrics.getElapsedMs());
  }

  private async markOnboarded() {
    if (this.data.onboarded) return;
    this.data = { ...this.data, onboarded: true };
    await this.saveData_();
  }

  private toggleSidebarSection(id: string) {
    const current = this.data.sidebar_module_state[id] ?? true;
    this.data = {
      ...this.data,
      sidebar_module_state: { ...this.data.sidebar_module_state, [id]: !current },
    };
    this.saveData_();
    this.updateSidebar(this.metrics.getElapsedMs());
  }

  private async openFile(path: string) {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (file instanceof TFile) {
      await this.app.workspace.getLeaf().openFile(file);
    }
  }

  private goSandboxIdle() {
    this.sandboxState = { ...DEFAULT_SANDBOX_STATE };
    this.sandboxGlitchPositions.clear();
    this.sandboxOriginalText = '';
    this.metrics.reset();
    this.syncHudVisibility();
    this.updateSidebar(0);
  }

  private async handleSandboxDifficultySelect(difficulty: SandboxDifficulty) {
    if (this.sandboxInjecting) return;
    this.sandboxInjecting = true;
    try {
      const originalFile = this.app.vault.getAbstractFileByPath('_dev/SOLUTIONS/99-THE_RAVEN-ORIGINAL.md');
      const glitchFile = this.app.vault.getAbstractFileByPath('_dev/SOLUTIONS/99-THE_RAVEN-GLITCHES.json');
      const sandboxFile = this.app.vault.getMarkdownFiles().find(f =>
        this.app.metadataCache.getFileCache(f)?.frontmatter?.['mission_type'] === 'sandbox'
      );

      if (!(originalFile instanceof TFile) || !(glitchFile instanceof TFile) || !sandboxFile) {
        new Notice('>_ RAVEN: missing source files');
        return;
      }

      const [originalText, glitchJson] = await Promise.all([
        this.app.vault.read(originalFile),
        this.app.vault.read(glitchFile),
      ]);

      const pool: GlitchDefinition[] = JSON.parse(glitchJson);
      const count = GlitchEngine.countForDifficulty(difficulty);
      const selected = GlitchEngine.selectGlitches(pool, count);
      const { text, glitches } = GlitchEngine.applyGlitches(originalText, selected);

      const currentContent = await this.app.vault.read(sandboxFile);
      const fmEnd = currentContent.indexOf('\n---\n', 3);
      const frontmatter = fmEnd >= 0 ? currentContent.slice(0, fmEnd + 5) : '';
      await this.app.vault.modify(sandboxFile, frontmatter + text);

      await this.app.fileManager.processFrontMatter(sandboxFile, fm => {
        fm['sandbox_difficulty'] = difficulty;
      });

      this.sandboxGlitchPositions.clear();
      for (const g of glitches) {
        this.sandboxGlitchPositions.set(g.line_number, g);
      }
      this.sandboxOriginalText = originalText;

      this.sandboxState = {
        status: 'active',
        difficulty,
        remaining_glitches: count,
        cursor_hint: null,
      };
      this.metrics.reset();
      this.metrics.start();
      this.syncHudVisibility();
    } finally {
      this.sandboxInjecting = false;
    }
  }

  private async handleSandboxSubmit() {
    if (this.sandboxState.status !== 'active') return;

    const sandboxFile = this.app.vault.getMarkdownFiles().find(f =>
      this.app.metadataCache.getFileCache(f)?.frontmatter?.['mission_type'] === 'sandbox'
    );
    if (!sandboxFile) return;

    const elapsed_ms = this.metrics.getElapsedMs();
    const currentContent = await this.app.vault.read(sandboxFile);
    const fmEnd = currentContent.indexOf('\n---\n', 3);
    const body = fmEnd >= 0 ? currentContent.slice(fmEnd + 5) : currentContent;

    const remaining = GlitchEngine.diffCount(body, this.sandboxOriginalText);

    if (remaining > 0) {
      this.ensureAudio();
      SoundCues.glitchFeedback(this.audioEngine);
      this.sandboxState = { ...this.sandboxState, remaining_glitches: remaining };
      new Notice(`>_ ${remaining} glitch${remaining !== 1 ? 'es' : ''} remaining`);
      this.updateHUD(elapsed_ms);
      return;
    }

    this.ensureAudio();
    SoundCues.transmissionRestored(this.audioEngine);
    this.metrics.reset();
    const difficulty = this.sandboxState.difficulty!;
    const prev = this.data.sandbox_bests[difficulty];
    const isNewBest = prev === null || elapsed_ms < prev;
    if (isNewBest) {
      this.data = {
        ...this.data,
        sandbox_bests: { ...this.data.sandbox_bests, [difficulty]: elapsed_ms },
      };
      await this.saveData_();
    }

    const resultMsg = isNewBest
      ? `${formatTime(elapsed_ms)} — NEW BEST`
      : `${formatTime(elapsed_ms)}  PB ${formatTime(prev!)}`;

    this.sandboxState = {
      status: 'result',
      difficulty,
      remaining_glitches: 0,
      cursor_hint: resultMsg,
    };
    this.updateHUD(0);
  }

  private handleSandboxAgain() {
    const d = this.sandboxState.difficulty ?? 'normal';
    this.sandboxState = { ...DEFAULT_SANDBOX_STATE, status: null, difficulty: d };
    this.sandboxGlitchPositions.clear();
    this.handleSandboxDifficultySelect(d);
  }

  private handleSandboxHarder() {
    const order: SandboxDifficulty[] = ['easy', 'normal', 'hard'];
    const current = this.sandboxState.difficulty ?? 'easy';
    const nextIdx = Math.min(order.indexOf(current) + 1, order.length - 1);
    const next = order[nextIdx];
    this.sandboxState = { ...DEFAULT_SANDBOX_STATE, status: null, difficulty: next };
    this.sandboxGlitchPositions.clear();
    this.handleSandboxDifficultySelect(next);
  }
}
