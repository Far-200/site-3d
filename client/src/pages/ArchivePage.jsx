import usePageMeta from "../lib/usePageMeta";
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
// Foundation only: structure, tokens, typography, frame, header/nav,
// section flow. No 3D, no accordion/preview/personnel/stack interaction.

function ArchivePage() {
  usePageMeta(
    "Farhaan Khan — builder's living archive",
    "Farhaan Khan — full-stack developer. A continuous archive of full-stack apps, developer tools, and AI-assisted systems.",
  );

  return (
    <div className="archive">
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

export default ArchivePage;
