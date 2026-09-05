import { Suspense, lazy, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import BootTerminal from "./components/BootTerminal";
import { markBooted, shouldBoot } from "./lib/boot";
import CobaltHomePage from "./pages/CobaltHomePage";
import CobaltWorkPage from "./pages/CobaltWorkPage";
import CobaltLabPage from "./pages/CobaltLabPage";
import CobaltAboutPage from "./pages/CobaltAboutPage";
import ArchivePage from "./pages/ArchivePage";
import ArchiveProjectPage from "./pages/ArchiveProjectPage";
import "./App.css";

// Route-level code splitting. The continuous archive ("/" and
// "/projects/:slug") is the real landing experience and loads eagerly.
// Every legacy classic-site route is lazy — including the legacy HomePage,
// whose dependency tree pulls in Three.js / R3F / Drei (the archive
// itself is CSS-only). Keeping it lazy keeps ~1 MB of 3D code out of the
// primary bundle; it only downloads if a visitor reaches a legacy route.
const HomePage = lazy(() => import("./pages/HomePage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const [booting, setBooting] = useState(shouldBoot);
  const location = useLocation();

  const handleBootDone = () => {
    markBooted();
    setBooting(false);
  };

  // Self-contained V2 surfaces. "/" is the Cobalt Forest Workshop
  // homepage, with "/work", "/lab", and "/about" as its routed sibling
  // pages (its own `.cfw` token scope, shared CobaltHeader/CobaltFooter).
  // The frozen continuous archive is preserved at "/archive", and it
  // still owns the canonical project detail routes "/projects/:slug".
  // Every other legacy route keeps the original shell below.
  //
  // NOTE: this claims "/work" and "/about" for the Cobalt pages, which
  // shadows the legacy classic-site WorkPage/AboutPage below — those
  // components and their data are untouched, just no longer reachable by
  // URL. A deliberate, confirmed trade-off (no route can serve two
  // different pages at once) rather than an oversight.
  if (
    location.pathname === "/" ||
    location.pathname === "/archive" ||
    location.pathname === "/work" ||
    location.pathname === "/lab" ||
    location.pathname === "/about" ||
    location.pathname.startsWith("/projects/")
  ) {
    return (
      <Routes>
        <Route path="/" element={<CobaltHomePage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/work" element={<CobaltWorkPage />} />
        <Route path="/lab" element={<CobaltLabPage />} />
        <Route path="/about" element={<CobaltAboutPage />} />
        <Route path="/projects/:slug" element={<ArchiveProjectPage />} />
        {/* any other /projects/* shape → back to the archive */}
        <Route path="*" element={<ArchivePage />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {booting && <BootTerminal onDone={handleBootDone} />}

      <Navbar />
      <ScrollManager />

      <main id="main-content">
        <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Legacy classic-site route. "/projects/:slug" is handled
                above by the archive branch and never reaches here. */}
            <Route path="/projects" element={<Navigate to="/work" replace />} />

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
