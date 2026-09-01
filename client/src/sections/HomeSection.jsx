import { identity, links } from "../data/profile";
import { featuredWorkProjects } from "../data/projects";

// HOME — opening state of the builder's archive (art-design.md §9).
// Phase 1: structural composition + hierarchy only. The right column is a
// static PREVIEW / SELECTED WORK shell; the portrait ↔ project preview
// crossfade and hover/focus selection are Phase 3.

function HomeSection() {
  const selected = featuredWorkProjects.slice(0, 4);

  return (
    <section
      id="home"
      className="section section--opening"
      aria-labelledby="home-title"
    >
      <div className="frame">
        <span className="section__eyebrow">SECTOR // HOME</span>

        <div className="split">
          <div>
            <h1 id="home-title" className="home__headline">
              {identity.name}
              <span className="home__role">— {identity.role}</span>
            </h1>

            <p className="home__thesis">{identity.thesis}</p>
            <p className="home__elaboration">{identity.elaboration}</p>

            <div className="home__actions">
              <a className="link-cta" href="#projects">
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

          <aside className="split__aside preview" aria-label="Selected work preview">
            <p className="meta-label">Preview</p>
            <div className="preview__frame">PORTRAIT</div>
            <p className="preview__hint">hover selected work →</p>

            <div className="selected-work">
              <p className="meta-label">Selected Work</p>
              {selected.map((project) => (
                <div className="selected-work__item" key={project.slug}>
                  <span className="selected-work__title">{project.title}</span>
                  <span className="selected-work__status">
                    {project.status ?? project.availability ?? "—"}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
