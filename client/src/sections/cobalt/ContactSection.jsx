import { cobalt, contact as frozenContact, links } from "../../data/profile";
import "./ContactSection.css";

// CONTACT — a compact closing strip, not a full chapter. Headline + one
// line of copy, then the four direct actions inline. A richer
// drawer/overlay interaction can come later; for now this just needs to
// clearly expose email, GitHub, LinkedIn, and résumé without creating a
// large empty cobalt floor.

const { contact } = cobalt;

function ContactSection() {
  return (
    <section
      className="cfw-contact cfw-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="cfw-frame cfw-contact__row">
        <div className="cfw-contact__lead">
          <h2 id="contact-title" className="cfw-contact__headline">
            <span className="cfw-ink-accent" aria-hidden="true" />
            {contact.headline}
          </h2>
          <p className="cfw-contact__body">{contact.body}</p>
        </div>

        <ul className="cfw-contact__links">
          <li>
            <a className="cfw-contact__link cfw-contact__link--primary" href={links.email}>
              Email
            </a>
          </li>
          <li>
            <a
              className="cfw-contact__link"
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="cfw-contact__link"
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="cfw-contact__link"
              href={links.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé
            </a>
          </li>
        </ul>
      </div>

      <p className="cfw-frame cfw-contact__sign">{frozenContact.closingLine}</p>
    </section>
  );
}

export default ContactSection;
