export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private readonly contextFactory: () => AudioContext;

  constructor(contextFactory?: () => AudioContext) {
    this.contextFactory = contextFactory ?? (() => new (window.AudioContext || (window as any).webkitAudioContext)());
  }

  get context(): AudioContext | null { return this.ctx; }
  get master(): GainNode | null { return this.masterGain; }
  get isReady(): boolean { return this.ctx !== null && this.ctx.state !== 'closed'; }

  async init(): Promise<void> {
    if (this.ctx) {
      if (this.ctx.state === 'closed') {
        this.ctx = null;
        this.masterGain = null;
        // fall through to re-init
      } else {
        if (this.ctx.state === 'suspended') await this.ctx.resume();
        return;
      }
    }
    this.ctx = this.contextFactory();
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.35;
    this.masterGain.connect(this.ctx.destination);
  }

  async dispose(): Promise<void> {
    if (!this.ctx) return;
    this.masterGain?.disconnect();
    this.masterGain = null;
    await this.ctx.close();
    this.ctx = null;
  }
}
