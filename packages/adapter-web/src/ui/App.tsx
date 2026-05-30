/**
 * App — web orchestration (D17: its own picker-driven flow, NOT the
 * file-open-driven Obsidian main.ts). Consumes pure core engines +
 * web port impls. Game flow: pick → edit → submit→verify→XP→save.
 */
import { useEffect, useState } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';
import {
  MissionEngine, ProgressionEngine, AudioEngine, SoundCues,
  DEFAULT_PLUGIN_DATA, type PluginData, type MissionDoc, type MetricsResult,
  type SandboxDifficulty,
} from '@neurovim/core';
import { listMissions, getMission } from '@neurovim/content';
import { WebStorage } from '../ports/WebStorage';
import { MissionResult, type MissionResultData } from './MissionResult';
import { fmtTime } from './format';
import { loadSettings, saveSettings, applyEffects } from './settings';
import { ControlCluster } from './Chrome';

// CM6 + @replit/codemirror-vim are the heaviest dep bundle and only needed in
// the editor — load them lazily so the picker/NEXUS don't carry them in the initial bundle (code splitting).
const MissionEditor = lazy(() =>
  import('./MissionEditor').then((m) => ({ default: m.MissionEditor })),
);
const SandboxView = lazy(() =>
  import('./SandboxView').then((m) => ({ default: m.SandboxView })),
);
const WelcomeView = lazy(() =>
  import('./WelcomeView').then((m) => ({ default: m.WelcomeView })),
);
const BriefingView = lazy(() =>
  import('./BriefingView').then((m) => ({ default: m.BriefingView })),
);

/** Next playable mission in the same arc (for the "Next Mission" button). */
function nextMissionId(id: string): string | null {
  const list = listMissions('I');
  const i = list.findIndex((m) => m.mission_id === id);
  return i >= 0 && i < list.length - 1 ? list[i + 1].mission_id : null;
}

const storage = new WebStorage();
const audio = new AudioEngine();
let audioUnlocked = false;

