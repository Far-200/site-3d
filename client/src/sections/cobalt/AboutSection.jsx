import { cobalt, about as frozenAbout } from "../../data/profile";
import Portrait from "../../components/Portrait";
import "./AboutSection.css";

// ABOUT THE HUMAN — personal, grounded. Intro prose left; a small pinned
// portrait, a margin note, and the "core fuels" list on the right. The
// margin note reuses the frozen archive's real "EXPLORING" fact rather
// than inventing a new personal claim (data-integrity rule).

const { about } = cobalt;
const exploring = frozenAbout.meta.find((row) => row.label === "EXPLORING");

function AboutSection() {
  return (
    <section
      className="cfw-about cfw-section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="cfw-frame cfw-about__grid">
        <div className="cfw-about__lead">
          <p className="cfw-meta">{about.kicker}</p>
          <h2 id="about-title" className="cfw-about__title">
            {about.title}
          </h2>
          <div className="cfw-about__notes">
            {about.paragraphs.map((para) => (
              <p className="cfw-about__para" key={para.slice(0, 24)}>
                {para}
              </p>
            ))}
          </div>
        </div>

        <aside className="cfw-about__aside" aria-label="Core fuels">
          <div className="cfw-about__portrait-row">
            <figure className="cfw-about__portrait">
              <Portrait variant="about" />
            </figure>
            {exploring && (
              <p className="cfw-about__margin-note">
                <span className="cfw-meta">Currently exploring</span>
                {exploring.value}
              </p>
            )}
          </div>

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
    </section>
  );
}

export default AboutSection;
