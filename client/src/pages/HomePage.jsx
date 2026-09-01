import Hero from "../components/Hero";
import WorkSection from "../components/work/WorkSection";
import AboutPreview from "../components/home/AboutPreview";
import SkillsPreview from "../components/home/SkillsPreview";
import StatusSection from "../components/home/StatusSection";
import ContactCta from "../components/home/ContactCta";
import usePageMeta from "../lib/usePageMeta";

function HomePage() {
  usePageMeta(
    "Farhaan Khan | Developer Portfolio",
    "Farhaan Khan — CSE student building interactive web tools, visualizers, and AI-assisted developer systems.",
  );

  return (
    <>
      <Hero />
      <WorkSection />
      <AboutPreview />
      <SkillsPreview />
      <StatusSection />
      <ContactCta />
    </>
  );
}

export default HomePage;
