import { cobalt } from "../../data/profile";
import { homepageLabProjects } from "../../data/projects";
import "./LabSection.css";

// LAB / SIDE QUESTS — compact band of the non-flagship records
// (data/projects.js, everything without `homepageFlagship`). Each tile
// reads as a pinned index card: title, one-line descriptor, stamped
// stack tags, and a link out when a canonical URL exists. A few tiles
// carry a barely-there rotation for controlled imperfection — never
// enough to hurt scanability. Reads as active builder energy, not a
// second portfolio grid.

const { lab } = cobalt;

function labLink(project) {
  if (project.liveUrl) return { label: "Live ↗", href: project.liveUrl };
  if (project.githubUrl) return { label: "Source ↗", href: project.githubUrl };
  return null;
}

function LabSection() {
  return (
    <section className="cfw-lab cfw-section" id="lab" aria-labelledby="lab-title">
      <div className="cfw-frame">
        <div className="cfw-section__head">
          <p className="cfw-meta">{lab.kicker}</p>
          <h2 id="lab-title" className="cfw-section__title">
            {lab.title}
          </h2>
          <p className="cfw-section__intro">{lab.intro}</p>
        </div>

        <ul className="cfw-lab__strip">
          {homepageLabProjects.map((project) => {
            const link = labLink(project);
            const descriptor =
              project.eyebrow ??
              (project.builtBecause
                ? `Built because ${project.builtBecause}`
                : null);

            return (
              <li className="cfw-lab__item" key={project.slug}>
                <span className="cfw-lab__pin" aria-hidden="true" />
                <p className="cfw-lab__name">{project.shortTitle ?? project.title}</p>
                {descriptor && (
                  <p className="cfw-lab__desc">{descriptor}</p>
                )}

                {project.technologies?.length > 0 && (
                  <p className="cfw-lab__tags">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span className="cfw-lab__tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </p>
                )}

                <p className="cfw-lab__foot">
                  <a className="cfw-lab__more" href={`/projects/${project.slug}`}>
                    Details
                  </a>
                  {link && (
                    <a
                      className="cfw-lab__ext"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default LabSection;
