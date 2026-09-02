import { useEffect } from "react";

// The archive's single shared pointer source (art-design.md §7, §17).
//
// Writes the normalized pointer position as two CSS custom properties —
// --rig-px / --rig-py, each in the range -1..1 — on the element passed by
// ref. DOM components consume them through calc() with tiny coefficients
// (a few px of translate, <=1deg of rotation); there is no WebGL and no
// React state, so a pointer move never re-renders the tree.
//
// It stays completely inert when it should:
//  - reduced motion            (caller passes enabled: false)
//  - coarse / no-hover pointer  (touch: keep the static depth states only)
//  - hidden tab                 (reset to rest, stop scheduling frames)
//
// Updates are coalesced to one requestAnimationFrame per frame and are
// only scheduled while the pointer is actually moving.

export default function useSpatialRig(ref, { enabled = true } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const clearVars = () => {
      el.style.removeProperty("--rig-px");
      el.style.removeProperty("--rig-py");
    };

    if (!enabled) {
      clearVars();
      return undefined;
    }

    const finePointer =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) {
      el.style.setProperty("--rig-px", "0");
      el.style.setProperty("--rig-py", "0");
      return undefined;
    }

    let frame = 0;
    let px = 0;
    let py = 0;

    const flush = () => {
      frame = 0;
      el.style.setProperty("--rig-px", px.toFixed(4));
      el.style.setProperty("--rig-py", py.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onMove = (event) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      px = Math.max(-1, Math.min(1, (event.clientX / w) * 2 - 1));
      py = Math.max(-1, Math.min(1, (event.clientY / h) * 2 - 1));
      schedule();
    };

    const rest = () => {
      px = 0;
      py = 0;
      schedule();
    };

    const onVisibility = () => {
      if (document.hidden) rest();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("mouseleave", rest);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("mouseleave", rest);
      document.removeEventListener("visibilitychange", onVisibility);
      clearVars();
    };
  }, [ref, enabled]);
}
