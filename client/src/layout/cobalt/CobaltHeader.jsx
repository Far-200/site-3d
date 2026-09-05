import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { identity, links } from "../../data/profile";
import "./CobaltHeader.css";

// Cobalt Forest Workshop — global header shared by every workshop page
// ("/", "/work", "/lab", "/about"). A sticky bar with the identity block
// left, route nav centre/right, and Resume / GitHub utilities. Below
// 820px the nav collapses to an authored menu button that toggles a
// simple full-width panel (Escape closes it, choosing a link closes it,
// body scroll locks only while open). No scroll-spy yet — that is
// interaction polish (later pass).

const NAV_ITEMS = [
  { label: "Work", to: "/work" },
  { label: "Lab", to: "/lab" },
  { label: "About", to: "/about" },
];
// Contact has no dedicated route yet — it's a compact closing section on
// the homepage, so it stays a plain hash link rather than a NavLink.
const CONTACT_HREF = "/#contact";

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
        <NavLink className="cfw-header__identity" to="/" end onClick={closeMenu}>
          <span className="cfw-header__name">
            <span className="cfw-mark" aria-hidden="true" />
            {identity.name}
          </span>
          <span className="cfw-header__role cfw-meta">
            {identity.role} · workshop
          </span>
        </NavLink>

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

        <nav className="cfw-header__nav" aria-label="Site navigation">
          <ul className="cfw-header__nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    `cfw-header__nav-link${isActive ? " cfw-header__nav-link--active" : ""}`
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a className="cfw-header__nav-link" href={CONTACT_HREF}>
                Contact
              </a>
            </li>
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
        <nav className="cfw-menu__nav" aria-label="Site navigation">
          <ul className="cfw-menu__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    `cfw-menu__link${isActive ? " cfw-menu__link--active" : ""}`
                  }
                  to={item.to}
                  tabIndex={menuOpen ? undefined : -1}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                className="cfw-menu__link"
                href={CONTACT_HREF}
                tabIndex={menuOpen ? undefined : -1}
                onClick={closeMenu}
              >
                Contact
              </a>
            </li>
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
