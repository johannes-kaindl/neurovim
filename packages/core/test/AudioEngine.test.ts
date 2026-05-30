import { AudioEngine } from '../src/audio/AudioEngine';
import { makeMockAudioContext } from './__mocks__/web-audio';

function makeEngine() {
  const mockCtx = makeMockAudioContext();
  const engine = new AudioEngine(() => mockCtx as unknown as AudioContext);
  return { engine, mockCtx };
}

describe('AudioEngine', () => {
  it('is not ready before init', () => {
    const { engine } = makeEngine();
    expect(engine.isReady).toBe(false);
    expect(engine.context).toBeNull();
  });

  it('init creates context and master gain', async () => {
    const { engine, mockCtx } = makeEngine();
    await engine.init();
    expect(engine.isReady).toBe(true);
    expect(engine.context).toBe(mockCtx);
    expect(mockCtx.createGain).toHaveBeenCalledTimes(1);
    expect(engine.master).not.toBeNull();
    expect(mockCtx.resume).not.toHaveBeenCalled();
  });

  it('double init is idempotent', async () => {
    const { engine, mockCtx } = makeEngine();
    await engine.init();
    await engine.init();
    expect(mockCtx.createGain).toHaveBeenCalledTimes(1);
  });

  it('init resumes suspended context', async () => {
    const mockCtx = makeMockAudioContext('suspended');
    const engine = new AudioEngine(() => mockCtx as unknown as AudioContext);
    await engine.init();
    expect(mockCtx.resume).toHaveBeenCalled();
  });

  it('dispose closes context and nulls references', async () => {
    const { engine, mockCtx } = makeEngine();
    await engine.init();
    await engine.dispose();
    expect(mockCtx.close).toHaveBeenCalled();
    expect(engine.context).toBeNull();
    expect(engine.isReady).toBe(false);
  });

  it('dispose before init is a no-op', () => {
    const { engine } = makeEngine();
    expect(() => engine.dispose()).not.toThrow();
  });

  // D4 regression: setMuted() must be honoured across init() and after init.
  it('setMuted(true) before init → master gain is 0 after init', async () => {
    const { engine } = makeEngine();
    engine.setMuted(true);
    await engine.init();
    expect(engine.master!.gain.value).toBe(0);
  });

  it('setMuted(true) after init → master gain is 0', async () => {
    const { engine } = makeEngine();
    await engine.init();
    engine.setMuted(true);
    expect(engine.master!.gain.value).toBe(0);
  });

  it('setMuted(false) after init → master gain restores to 0.35', async () => {
    const { engine } = makeEngine();
    await engine.init();
    engine.setMuted(true);
    engine.setMuted(false);
    expect(engine.master!.gain.value).toBe(0.35);
  });
});
