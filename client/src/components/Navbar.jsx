import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  // Close on Escape and return focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const navLinkClass = ({ isActive }) =>
    `nav-link${isActive ? " nav-link--active" : ""}`;

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <NavLink className="brand" to="/" aria-label="Farhaan Khan — home">
          FK<span className="brand-dot">.</span>
        </NavLink>

        <nav className="site-nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass}>
              {label}
            </NavLink>
          ))}

          <a
            className="nav-link nav-link--external"
            href="https://github.com/Far-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <span aria-hidden="true">↗</span>
          </a>

          <a
            className="nav-button"
            href="https://www.linkedin.com/in/farhaan-khan-dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Let&apos;s connect
          </a>
        </nav>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle-lines" aria-hidden="true" />
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={navLinkClass}
            onClick={closeMenu}
          >
            {label}
          </NavLink>
        ))}
        <a
          className="nav-link nav-link--external"
          href="https://github.com/Far-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
