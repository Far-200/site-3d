import { Link } from "react-router-dom";

// Closing call-to-action on the home page (and reused below project
// details via the same styling class family).
function ContactCta() {
  return (
    <section className="page-section" aria-labelledby="contact-cta-heading">
      <div className="page-section-inner contact-cta">
        <p className="section-kicker">Contact</p>
        <h2 id="contact-cta-heading" className="section-title">
          Let&apos;s build something useful
        </h2>
        <p className="section-body">
          Open to internships &amp; roles, project collaborations, and
          conversations about developer tools, UI, and AI.
        </p>
        <div className="hero-actions contact-cta-actions">
          <a
            className="button button--primary"
            href="mailto:farhaabkhanff@gmail.com"
          >
            Email me
          </a>
          <Link className="button button--secondary" to="/contact">
            All contact options
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ContactCta;
