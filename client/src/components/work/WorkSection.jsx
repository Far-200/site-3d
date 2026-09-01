import { Link } from "react-router-dom";
import { featuredWorkProjects } from "../../data/projects";
import FeaturedProject from "./FeaturedProject";
import ProjectRow from "./ProjectRow";

// Featured Work — used as the home-page preview. The complete archive
// (including non-featured projects) lives at /work.
function WorkSection() {
  const featuredProject = featuredWorkProjects.find((p) => p.featured);
  const secondaryProjects = featuredWorkProjects.filter((p) => !p.featured);

  return (
    <section className="work" id="work" aria-labelledby="work-heading">
      <div className="work-inner">
        <header className="work-header">
          <p className="section-kicker">Featured work</p>
          <h2 id="work-heading" className="work-title">
            Selected systems
            <span className="work-title-accent">and experiments</span>
          </h2>
          <p className="work-intro">
            Projects built to make difficult ideas easier to see, understand,
            or use.
          </p>
        </header>

        {featuredProject && <FeaturedProject project={featuredProject} />}

        <div className="work-rows">
          {secondaryProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>

        <div className="work-footer">
          <Link className="work-all-link" to="/work">
            View the complete work archive
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WorkSection;
