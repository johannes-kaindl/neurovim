/**
 * App — Web-Orchestrierung (D17: eigener picker-getriebener Flow, NICHT der
 * file-open-getriebene Obsidian-main.ts). Konsumiert reine core-Engines +
 * Web-Port-Impls. Game-Flow: pick → edit → submit→verify→XP→save.
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

// CM6 + @replit/codemirror-vim sind das schwerste Dep-Bündel und nur im Editor
// nötig — lazy laden, damit Picker/NEXUS sie nicht im Initial-Bundle tragen (Code-Splitting).
const MissionEditor = lazy(() =>
  import('./MissionEditor').then((m) => ({ default: m.MissionEditor })),
);
const SandboxView = lazy(() =>
  import('./SandboxView').then((m) => ({ default: m.SandboxView })),
);

/** Nächste spielbare Mission im selben Arc (für den „Next Mission"-Button). */
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
  const [view, setView] = useState<'nexus' | 'mission' | 'sandbox'>('nexus');
  const [mission, setMission] = useState<MissionDoc | null>(null);
  const [result, setResult] = useState<MissionResultData | null>(null);

  useEffect(() => {
    storage.loadData<PluginData>().then((d) => { if (d) setData({ ...DEFAULT_PLUGIN_DATA, ...d }); });
  }, []);

  // D4: Audio erst nach erster User-Geste initialisieren (non-intrusive, kein Auto-Play).
  function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    audio.init().catch(() => { /* User-Gesture-Race, silent */ });
  }

  function selectMission(id: string) {
    unlockAudio();
    setMission(getMission(id));
    setResult(null);
    setView('mission');
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
            onNexus={() => { setResult(null); setView('nexus'); }}
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
  const missions = listMissions('I');
  const cleared = missions.filter((m) => data.completed_missions.includes(m.mission_id)).length;
  const times = missions
    .map((m) => data.missions[m.mission_id]?.best_time_ms ?? 0)
    .filter((t) => t > 0);
  const fastest = times.length ? Math.min(...times) : null;

  return (
    <div class="nv-app" onPointerDown={unlockAudio}>
      <header class="nv-nexus-head">
        <h1>&gt;_ NEXUS</h1>
        <div class="nv-lvl-row">
          <span class="nv-lvl">LVL {progress.level} · {levelData.title}</span>
          <span class="nv-lvl-next">
            {progress.nextTitle
              ? `${data.total_xp} / ${progress.nextLevelXp} XP → ${progress.nextTitle}`
              : `${data.total_xp} XP · MAX`}
          </span>
        </div>
        <div class="nv-xpbar"><div class="nv-xpbar-fill" style={{ width: `${progress.pct}%` }} /></div>
        <div class="nv-stats">
          <span>Cleared {cleared}/{missions.length}</span>
          <span>Streak {data.streak_current}</span>
          {fastest != null && <span>Fastest {fmtTime(fastest)}</span>}
        </div>
      </header>
      <section class="nv-picker">
        <h2>ARC I — Indoctrination <span class="nv-arc-prog">{cleared}/{missions.length} cleared</span></h2>
        <ul>
          {missions.map((m) => {
            const rec = data.missions[m.mission_id];
            const done = data.completed_missions.includes(m.mission_id);
            return (
              <li key={m.mission_id}>
                <button onClick={() => selectMission(m.mission_id)}>
                  <span class="nv-mid">{m.mission_id}</span>
                  <span class="nv-mtitle">{m.title}</span>
                  {done && (rec?.best_time_ms ?? 0) > 0 && (
                    <span class="nv-mbest">{fmtTime(rec!.best_time_ms)} · {rec!.best_keystrokes}ks</span>
                  )}
                  <span class="nv-mxp">{m.xp_reward} XP</span>
                  {done && <span class="nv-done">✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section class="nv-picker">
        <h2>SANDBOX</h2>
        <ul>
          <li>
            <button onClick={() => { unlockAudio(); setView('sandbox'); }}>
              <span class="nv-mid">RAVEN</span>
              <span class="nv-mtitle">Glitch Drill — restore the transmission</span>
              {data.sandbox_bests.normal != null && (
                <span class="nv-mbest">PB {fmtTime(data.sandbox_bests.normal)}</span>
              )}
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
