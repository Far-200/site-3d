import { contact, links } from "../data/profile";

// CONTACT — "COMMS // 05" (art-design.md §13). Clean ending + real CTA.

function ContactSection() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="frame">
        <span className="section__eyebrow">COMMS // 05</span>
        <h2 id="contact-title" className="contact__headline">
          {contact.headline}
        </h2>

        <dl className="meta-list" style={{ marginTop: "var(--space-lg)" }}>
          {contact.meta.map((row) => (
            <div className="meta-list__row" key={row.label}>
              <dt className="meta-label">{row.label}</dt>
              <dd className="meta-list__value">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="contact__actions">
          <a className="link-cta" href={links.email}>
            Email <span aria-hidden="true">↗</span>
          </a>
          <a
            className="link-quiet"
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            className="link-quiet"
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a
            className="link-quiet"
            href={links.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p className="contact__closing">{contact.closingLine}</p>
      </div>
    </section>
  );
}

export default ContactSection;
