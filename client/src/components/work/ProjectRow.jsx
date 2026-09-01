import { Link } from "react-router-dom";
import ProjectMedia from "./ProjectMedia";
import GitHubIcon from "./GitHubIcon";

// Standard project card — one row in Featured Work and the /work archive.
// Concise metadata only; details live on the project page.
function ProjectRow({ project }) {
  const headingId = `project-${project.slug}-title`;

  return (
    <article className="project-row" aria-labelledby={headingId}>
      <div className="project-row-index-col">
        <span className="project-index">{project.index}</span>
      </div>

      <div className="project-row-content">
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

        <h3 id={headingId} className="project-row-title">
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
            className="button button--primary button--compact"
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
              <GitHubIcon size={16} />
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
        <ProjectMedia project={project} size="row" />
      </Link>
    </article>
  );
}

export default ProjectRow;
