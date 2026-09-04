import { useEffect } from "react";
import usePageMeta from "../lib/usePageMeta";
import CobaltHeader from "../layout/cobalt/CobaltHeader";
import CobaltFooter from "../layout/cobalt/CobaltFooter";
import HeroSection from "../sections/cobalt/HeroSection";
import SelectedWorkSection from "../sections/cobalt/SelectedWorkSection";
import LabSection from "../sections/cobalt/LabSection";
import AboutSection from "../sections/cobalt/AboutSection";
import ContactSection from "../sections/cobalt/ContactSection";

import "../styles/cobalt/tokens.css";
import "../styles/cobalt/base.css";

// Cobalt Forest Workshop — the V2 homepage. Self-contained: its own
// header, footer, and `.cfw` token scope, entirely separate from the
// frozen `.archive` system (still live at /archive). A late-night
// builder's workshop in the woods — deep cobalt / forest-night
// atmosphere, warm paper layers, small saffron accents.

function CobaltHomePage() {
  usePageMeta(
    "Farhaan Khan — builder's workshop",
    "Farhaan Khan — full-stack developer. Full-stack apps, developer tools, and AI-assisted systems, built to actually get used.",
  );

  // Paint the forest-night ground on <body>/#root only while this route is
  // mounted, so the legacy routes keep their own #15110f ground.
  useEffect(() => {
    document.body.dataset.cfwRoute = "true";
    return () => {
      delete document.body.dataset.cfwRoute;
    };
  }, []);

  return (
    <div className="cfw">
      <a className="cfw-skip" href="#cfw-main">
        Skip to content
      </a>

      <CobaltHeader />

      <main id="cfw-main">
        <HeroSection />
        <SelectedWorkSection />
        <LabSection />
        <AboutSection />
        <ContactSection />
      </main>

      <CobaltFooter />
    </div>
  );
}

export default CobaltHomePage;
