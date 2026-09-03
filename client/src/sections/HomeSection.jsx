import { useRef, useState } from "react";
import { identity, links } from "../data/profile";
import { featuredWorkProjects } from "../data/projects";
import useReveal from "../lib/useReveal";
import Portrait from "../components/Portrait";

// HOME — opening state of the builder's archive (art-design.md §9).
//
// Hierarchy: a compact mono identity line (name is metadata), then the
// large editorial-serif thesis as the visual hero, a supporting
// paragraph, a burnt-orange primary CTA and quieter secondary actions.
// Right: one narrow / tall PREVIEW panel — the portrait fills a
// portrait-oriented media region with a single in-image caption; Selected
// Work rows sit beneath as real links to /projects/:slug (hover/focus
// previews, click navigates). Reduced motion swaps instantly.

const PORTRAIT_CAPTION = "// debugging life choices_";

function projectStatus(project) {
  return project.status ?? project.availability ?? "—";
}

function HomeSection() {
  const revealRef = useReveal();
  const selected = featuredWorkProjects.slice(0, 4);
  const [activeSlug, setActiveSlug] = useState(null);
  // Which row a touch has already "armed" for navigation. A ref, not
  // state, so it is authoritative inside the click handler regardless of
  // the focus-driven re-render that a tap also triggers.
  const armedSlug = useRef(null);

  const active = selected.find((p) => p.slug === activeSlug) ?? null;

  const clearActive = () => {
    setActiveSlug(null);
    armedSlug.current = null;
  };

  const clearIfLeaving = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      clearActive();
    }
  };

  // Touch / no-hover: the first tap on a Selected Work row previews the
  // project (no navigation); a second tap on the same, now-armed row
  // follows the link. On hover devices the row navigates on the first
  // click, exactly as before. Keeps taps unambiguous (art-design.md §9).
  const handleSelectedClick = (event, slug) => {
    const coarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: none)").matches;
    if (!coarse) return;
    if (armedSlug.current === slug) {
      armedSlug.current = null; // let this tap navigate
      return;
    }
    event.preventDefault();
    armedSlug.current = slug;
    setActiveSlug(slug);
  };

  return (
    <section
      id="home"
      className="section section--opening"
      aria-labelledby="home-title"
      ref={revealRef}
    >
      <div className="frame">
        <span className="section__eyebrow">SECTOR // HOME</span>

        <div className="split split--home">
          <div className="home__lead">
            <p className="home__identity">
              <span className="home__identity-name">{identity.name}</span>
              <span aria-hidden="true"> — </span>
              {identity.role}
            </p>

            <h1 id="home-title" className="home__thesis">
              {identity.thesis}
            </h1>

            <p className="home__elaboration">{identity.elaboration}</p>

            <div className="home__actions">
              <a className="home__cta" href="#projects">
                View Projects <span aria-hidden="true">→</span>
              </a>
              <a
                className="link-quiet"
                href={links.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume <span aria-hidden="true">↗</span>
              </a>
              <a className="link-quiet" href="#contact">
                Contact
              </a>
              <a
                className="link-quiet"
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside
            className="split__aside preview"
            aria-label="Selected work preview"
            data-preview-active={active ? "true" : "false"}
            onMouseLeave={clearActive}
            onBlur={clearIfLeaving}
          >
            <div className="preview__head">
              <p className="meta-label">Preview</p>
              <p className="preview__hint">
                {active ? "selected work" : "select work →"}
              </p>
            </div>

            <div className="preview__stage">
              <div
                className="preview__portrait"
                data-active={active ? "false" : "true"}
                aria-hidden={active ? "true" : undefined}
              >
                <Portrait variant="home" eager />
                <span className="preview__portrait-caption" aria-hidden="true">
                  {PORTRAIT_CAPTION}
                </span>
              </div>

              <div
                className="preview__project"
                data-active={active ? "true" : "false"}
                data-has-image={active?.image ? "true" : "false"}
                aria-hidden={active ? undefined : "true"}
              >
                {active && (
                  <>
                    {active.image && (
                      <span className="preview__shot">
                        <img
                          src={active.image}
                          alt={active.imageAlt ?? `${active.title} screenshot`}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                    )}
                    <span className="preview__project-body">
                      <span className="preview__project-cat meta-label">
                        {active.featured ? "FLAGSHIP" : active.eyebrow}
                      </span>
                      <span className="preview__project-title">
                        {active.title}
                      </span>
                      <span className="preview__project-status">
                        <span
                          className="archive-record__dot"
                          aria-hidden="true"
                        />
                        {projectStatus(active)}
                      </span>
                      {!active.image && (
                        <span className="preview__project-summary">
                          {active.summary}
                        </span>
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="selected-work">
              <p className="meta-label" id="selected-work-label">
                Selected Work
              </p>
              <ul
                className="selected-work__list"
                aria-labelledby="selected-work-label"
              >
                {selected.map((project) => {
                  const isActive = project.slug === activeSlug;
                  return (
                    <li key={project.slug}>
                      <a
                        className="selected-work__item"
                        href={`/projects/${project.slug}`}
                        aria-label={`${project.title} — open project file`}
                        data-active={isActive ? "true" : undefined}
                        onMouseEnter={() => setActiveSlug(project.slug)}
                        onFocus={() => setActiveSlug(project.slug)}
                        onClick={(event) =>
                          handleSelectedClick(event, project.slug)
                        }
                      >
                        <span className="selected-work__idx">
                          {project.index}
                        </span>
                        <span className="selected-work__line">
                          <span className="selected-work__title">
                            {project.shortTitle ?? project.title}
                          </span>
                          <span className="selected-work__status">
                            {projectStatus(project)}
                          </span>
                        </span>
                        <span className="selected-work__go" aria-hidden="true">
                          Open <span>→</span>
                        </span>
                        <span
                          className="selected-work__cue"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
