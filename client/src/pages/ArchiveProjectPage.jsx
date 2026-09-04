import { useParams } from "react-router-dom";
import usePageMeta from "../lib/usePageMeta";
import { identity } from "../data/profile";
import { getProjectBySlug } from "../data/projects";
import ArchiveFooter from "../layout/ArchiveFooter";

import "../styles/tokens.css";
import "../styles/global.css";
import "../styles/responsive.css";
import "../sections/sections.css";
import "./ArchiveProjectPage.css";

// The full archive file for one project. Route: /projects/:slug.
// Rendered in the NEW archive visual language (not the legacy green
// shell). All content comes from data/projects.js — a field that is
// absent is simply not rendered; nothing is fabricated.

function stateTone(project) {
  const value = (project.status ?? project.availability ?? "").toLowerCase();
  if (value.includes("live")) return "live";
  if (value.includes("shipped")) return "shipped";
  if (value.includes("development") || value.includes("experimental")) {
    return "wip";
  }
  return "archived";
}

function TopBar() {
  return (
    <div className="project-file__bar">
      <div className="frame project-file__bar-inner">
        <a className="project-file__identity" href="/archive">
          {identity.name} <span aria-hidden="true">/</span>{" "}
          <span className="project-file__handle">{identity.handle}</span>
        </a>
        <a className="project-file__back" href="/archive#projects">
          <span aria-hidden="true">←</span> Back to archive
        </a>
      </div>
    </div>
  );
}

function ProjectNotFound() {
  usePageMeta(
    `File not found — ${identity.name}`,
    "That project record is not in the archive.",
  );

  return (
    <div className="archive project-file">
      <TopBar />
      <main className="frame project-file__main">
        <p className="section__eyebrow">ARCHIVE FILE // —</p>
        <h1 className="project-file__title">No such file</h1>
        <p className="project-file__lead">
          That project record isn&rsquo;t in the archive. It may have been
          renamed or removed.
        </p>
        <a className="link-cta" href="/archive#projects">
          Back to the archive <span aria-hidden="true">→</span>
        </a>
      </main>
      <ArchiveFooter />
    </div>
  );
}

function ProjectFile({ project }) {
  usePageMeta(
    `${project.shortTitle ?? project.title} — archive file — ${identity.name}`,
    project.summary,
  );

  const status = project.status ?? project.availability ?? null;
  const stack = project.technologies?.length ? project.technologies : null;
  const description = project.description?.length ? project.description : null;
  const focus = project.projectFocus?.length ? project.projectFocus : null;
  const features = project.features?.length ? project.features : null;
  const learnings = project.learnings?.length ? project.learnings : null;
  const hasMeta = Boolean(status || project.role || stack);
  const hasActions = Boolean(project.liveUrl || project.githubUrl);

  return (
    <div className="archive project-file" data-state={stateTone(project)}>
      <TopBar />

      <main className="frame project-file__main" aria-labelledby="file-title">
        <p className="section__eyebrow">ARCHIVE FILE // {project.index}</p>

        <header className="project-file__head">
          <h1 id="file-title" className="project-file__title">
            {project.title}
          </h1>
          {project.eyebrow && (
            <p className="project-file__eyebrow">{project.eyebrow}</p>
          )}
          {project.summary && (
            <p className="project-file__lead">{project.summary}</p>
          )}
        </header>

        {project.image && (
          <figure className="project-file__shot">
            <img
              src={project.image}
              alt={project.imageAlt ?? `${project.title} — screenshot`}
              loading="eager"
              decoding="async"
            />
          </figure>
        )}

        {hasMeta && (
          <dl className="project-file__meta">
            {status && (
              <div>
                <dt>Status</dt>
                <dd>
                  <span className="project-file__dot" aria-hidden="true" />
                  {status}
                </dd>
              </div>
            )}
            {project.role && (
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
            )}
            {stack && (
              <div>
                <dt>Stack</dt>
                <dd>{stack.join(" · ")}</dd>
              </div>
            )}
          </dl>
        )}

        {description && (
          <section
            className="project-file__block"
            aria-labelledby="file-project"
          >
            <h2 id="file-project" className="project-file__h">
              The project
            </h2>
            {description.map((paragraph) => (
              <p key={paragraph} className="project-file__p">
                {paragraph}
              </p>
            ))}
          </section>
        )}

        {project.builtBecause && (
          <section
            className="project-file__block"
            aria-labelledby="file-because"
          >
            <h2 id="file-because" className="project-file__h">
              Built because
            </h2>
            <p className="project-file__p project-file__note">
              {project.builtBecause}
            </p>
          </section>
        )}

        {project.contribution && (
          <section
            className="project-file__block"
            aria-labelledby="file-contribution"
          >
            <h2 id="file-contribution" className="project-file__h">
              Contribution
            </h2>
            <p className="project-file__p">{project.contribution}</p>
          </section>
        )}

        {project.problem && (
          <section
            className="project-file__block"
            aria-labelledby="file-problem"
          >
            <h2 id="file-problem" className="project-file__h">
              The problem
            </h2>
            <p className="project-file__p">{project.problem}</p>
          </section>
        )}

        {focus && (
          <section className="project-file__block" aria-labelledby="file-focus">
            <h2 id="file-focus" className="project-file__h">
              What it focuses on
            </h2>
            <ul className="project-file__list">
              {focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {features && (
          <section
            className="project-file__block"
            aria-labelledby="file-features"
          >
            <h2 id="file-features" className="project-file__h">
              Features
            </h2>
            <ul className="project-file__list">
              {features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {learnings && (
          <section
            className="project-file__block"
            aria-labelledby="file-learnings"
          >
            <h2 id="file-learnings" className="project-file__h">
              What I took from it
            </h2>
            <ul className="project-file__list">
              {learnings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {hasActions && (
          <div className="project-file__actions">
            {project.liveUrl && (
              <a
                className="link-cta"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                className="link-quiet"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}

        <a
          className="project-file__back project-file__back--foot"
          href="/archive#projects"
        >
          <span aria-hidden="true">←</span> Back to archive
        </a>
      </main>

      <ArchiveFooter />
    </div>
  );
}

function ArchiveProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  return project ? (
    <ProjectFile project={project} />
  ) : (
    <ProjectNotFound />
  );
}

export default ArchiveProjectPage;
