import { createContext, useContext } from "react";

// Context + hook for the archive session preferences (reduced motion,
// sound). Kept in its own module so the provider file can satisfy
// react-refresh's "components only" rule.

export const ArchivePrefsContext = createContext(null);

export function useArchivePrefs() {
  const ctx = useContext(ArchivePrefsContext);
  if (!ctx) {
    throw new Error(
      "useArchivePrefs must be used within an <ArchivePrefsProvider>",
    );
  }
  return ctx;
}
