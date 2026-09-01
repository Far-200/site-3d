import { Link } from "react-router-dom";
import { skillGroups } from "../data/skills";
import usePageMeta from "../lib/usePageMeta";

// Capability system — categories grounded in real project usage rather
// than invented proficiency percentages.
function SkillsPage() {
  usePageMeta(
    "Skills & Technology | Farhaan Khan",
    "Languages, frontend, backend, and tooling Farhaan Khan actually uses — grounded in shipped projects.",
  );

  return (
    <div className="page-main" aria-labelledby="skills-heading">
      <section className="page-section">
        <div className="page-section-inner">
          <p className="section-kicker">Capability system</p>
          <h1 id="skills-heading" className="work-title">
            Skills &amp; tech stack
            <span className="work-title-accent">grounded in shipped work</span>
          </h1>
          <p className="work-intro">
            No made-up percentage bars — each module below is tied to where it
            was actually used.
          </p>

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <section
                className="skill-module"
                key={group.title}
                aria-labelledby={`skill-${group.title}`}
              >
                <header className="skill-module-header">
                  <h2 id={`skill-${group.title}`}>{group.title}</h2>
                  <p>{group.context}</p>
                </header>

                <ul className="skill-module-list">
                  {group.items.map((item) => (
                    <li className="skill-module-item" key={item.name}>
                      <span className="skill-name">{item.name}</span>
                      <span className="skill-usage">{item.usage}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="hero-actions about-actions">
            <Link className="button button--primary" to="/work">
              See the stack in action
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SkillsPage;
