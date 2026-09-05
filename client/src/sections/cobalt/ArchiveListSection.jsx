import { homepageLabProjects } from "../../data/projects";
import "./ArchiveListSection.css";

// ARCHIVE LIST — "smaller archive/projects underneath" on /work: the
// records without `homepageFlagship`, presented as plain editorial rows
// (title, eyebrow, stack, link) sitting directly on the canvas — no card
// boxes. Deliberately quieter than the flagship rows above and distinct
// from the Lab page's workshop-bench treatment of the same data.

function ArchiveListSection() {
  return (
    <section className="cfw-archive-list cfw-section" aria-labelledby="archive-list-title">
      <div className="cfw-frame">
        <div className="cfw-section__head cfw-section__head--tight">
          <p className="cfw-meta">More from the archive</p>
          <h2 id="archive-list-title" className="cfw-archive-list__title">
            Smaller builds, same discipline
          </h2>
        </div>

        <ol className="cfw-archive-list__rows">
          {homepageLabProjects.map((project) => (
            <li className="cfw-archive-list__row" key={project.slug}>
              <a className="cfw-archive-list__link" href={`/projects/${project.slug}`}>
                <span className="cfw-archive-list__index cfw-meta">
                  {project.index}
                </span>
                <span className="cfw-archive-list__name">
                  {project.title}
                </span>
                <span className="cfw-archive-list__eyebrow cfw-meta">
                  {project.eyebrow}
                </span>
                <span className="cfw-archive-list__go" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ArchiveListSection;
