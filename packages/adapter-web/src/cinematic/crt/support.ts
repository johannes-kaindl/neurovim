/** Cheap, dependency-free WebGL availability check. Statically importable (no GLSL pulled in). */
export function webglSupported(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}
