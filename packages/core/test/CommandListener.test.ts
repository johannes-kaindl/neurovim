import { AudioEngine } from '../src/audio/AudioEngine';
import { CommandListener } from '../src/audio/CommandListener';
import { SoundCues } from '../src/audio/SoundCues';
import { makeMockAudioContext } from './__mocks__/web-audio';

async function makeSetup(mode = 'normal') {
  const mockCtx = makeMockAudioContext();
  const engine = new AudioEngine(() => mockCtx as unknown as AudioContext);
  await engine.init();
  const modeWatcher = { mode };
  const listener = new CommandListener(engine, modeWatcher);
  const el = { addEventListener: jest.fn(), removeEventListener: jest.fn() } as unknown as HTMLElement;
  listener.attach(el);
  const keydown = (el.addEventListener as jest.Mock).mock.calls[0][1] as (e: KeyboardEvent) => void;
  return { engine, listener, modeWatcher, el, keydown };
}

function key(k: string, ctrl = false): KeyboardEvent {
  return { key: k, ctrlKey: ctrl } as unknown as KeyboardEvent;
}

describe('CommandListener', () => {
  it('attaches keydown listener on attach', async () => {
    const { el } = await makeSetup();
    expect((el.addEventListener as jest.Mock)).toHaveBeenCalledWith('keydown', expect.any(Function), true);
  });

  it('detach removes listener', async () => {
    const { listener, el } = await makeSetup();
    listener.detach();
    expect((el.removeEventListener as jest.Mock)).toHaveBeenCalled();
  });

  it('fires commandMotionForward on w in normal mode', async () => {
    const { keydown } = await makeSetup('normal');
    jest.spyOn(SoundCues, 'commandMotionForward').mockImplementation(() => {});
    keydown(key('w'));
    expect(SoundCues.commandMotionForward).toHaveBeenCalled();
    (SoundCues.commandMotionForward as jest.Mock).mockRestore();
  });

  it('does not fire in insert mode', async () => {
    const { keydown } = await makeSetup('insert');
    jest.spyOn(SoundCues, 'commandMotionForward').mockImplementation(() => {});
    keydown(key('w'));
    expect(SoundCues.commandMotionForward).not.toHaveBeenCalled();
    (SoundCues.commandMotionForward as jest.Mock).mockRestore();
  });

  it('dd fires commandDelete twice', async () => {
    jest.useFakeTimers();
    const { keydown } = await makeSetup('normal');
    jest.spyOn(SoundCues, 'commandDelete').mockImplementation(() => {});
    keydown(key('d'));
    keydown(key('d'));
    jest.runAllTimers();
    expect((SoundCues.commandDelete as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(2);
    (SoundCues.commandDelete as jest.Mock).mockRestore();
    jest.useRealTimers();
  });

  it('dw fires delete then motionForward', async () => {
    jest.useFakeTimers();
    const { keydown } = await makeSetup('normal');
    jest.spyOn(SoundCues, 'commandDelete').mockImplementation(() => {});
    jest.spyOn(SoundCues, 'commandMotionForward').mockImplementation(() => {});
    keydown(key('d'));
    keydown(key('w'));
    jest.runAllTimers();
    expect(SoundCues.commandDelete).toHaveBeenCalled();
    expect(SoundCues.commandMotionForward).toHaveBeenCalled();
    (SoundCues.commandDelete as jest.Mock).mockRestore();
    (SoundCues.commandMotionForward as jest.Mock).mockRestore();
    jest.useRealTimers();
  });

  it('pending op resets after 300ms with no motion', async () => {
    jest.useFakeTimers();
    const { listener, keydown } = await makeSetup('normal');
    keydown(key('d'));
    expect((listener as any).pendingOp).toBe('d');
    jest.advanceTimersByTime(300);
    expect((listener as any).pendingOp).toBeNull();
    jest.useRealTimers();
  });

  it(': fires vimModeCommand in normal mode', async () => {
    const { keydown } = await makeSetup('normal');
    jest.spyOn(SoundCues, 'vimModeCommand').mockImplementation(() => {});
    keydown(key(':'));
    expect(SoundCues.vimModeCommand).toHaveBeenCalled();
    (SoundCues.vimModeCommand as jest.Mock).mockRestore();
  });

  it('combo timers are cancelled on detach', async () => {
    jest.useFakeTimers();
    const { listener, keydown } = await makeSetup('normal');
    jest.spyOn(SoundCues, 'commandDelete').mockImplementation(() => {});
    keydown(key('d'));
    keydown(key('d')); // triggers dd combo with 60ms timer
    listener.detach(); // should cancel the pending timer
    jest.runAllTimers();
    // commandDelete should have been called once (immediate) but NOT the delayed second call
    expect((SoundCues.commandDelete as jest.Mock).mock.calls.length).toBe(1);
    (SoundCues.commandDelete as jest.Mock).mockRestore();
    jest.useRealTimers();
  });

  it('d followed by u (non-motion) cancels combo silently', async () => {
    jest.useFakeTimers();
    const { keydown } = await makeSetup('normal');
    jest.spyOn(SoundCues, 'commandDelete').mockImplementation(() => {});
    jest.spyOn(SoundCues, 'commandUndo').mockImplementation(() => {});
    keydown(key('d'));
    keydown(key('u')); // u is not a valid motion — combo cancelled
    jest.runAllTimers();
    expect(SoundCues.commandDelete).not.toHaveBeenCalled();
    expect(SoundCues.commandUndo).not.toHaveBeenCalled(); // consumed by pendingOp
    (SoundCues.commandDelete as jest.Mock).mockRestore();
    (SoundCues.commandUndo as jest.Mock).mockRestore();
    jest.useRealTimers();
  });
});
