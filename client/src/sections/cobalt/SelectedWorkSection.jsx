import { cobalt } from "../../data/profile";
import { homepageFlagshipProjects } from "../../data/projects";
import "./SelectedWorkSection.css";

// SELECTED WORK — the /work page's flagship subsection (data/projects.js
// `homepageFlagship`, currently 3 records). Full-width alternating rows,
// not a repeated card template: each screenshot sits directly on the
// canvas at real size, text opposite it, no bordered box wrapping the
// whole row. Direction alternates project to project so the sequence
// reads as an edited strip. Cards are a real link when a canonical URL
// exists, otherwise a static record (no dead "#" links — data-integrity
// rule).

const { selectedWork } = cobalt;

function projectHref(project) {
  return `/projects/${project.slug}`;
}

function primaryExternal(project) {
  if (project.liveUrl) return { label: "Live", href: project.liveUrl };
  if (project.githubUrl) return { label: "Source", href: project.githubUrl };
  return null;
}

function SelectedWorkSection() {
  return (
    <section
      className="cfw-work cfw-section"
      id="flagship-work"
      aria-labelledby="work-title"
    >
      <div className="cfw-frame">
        <div className="cfw-section__head">
          <p className="cfw-meta">{selectedWork.kicker}</p>
          <h2 id="work-title" className="cfw-section__title">
            {selectedWork.title}
          </h2>
          <p className="cfw-section__intro">{selectedWork.intro}</p>
        </div>

        <ol className="cfw-work__list">
          {homepageFlagshipProjects.map((project, i) => {
            const ext = primaryExternal(project);
            return (
              <li
                className="cfw-work__row"
                key={project.slug}
                data-align={i % 2 === 1 ? "reverse" : "forward"}
              >
                <a className="cfw-work__media" href={projectHref(project)}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.imageAlt ?? `${project.title} screenshot`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="cfw-work__media-empty" aria-hidden="true">
                      {project.title}
                    </span>
                  )}
                </a>

                <div className="cfw-work__copy">
                  <span className="cfw-work__index cfw-meta">
                    {project.index}
                  </span>
                  <span className="cfw-work__eyebrow cfw-meta">
                    {project.eyebrow}
                  </span>
                  <h3 className="cfw-work__title">{project.title}</h3>
                  <p className="cfw-work__summary">{project.summary}</p>

                  {project.technologies?.length > 0 && (
                    <p className="cfw-work__tags">
                      {project.technologies.slice(0, 5).join(" · ")}
                    </p>
                  )}

                  <div className="cfw-work__affordance">
                    <a className="cfw-btn cfw-btn--ghost" href={projectHref(project)}>
                      Open case study <span aria-hidden="true">→</span>
                    </a>
                    {ext && (
                      <span className="cfw-work__ext cfw-meta">
                        {ext.label} available
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default SelectedWorkSection;
