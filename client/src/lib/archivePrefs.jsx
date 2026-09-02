import { useCallback, useEffect, useMemo, useState } from "react";
import { ArchivePrefsContext } from "./archivePrefsContext";

// Session preferences for the continuous archive (art-design.md §15, §16).
//
// Two preferences live here so the header controls and every section read
// the same source of truth:
//
//  - motionReduced  effective reduced-motion state. Initialised from the OS
//                   `prefers-reduced-motion` setting; the RM control flips a
//                   session override on top of it (so a user can force
//                   motion ON even when the OS asks for reduce, per §15).
//  - soundEnabled   archive sound cues. OFF by default, never autoplays.
//                   No sound assets ship yet, so `playCue()` is a functional
//                   but deliberately silent entry point (§16).
//
// The override + sound flag persist to localStorage; failures there are
// swallowed and the preference simply becomes session-only.

const STORAGE_KEY = "archive:prefs:v1";
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function systemReduced() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(MOTION_QUERY).matches
  );
}

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function ArchivePrefsProvider({ children }) {
  const [sysReduced, setSysReduced] = useState(systemReduced);

  // null = follow the OS; true / false = explicit session choice.
  const [motionOverride, setMotionOverride] = useState(() => {
    const stored = readStored();
    return typeof stored.motionOverride === "boolean"
      ? stored.motionOverride
      : null;
  });

  const [soundEnabled, setSoundEnabled] = useState(
    () => readStored().soundEnabled === true,
  );

  // Keep the OS value live so a mid-session change is honoured while the
  // user has not taken manual control.
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined;
    const mq = window.matchMedia(MOTION_QUERY);
    const onChange = () => setSysReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ motionOverride, soundEnabled }),
      );
    } catch {
      /* storage unavailable — preference stays session-only */
    }
  }, [motionOverride, soundEnabled]);

  const motionReduced = motionOverride ?? sysReduced;

  const toggleMotion = useCallback(() => {
    setMotionOverride((prev) => {
      const current = prev ?? systemReduced();
      return !current;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((value) => !value);
  }, []);

  // Functional SND infrastructure. No archive sound assets exist yet, so
  // this intentionally does nothing but respect the preference — callers
  // can invoke playCue("tick") today and gain audio for free later.
  const playCue = useCallback(
    (name) => {
      if (!soundEnabled) return;
      void name;
    },
    [soundEnabled],
  );

  const value = useMemo(
    () => ({
      motionReduced,
      motionOverridden: motionOverride !== null,
      soundEnabled,
      toggleMotion,
      toggleSound,
      playCue,
    }),
    [
      motionReduced,
      motionOverride,
      soundEnabled,
      toggleMotion,
      toggleSound,
      playCue,
    ],
  );

  return (
    <ArchivePrefsContext.Provider value={value}>
      {children}
    </ArchivePrefsContext.Provider>
  );
}