export function App() {
  const [data, setData] = useState<PluginData>({ ...DEFAULT_PLUGIN_DATA });
  const [view, setView] = useState<'welcome' | 'nexus' | 'briefing' | 'mission' | 'sandbox'>('welcome');
  const [mission, setMission] = useState<MissionDoc | null>(null);
  const [result, setResult] = useState<MissionResultData | null>(null);
  // XP-gain flash: a brief flash of the XP bar when returning to NEXUS after a fresh clear.
  const [xpFlash, setXpFlash] = useState(false);
  const [ui, setUi] = useState(loadSettings());

  function flashXp() {
    setXpFlash(true);
    window.setTimeout(() => setXpFlash(false), 700);
  }

  useEffect(() => {
    storage.loadData<PluginData>().then((d) => { if (d) setData({ ...DEFAULT_PLUGIN_DATA, ...d }); });
  }, []);

  useEffect(() => { applyEffects(ui.reduceEffects); }, [ui.reduceEffects]);
  useEffect(() => { audio.setMuted(!ui.audioOn); }, [ui.audioOn]);

  // D4: initialize audio only after the first user gesture (non-intrusive, no auto-play).
  function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    audio.init().catch(() => { /* user-gesture race, silent */ });
  }

  function toggleAudio() {
    const next = { ...ui, audioOn: !ui.audioOn }; setUi(next); saveSettings(next);
    if (next.audioOn) { unlockAudio(); audio.setMuted(false); } else { audio.setMuted(true); }
  }
  function toggleEffects() { const next = { ...ui, reduceEffects: !ui.reduceEffects }; setUi(next); saveSettings(next); }

  function selectMission(id: string) {
    unlockAudio();
    setMission(getMission(id));
    setResult(null);
    setView('briefing');
  }

  async function submit(content: string, metrics: MetricsResult) {
    if (!mission) return;
    const diff = MissionEngine.verify(content, mission.solution ?? '');
    if (!diff.matches) {
      SoundCues.wrongAttempt(audio);
      setResult({ status: 'fail', linesOff: diff.lines_off });
      return;
    }
    SoundCues.missionComplete(audio);
    const { new_data, level_up } = ProgressionEngine.addXp(data, mission.xp_reward);
    let next = ProgressionEngine.recordCompletion(new_data);
    if (!next.completed_missions.includes(mission.mission_id)) {
      next = { ...next, completed_missions: [...next.completed_missions, mission.mission_id] };
    }
    const record = ProgressionEngine.recordMissionRun(next.missions[mission.mission_id], metrics);
    next = { ...next, missions: { ...next.missions, [mission.mission_id]: record } };
    setData(next);
    await storage.saveData(next);
    if (level_up) SoundCues.levelUp(audio);
    setResult({
      status: 'complete',
      xp: mission.xp_reward,
      levelUp: level_up ? level_up.new_level : null,
      timeMs: metrics.elapsed_ms,
      keystrokes: metrics.keystrokes,
      bestTimeMs: record.best_time_ms,
      bestKeystrokes: record.best_keystrokes,
    });
  }

  async function saveSandboxBest(difficulty: SandboxDifficulty, ms: number) {
    const next = { ...data, sandbox_bests: { ...data.sandbox_bests, [difficulty]: ms } };
    setData(next);
    SoundCues.transmissionRestored(audio);
    await storage.saveData(next);
  }

  if (view === 'welcome') {
    return (
      <Suspense fallback={<div class="nv-loading">loading…</div>}>
        <WelcomeView onEnter={() => { unlockAudio(); setView('nexus'); }} />
      </Suspense>
    );
  }

  if (view === 'briefing' && mission) {
    return (
      <Suspense fallback={<div class="nv-loading">loading briefing…</div>}>
        <BriefingView
          missionId={mission.mission_id}
          title={mission.title}
          briefingBody={mission.briefingBody}
          onBegin={() => setView('mission')}
          onBack={() => setView('nexus')}
        />
      </Suspense>
    );
  }

  if (view === 'mission' && mission) {
    return (
      <>
        <Suspense fallback={<div class="nv-loading">loading editor…</div>}>
          <MissionEditor mission={mission} onSubmit={submit} onBack={() => setView('nexus')} />
        </Suspense>
        {result && (
          <MissionResult
            result={result}
            missionTitle={mission.title}
            hasNext={result.status === 'complete' && nextMissionId(mission.mission_id) !== null}
            onRetry={() => setResult(null)}
            onNext={() => { const n = nextMissionId(mission.mission_id); if (n) selectMission(n); }}
            onNexus={() => { const gained = result.status === 'complete'; setResult(null); setView('nexus'); if (gained) flashXp(); }}
          />
        )}
      </>
    );
  }

  if (view === 'sandbox') {
    return (
      <Suspense fallback={<div class="nv-loading">loading sandbox…</div>}>
        <SandboxView bests={data.sandbox_bests} onNewBest={saveSandboxBest} onExit={() => setView('nexus')} />
      </Suspense>
    );
  }

  const progress = ProgressionEngine.getXpProgress(data.total_xp);
  const levelData = ProgressionEngine.getLevelData(progress.level);
  const arc1 = listMissions('I');
  const arc2 = listMissions('II');
  const cleared = arc1.filter((m) => data.completed_missions.includes(m.mission_id)).length;
  const times = arc1.map((m) => data.missions[m.mission_id]?.best_time_ms ?? 0).filter((t) => t > 0);
  const fastest = times.length ? Math.min(...times) : null;
  const activeId = arc1.find((m) => !data.completed_missions.includes(m.mission_id))?.mission_id ?? null;

  // Group ARC I by chapter (e.g. "01 - Indoctrination" -> "Indoctrination"), preserving order.
  const chapterName = (c: string) => c.replace(/^\d+\s*[-–]\s*/, '');
  const arc1Groups: { name: string; items: typeof arc1 }[] = [];
  for (const m of arc1) {
    const name = chapterName(m.chapter);
    let g = arc1Groups.find((x) => x.name === name);
    if (!g) { g = { name, items: [] }; arc1Groups.push(g); }
    g.items.push(m);
  }

  return (
    <div class="nv-app nv-nexus nv-crt nv-hud-frame" onPointerDown={unlockAudio}>
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />

      <div class="nv-statusstrip">
        <span class="nv-label">Kuro Signal Protocol // Guardian</span>
        <span class="nv-label nv-link">◢ Link Secure</span>
      </div>
      <ControlCluster audioOn={ui.audioOn} reduceEffects={ui.reduceEffects}
        onToggleAudio={toggleAudio} onToggleEffects={toggleEffects} />

      <h1 class="nv-wordmark nv-text-glow">&gt;_ NEXUS<span class="nv-caret">_</span></h1>

      <div class="nv-ops">
        <span class="nv-label">LVL {progress.level} · {levelData.title}</span>
        <span class="nv-ops-xp">
          {progress.nextTitle
            ? `${data.total_xp} / ${progress.nextLevelXp} XP → ${progress.nextTitle}`
            : `${data.total_xp} XP · MAX`}
        </span>
      </div>
      <div class="nv-xpbar"><div class={`nv-xpbar-fill${xpFlash ? ' nv-gained' : ''}`} style={{ width: `${progress.pct}%` }} /></div>
      <div class="nv-stats">
        <span>Cleared <b>{cleared}</b>/{arc1.length}</span>
        <span>Streak <b>{data.streak_current}</b></span>
        {fastest != null && <span>Fastest <b>{fmtTime(fastest)}</b></span>}
      </div>

      {arc1Groups.map((g) => (
        <section class="nv-tier" key={g.name}>
          <div class="nv-tier-label nv-label">{g.name}</div>
          {g.items.map((m) => {
            const rec = data.missions[m.mission_id];
            const done = data.completed_missions.includes(m.mission_id);
            const active = m.mission_id === activeId;
            const cls = ['nv-row', done && 'nv-row-done', active && 'nv-row-active'].filter(Boolean).join(' ');
            return (
              <button class={cls} key={m.mission_id} onClick={() => selectMission(m.mission_id)}>
                <span class="nv-row-id">{active ? '▸ ' : ''}{m.mission_id}</span>
                <span class="nv-row-t">{m.title}</span>
                {done && (rec?.best_time_ms ?? 0) > 0
                  ? <span class="nv-row-meta">{fmtTime(rec!.best_time_ms)} · {rec!.best_keystrokes}ks</span>
                  : <span class="nv-row-meta">{m.xp_reward} XP</span>}
                {done && <span class="nv-row-x">✓</span>}
              </button>
            );
          })}
        </section>
      ))}

      <section class="nv-tier">
        <div class="nv-tier-label nv-label">Arc II — Encrypted</div>
        {arc2.map((m) => (
          <button class="nv-row nv-row-locked" key={m.mission_id} disabled aria-disabled="true"
                  title="ARC II — not yet available on the web build">
            <span class="nv-row-id">{m.mission_id}</span>
            <span class="nv-row-t">{m.title} · ARC II</span>
            <span class="nv-row-meta nv-row-lock">🔒</span>
          </button>
        ))}
      </section>

      <section class="nv-tier">
        <div class="nv-tier-label nv-label">Sandbox</div>
        <button class="nv-row" onClick={() => { unlockAudio(); setView('sandbox'); }}>
          <span class="nv-row-id">RAVEN</span>
          <span class="nv-row-t">Glitch Drill — restore the transmission</span>
          {data.sandbox_bests.normal != null
            ? <span class="nv-row-meta">PB {fmtTime(data.sandbox_bests.normal)}</span>
            : <span class="nv-row-meta">free play</span>}
        </button>
      </section>
    </div>
  );
}
