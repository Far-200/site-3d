import { Suspense, lazy, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import BootTerminal from "./components/BootTerminal";
import { markBooted, shouldBoot } from "./lib/boot";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import {
  getProjectBySlug,
  getProjectByLegacySlug,
} from "./data/projects";
import "./App.css";

// Route-level code splitting: home loads eagerly (it's the landing
// experience), everything else on demand.
const WorkPage = lazy(() => import("./pages/WorkPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Legacy classic-site routes: /projects/{old-slug} → /work/{canonical}.
function LegacyProjectRedirect() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug) ?? getProjectByLegacySlug(slug);
  return (
    <Navigate to={project ? `/work/${project.slug}` : "/404"} replace />
  );
}

function App() {
  const [booting, setBooting] = useState(shouldBoot);
  const location = useLocation();

  const handleBootDone = () => {
    markBooted();
    setBooting(false);
  };

  // The redesigned continuous archive owns "/" and is fully self-contained
  // (its own header, frame and footer, its own token/style scope). Every
  // legacy multi-page route keeps the original shell below, untouched.
  if (location.pathname === "/") {
    return <ArchivePage />;
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

            {/* Legacy classic-site routes */}
            <Route path="/projects" element={<Navigate to="/work" replace />} />
            <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />

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
