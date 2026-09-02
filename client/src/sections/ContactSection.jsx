import { contact, links } from "../data/profile";
import { useArchivePrefs } from "../lib/archivePrefsContext";
import useReveal from "../lib/useReveal";

// CONTACT — "COMMS // 05" (art-design.md §13).
//
// Phase 4.5: the finale is recomposed as a two-column close — headline +
// metadata on the left, an intentionally-placed action stack on the right
// with Email as the primary action (address shown). The terminal-style
// ArchiveFooter follows immediately with no dead region. Frozen content is
// unchanged.

function ContactSection() {
  const revealRef = useReveal();
  const { playCue } = useArchivePrefs();

  return (
    <section
      id="contact"
      className="section section--closing"
      aria-labelledby="contact-title"
      ref={revealRef}
    >
      <div className="frame">
        <span className="section__eyebrow">COMMS // 05</span>

        <div className="contact__grid">
          <div className="contact__lead">
            <h2 id="contact-title" className="contact__headline">
              {contact.headline}
            </h2>

            <dl className="ledger contact__meta">
              {contact.meta.map((row) => (
                <div className="ledger__row" key={row.label}>
                  <dt className="ledger__label meta-label">{row.label}</dt>
                  <dd className="ledger__value">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="contact__actions">
            <a
              className="contact__primary"
              href={links.email}
              onClick={() => playCue("select")}
            >
              <span className="contact__primary-label">Email</span>
              <span className="contact__primary-value">
                {links.emailAddress} <span aria-hidden="true">↗</span>
              </span>
            </a>

            <ul className="contact__secondary">
              <li>
                <a
                  className="link-quiet"
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  className="link-quiet"
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  className="link-quiet"
                  href={links.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="contact__closing">{contact.closingLine}</p>
      </div>
    </section>
  );
}

export default ContactSection;
