import { cobalt, about as frozenAbout } from "../../data/profile";
import "./AboutSection.css";

// ABOUT THE HUMAN — the /about page's body. The portrait already lives in
// the homepage hero, so this page is text-first: "why I build" / "how I
// work" / "right now" (cobalt.about.sections), a "currently exploring"
// note and a compact status strip both pulled from the frozen archive's
// real `about.meta` data, and the "core fuels" principles list. No new
// biographical facts are introduced — data-integrity rule.

const { about } = cobalt;
const exploring = frozenAbout.meta.find((row) => row.label === "EXPLORING");

function AboutSection() {
  return (
    <section className="cfw-about cfw-section" aria-label="About the human">
      <div className="cfw-frame cfw-about__grid">
        <div className="cfw-about__notes">
          {about.sections.map((section) => (
            <div className="cfw-about__block" key={section.heading}>
              <p className="cfw-meta cfw-about__block-label">{section.heading}</p>
              <p className="cfw-about__para">{section.text}</p>
            </div>
          ))}

          {exploring && (
            <div className="cfw-about__block cfw-about__block--exploring">
              <p className="cfw-meta cfw-about__block-label">
                Currently exploring
              </p>
              <p className="cfw-about__para">{exploring.value}</p>
            </div>
          )}
        </div>

        <aside className="cfw-about__aside" aria-label="Core fuels">
          <p className="cfw-meta cfw-about__fuels-label">Core fuels</p>
          <ul className="cfw-about__fuels">
            {about.fuels.map((fuel) => (
              <li className="cfw-about__fuel" key={fuel.label}>
                <p className="cfw-about__fuel-k">{fuel.label}</p>
                <p className="cfw-about__fuel-v">{fuel.note}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="cfw-frame cfw-about__status">
        <p className="cfw-meta cfw-about__status-label">Status notes</p>
        <dl className="cfw-about__status-list">
          {frozenAbout.meta.map((row) => (
            <div className="cfw-about__status-row" key={row.label}>
              <dt className="cfw-meta">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default AboutSection;
