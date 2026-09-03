import { Suspense, lazy, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import BootTerminal from "./components/BootTerminal";
import { markBooted, shouldBoot } from "./lib/boot";
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

  // The redesigned continuous archive owns "/" and the canonical project
  // detail routes "/projects/:slug". Both are fully self-contained (own
  // header/frame/footer, own token scope) and never fall into the legacy
  // green shell. Every other legacy route keeps the original shell below.
  if (location.pathname === "/" || location.pathname.startsWith("/projects/")) {
    return (
      <Routes>
        <Route path="/" element={<ArchivePage />} />
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
