import { useState } from "react";
import { archiveProjects } from "../data/projects";
import useReveal from "../lib/useReveal";

// PROJECTS — "ARCHIVE // 02" (art-design.md §10).
//
// Desktop (>720px): fixed 8-column shelf. On hover/focus a larger preview
// of the SAME project appears as an absolute overlay inside the shelf's
// vertical band — it visually covers neighbouring records (intentional)
// but nothing reflows. Both the resting record and the overlay live
// inside ONE native <a href="/projects/:slug">, so hover stays true
// moving between them and a click anywhere navigates. Pure CSS
// (:hover / :focus-visible) — no React hover state.
//
// Mobile (≤720px, Phase 5): the shelf is hidden and an authored
// stacked-expandable archive takes its place — a real <button
// aria-expanded> per record opening ONE panel at a time (screenshot,
// summary, status, stack, explicit OPEN FILE link). Expand and navigate
// are separate actions. Both trees render from the same archiveProjects;
// CSS shows exactly one per breakpoint, so the desktop DOM is untouched.

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
  // Mobile accordion: one record open at a time (null = all collapsed).
  const [openSlug, setOpenSlug] = useState(null);

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

        {/* ---- Mobile (≤720px): authored stacked-expandable archive ---- */}
        <ol className="archive-stack" aria-label="Project archive">
          {archiveProjects.map((project) => {
            const shortTitle = project.shortTitle ?? project.title;
            const status = project.status ?? project.availability ?? "—";
            const open = openSlug === project.slug;
            const panelId = `m-record-${project.slug}`;
            const stack = project.technologies?.length
              ? project.technologies
              : null;

            return (
              <li
                className="archive-stack__record"
                key={project.slug}
                data-state={stateTone(project)}
                data-open={open ? "true" : "false"}
              >
                <button
                  type="button"
                  className="archive-stack__summary"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenSlug((current) =>
                      current === project.slug ? null : project.slug,
                    )
                  }
                >
                  <span className="archive-stack__filing">
                    <span className="archive-stack__num">{project.index}</span>
                    {project.featured && (
                      <span className="archive-stack__flag">Flagship</span>
                    )}
                  </span>
                  <span className="archive-stack__title">{shortTitle}</span>
                  <span className="archive-stack__state">
                    <span className="archive-record__dot" aria-hidden="true" />
                    {stateCue(project)}
                  </span>
                  <span className="archive-stack__chevron" aria-hidden="true" />
                </button>

                <div
                  className="archive-stack__panel"
                  id={panelId}
                  data-open={open ? "true" : "false"}
                  role="region"
                  aria-label={`${project.title} — details`}
                >
                  <div className="archive-stack__panel-inner">
                    {project.image && (
                      <span className="archive-stack__shot">
                        <img
                          src={project.image}
                          alt={project.imageAlt ?? ""}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                    )}
                    {project.summary && (
                      <p className="archive-stack__text">{project.summary}</p>
                    )}
                    <dl className="archive-stack__meta">
                      <div>
                        <dt>Status</dt>
                        <dd>{status}</dd>
                      </div>
                      {stack && (
                        <div>
                          <dt>Stack</dt>
                          <dd>{stack.join(" · ")}</dd>
                        </div>
                      )}
                    </dl>
                    <a
                      className="archive-stack__open"
                      href={`/projects/${project.slug}`}
                    >
                      Open file <span aria-hidden="true">→</span>
                    </a>
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

export default ProjectsSection;
