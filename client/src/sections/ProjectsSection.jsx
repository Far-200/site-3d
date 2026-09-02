import { archiveProjects } from "../data/projects";
import useReveal from "../lib/useReveal";

// PROJECTS — "ARCHIVE // 02" (art-design.md §10).
//
// Fixed 8-column shelf. On hover/focus a larger preview of the SAME
// project appears as an absolute overlay inside the shelf's vertical band
// — it visually covers neighbouring records (intentional) but nothing
// reflows: no width/height/margin change, no vertical clearance, no
// content above the shelf. Both the resting record and the overlay live
// inside ONE native <a href="/projects/:slug">, so hover stays true
// moving between them and a click anywhere navigates. Pure CSS
// (:hover / :focus-visible) — no React hover state.

function stateTone(project) {
  const value = (project.status ?? project.availability ?? "").toLowerCase();
  if (value.includes("live")) return "live";
  if (value.includes("shipped")) return "shipped";
  if (value.includes("development") || value.includes("experimental")) {
    return "wip";
  }
  return "archived";
}

function stateCue(project) {
  switch (stateTone(project)) {
    case "live":
      return "Live";
    case "shipped":
      return "Shipped";
    case "wip":
      return "In progress";
    default:
      return "Archived";
  }
}

// Anchor the overlay to its source record so an edge record never pushes
// it off-screen (§4): 01–02 grow right, 07–08 grow left, the rest centred.
function overlayAlign(index) {
  const n = Number.parseInt(index, 10) || 0;
  if (n <= 2) return "left";
  if (n >= 7) return "right";
  return "center";
}

function ProjectsSection() {
  const revealRef = useReveal();

  return (
    <section
      id="projects"
      className="section"
      aria-labelledby="projects-title"
      ref={revealRef}
    >
      <div className="frame">
        <span className="section__eyebrow">ARCHIVE // 02</span>
        <h2 id="projects-title" className="section__title">
          The build archive
        </h2>
        <p className="section__intro">
          Eight records — full-stack apps, developer tools and AI-assisted
          systems. Open one for the full page.
        </p>

        <ol className="archive-shelf">
          {archiveProjects.map((project) => {
            const shortTitle = project.shortTitle ?? project.title;
            const status = project.status ?? project.availability ?? "—";

            return (
              <li
                className="archive-record"
                key={project.slug}
                data-state={stateTone(project)}
              >
                <a
                  className="archive-record__link"
                  href={`/projects/${project.slug}`}
                  aria-label={`${project.title} — open project file`}
                >
                  {/* resting 8-column slot */}
                  <span className="archive-record__rest">
                    <span className="archive-record__filing">
                      <span className="archive-record__num">
                        {project.index}
                      </span>
                      {project.featured && (
                        <span className="archive-record__flag">Flagship</span>
                      )}
                    </span>

                    <span className="archive-record__title">{shortTitle}</span>

                    <span className="archive-record__state">
                      <span
                        className="archive-record__dot"
                        aria-hidden="true"
                      />
                      {stateCue(project)}
                    </span>
                  </span>

                  {/* hover/focus overlay — same project, larger, out of flow */}
                  <span
                    className="archive-record__overlay"
                    data-align={overlayAlign(project.index)}
                    aria-hidden="true"
                  >
                    <span className="archive-record__filing">
                      <span className="archive-record__num">
                        {project.index}
                      </span>
                      {project.featured && (
                        <span className="archive-record__flag">Flagship</span>
                      )}
                    </span>

                    <span className="archive-record__ov-title">
                      {project.title}
                    </span>

                    <span className="archive-record__ov-status">
                      <span
                        className="archive-record__dot"
                        aria-hidden="true"
                      />
                      {status}
                    </span>

                    {project.image && (
                      <span className="archive-record__ov-shot">
                        <img
                          src={project.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                    )}

                    {project.summary && (
                      <span className="archive-record__ov-summary">
                        {project.summary}
                      </span>
                    )}

                    <span className="archive-record__ov-open">
                      Open file <span aria-hidden="true">→</span>
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

export default ProjectsSection;
