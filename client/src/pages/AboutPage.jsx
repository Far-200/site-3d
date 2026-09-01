import { Link } from "react-router-dom";
import usePageMeta from "../lib/usePageMeta";

const HIGHLIGHTS = [
  {
    title: "What I build",
    text: "Web apps, dev tools, portfolio projects, and AI-flavored systems.",
  },
  {
    title: "What I value",
    text: "Clean UI, practical features, modular code, and growth through shipping.",
  },
  {
    title: "Current goal",
    text: "Becoming internship-ready with a stronger portfolio and real project depth.",
  },
];

const JOURNEY = [
  {
    title: "CSE Student",
    text: "Currently studying Computer Science and building skills through practical development, consistent learning, and hands-on projects.",
  },
  {
    title: "Project-First Learning",
    text: "I learn best by building. Instead of collecting tutorials, I turn ideas into working projects to improve design sense, logic, and coding confidence.",
  },
  {
    title: "Current Focus",
    text: "Sharpening frontend, full-stack, and problem-solving skills while exploring AI-powered systems, developer tools, and cleaner UI design.",
  },
  {
    title: "Internship Goal",
    text: "Becoming internship-ready with a stronger portfolio, better technical depth, and real projects that show I can build and ship useful things.",
  },
];

function AboutPage() {
  usePageMeta(
    "About Farhaan Khan",
    "Farhaan Khan is a Computer Science student building full-stack applications, developer tools, and AI-assisted systems.",
  );

  return (
    <div className="page-main" aria-labelledby="about-heading">
      <section className="page-section">
        <div className="page-section-inner about-layout">
          <div className="about-copy">
            <p className="section-kicker">Who I am</p>
            <h1 id="about-heading" className="work-title">
              About me
              <span className="work-title-accent">builder, not collector</span>
            </h1>

            <p className="section-body">
              I&apos;m Farhaan Khan, a Computer Science student who enjoys
              building full-stack applications, developer tools, and
              AI-powered systems that feel practical, modern, and actually
              useful.
            </p>
            <p className="section-body">
              I like working on projects where clean frontend design meets
              real functionality — whether that means building React
              interfaces, integrating APIs, experimenting with FastAPI
              backends, or shaping ideas into projects that look polished and
              feel real.
            </p>
            <p className="section-body">
              Right now, I&apos;m focused on improving as a developer through
              consistent project-building, better UI thinking, stronger
              full-stack fundamentals, and a growing interest in AI and
              security-inspired systems.
            </p>
            <p className="section-body">
              I&apos;m especially interested in growing through real projects,
              improving my full-stack workflow, and building a portfolio that
              reflects both skill and momentum.
            </p>
          </div>

          <figure className="about-photo-frame">
            <img
              src="/images/about-photo.jpg"
              alt="Farhaan Khan casual portrait"
              width="800"
              height="1063"
              loading="lazy"
            />
            <span
              className="project-media-corner project-media-corner--top-left"
              aria-hidden="true"
            />
            <span
              className="project-media-corner project-media-corner--bottom-right"
              aria-hidden="true"
            />
          </figure>
        </div>
      </section>

      <section className="page-section" aria-labelledby="highlights-heading">
        <div className="page-section-inner">
          <h2 id="highlights-heading" className="visually-hidden">
            Highlights
          </h2>
          <div className="about-highlights">
            {HIGHLIGHTS.map((card) => (
              <div className="about-highlight-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="journey-heading">
        <div className="page-section-inner">
          <p className="section-kicker">Education &amp; growth</p>
          <h2 id="journey-heading" className="section-title">
            My journey
          </h2>
          <p className="section-body">
            A quick snapshot of where I am, how I learn, and what I&apos;m
            working toward as I grow into a stronger developer.
          </p>

          <ol className="journey-timeline">
            {JOURNEY.map((item, index) => (
              <li className="journey-step" key={item.title}>
                <span className="journey-step-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="journey-step-body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="hero-actions about-actions">
            <Link className="button button--primary" to="/work">
              See what I&apos;ve built
            </Link>
            <Link className="button button--secondary" to="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
