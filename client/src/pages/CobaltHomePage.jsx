// Token/base imports come first so their rules land earliest in the
// bundled stylesheet — every section's own CSS (imported below) then
// wins any equal-specificity override (e.g. a section's own
// `padding-block-start` against the shared `.cfw-section` rule) by
// normal cascade order, instead of silently losing to it.
import "../styles/cobalt/tokens.css";
import "../styles/cobalt/base.css";

import usePageMeta from "../lib/usePageMeta";
import useCobaltRoute from "../lib/useCobaltRoute";
import CobaltHeader from "../layout/cobalt/CobaltHeader";
import CobaltFooter from "../layout/cobalt/CobaltFooter";
import HeroSection from "../sections/cobalt/HeroSection";
import FlagshipGatewaySection from "../sections/cobalt/FlagshipGatewaySection";
import GatewaysSection from "../sections/cobalt/GatewaysSection";
import ContactSection from "../sections/cobalt/ContactSection";

// Cobalt Forest Workshop — the workshop ENTRANCE, not the full portfolio.
// Self-contained: its own header, footer, and `.cfw` token scope,
// entirely separate from the frozen `.archive` system (still live at
// /archive). Deliberately short and dense: Hero, one flagship spotlight,
// compact doors into /work, /lab, /about, and a slim closing strip. The
// full Selected Work archive, Lab bench, and About essay each moved to
// their own routed page — see CobaltWorkPage / CobaltLabPage /
// CobaltAboutPage.

function CobaltHomePage() {
  usePageMeta(
    "Farhaan Khan — builder's workshop",
    "Farhaan Khan — full-stack developer. Full-stack apps, developer tools, and AI-assisted systems, built to actually get used.",
  );

  useCobaltRoute();

  return (
    <div className="cfw">
      <a className="cfw-skip" href="#cfw-main">
        Skip to content
      </a>

      <CobaltHeader />

      <main id="cfw-main">
        <HeroSection />
        <FlagshipGatewaySection />
        <GatewaysSection />
        <ContactSection />
      </main>

      <CobaltFooter />
    </div>
  );
}

export default CobaltHomePage;
