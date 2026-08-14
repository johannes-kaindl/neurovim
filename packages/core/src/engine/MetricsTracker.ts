import { realClock, type ClockPort } from '../utils/clock';

export interface MetricsResult {
  elapsed_ms: number;
  keystrokes: number;
  ks_per_min: number;
}

export class MetricsTracker {
  private _keystrokes = 0;
  private _running = false;
  private _startTime = 0;

  constructor(private readonly clock: ClockPort = realClock) {}

  start(): void {
    this._startTime = this.clock.now();
    this._running = true;
  }

  reset(): void {
    this._keystrokes = 0;
    this._running = false;
    this._startTime = 0;
  }

  addKeystroke(): void {
    if (!this._running) return;
    this._keystrokes++;
  }

  getKeystrokes(): number {
    return this._keystrokes;
  }

  getElapsedMs(): number {
    if (!this._running) return 0;
    return this.clock.now() - this._startTime;
  }

  getResult(elapsed_ms?: number): MetricsResult {
    const ms = elapsed_ms ?? this.getElapsedMs();
    const ks_per_min = ms > 0 ? Math.round((this._keystrokes / ms) * 60_000 * 10) / 10 : 0;
    return { elapsed_ms: ms, keystrokes: this._keystrokes, ks_per_min };
  }
}
