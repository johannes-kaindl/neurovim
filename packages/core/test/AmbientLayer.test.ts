import { AudioEngine } from '../src/audio/AudioEngine';
import { AmbientLayer } from '../src/audio/AmbientLayer';
import { makeMockAudioContext } from './__mocks__/web-audio';

function makeSetup() {
  const mockCtx = makeMockAudioContext();
  const engine = new AudioEngine(() => mockCtx as unknown as AudioContext);
  const layer = new AmbientLayer(engine);
  return { engine, layer, mockCtx };
}

describe('AmbientLayer', () => {
  it('starts disabled', () => {
    const { layer } = makeSetup();
    expect(layer.isEnabled).toBe(false);
  });

  it('setEnabled(true) before engine init does not crash', () => {
    const { layer } = makeSetup();
    expect(() => layer.setEnabled(true)).not.toThrow();
    expect(layer.isEnabled).toBe(true);
  });

  it('setEnabled(true) after init builds nodes', async () => {
    const { engine, layer, mockCtx } = makeSetup();
    await engine.init();
    layer.setEnabled(true);
    expect(mockCtx.createGain).toHaveBeenCalled();
    expect(mockCtx.createOscillator).toHaveBeenCalled();
  });

  it('setContext changes internal context', () => {
    const { layer } = makeSetup();
    expect(layer.context).toBe('idle');
    layer.setContext('arc2');
    expect(layer.context).toBe('arc2');
  });

  it('setContext same value is no-op (no new nodes)', async () => {
    const { engine, layer, mockCtx } = makeSetup();
    await engine.init();
    layer.setEnabled(true);
    const callsBefore = (mockCtx.createGain as jest.Mock).mock.calls.length;
    layer.setContext('idle'); // same as current
    expect((mockCtx.createGain as jest.Mock).mock.calls.length).toBe(callsBefore);
  });

  it('arc1 preset uses BufferSource and BiquadFilter', async () => {
    const { engine, layer, mockCtx } = makeSetup();
    await engine.init();
    layer.setEnabled(true);
    layer.setContext('arc1');
    expect(mockCtx.createBufferSource).toHaveBeenCalled();
    expect(mockCtx.createBiquadFilter).toHaveBeenCalled();
  });

  it('arc2 preset uses WaveShaper', async () => {
    const { engine, layer, mockCtx } = makeSetup();
    await engine.init();
    layer.setEnabled(true);
    layer.setContext('arc2');
    expect(mockCtx.createWaveShaper).toHaveBeenCalled();
  });

  it('setEnabled(false) disables layer', async () => {
    const { engine, layer } = makeSetup();
    await engine.init();
    layer.setEnabled(true);
    layer.setEnabled(false);
    expect(layer.isEnabled).toBe(false);
  });

  it('dispose clears all nodes', async () => {
    const { engine, layer } = makeSetup();
    await engine.init();
    layer.setEnabled(true);
    layer.dispose();
    expect(layer.isEnabled).toBe(false);
  });

  it('setContext when disabled does not build new nodes', async () => {
    const { engine, layer, mockCtx } = makeSetup();
    await engine.init();
    // layer is disabled (default)
    const callsBefore = (mockCtx.createGain as jest.Mock).mock.calls.length;
    layer.setContext('arc1');
    expect((mockCtx.createGain as jest.Mock).mock.calls.length).toBe(callsBefore);
    expect(layer.context).toBe('arc1'); // state updated
  });

  it('arc2 glitch timer stops after context switch', async () => {
    jest.useFakeTimers();
    const { engine, layer } = makeSetup();
    await engine.init();
    layer.setEnabled(true);
    layer.setContext('arc2');
    // Switch context — should stop re-arming the glitch timer
    layer.setContext('arc1');
    // Running all timers should not cause infinite loop
    expect(() => jest.runAllTimers()).not.toThrow();
    expect(layer.context).toBe('arc1');
    jest.useRealTimers();
  });
});
