import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

const SOCIALS = [
  { href: "mailto:farhaabkhanff@gmail.com", label: "Email" },
  { href: "https://github.com/Far-200", label: "GitHub", external: true },
  {
    href: "https://www.linkedin.com/in/farhaan-khan-dev",
    label: "LinkedIn",
    external: true,
  },
  {
    href: "https://devfolio.co/@Farhaan_2k5",
    label: "Devfolio",
    external: true,
  },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <p className="footer-logo">
            FK<span className="brand-dot">.</span>
          </p>
          <p className="footer-statement">
            Building interactive tools, visualizers, and AI-assisted systems —
            and shipping them.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <h2 className="footer-heading">Quick links</h2>
          <ul>
            {QUICK_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-connect">
          <h2 className="footer-heading">Connect</h2>
          <ul>
            {SOCIALS.map(({ href, label, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {label}
                  {external && <span aria-hidden="true"> ↗</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Farhaan Khan</p>
        <p className="footer-console">console.log(portfolio.isLive)</p>
      </div>
    </footer>
  );
}

export default Footer;
