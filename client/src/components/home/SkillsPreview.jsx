import { Link } from "react-router-dom";
import { skillGroups } from "../../data/skills";

// Home-page Skills preview — compact category strip linking to /skills.
function SkillsPreview() {
  return (
    <section className="page-section" aria-labelledby="skills-preview-heading">
      <div className="page-section-inner">
        <header className="section-header-row">
          <div>
            <p className="section-kicker">Skills</p>
            <h2 id="skills-preview-heading" className="section-title">
              The current toolkit
            </h2>
          </div>
          <Link className="section-link" to="/skills">
            Full capability map <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className="skills-preview-grid">
          {skillGroups.map((group) => (
            <div className="skills-preview-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="tech-list" aria-label={group.title}>
                {group.items.map((item) => (
                  <li className="tech-item" key={item.name}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsPreview;
