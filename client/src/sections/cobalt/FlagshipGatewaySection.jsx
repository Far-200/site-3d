import { flagshipProject } from "../../data/projects";
import "./FlagshipGatewaySection.css";

// FLAGSHIP GATEWAY — the homepage's one strong project spotlight (the
// `featured` record — currently "The Last Website"). Not a card: the
// screenshot is the primary visual artifact, sized to actually carry
// weight, sitting directly beside the copy rather than boxed inside a
// padded container. The full archive lives at /work; this is the door
// into it.

function FlagshipGatewaySection() {
  if (!flagshipProject) return null;
  const project = flagshipProject;

  return (
    <section
      className="cfw-flagship cfw-section"
      id="flagship"
      aria-labelledby="flagship-title"
    >
      <div className="cfw-frame cfw-frame--wide cfw-flagship__grid">
        <a
          className="cfw-flagship__media"
          href={`/projects/${project.slug}`}
          aria-label={`Open the ${project.title} case study`}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.imageAlt ?? `${project.title} screenshot`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="cfw-flagship__media-empty" aria-hidden="true">
              {project.title}
            </span>
          )}
        </a>

        <div className="cfw-flagship__body">
          <p className="cfw-meta cfw-flagship__kicker">
            Flagship · {project.eyebrow}
          </p>
          <h2 id="flagship-title" className="cfw-flagship__title">
            {project.title}
          </h2>
          <p className="cfw-flagship__summary">{project.summary}</p>

          {project.technologies?.length > 0 && (
            <p className="cfw-flagship__tags">
              {project.technologies.slice(0, 5).join(" · ")}
            </p>
          )}

          <div className="cfw-flagship__actions">
            <a
              className="cfw-btn cfw-btn--primary"
              href={`/projects/${project.slug}`}
            >
              View the case study <span aria-hidden="true">→</span>
            </a>
            <a className="cfw-link" href="/work">
              View all work <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FlagshipGatewaySection;
