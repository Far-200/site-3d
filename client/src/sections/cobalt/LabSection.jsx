import { homepageLabProjects } from "../../data/projects";
import "./LabSection.css";

// LAB / SIDE QUESTS — the /lab page's bench of non-flagship records
// (data/projects.js, everything without `homepageFlagship`). Laid out as
// a CSS multi-column flow rather than a uniform grid, so item heights
// stagger naturally into something closer to a corkboard than a
// dashboard. Every third slip gets a paper treatment for variety among
// the pine cards. A few items carry a barely-there rotation — controlled
// imperfection, reset on hover/focus, never enough to hurt scanability.

function labLink(project) {
  if (project.liveUrl) return { label: "Live ↗", href: project.liveUrl };
  if (project.githubUrl) return { label: "Source ↗", href: project.githubUrl };
  return null;
}

function LabSection() {
  return (
    <section className="cfw-lab cfw-section" aria-label="Lab bench">
      <div className="cfw-frame">
        <ul className="cfw-lab__bench">
          {homepageLabProjects.map((project, i) => {
            const link = labLink(project);
            const descriptor =
              project.eyebrow ??
              (project.builtBecause
                ? `Built because ${project.builtBecause}`
                : null);
            const isPaper = i % 3 === 2;

            return (
              <li
                className={`cfw-lab__item${isPaper ? " cfw-paper" : ""}`}
                key={project.slug}
              >
                <span className="cfw-lab__pin" aria-hidden="true" />
                <p className="cfw-lab__name">{project.shortTitle ?? project.title}</p>
                {descriptor && <p className="cfw-lab__desc">{descriptor}</p>}

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
