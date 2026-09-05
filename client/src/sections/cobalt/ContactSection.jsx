import { cobalt, contact as frozenContact, links } from "../../data/profile";
import "./ContactSection.css";

// CONTACT — the close. Structural pass: a strong closing statement, the
// availability facts, and direct contact options with Email as the
// primary action. The slim CobaltFooter follows immediately.

const { contact } = cobalt;

function ContactSection() {
  return (
    <section
      className="cfw-contact cfw-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="cfw-frame cfw-contact__grid">
        <div className="cfw-contact__lead">
          <p className="cfw-meta">{contact.kicker}</p>
          <h2 id="contact-title" className="cfw-contact__headline">
            <span className="cfw-ink-accent" aria-hidden="true" />
            {contact.headline}
          </h2>
          <p className="cfw-contact__body">{contact.body}</p>

          <dl className="cfw-contact__facts">
            {frozenContact.meta.map((row) => (
              <div className="cfw-contact__fact" key={row.label}>
                <dt className="cfw-meta">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="cfw-contact__actions">
          <a className="cfw-contact__primary" href={links.email}>
            <span className="cfw-meta">Email</span>
            <span className="cfw-contact__primary-val">
              {links.emailAddress} <span aria-hidden="true">↗</span>
            </span>
          </a>

          <ul className="cfw-contact__secondary">
            <li>
              <a
                className="cfw-link"
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                className="cfw-link"
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                className="cfw-link"
                href={links.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Résumé <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="cfw-frame cfw-contact__sign">{frozenContact.closingLine}</p>
    </section>
  );
}

export default ContactSection;
