import { useState } from "react";
import { identity, links } from "../data/profile";
import "./SiteHeader.css";

// Frozen global header (art-design.md §8).
// Phase 1: layout, styling, semantic anchor navigation and visible focus.
// Deferred to Phase 3: scroll-spy active-section tracking, and the real
// behaviour behind RM (reduced motion) / SND (sound).

const NAV_ITEMS = [
  { num: "01", label: "HOME", id: "home" },
  { num: "02", label: "PROJECTS", id: "projects" },
  { num: "03", label: "ABOUT", id: "about" },
  { num: "04", label: "STACK", id: "stack" },
  { num: "05", label: "CONTACT", id: "contact" },
];

function SiteHeader() {
  // Tiny, honest state scaffold — these toggles remember a preference but
  // are not yet wired to motion/audio systems (Phase 3).
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sound, setSound] = useState(false);

  return (
    <header className="site-header">
      <div className="frame site-header__inner">
        <a className="site-header__identity" href="#home">
          <span className="site-header__name">
            {identity.name} <span aria-hidden="true">/</span>{" "}
            <span className="site-header__handle">{identity.handle}</span>
          </span>
          <span className="site-header__sector meta-label">SECTOR // HOME</span>
        </a>

        <nav className="site-header__nav" aria-label="Section navigation">
          <ul className="site-header__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  className="site-header__nav-link"
                  href={`#${item.id}`}
                  aria-current={item.id === "home" ? "true" : undefined}
                >
                  <span className="site-header__nav-num" aria-hidden="true">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="site-header__utils">
            <button
              type="button"
              className="site-header__util"
              aria-pressed={reducedMotion}
              onClick={() => setReducedMotion((v) => !v)}
            >
              RM <span aria-hidden="true">{reducedMotion ? "on" : "off"}</span>
              <span className="u-visually-hidden">
                reduced motion {reducedMotion ? "enabled" : "disabled"}
              </span>
            </button>
            <button
              type="button"
              className="site-header__util"
              aria-pressed={sound}
              onClick={() => setSound((v) => !v)}
            >
              SND <span aria-hidden="true">{sound ? "on" : "off"}</span>
              <span className="u-visually-hidden">
                sound {sound ? "enabled" : "disabled"}
              </span>
            </button>
            <a
              className="site-header__util"
              href={links.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              className="site-header__util site-header__util--mobile"
              aria-disabled="true"
              title="Mobile menu — authored in Phase 5"
            >
              Mobile
            </button>
            <button
              type="button"
              className="site-header__util"
              onClick={() => window.location.reload()}
              aria-label="Reload archive"
            >
              <span aria-hidden="true">↻</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
