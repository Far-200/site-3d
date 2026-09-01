import { Link } from "react-router-dom";
import usePageMeta from "../lib/usePageMeta";

function NotFoundPage() {
  usePageMeta(
    "404 | Farhaan Khan",
    "This route doesn't exist in the portfolio.",
  );

  return (
    <section className="page-main not-found" aria-labelledby="nf-heading">
      <div className="page-section-inner">
        <p className="section-kicker">Error 404</p>
        <h1 id="nf-heading" className="work-title">
          Route not found
          <span className="work-title-accent">console.error(&quot;404&quot;)</span>
        </h1>
        <p className="section-body">
          That path doesn&apos;t resolve to anything here. The work archive is
          the best place to start.
        </p>
        <div className="hero-actions">
          <Link className="button button--primary" to="/">
            Back to home
          </Link>
          <Link className="button button--secondary" to="/work">
            Browse the work archive
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
