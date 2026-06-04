export const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/** Ported from kuro-screensaver's CRT composite. GENTLE curvature (0.018) is fixed. */
export const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform float time;
uniform float glitch;          // 0..1 beat intensity
const float CURV = 0.018;
const float APERTURE = 0.35;

float hash(float n){ return fract(sin(n) * 43758.5453123); }

void main(){
  vec2 uv = vUv;
  // gentle barrel curvature
  vec2 cc = uv * 2.0 - 1.0;
  float aspect = resolution.x / resolution.y;
  cc.x *= aspect;
  vec2 warp = cc * (1.0 + CURV * dot(cc, cc));
  warp.x /= aspect;
  uv = warp * 0.5 + 0.5;
  // glitch-driven horizontal tear
  float row = floor(uv.y * resolution.y);
  uv.x += (hash(row + floor(time * 30.0)) - 0.5) * glitch * 0.04;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) { gl_FragColor = vec4(0.0,0.0,0.0,1.0); return; }
  vec2 e = smoothstep(vec2(0.0), vec2(0.02), uv) * smoothstep(vec2(0.0), vec2(0.02), 1.0 - uv);
  float frame = e.x * e.y;
  // chroma split driven by glitch
  float ca = glitch * 0.004;
  vec3 col;
  col.r = texture2D(tDiffuse, uv + vec2(ca, 0.0)).r;
  col.g = texture2D(tDiffuse, uv).g;
  col.b = texture2D(tDiffuse, uv - vec2(ca, 0.0)).b;
  // halation bloom
  vec2 px = 1.0 / resolution;
  float g = 0.0;
  g += texture2D(tDiffuse, uv + vec2(1.5, 0.0) * px).g;
  g += texture2D(tDiffuse, uv - vec2(1.5, 0.0) * px).g;
  g += texture2D(tDiffuse, uv + vec2(0.0, 3.5) * px).g;
  g += texture2D(tDiffuse, uv - vec2(0.0, 3.5) * px).g;
  col += vec3(0.35, 1.0, 0.55) * max(g * 0.25 - 0.12, 0.0) * 0.8;
  // ntsc dot-crawl (scales with glitch)
  vec2 pos = uv * resolution;
  float cr = sin(pos.y * 1.7 + pos.x * 0.9 + time * 18.0) * (0.02 + glitch * 0.05);
  col.r += cr; col.b -= cr;
  // aperture-grille rgb mask
  float tx = fract(uv.x * resolution.x / 3.0);
  float mr = 0.5 + 0.5 * cos(6.2831853 * tx);
  float mg = 0.5 + 0.5 * cos(6.2831853 * tx - 2.0943951);
  float mb = 0.5 + 0.5 * cos(6.2831853 * tx + 2.0943951);
  col *= mix(vec3(1.0), vec3(mr, mg, mb), APERTURE) * (1.0 + APERTURE * 0.55);
  // scanlines (intensify with glitch)
  float sl = 0.5 + 0.5 * sin(uv.y * resolution.y * 3.14159);
  col *= 1.0 - (0.10 + glitch * 0.08) * (1.0 - sl);
  // rare black-frame flicker on heavy glitch
  col *= 1.0 - 0.6 * step(0.985, hash(floor(time * 20.0))) * glitch;
  col *= frame;
  gl_FragColor = vec4(col, 1.0);
}
`;
