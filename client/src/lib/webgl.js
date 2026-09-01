// One-time WebGL capability check so every 3D surface can fall back to a
// DOM treatment instead of a broken canvas.
let cached = null;

export function supportsWebGL() {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    cached = false;
  }
  return cached;
}
