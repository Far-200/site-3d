import { useEffect, useState } from "react";
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
//
// Phase 5 (≤720px): the desktop nav + utilities are hidden and an
// authored button-driven mobile menu takes over — a full-height panel in
// the archive language (section index, RM/SND, Resume). Escape closes it,
// choosing a section closes it, body scroll is locked only while open,
// and the collapsed state still shows the current sector. The desktop
// composition above 720px is untouched.

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
  const [menuOpen, setMenuOpen] = useState(false);

  const activeItem =
    NAV_ITEMS.find((item) => item.id === activeId) ?? NAV_ITEMS[0];

  // While the mobile menu is open: Escape closes it and page scroll is
  // locked — restored the moment it closes or the header unmounts, so it
  // never permanently steals scroll.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
    <header className="site-header" data-menu-open={menuOpen ? "true" : "false"}>
      <div className="frame site-header__inner">
        <a className="site-header__identity" href="#home" onClick={closeMenu}>
          <span className="site-header__name">
            {identity.name} <span aria-hidden="true">/</span>{" "}
            <span className="site-header__handle">{identity.handle}</span>
          </span>
          <span className="site-header__sector meta-label">
            SECTOR // {activeItem.label}
          </span>
        </a>

        <button
          type="button"
          className="site-header__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            setMenuOpen((open) => !open);
            playCue("toggle");
          }}
        >
          <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
        </button>

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
            className="site-header__util site-header__util--icon"
            onClick={() => window.location.reload()}
            aria-label="Reload archive"
          >
            <span aria-hidden="true">↻</span>
          </button>
        </div>
      </div>
    </header>

      {/* ---- Authored mobile menu (≤720px) — a sibling of the header so
          the sticky bar (higher stacking context) keeps its Menu/Close
          toggle reachable while the panel is open. */}
      <div
        className="site-menu"
        id="site-menu"
        data-open={menuOpen ? "true" : "false"}
      >
        <nav className="site-menu__nav" aria-label="Archive sections">
          <ul className="site-menu__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  className="site-menu__link"
                  href={`#${item.id}`}
                  aria-current={item.id === activeId ? "true" : undefined}
                  tabIndex={menuOpen ? undefined : -1}
                  onClick={() => {
                    closeMenu();
                    playCue("nav");
                  }}
                >
                  <span className="site-menu__num" aria-hidden="true">
                    {item.num}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-menu__utils">
          <button
            type="button"
            className="site-menu__util"
            aria-pressed={motionReduced}
            tabIndex={menuOpen ? undefined : -1}
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
            className="site-menu__util"
            aria-pressed={soundEnabled}
            tabIndex={menuOpen ? undefined : -1}
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
          <a
            className="site-menu__util"
            href={links.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? undefined : -1}
            onClick={closeMenu}
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default SiteHeader;
