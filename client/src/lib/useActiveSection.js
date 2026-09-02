import { useEffect, useState } from "react";

// Scroll-spy for the continuous archive header (art-design.md §8).
//
// A single IntersectionObserver watches every section. A section counts as
// "active" while any part of it sits inside a thin horizontal band roughly
// 40% down the viewport (tuned by `rootMargin`). When several sections are
// in that band the topmost in document order wins, and when none are we
// keep the last known value — so the header never flickers at boundaries.

const DEFAULT_ROOT_MARGIN = "-40% 0px -55% 0px";

export default function useActiveSection(
  ids,
  { rootMargin = DEFAULT_ROOT_MARGIN } = {},
) {
  const [activeId, setActiveId] = useState(() => {
    if (typeof window === "undefined") return ids[0] ?? null;
    const hash = window.location.hash.replace("#", "");
    return ids.includes(hash) ? hash : (ids[0] ?? null);
  });

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const inBand = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        if (inBand.size === 0) return; // keep last known — no noisy reset
        const next = ids.find((id) => inBand.has(id));
        if (next) setActiveId(next);
      },
      { rootMargin, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
}
