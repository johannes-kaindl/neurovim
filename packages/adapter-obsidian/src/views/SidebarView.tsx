import React from 'react';
import { createRoot } from 'react-dom/client';
type Root = ReturnType<typeof createRoot>;
import { ItemView, WorkspaceLeaf } from 'obsidian';
import { MissionHudModule } from '@neurovim/core';
import { CheatSheetModule } from '@neurovim/core';
import { ProgressModule } from '@neurovim/core';
import { NavHubModule } from '@neurovim/core';
import { MissionState, PluginData, MissionRecord, DEFAULT_PLUGIN_DATA, DEFAULT_MISSION_STATE } from '@neurovim/core';
import { CHEATSHEET } from '@neurovim/core';

export const VIEW_TYPE_NEUROVIM = 'neurovim-sidebar';

interface SidebarProps {
  missionState: MissionState;
  elapsedMs: number;
  pluginData: PluginData;
  record: MissionRecord | null;
  collapsedSections: Record<string, boolean>;
  onSubmit: () => void;
  onReset: () => void;
  onAbandon: () => void;
  onToggleSection: (id: string) => void;
  onOpenFile: (path: string) => void;
  onToggleAmbient?: () => void;
}

function SidebarSection({
  id,
  label,
  collapsed,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="nv-sidebar-section">
      <button className="nv-sidebar-section-header" onClick={onToggle}>
        {collapsed ? '▸' : '▾'} {label}
      </button>
      {!collapsed && <div className="nv-sidebar-section-body">{children}</div>}
    </div>
  );
}

const CAT_MAP: Record<string, string[]> = {
  fundamentals:    ['M-01', 'M-02'],
  navigation:      ['M-02', 'M-04'],
  'word-movement': ['M-03'],
  operators:       ['M-05'],
  'text-objects':  ['M-06'],
  'search-replace':['M-07'],
  'marks-macros':  ['M-09'],
  registers:       ['M-10'],
  'pane-nav':      ['M-11'],
  'ex-commands':   ['M-12'],
  case:            ['M-13'],
  'visual-block':  ['M-14'],
  regex:           ['M-15', 'R-01', 'R-02', 'R-03', 'R-04', 'R-05', 'R-06', 'R-07', 'R-08',
                   'R-09', 'R-10', 'R-11', 'R-12', 'R-13', 'R-14', 'R-15', 'R-16',
                   'R-17', 'R-18', 'R-19', 'R-20', 'R-21', 'R-22', 'R-23', 'R-24'],
};

function SidebarApp(props: SidebarProps) {
  const unlockedCats = CHEATSHEET
    .map(c => c.id)
    .filter(id => (CAT_MAP[id] ?? []).some(mId => props.pluginData.unlocked.includes(mId)));

  const missionOpen     = props.collapsedSections['mission']    !== false;
  const cheatsheetOpen  = props.collapsedSections['cheatsheet'] !== false;
  const progressOpen    = props.collapsedSections['progress']   === true;

  return (
    <div className="nv-sidebar">
      <div className="nv-sidebar-header">&gt;_ NEUROVIM</div>
      <NavHubModule
        unlocked={props.pluginData.unlocked}
        completedMissions={props.pluginData.completed_missions}
        onOpenFile={props.onOpenFile}
        ambientEnabled={props.pluginData.ambient_enabled}
        onToggleAmbient={props.onToggleAmbient}
      />
      <SidebarSection
        id="mission"
        label="MISSION HUD"
        collapsed={!missionOpen}
        onToggle={() => props.onToggleSection('mission')}
      >
        <MissionHudModule
          missionState={props.missionState}
          elapsedMs={props.elapsedMs}
          record={props.record}
          pluginData={props.pluginData}
          onSubmit={props.onSubmit}
          onReset={props.onReset}
          onAbandon={props.onAbandon}
        />
      </SidebarSection>
      <SidebarSection
        id="cheatsheet"
        label="CHEAT SHEET"
        collapsed={!cheatsheetOpen}
        onToggle={() => props.onToggleSection('cheatsheet')}
      >
        <CheatSheetModule
          unlockedCategories={unlockedCats}
          activeCategory={props.missionState.category}
          collapsedSections={props.collapsedSections}
          onToggleSection={props.onToggleSection}
        />
      </SidebarSection>
      <SidebarSection
        id="progress"
        label="PROGRESS"
        collapsed={!progressOpen}
        onToggle={() => props.onToggleSection('progress')}
      >
        <ProgressModule pluginData={props.pluginData} />
      </SidebarSection>
    </div>
  );
}

export class NeuroVimSidebarView extends ItemView {
  private root: Root | null = null;
  private props: SidebarProps = {
    missionState: { ...DEFAULT_MISSION_STATE },
    elapsedMs: 0,
    pluginData: { ...DEFAULT_PLUGIN_DATA },
    record: null,
    collapsedSections: { ...DEFAULT_PLUGIN_DATA.sidebar_module_state },
    onSubmit: () => {},
    onReset: () => {},
    onAbandon: () => {},
    onToggleSection: () => {},
    onOpenFile: () => {},
  };

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() { return VIEW_TYPE_NEUROVIM; }
  getDisplayText() { return 'NeuroVim'; }
  getIcon() { return 'terminal'; }

  async onOpen() {
    this.root = createRoot(this.contentEl);
    this.root.render(<SidebarApp {...this.props} />);
  }

  async onClose() {
    this.root?.unmount();
    this.root = null;
  }

  update(newProps: Partial<SidebarProps>) {
    this.props = { ...this.props, ...newProps };
    this.root?.render(<SidebarApp {...this.props} />);
  }
}
