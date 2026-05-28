export function makeAudioNode() {
  return { connect: jest.fn(), disconnect: jest.fn() };
}

export function makeGainNode() {
  return {
    ...makeAudioNode(),
    gain: { value: 1, setValueAtTime: jest.fn(), linearRampToValueAtTime: jest.fn() },
  };
}

export function makeOscillator() {
  return {
    ...makeAudioNode(),
    type: 'sine' as OscillatorType,
    frequency: { value: 440, setValueAtTime: jest.fn(), linearRampToValueAtTime: jest.fn() },
    start: jest.fn(),
    stop: jest.fn(),
    onended: null as (() => void) | null,
  };
}

export function makeBiquadFilter() {
  return {
    ...makeAudioNode(),
    type: 'lowpass' as BiquadFilterType,
    frequency: { value: 350, setValueAtTime: jest.fn(), linearRampToValueAtTime: jest.fn() },
    Q: { value: 1 },
  };
}

export function makeBufferSource() {
  return {
    ...makeAudioNode(),
    buffer: null as AudioBuffer | null,
    loop: false,
    start: jest.fn(),
    stop: jest.fn(),
    onended: null as (() => void) | null,
  };
}

export function makeWaveShaper() {
  return { ...makeAudioNode(), curve: null as Float32Array | null };
}

export function makeConvolver() {
  return { ...makeAudioNode(), buffer: null as AudioBuffer | null };
}

export function makeAudioBuffer() {
  const data = new Float32Array(44100);
  return {
    getChannelData: jest.fn().mockReturnValue(data),
    sampleRate: 44100,
    length: 44100,
    numberOfChannels: 1,
    duration: 1,
  };
}

export function makeMockAudioContext(state: AudioContextState = 'running') {
  const destination = makeAudioNode();
  const ctx = {
    state: state as AudioContextState,
    currentTime: 0,
    sampleRate: 44100,
    destination,
    resume: jest.fn().mockImplementation(function() {
      ctx.state = 'running' as AudioContextState;
      return Promise.resolve();
    }),
    close: jest.fn().mockResolvedValue(undefined),
    createGain: jest.fn().mockImplementation(makeGainNode),
    createOscillator: jest.fn().mockImplementation(makeOscillator),
    createBiquadFilter: jest.fn().mockImplementation(makeBiquadFilter),
    createBufferSource: jest.fn().mockImplementation(makeBufferSource),
    createBuffer: jest.fn().mockImplementation(makeAudioBuffer),
    createWaveShaper: jest.fn().mockImplementation(makeWaveShaper),
    createConvolver: jest.fn().mockImplementation(makeConvolver),
  };
  return ctx;
}
