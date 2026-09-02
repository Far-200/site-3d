import { useEffect, useRef } from "react";

// Restrained entrance reveal for a section (art-design.md §15, Phase 4.5 §9).
//
// Returns a ref to attach to the section element. The first time the
// section scrolls into view it gets data-revealed="true"; CSS fades and
// lifts its content ~8px with a light stagger. It never toggles back, so
// scrolling up and down does not replay it.
//
// Safety (Phase 4.6 §9 — content must never stay hidden):
//  - the hidden pre-state is only set when an IntersectionObserver is
//    wired AND the section is below the fold at mount;
//  - no IO, reduced motion, or already-in-view  → revealed immediately;
//  - a hard failsafe timer reveals the section even if the observer never
//    fires for any reason;
//  - a runtime reduced-motion toggle is also caught by a CSS override.

export default function useReveal({ threshold = 0.12 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reveal = () => {
      el.dataset.revealed = "true";
    };

    const root = el.closest(".archive");
    const reduced = root?.dataset.reducedMotion === "true";

    if (reduced || typeof IntersectionObserver === "undefined") {
      reveal();
      return undefined;
    }

    // Anything already on screen at mount is revealed straight away — no
    // fade-out/fade-in flash for above-the-fold sections. Only sections
    // below the fold get the hidden pre-state.
    const rect = el.getBoundingClientRect();
    const alreadyInView =
      rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    if (alreadyInView) {
      reveal();
      return undefined;
    }

    el.dataset.revealed = "false";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);

    // Failsafe: never leave a section hidden if the observer misfires.
    // Worst case a below-fold section reveals without its entrance — an
    // acceptable trade for guaranteed-visible content.
    const failsafe = window.setTimeout(reveal, 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [threshold]);

  return ref;
}
