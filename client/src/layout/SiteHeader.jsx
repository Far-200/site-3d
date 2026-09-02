import { identity, links } from "../data/profile";
import { useArchivePrefs } from "../lib/archivePrefsContext";
import useActiveSection from "../lib/useActiveSection";
import "./SiteHeader.css";

// Frozen global header (art-design.md §8).
//
// Phase 4.6: the inner bar is a 3-column grid — `auto minmax(0,1fr) auto`
// — so the identity keeps its natural width and never gets crushed into a
// wrapping stack; only the middle nav column flexes. Identity, nav list
// and utilities are direct grid children. Height is driven by
// --header-h, which the sections' scroll-margin-top mirrors.

const NAV_ITEMS = [
  { num: "01", label: "HOME", id: "home" },
  { num: "02", label: "PROJECTS", id: "projects" },
  { num: "03", label: "ABOUT", id: "about" },
  { num: "04", label: "STACK", id: "stack" },
  { num: "05", label: "CONTACT", id: "contact" },
];

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

function SiteHeader() {
  const activeId = useActiveSection(NAV_IDS);
  const { motionReduced, soundEnabled, toggleMotion, toggleSound, playCue } =
    useArchivePrefs();

  const activeItem =
    NAV_ITEMS.find((item) => item.id === activeId) ?? NAV_ITEMS[0];

  return (
    <header className="site-header">
      <div className="frame site-header__inner">
        <a className="site-header__identity" href="#home">
          <span className="site-header__name">
            {identity.name} <span aria-hidden="true">/</span>{" "}
            <span className="site-header__handle">{identity.handle}</span>
          </span>
          <span className="site-header__sector meta-label">
            SECTOR // {activeItem.label}
          </span>
        </a>

        <nav className="site-header__nav" aria-label="Section navigation">
          <ul className="site-header__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  className="site-header__nav-link"
                  href={`#${item.id}`}
                  aria-current={item.id === activeId ? "true" : undefined}
                  onClick={() => playCue("nav")}
                >
                  <span className="site-header__nav-num" aria-hidden="true">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__utils">
          <span className="site-header__toggles">
            <button
              type="button"
              className="site-header__util site-header__util--toggle"
              aria-pressed={motionReduced}
              onClick={() => {
                toggleMotion();
                playCue("toggle");
              }}
            >
              RM <span aria-hidden="true">{motionReduced ? "ON" : "OFF"}</span>
              <span className="u-visually-hidden">
                reduced motion {motionReduced ? "enabled" : "disabled"}
              </span>
            </button>
            <button
              type="button"
              className="site-header__util site-header__util--toggle"
              aria-pressed={soundEnabled}
              onClick={() => {
                toggleSound();
                playCue("toggle");
              }}
            >
              SND <span aria-hidden="true">{soundEnabled ? "ON" : "OFF"}</span>
              <span className="u-visually-hidden">
                archive sound {soundEnabled ? "enabled" : "disabled"}
              </span>
            </button>
          </span>
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
            className="site-header__util site-header__util--icon"
            onClick={() => window.location.reload()}
            aria-label="Reload archive"
          >
            <span aria-hidden="true">↻</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
