import { AudioEngine } from '../src/audio/AudioEngine';
import { SoundCues } from '../src/audio/SoundCues';
import { makeMockAudioContext } from './__mocks__/web-audio';

async function makeReadyEngine() {
  const mockCtx = makeMockAudioContext();
  const engine = new AudioEngine(() => mockCtx as unknown as AudioContext);
  await engine.init();
  return { engine, mockCtx };
}

describe('SoundCues', () => {
  const cueMethods: Array<keyof typeof SoundCues> = [
    'missionComplete', 'levelUp', 'xpGain', 'wrongAttempt', 'missionReset',
    'glitchFeedback', 'drillToggle', 'lockMessage',
    'vimModeNormal', 'vimModeInsert', 'vimModeVisual', 'vimModeCommand',
    'corruptionFixed', 'transmissionRestored',
    'commandDelete', 'commandYank', 'commandChange',
    'commandMotionForward', 'commandMotionBack', 'commandPaste',
    'commandUndo', 'commandRedo', 'commandGotoStart', 'commandGotoEnd',
  ];

  for (const method of cueMethods) {
    it(`${method} creates oscillator or buffer nodes when engine ready`, async () => {
      const { engine, mockCtx } = await makeReadyEngine();
      (SoundCues[method] as (e: AudioEngine) => void)(engine);
      const created = (mockCtx.createOscillator as jest.Mock).mock.calls.length
        + (mockCtx.createBufferSource as jest.Mock).mock.calls.length;
      expect(created).toBeGreaterThan(0);
    });

    it(`${method} does not throw when engine not ready`, () => {
      const mockCtx = makeMockAudioContext();
      const engine = new AudioEngine(() => mockCtx as unknown as AudioContext);
      expect(() => (SoundCues[method] as (e: AudioEngine) => void)(engine)).not.toThrow();
    });
  }
});
