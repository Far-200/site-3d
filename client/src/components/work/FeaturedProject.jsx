import { Link } from "react-router-dom";
import ProjectMedia from "./ProjectMedia";
import GitHubIcon from "./GitHubIcon";

// Flagship card in Featured Work. Same content skeleton as <ProjectRow>
// — concise metadata only — with a larger presentation (~20% more visual
// weight through scale and placement, not a different architecture).
// Long-form content lives on the project detail page.
function FeaturedProject({ project }) {
  const headingId = `project-${project.slug}-title`;

  return (
    <article className="featured-project" aria-labelledby={headingId}>
      <div className="featured-project-content">
        <div className="project-index-row">
          <span className="project-index">{project.index}</span>
          <span className="project-flagship-tag">Flagship</span>
        </div>

        <div className="project-meta-row">
          <span className="project-eyebrow">{project.eyebrow}</span>

          {project.availability && (
            <>
              <span className="project-meta-divider" aria-hidden="true">
                ·
              </span>
              <span className="project-availability">
                {project.availability}
              </span>
            </>
          )}

          {project.status && (
            <span className="project-status">{project.status}</span>
          )}
        </div>

        <h3 id={headingId} className="featured-project-title">
          {project.title}
        </h3>
        <p className="project-summary">{project.summary}</p>

        {project.builtBecause && (
          <p className="project-built-because">
            <span className="project-built-label">built because →</span>{" "}
            {project.builtBecause}
          </p>
        )}

        <ul
          className="tech-list project-tech-list"
          aria-label={`Technologies used in ${project.title}`}
        >
          {project.technologies.map((technology) => (
            <li className="tech-item" key={technology}>
              {technology}
            </li>
          ))}
        </ul>

        <div className="project-actions">
          <Link
            className="button button--primary"
            to={`/work/${project.slug}`}
          >
            View project
            <span aria-hidden="true">→</span>
          </Link>

          {project.githubUrl && (
            <a
              className="icon-link"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} repository on GitHub`}
            >
              <GitHubIcon size={18} />
            </a>
          )}
        </div>
      </div>

      <Link
        to={`/work/${project.slug}`}
        className="project-media-link"
        aria-hidden="true"
        tabIndex={-1}
      >
        <ProjectMedia project={project} size="large" />
      </Link>
    </article>
  );
}

export default FeaturedProject;
