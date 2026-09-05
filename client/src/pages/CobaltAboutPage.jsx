// Token/base imports come first — see CobaltHomePage.jsx for why.
import "../styles/cobalt/tokens.css";
import "../styles/cobalt/base.css";

import usePageMeta from "../lib/usePageMeta";
import useCobaltRoute from "../lib/useCobaltRoute";
import { cobalt } from "../data/profile";
import CobaltHeader from "../layout/cobalt/CobaltHeader";
import CobaltFooter from "../layout/cobalt/CobaltFooter";
import AboutSection from "../sections/cobalt/AboutSection";

const { about } = cobalt;

// /about — the dedicated notebook/editorial page. No portrait: the
// visitor already met Farhaan in the homepage hero, and repeating it
// here would be the "portrait twice on the same site" problem this pass
// corrects.

function CobaltAboutPage() {
  usePageMeta(
    "About — Farhaan Khan",
    "Why I build, how I work, and what I'm exploring right now.",
  );
  useCobaltRoute();

  return (
    <div className="cfw">
      <a className="cfw-skip" href="#cfw-main">
        Skip to content
      </a>

      <CobaltHeader />

      <main id="cfw-main">
        <header className="cfw-section cfw-page-intro">
          <div className="cfw-frame">
            <p className="cfw-meta">{about.kicker}</p>
            <h1 className="cfw-page-intro__title">{about.title}</h1>
          </div>
        </header>

        <AboutSection />
      </main>

      <CobaltFooter />
    </div>
  );
}

export default CobaltAboutPage;
