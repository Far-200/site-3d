import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Scroll behaviour for SPA navigation:
// - PUSH/REPLACE: scroll to top (or to the hash target if present).
// - POP (back/forward): restore the saved position for that history entry.
const positions = new Map();

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousKey = useRef(location.key);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Save where the previous entry was before handling the new one.
    positions.set(previousKey.current, window.scrollY);
    previousKey.current = location.key;

    if (navigationType === "POP") {
      window.scrollTo(0, positions.get(location.key) ?? 0);
      return;
    }

    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [location, navigationType]);

  return null;
}

export default ScrollManager;
