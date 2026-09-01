import { Suspense, lazy } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  getProjectBySlug,
  getProjectByLegacySlug,
  getAdjacentProjects,
} from "../data/projects";
import GitHubIcon from "../components/work/GitHubIcon";
import ProjectMedia from "../components/work/ProjectMedia";
import usePageMeta from "../lib/usePageMeta";
import { supportsWebGL } from "../lib/webgl";

// The 3D motif is the only WebGL cost on detail pages — load it lazily.
const ProjectMotif = lazy(() => import("../three/ProjectMotif"));

// Meta hooks can't be called conditionally, so the real page body is a
// child component that only mounts once the project is resolved.
function ProjectDetail({ project }) {
  usePageMeta(
    `${project.shortTitle} | Farhaan Khan`,
    project.summary,
  );

  const { previous, next } = getAdjacentProjects(project.slug);
  const hasStory = Boolean(project.problem || project.contribution);
  const webgl = supportsWebGL();

  return (
    <article
      className="project-page page-main"
      aria-labelledby="project-heading"
    >
      <div className="page-section-inner">
        <nav className="project-page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/work" className="section-link section-link--back">
            <span aria-hidden="true">←</span> Back to work
          </Link>
        </nav>

        <header className="project-page-hero">
          <div className="project-page-hero-copy">
            <div className="project-index-row">
              <span className="project-index">{project.index}</span>
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

            <h1 id="project-heading" className="project-page-title">
              {project.title}
            </h1>
            <p className="project-summary project-page-summary">
              {project.summary}
            </p>

            {project.role && (
              <p className="project-role">
                <span>Role</span>
                {project.role}
              </p>
            )}

            <div className="project-actions project-page-actions">
              {project.githubUrl && (
                <a
                  className="button button--primary"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon size={16} />
                  Repository
                </a>
              )}

              {project.liveUrl && (
                <a
                  className="button button--secondary"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live demo
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>

          <div className="project-page-hero-visual">
            {webgl ? (
              <Suspense
                fallback={<div className="motif-frame" aria-hidden="true" />}
              >
                <ProjectMotif
                  preset={project.scenePreset}
                  label={`Abstract 3D motif for ${project.shortTitle}`}
                />
              </Suspense>
            ) : (
              <ProjectMedia project={project} size="large" />
            )}
          </div>
        </header>

        <div className="project-page-grid">
          {project.description?.length > 0 && (
            <section
              className="project-block project-block--main"
              aria-labelledby="overview-heading"
            >
              <h2 id="overview-heading">Overview</h2>
              {project.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          )}

          <section
            className="project-block project-block--side"
            aria-labelledby="stack-heading"
          >
            <h2 id="stack-heading">Technology stack</h2>
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

            {project.builtBecause && (
              <p className="project-built-because">
                <span className="project-built-label">built because →</span>{" "}
                {project.builtBecause}
              </p>
            )}
          </section>
        </div>

        {hasStory && (
          <section
            className="project-block"
            aria-labelledby="story-heading"
          >
            <h2 id="story-heading">The problem &amp; my contribution</h2>
            <div className="project-detail-grid">
              {project.problem && (
                <div className="project-detail">
                  <h3>Problem</h3>
                  <p>{project.problem}</p>
                </div>
              )}
              {project.contribution && (
                <div className="project-detail">
                  <h3>My contribution</h3>
                  <p>{project.contribution}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {project.features?.length > 0 && (
          <section className="project-block" aria-labelledby="features-heading">
            <h2 id="features-heading">Key features</h2>
            <ul className="feature-grid">
              {project.features.map((feature) => (
                <li className="feature-card" key={feature}>
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.projectFocus?.length > 0 && (
          <section className="project-block" aria-labelledby="focus-heading">
            <h2 id="focus-heading">Project focus</h2>
            <ul className="feature-grid feature-grid--focus">
              {project.projectFocus.map((focus) => (
                <li className="feature-card" key={focus}>
                  {focus}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.gallery?.length > 0 && (
          <section className="project-block" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading">Screenshots</h2>
            <div className="project-gallery">
              {project.gallery.map((item) => (
                <figure className="project-gallery-item" key={item.src}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  {item.caption && <figcaption>{item.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.learnings?.length > 0 && (
          <section className="project-block" aria-labelledby="learned-heading">
            <h2 id="learned-heading">What I learned</h2>
            <ul className="project-learnings">
              {project.learnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {project.nextImprovements && (
          <section className="project-block" aria-labelledby="next-heading">
            <h2 id="next-heading">Next improvements</h2>
            <p>{project.nextImprovements}</p>
          </section>
        )}

        <nav className="project-pagination" aria-label="More projects">
          {previous && (
            <Link
              className="project-pagination-link"
              to={`/work/${previous.slug}`}
            >
              <span className="project-pagination-label">
                <span aria-hidden="true">←</span> Previous
              </span>
              <span className="project-pagination-title">
                {previous.shortTitle}
              </span>
            </Link>
          )}
          {next && (
            <Link
              className="project-pagination-link project-pagination-link--next"
              to={`/work/${next.slug}`}
            >
              <span className="project-pagination-label">
                Next <span aria-hidden="true">→</span>
              </span>
              <span className="project-pagination-title">
                {next.shortTitle}
              </span>
            </Link>
          )}
        </nav>

        <aside className="contact-cta contact-cta--project">
          <h2 className="section-title">Want to talk about work like this?</h2>
          <p className="section-body">
            I&apos;m open to internships, collaborations, and developer-tool
            conversations.
          </p>
          <div className="hero-actions contact-cta-actions">
            <a
              className="button button--primary"
              href="mailto:farhaabkhanff@gmail.com"
            >
              Email me
            </a>
            <Link className="button button--secondary" to="/contact">
              Contact page
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}

// Route component: resolves canonical slugs, redirects legacy slugs, and
// 404s unknown ones.
function ProjectDetailPage() {
  const { slug } = useParams();

  const project = getProjectBySlug(slug);
  if (project) return <ProjectDetail project={project} />;

  const legacyTarget = getProjectByLegacySlug(slug);
  if (legacyTarget) {
    return <Navigate to={`/work/${legacyTarget.slug}`} replace />;
  }

  return <Navigate to="/404" replace />;
}

export default ProjectDetailPage;
