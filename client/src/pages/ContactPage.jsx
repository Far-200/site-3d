import usePageMeta from "../lib/usePageMeta";

const REACH_OUT_FOR = [
  "Internship opportunities",
  "Project collaborations",
  "Frontend or full-stack discussions",
  "Developer tool and AI project ideas",
];

const LOOKING_FOR = [
  "Hands-on development experience",
  "Strong portfolio projects",
  "Learning-driven teams",
  "Opportunities to grow as a builder",
];

const CHANNELS = [
  {
    label: "Email",
    value: "farhaabkhanff@gmail.com",
    href: "mailto:farhaabkhanff@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/Far-200",
    href: "https://github.com/Far-200",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/farhaan-khan-dev",
    href: "https://www.linkedin.com/in/farhaan-khan-dev",
    external: true,
  },
  {
    label: "Devfolio",
    value: "devfolio.co/@Farhaan_2k5",
    href: "https://devfolio.co/@Farhaan_2k5",
    external: true,
  },
];

function ContactPage() {
  usePageMeta(
    "Contact Farhaan Khan",
    "Get in touch with Farhaan Khan — open to internships, roles, collaborations, and developer-tool conversations.",
  );

  return (
    <div className="page-main" aria-labelledby="contact-heading">
      <section className="page-section">
        <div className="page-section-inner">
          <p className="section-kicker">
            <span className="status-light" />
            Open to internships &amp; roles · collaborations · cool ideas
          </p>
          <h1 id="contact-heading" className="work-title">
            Let&apos;s connect
            <span className="work-title-accent">signal, not noise</span>
          </h1>
          <p className="work-intro">
            Whether it&apos;s internships, collaborations, interesting ideas,
            or simply talking about web development, UI, AI, or
            project-building, I&apos;m always happy to connect.
          </p>

          <div className="contact-grid">
            <section className="contact-card" aria-labelledby="reach-heading">
              <h2 id="reach-heading">Reach out for</h2>
              <ul>
                {REACH_OUT_FOR.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section
              className="contact-card"
              aria-labelledby="looking-heading"
            >
              <h2 id="looking-heading">Currently looking for</h2>
              <ul>
                {LOOKING_FOR.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="contact-channels" aria-labelledby="ch-heading">
            <h2 id="ch-heading" className="section-title">
              Direct channels
            </h2>
            <ul className="channel-list">
              {CHANNELS.map(({ label, value, href, external }) => (
                <li className="channel-item" key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <span className="channel-label">{label}</span>
                    <span className="channel-value">
                      {value}
                      {external && <span aria-hidden="true"> ↗</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
