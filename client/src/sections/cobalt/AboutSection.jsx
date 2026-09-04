import { cobalt } from "../../data/profile";
import Portrait from "../../components/Portrait";
import "./AboutSection.css";

// ABOUT THE HUMAN — personal, grounded. Structural pass: intro prose left,
// a small portrait + "core fuels" note list right. The fuels get a
// note/paper treatment later; for now they are a clean bordered list with
// real hierarchy.

const { about } = cobalt;

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
          {about.paragraphs.map((para) => (
            <p className="cfw-about__para" key={para.slice(0, 24)}>
              {para}
            </p>
          ))}
        </div>

        <aside className="cfw-about__aside" aria-label="Core fuels">
          <figure className="cfw-about__portrait">
            <Portrait variant="about" />
          </figure>

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
