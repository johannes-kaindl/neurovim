/**
 * App — Web-Orchestrierung (D17: eigener picker-getriebener Flow, NICHT der
 * file-open-getriebene Obsidian-main.ts). Konsumiert reine core-Engines +
 * Web-Port-Impls. Game-Flow: pick → edit → submit→verify→XP→save.
 */
import { useEffect, useState } from 'preact/hooks';
import {
  MissionEngine, ProgressionEngine, AudioEngine, SoundCues,
  DEFAULT_PLUGIN_DATA, type PluginData, type MissionDoc,
} from '@neurovim/core';
import { listMissions, getMission } from '@neurovim/content';
import { WebStorage } from '../ports/WebStorage';
import { MissionEditor } from './MissionEditor';

const storage = new WebStorage();
const audio = new AudioEngine();
let audioUnlocked = false;

export function App() {
  const [data, setData] = useState<PluginData>({ ...DEFAULT_PLUGIN_DATA });
  const [view, setView] = useState<'nexus' | 'mission'>('nexus');
  const [mission, setMission] = useState<MissionDoc | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

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
    setFeedback(null);
    setView('mission');
  }

  async function submit(content: string) {
    if (!mission) return;
    const diff = MissionEngine.verify(content, mission.solution ?? '');
    if (!diff.matches) {
      SoundCues.wrongAttempt(audio);
      setFeedback(`✗ ${diff.lines_off} line${diff.lines_off !== 1 ? 's' : ''} differ — keep going`);
      return;
    }
    SoundCues.missionComplete(audio);
    const { new_data, level_up } = ProgressionEngine.addXp(data, mission.xp_reward);
    let next = ProgressionEngine.recordCompletion(new_data);
    if (!next.completed_missions.includes(mission.mission_id)) {
      next = { ...next, completed_missions: [...next.completed_missions, mission.mission_id] };
    }
    next = { ...next, missions: { ...next.missions, [mission.mission_id]: {
      best_time_ms: 0, best_keystrokes: 0, best_ks_per_min: 0,
      runs: (next.missions[mission.mission_id]?.runs ?? 0) + 1,
      last_run: new Date().toISOString().slice(0, 10),
    } } };
    setData(next);
    await storage.saveData(next);
    if (level_up) SoundCues.levelUp(audio);
    setFeedback(`✓ COMPLETE  +${mission.xp_reward} XP${level_up ? `  · LEVEL UP → ${level_up.new_level}` : ''}`);
  }

  if (view === 'mission' && mission) {
    return <MissionEditor mission={mission} onSubmit={submit} onBack={() => setView('nexus')} feedback={feedback} />;
  }

  const level = ProgressionEngine.getLevelForXp(data.total_xp);
  const levelData = ProgressionEngine.getLevelData(level);
  const missions = listMissions('I');

  return (
    <div class="nv-app" onPointerDown={unlockAudio}>
      <header class="nv-nexus-head">
        <h1>&gt;_ NEXUS</h1>
        <div class="nv-stats">
          <span>LVL {level} · {levelData?.title ?? '—'}</span>
          <span>{data.total_xp} XP</span>
          <span>Completed {data.completed_missions.length}/{missions.length}</span>
          <span>Streak {data.streak_current}</span>
        </div>
      </header>
      <section class="nv-picker">
        <h2>ARC I — Indoctrination</h2>
        <ul>
          {missions.map((m) => (
            <li key={m.mission_id}>
              <button onClick={() => selectMission(m.mission_id)}>
                <span class="nv-mid">{m.mission_id}</span>
                <span class="nv-mtitle">{m.title}</span>
                <span class="nv-mxp">{m.xp_reward} XP</span>
                {data.completed_missions.includes(m.mission_id) && <span class="nv-done">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
