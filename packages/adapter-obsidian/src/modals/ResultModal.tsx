import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { App, Modal } from 'obsidian';
import { RunResult, MissionState } from '@neurovim/core';
import { getCipherQuote } from '@neurovim/core';
import { formatTime } from '@neurovim/core';

interface ResultModalProps {
  result: RunResult;
  missionState: MissionState;
  onDrillAgain: () => void;
  onBackToNexus: () => void;
}

function Delta({ value, unit, better }: { value: number; unit: string; better: boolean }) {
  if (value === 0) return <span className="nv-delta-neutral">—</span>;
  const sign = value > 0 ? '▲' : '▼';
  const cls = better ? 'nv-delta-good' : 'nv-delta-bad';
  return (
    <span className={cls}>
      {sign} {Math.abs(value)}{unit}
    </span>
  );
}

function ResultApp({ result, missionState, onDrillAgain, onBackToNexus }: ResultModalProps) {
  const quoteEvent = result.is_new_best_ks && result.is_new_best_time
    ? 'fast'
    : result.is_new_best_ks
      ? 'perfect_ks'
      : result.is_new_best_time
        ? 'fast'
        : 'success';
  const quote = getCipherQuote(
    missionState.category ?? 'universal',
    quoteEvent,
    missionState.drill_mode
  );

  return (
    <div className="nv-result">
      <div className="nv-result-header">
        &gt;_ {result.mission_id.startsWith('KATA-') ? 'KATA COMPLETE' : 'MISSION COMPLETE'} — {result.mission_id}
      </div>

      <div className="nv-result-metrics">
        <div className="nv-metric-row">
          <span className="nv-metric-label">TIME</span>
          <span className="nv-metric-value">{formatTime(result.elapsed_ms)}</span>
          <Delta
            value={Math.round(-result.delta_time_ms / 1000)}
            unit="s"
            better={result.delta_time_ms < 0}
          />
          {result.is_new_best_time && <span className="nv-new-best">NEW BEST</span>}
        </div>
        <div className="nv-metric-row">
          <span className="nv-metric-label">KEYSTROKES</span>
          <span className="nv-metric-value">{result.keystrokes}</span>
          <Delta
            value={-result.delta_keystrokes}
            unit=""
            better={result.delta_keystrokes > 0}
          />
          {result.is_new_best_ks && <span className="nv-new-best">NEW BEST</span>}
        </div>
        <div className="nv-metric-row">
          <span className="nv-metric-label">KS/MIN</span>
          <span className="nv-metric-value">{result.ks_per_min}</span>
          <Delta
            value={Math.round(result.delta_ks_per_min * 10) / 10}
            unit=""
            better={result.delta_ks_per_min > 0}
          />
        </div>
        <div className="nv-metric-row">
          <span className="nv-metric-label">XP EARNED</span>
          <span className="nv-metric-value nv-metric-xp">+{result.xp_earned}</span>
        </div>
      </div>

      <div className="nv-result-quote">&gt;_ CIPHER: "{quote}"</div>

      <div className="nv-result-actions">
        <button className="nv-btn nv-btn-drill" onClick={onDrillAgain}>
          DRILL AGAIN
        </button>
        <button className="nv-btn nv-btn-nexus" onClick={onBackToNexus}>
          BACK TO NEXUS
        </button>
      </div>
    </div>
  );
}

export class ResultModal extends Modal {
  private root: Root | null = null;

  constructor(
    app: App,
    private result: RunResult,
    private missionState: MissionState,
    private onDrillAgain: () => void,
    private onBackToNexus: () => void,
    private afterClose?: () => void,
  ) {
    super(app);
  }

  onOpen() {
    this.contentEl.addClass('nv-modal-content');
    this.root = createRoot(this.contentEl);
    this.root.render(
      <ResultApp
        result={this.result}
        missionState={this.missionState}
        onDrillAgain={() => { this.close(); this.onDrillAgain(); }}
        onBackToNexus={() => { this.close(); this.onBackToNexus(); }}
      />
    );
  }

  onClose() {
    this.root?.unmount();
    this.root = null;
    this.afterClose?.();
  }
}
