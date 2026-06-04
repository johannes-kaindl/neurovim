import type { RenderFrame } from '../cutscene';
import { themeColor } from '../theme';

/** Draws a RenderFrame (themed, glowing monospace text + cursor) onto a 2D source canvas. */
export class TerminalCanvas {
  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2d context unavailable');
    this.ctx = ctx;
  }

  resize(w: number, h: number): void {
    this.canvas.width = w;
    this.canvas.height = h;
  }

  /** `timeMs` drives the cursor blink. */
  draw(frame: RenderFrame, timeMs: number): void {
    const { ctx, canvas } = this;
    const { width: w, height: h } = canvas;
    ctx.fillStyle = '#040d07';
    ctx.fillRect(0, 0, w, h);

    const color = themeColor(frame.theme);
    const fs = Math.max(12, Math.round(w * 0.022));
    ctx.font = `${fs}px "JetBrains Mono", ui-monospace, monospace`;
    ctx.textBaseline = 'top';
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = fs * 0.55;

    const padX = Math.round(w * 0.08);
    const padY = Math.round(h * 0.14);
    const lh = Math.round(fs * 1.6);
    const lines = frame.text.split('\n');
    lines.forEach((line, i) => ctx.fillText(line, padX, padY + i * lh));

    // blinking block cursor after the last line (only while not done)
    if (!frame.done && Math.floor(timeMs / 530) % 2 === 0) {
      const last = lines[lines.length - 1] ?? '';
      const cx = padX + ctx.measureText(last).width + 2;
      const cy = padY + (lines.length - 1) * lh;
      ctx.fillRect(cx, cy, fs * 0.55, fs);
    }
  }
}
