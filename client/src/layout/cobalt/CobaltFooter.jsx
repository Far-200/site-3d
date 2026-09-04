import { footer, links } from "../../data/profile";
import "./CobaltFooter.css";

// Cobalt Forest Workshop — slim bottom edge. The emotional close lives in
// ContactSection; this is just the physical footer: wordmark, quick links,
// year. No dead region beneath it.

function CobaltFooter() {
  return (
    <footer className="cfw-footer">
      <div className="cfw-frame cfw-footer__inner">
        <span className="cfw-footer__mark">{footer.domain}</span>

        <ul className="cfw-footer__links">
          <li>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={links.email}>Email</a>
          </li>
        </ul>

        <span className="cfw-footer__meta cfw-meta">
          Built late, shipped anyway · {footer.year}
        </span>
      </div>
    </footer>
  );
}

export default CobaltFooter;
