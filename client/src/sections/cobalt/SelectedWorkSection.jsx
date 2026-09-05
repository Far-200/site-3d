import { cobalt } from "../../data/profile";
import { homepageFlagshipProjects } from "../../data/projects";
import "./SelectedWorkSection.css";

// SELECTED WORK — three flagship project cards (data/projects.js
// `homepageFlagship`). The first card takes a wider "feature" span on
// desktop; the other two share a row with alternating screenshot crops
// and a pinned paper index tag, so the row reads as a story strip rather
// than three identical SaaS cards. Cards are a real link when a
// canonical URL exists, otherwise a static record (no dead "#" links —
// data-integrity rule).

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
      id="selected-work"
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

        <ol className="cfw-work__grid">
          {homepageFlagshipProjects.map((project, i) => {
            const ext = primaryExternal(project);
            return (
              <li
                className="cfw-work__card"
                key={project.slug}
                data-feature={i === 0 ? "true" : "false"}
                data-crop={i % 2 === 1 ? "tall" : "wide"}
              >
                <a className="cfw-work__link" href={projectHref(project)}>
                  {i === 0 ? (
                    <span className="cfw-work__index cfw-meta">
                      {project.index}
                    </span>
                  ) : (
                    <span className="cfw-work__index-tag cfw-paper cfw-meta">
                      {project.index}
                    </span>
                  )}

                  <span className="cfw-work__media">
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
                  </span>

                  <span className="cfw-work__body">
                    <span className="cfw-work__eyebrow cfw-meta">
                      {project.eyebrow}
                    </span>
                    <span className="cfw-work__title">{project.title}</span>
                    <span className="cfw-work__summary">{project.summary}</span>

                    {project.technologies?.length > 0 && (
                      <span className="cfw-work__tags">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span className="cfw-work__tag" key={tech}>
                            {tech}
                          </span>
                        ))}
                      </span>
                    )}

                    <span className="cfw-work__affordance">
                      <span className="cfw-work__cta">
                        Open case <span aria-hidden="true">→</span>
                      </span>
                      {ext && (
                        <span className="cfw-work__ext cfw-meta">
                          {ext.label} available
                        </span>
                      )}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default SelectedWorkSection;
