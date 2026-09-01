import { about } from "../data/profile";
import portrait from "../assets/hero.png";

// ABOUT — "IDENTITY // 03" (art-design.md §11).
// Phase 1: identity copy + supporting metadata + a deliberately small
// portrait. The Personnel File is shown as a static label + flat facts;
// its expansion / foreground record motion is Phase 3/4.

function AboutSection() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="frame">
        <span className="section__eyebrow">IDENTITY // 03</span>

        <div className="split">
          <div>
            <h2 id="about-title" className="section__title">
              Farhaan Khan
            </h2>
            <p className="about__statement">{about.statement}</p>

            <dl className="meta-list" style={{ marginTop: "var(--space-lg)" }}>
              {about.meta.map((row) => (
                <div className="meta-list__row" key={row.label}>
                  <dt className="meta-label">{row.label}</dt>
                  <dd className="meta-list__value">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="split__aside" aria-label="Personnel file">
            <figure className="about__portrait">
              <img
                src={portrait}
                alt="Farhaan Khan"
                width="800"
                height="1000"
                loading="lazy"
              />
            </figure>

            <div className="personnel">
              <p className="meta-label">Personnel File</p>
              <span className="personnel__hint">▸ expand</span>
            </div>

            <dl className="meta-list" style={{ marginTop: "var(--space-md)" }}>
              {about.personnel.map((row) => (
                <div className="meta-list__row" key={row.label}>
                  <dt className="meta-label">{row.label}</dt>
                  <dd className="meta-list__value">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
