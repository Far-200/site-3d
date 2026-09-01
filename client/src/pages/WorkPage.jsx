import { archiveProjects } from "../data/projects";
import ProjectRow from "../components/work/ProjectRow";
import usePageMeta from "../lib/usePageMeta";

// Complete work archive — every genuine project, featured or not.
function WorkPage() {
  usePageMeta(
    "Projects | Farhaan Khan",
    "The complete archive of Farhaan Khan's projects — learning systems, visualizers, developer utilities, and experiments.",
  );

  return (
    <section className="work page-main" aria-labelledby="work-archive-heading">
      <div className="work-inner">
        <header className="work-header">
          <p className="section-kicker">Work / complete archive</p>
          <h1 id="work-archive-heading" className="work-title">
            Everything shipped
            <span className="work-title-accent">and still shipping</span>
          </h1>
          <p className="work-intro">
            The full project archive — flagship systems, developer utilities,
            and experiments. Each one has its own page with the complete
            story.
          </p>
        </header>

        <div className="work-rows work-rows--archive">
          {archiveProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>

        <div className="work-footer">
          <a
            className="work-all-link"
            href="https://github.com/Far-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all repositories on GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default WorkPage;
