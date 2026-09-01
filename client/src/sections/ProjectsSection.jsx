import { archiveProjects } from "../data/projects";

// PROJECTS — "ARCHIVE // 02" (art-design.md §10).
// Phase 1: the resting composition only — a static horizontal-archive
// shelf listing every record with number / category / title / status.
// The hover/focus/tap accordion expansion and archive depth are Phase 3/4.

function ProjectsSection() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="frame">
        <span className="section__eyebrow">ARCHIVE // 02</span>
        <h2 id="projects-title" className="section__title">
          The build archive
        </h2>
        <p className="section__intro">
          Eight records. Full-stack apps, developer tools, and AI-assisted
          systems — each one shipped, or close to it.
        </p>

        <ol className="archive-shelf">
          {archiveProjects.map((project) => (
            <li className="archive-record" key={project.slug}>
              <span className="archive-record__num">{project.index}</span>
              <span className="archive-record__body">
                <span className="archive-record__cat">
                  {project.featured ? "FLAGSHIP" : project.eyebrow}
                </span>
                <span className="archive-record__title">{project.title}</span>
              </span>
              <span className="archive-record__status">
                {project.status ?? project.availability ?? "—"}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ProjectsSection;
