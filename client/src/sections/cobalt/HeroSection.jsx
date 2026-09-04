import { cobalt, links } from "../../data/profile";
import "./HeroSection.css";

// HERO — opening state of the workshop. Structural pass: a two-column
// frame on desktop (copy left, a quiet "workbench" note card right),
// single column on mobile. Personality comes from the copy now; paper /
// ink / halftone treatment is the later decoration layer.

const { hero } = cobalt;

function HeroSection() {
  return (
    <section className="cfw-hero cfw-section" id="top" aria-labelledby="hero-title">
      <div className="cfw-frame cfw-hero__grid">
        <div className="cfw-hero__lead">
          <p className="cfw-hero__kicker cfw-meta">{hero.kicker}</p>

          <h1 id="hero-title" className="cfw-hero__headline">
            {hero.headline}
          </h1>

          <p className="cfw-hero__sub">{hero.lead}</p>
          <p className="cfw-hero__body">{hero.body}</p>

          <div className="cfw-hero__actions">
            <a className="cfw-btn cfw-btn--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label} <span aria-hidden="true">→</span>
            </a>
            <a className="cfw-btn cfw-btn--ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <aside className="cfw-hero__aside" aria-label="Workshop status">
          <p className="cfw-meta cfw-hero__aside-label">On the bench</p>
          <ul className="cfw-hero__bench">
            <li>
              <span className="cfw-hero__bench-k cfw-meta">Building</span>
              <span className="cfw-hero__bench-v">
                Full-stack apps &amp; developer tools
              </span>
            </li>
            <li>
              <span className="cfw-hero__bench-k cfw-meta">Learning</span>
              <span className="cfw-hero__bench-v">
                Data structures — C++ fundamentals
              </span>
            </li>
            <li>
              <span className="cfw-hero__bench-k cfw-meta">Open to</span>
              <span className="cfw-hero__bench-v">
                Internships &amp; real dev work
              </span>
            </li>
          </ul>
          <a
            className="cfw-link cfw-hero__aside-link"
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/Far-200 <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>
    </section>
  );
}

export default HeroSection;
