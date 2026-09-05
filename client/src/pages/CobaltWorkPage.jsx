// Token/base imports come first — see CobaltHomePage.jsx for why.
import "../styles/cobalt/tokens.css";
import "../styles/cobalt/base.css";

import usePageMeta from "../lib/usePageMeta";
import useCobaltRoute from "../lib/useCobaltRoute";
import { cobalt } from "../data/profile";
import CobaltHeader from "../layout/cobalt/CobaltHeader";
import CobaltFooter from "../layout/cobalt/CobaltFooter";
import SelectedWorkSection from "../sections/cobalt/SelectedWorkSection";
import ArchiveListSection from "../sections/cobalt/ArchiveListSection";

const { work } = cobalt;

// /work — the full project archive. Moved out of the homepage: a short
// page intro, the three flagship builds at full editorial scale
// (SelectedWorkSection), then the smaller archive underneath
// (ArchiveListSection). Both sections read the shared project data —
// nothing is duplicated here.

function CobaltWorkPage() {
  usePageMeta(
    "Work — Farhaan Khan",
    "The full project archive: flagship builds and the smaller tools and experiments alongside them.",
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
            <p className="cfw-meta">{work.kicker}</p>
            <h1 className="cfw-page-intro__title">{work.title}</h1>
            <p className="cfw-section__intro">{work.intro}</p>
          </div>
        </header>

        <SelectedWorkSection />
        <ArchiveListSection />
      </main>

      <CobaltFooter />
    </div>
  );
}

export default CobaltWorkPage;
