import { useEffect, useState } from "react";
import { identity, links } from "../../data/profile";
import "./CobaltHeader.css";

// Cobalt Forest Workshop — global header for the V2 homepage ("/").
//
// Structural pass: a sticky bar with the identity block left, in-page
// section nav centre/right, and Resume / GitHub utilities. Below 820px the
// nav collapses to an authored menu button that toggles a simple
// full-width panel (Escape closes it, choosing a link closes it, body
// scroll locks only while open). No scroll-spy yet — that is interaction
// polish (Step 5).

const NAV_ITEMS = [
  { label: "Work", href: "#selected-work" },
  { label: "Lab", href: "#lab" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function CobaltHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="cfw-header" data-menu-open={menuOpen ? "true" : "false"}>
      <div className="cfw-frame cfw-header__inner">
        <a className="cfw-header__identity" href="#top" onClick={closeMenu}>
          <span className="cfw-header__name">{identity.name}</span>
          <span className="cfw-header__role cfw-meta">
            {identity.role} · workshop
          </span>
        </a>

        <button
          type="button"
          className="cfw-header__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="cfw-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
        </button>

        <nav className="cfw-header__nav" aria-label="Section navigation">
          <ul className="cfw-header__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a className="cfw-header__nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="cfw-header__utils">
          <a
            className="cfw-header__util"
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            className="cfw-header__util cfw-header__util--cta"
            href={links.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Authored mobile menu (≤820px) */}
      <div
        className="cfw-menu"
        id="cfw-menu"
        data-open={menuOpen ? "true" : "false"}
      >
        <nav className="cfw-menu__nav" aria-label="Sections">
          <ul className="cfw-menu__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  className="cfw-menu__link"
                  href={item.href}
                  tabIndex={menuOpen ? undefined : -1}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="cfw-menu__utils">
          <a
            className="cfw-menu__util"
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? undefined : -1}
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            className="cfw-menu__util"
            href={links.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? undefined : -1}
            onClick={closeMenu}
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default CobaltHeader;
