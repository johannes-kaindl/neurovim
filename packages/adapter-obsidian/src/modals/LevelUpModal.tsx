import React from 'react';
import { createRoot } from 'react-dom/client';
type Root = ReturnType<typeof createRoot>;
import { App, Modal } from 'obsidian';
import { LevelUpResult } from '@neurovim/core';
import { ProgressionEngine } from '@neurovim/core';

interface LevelUpModalProps {
  levelUp: LevelUpResult;
  onContinue: () => void;
}

function LevelUpApp({ levelUp, onContinue }: LevelUpModalProps) {
  const levelData = ProgressionEngine.getLevelData(levelUp.new_level);

  return (
    <div className="nv-levelup">
      <div className="nv-levelup-header">
        &gt;_ LEVEL UP
      </div>
      <div className="nv-levelup-title" style={{ color: levelData.color }}>
        {levelData.title} ACHIEVED
      </div>

      {levelUp.unlocked_loot.length > 0 && (
        <div className="nv-levelup-loot">
          <div className="nv-levelup-section-label">LOOT SIGNAL RECEIVED</div>
          {levelUp.unlocked_loot.map(id => (
            <div key={id} className="nv-levelup-item nv-levelup-loot-item">
              ► {id}
            </div>
          ))}
        </div>
      )}

      {levelUp.unlocked_missions.length > 0 && (
        <div className="nv-levelup-missions">
          <div className="nv-levelup-section-label">NEW MISSIONS UNLOCKED</div>
          {levelUp.unlocked_missions.map(id => (
            <div key={id} className="nv-levelup-item">
              ► {id}
            </div>
          ))}
        </div>
      )}

      <button className="nv-btn nv-btn-continue" onClick={onContinue}>
        CONTINUE
      </button>
    </div>
  );
}

export class LevelUpModal extends Modal {
  private root: Root | null = null;

  constructor(
    app: App,
    private levelUp: LevelUpResult,
    private onContinue: () => void,
  ) {
    super(app);
  }

  onOpen() {
    this.contentEl.addClass('nv-modal-content');
    this.root = createRoot(this.contentEl);
    this.root.render(
      <LevelUpApp
        levelUp={this.levelUp}
        onContinue={() => { this.close(); this.onContinue(); }}
      />
    );
  }

  onClose() {
    this.root?.unmount();
    this.root = null;
  }
}
