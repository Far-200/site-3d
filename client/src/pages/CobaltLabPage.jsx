// Token/base imports come first — see CobaltHomePage.jsx for why.
import "../styles/cobalt/tokens.css";
import "../styles/cobalt/base.css";

import usePageMeta from "../lib/usePageMeta";
import useCobaltRoute from "../lib/useCobaltRoute";
import { cobalt } from "../data/profile";
import CobaltHeader from "../layout/cobalt/CobaltHeader";
import CobaltFooter from "../layout/cobalt/CobaltFooter";
import LabSection from "../sections/cobalt/LabSection";

const { lab } = cobalt;

// /lab — the workshop bench: smaller experiments and side quests
// (data/projects.js, everything without `homepageFlagship`). Moved out
// of the homepage so it can read as its own place rather than one more
// homepage chapter.

function CobaltLabPage() {
  usePageMeta(
    "Lab — Farhaan Khan",
    "Smaller experiments and side quests — utilities, prototypes, and one-sitting builds.",
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
            <p className="cfw-meta">{lab.kicker}</p>
            <h1 className="cfw-page-intro__title">{lab.title}</h1>
            <p className="cfw-section__intro">{lab.intro}</p>
          </div>
        </header>

        <LabSection />
      </main>

      <CobaltFooter />
    </div>
  );
}

export default CobaltLabPage;
