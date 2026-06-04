import { VERT, FRAG } from './shader';

/**
 * Minimal raw-WebGL post-process. Renders a source canvas (the terminal text) through the
 * CRT fragment shader into its own canvas. No Three.js. One fullscreen quad, one texture.
 */
export class CrtShader {
  private gl: WebGLRenderingContext;
  private prog: WebGLProgram;
  private tex: WebGLTexture;
  private u: Record<string, WebGLUniformLocation | null> = {};
  private sized = false;

  constructor(private canvas: HTMLCanvasElement) {
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) throw new Error('webgl unavailable');
    this.gl = gl;
    this.prog = this.link(VERT, FRAG);
    gl.useProgram(this.prog);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(this.prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    for (const name of ['resolution', 'time', 'glitch', 'tDiffuse']) {
      this.u[name] = gl.getUniformLocation(this.prog, name);
    }
    gl.uniform1i(this.u.tDiffuse, 0); // bind sampler to texture unit 0 explicitly

    this.tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  }

  private link(vsrc: string, fsrc: string): WebGLProgram {
    const gl = this.gl;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error('shader compile: ' + gl.getShaderInfoLog(s));
      }
      return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, compile(gl.VERTEX_SHADER, vsrc));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fsrc));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      throw new Error('program link: ' + gl.getProgramInfoLog(p));
    }
    return p;
  }

  /** Match the drawing buffer to the canvas's CSS size × dpr (cap 2). Call on resize. */
  resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(this.canvas.clientWidth * dpr);
    const h = Math.round(this.canvas.clientHeight * dpr);
    if (w === 0 || h === 0) return;
    this.canvas.width = w;
    this.canvas.height = h;
    this.gl.viewport(0, 0, w, h);
    this.gl.uniform2f(this.u.resolution, w, h);
    this.sized = true;
  }

  /**
   * Upload `source` as the texture and draw one CRT-shaded frame.
   * Self-heals if `resize()` was never called (first frame would otherwise read a
   * zero `resolution` uniform → NaN). Callers should still drive `resize()` on layout change.
   */
  render(source: HTMLCanvasElement, opts: { timeMs: number; glitch: number }): void {
    const gl = this.gl;
    if (!this.sized) this.resize();
    gl.useProgram(this.prog);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.uniform1f(this.u.time, opts.timeMs / 1000);
    gl.uniform1f(this.u.glitch, opts.glitch);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  dispose(): void {
    const ext = this.gl.getExtension('WEBGL_lose_context');
    ext?.loseContext();
  }
}
