import { footer } from "../data/profile";
import "./ArchiveFooter.css";

// The physical bottom edge of the archive (art-design.md §13).
// Understated terminal-style system copy. No giant dead region beneath it.

function ArchiveFooter() {
  return (
    <footer className="archive-footer">
      <div className="frame archive-footer__inner">
        <span className="archive-footer__domain">{footer.domain}</span>
        <p className="archive-footer__lines">
          {footer.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <span className="archive-footer__year">{footer.year}</span>
      </div>
    </footer>
  );
}

export default ArchiveFooter;
