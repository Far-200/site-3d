import { useRef } from "react";
import usePageMeta from "../lib/usePageMeta";
import { ArchivePrefsProvider } from "../lib/archivePrefs";
import { useArchivePrefs } from "../lib/archivePrefsContext";
import useSpatialRig from "../lib/useSpatialRig";
import SiteHeader from "../layout/SiteHeader";
import ArchiveFooter from "../layout/ArchiveFooter";
import HomeSection from "../sections/HomeSection";
import ProjectsSection from "../sections/ProjectsSection";
import AboutSection from "../sections/AboutSection";
import StackSection from "../sections/StackSection";
import ContactSection from "../sections/ContactSection";

import "../styles/tokens.css";
import "../styles/global.css";
import "../styles/responsive.css";
import "../sections/sections.css";

// The continuous archive — one page, five states (art-design.md §7).
// Phase 3 added the interaction layer; Phase 4 adds a restrained CSS-only
// spatial layer: one fixed background atmosphere (tier 0), localized
// perspective on the Home preview / Projects shelf / About aside / Stack
// panel, per-record depth on the shelf, the overlay coming forward as a
// foreground file, and one shared pointer rig feeding CSS variables.
// No WebGL / R3F Canvas — CSS transforms carry the depth cleanly (§8, §17).

function ArchiveShell() {
  const { motionReduced } = useArchivePrefs();
  const rootRef = useRef(null);

  // One shared pointer source for the whole archive's spatial layer;
  // fully disabled under reduced motion (and, inside the hook, for
  // coarse pointers and hidden tabs).
  useSpatialRig(rootRef, { enabled: !motionReduced });

  return (
    <div
      className="archive"
      ref={rootRef}
      data-reduced-motion={motionReduced ? "true" : "false"}
    >
      {/* Tier 0 — fixed background atmosphere. Decorative only; all
          content and navigation sit above it in the DOM. */}
      <div className="archive__atmos" aria-hidden="true" />

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content">
        <HomeSection />
        <ProjectsSection />
        <AboutSection />
        <StackSection />
        <ContactSection />
      </main>

      <ArchiveFooter />
    </div>
  );
}

function ArchivePage() {
  usePageMeta(
    "Farhaan Khan — builder's living archive",
    "Farhaan Khan — full-stack developer. A continuous archive of full-stack apps, developer tools, and AI-assisted systems.",
  );

  return (
    <ArchivePrefsProvider>
      <ArchiveShell />
    </ArchivePrefsProvider>
  );
}

export default ArchivePage;
