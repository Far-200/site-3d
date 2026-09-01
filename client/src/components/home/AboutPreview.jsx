import { Link } from "react-router-dom";

// Home-page About preview — links to the complete /about page.
function AboutPreview() {
  return (
    <section className="page-section" aria-labelledby="about-preview-heading">
      <div className="page-section-inner section-panel">
        <div className="section-panel-copy">
          <p className="section-kicker">About</p>
          <h2 id="about-preview-heading" className="section-title">
            A CSE student who ships
          </h2>
          <p className="section-body">
            I&apos;m Farhaan Khan, a Computer Science student who enjoys
            building full-stack applications, developer tools, and AI-powered
            systems that feel practical, modern, and actually useful.
          </p>
          <Link className="section-link" to="/about">
            More about me <span aria-hidden="true">→</span>
          </Link>
        </div>

        <dl className="section-panel-facts">
          <div className="fact">
            <dt>What I build</dt>
            <dd>Web apps, dev tools, portfolio projects, and AI-flavored systems.</dd>
          </div>
          <div className="fact">
            <dt>What I value</dt>
            <dd>Clean UI, practical features, modular code, and growth through shipping.</dd>
          </div>
          <div className="fact">
            <dt>Current goal</dt>
            <dd>Becoming internship-ready with a stronger portfolio and real project depth.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default AboutPreview;
