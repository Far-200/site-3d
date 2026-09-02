import { useState } from "react";
import { about } from "../data/profile";
import { useArchivePrefs } from "../lib/archivePrefsContext";
import useReveal from "../lib/useReveal";
import Portrait from "../components/Portrait";

// ABOUT — "IDENTITY // 03" (art-design.md §11).
//
// The Personnel File collapsed state carries an authored structure — a
// file reference line and one always-visible fact as a teaser — so it
// does not read as empty; the rest is behind the Phase 3 disclosure.
// Portrait is the real photo (public/portrait.png), smaller crop.

function AboutSection() {
  const revealRef = useReveal();
  const { playCue } = useArchivePrefs();
  const [open, setOpen] = useState(false);

  const [teaser, ...rest] = about.personnel;

  return (
    <section
      id="about"
      className="section"
      aria-labelledby="about-title"
      ref={revealRef}
    >
      <div className="frame">
        <span className="section__eyebrow">IDENTITY // 03</span>

        <div className="split split--about">
          <div className="about__lead">
            <h2 id="about-title" className="section__title">
              Farhaan Khan
            </h2>
            <p className="about__statement">{about.statement}</p>

            <dl className="ledger">
              {about.meta.map((row) => (
                <div className="ledger__row" key={row.label}>
                  <dt className="ledger__label meta-label">{row.label}</dt>
                  <dd className="ledger__value">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside
            className="split__aside about__aside"
            aria-label="Personnel file"
            data-personnel-open={open ? "true" : "false"}
          >
            <figure className="about__portrait">
              <Portrait variant="about" />
            </figure>

            <div className="personnel" data-open={open ? "true" : "false"}>
              <button
                type="button"
                className="personnel__toggle-btn"
                aria-expanded={open}
                aria-controls="personnel-facts"
                onClick={() => {
                  setOpen((value) => !value);
                  playCue("toggle");
                }}
              >
                <span className="personnel__label meta-label">
                  Personnel File
                </span>
                <span className="personnel__ref" aria-hidden="true">
                  REF · FK-03
                </span>
                <span className="personnel__toggle" aria-hidden="true">
                  {open ? "▾ collapse" : "▸ expand"}
                </span>
              </button>

              {teaser && (
                <dl className="personnel__teaser">
                  <dt className="meta-label">{teaser.label}</dt>
                  <dd>{teaser.value}</dd>
                </dl>
              )}

              <div
                className="personnel__reveal"
                id="personnel-facts"
                data-open={open ? "true" : "false"}
              >
                <dl className="personnel__facts">
                  {rest.map((row) => (
                    <div className="personnel__row" key={row.label}>
                      <dt className="meta-label">{row.label}</dt>
                      <dd className="personnel__value">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
