// Structured identity/profile data — single source of truth for the
// continuous archive's Home, About, and Contact sections. Copy is lifted
// verbatim from art-design.md (Design Freeze v1, sections 9, 11, 13) so the
// frozen wording lives in exactly one place.

export const identity = {
  name: "Farhaan Khan",
  role: "Full-Stack Developer",
  // Left-header identity line: "Farhaan Khan / builder"
  handle: "builder",
  thesis: "I build software by turning strange ideas into working systems.",
  elaboration:
    "Full-stack apps, developer tools, and AI-assisted systems that people might actually use — instead of abandoning after the GitHub push.",
};

// About — concise identity copy + supporting metadata (art-design.md §11).
export const about = {
  statement: "I learn by shipping, not by finishing tutorials.",
  meta: [
    { label: "BUILDING", value: "PromptRouter heuristics, FlowTrace engine" },
    { label: "LEARNING", value: "DSA — C++ fundamentals, two pointers" },
    { label: "EXPLORING", value: "AI systems, security, 3D web" },
    { label: "OPEN TO", value: "Internships, collaborations, real dev work" },
  ],
  // Personnel File facts — shown flat in Phase 1, expandable in Phase 3.
  personnel: [
    { label: "LOCATION", value: "India · Remote-friendly" },
    { label: "EDUCATION", value: "Computer Science — undergraduate" },
    { label: "CURRENT FOCUS", value: "Full-stack depth, DSA, applied AI" },
    { label: "AVAILABILITY", value: "Internships & entry-level roles" },
  ],
};

// Contact — finale metadata + actions (art-design.md §13).
export const contact = {
  headline: "Have something interesting to build?",
  meta: [
    { label: "AVAILABLE FOR", value: "Internships & entry-level roles" },
    { label: "BASED IN", value: "Remote-friendly, open to relocation" },
    { label: "BEST WAY TO REACH ME", value: "Email" },
  ],
  closingLine: "// turning caffeine into commits_",
};

// Canonical links, used across the header utilities and Contact actions.
export const links = {
  email: "mailto:farhaabkhanff@gmail.com",
  emailAddress: "farhaabkhanff@gmail.com",
  github: "https://github.com/Far-200",
  linkedin: "https://www.linkedin.com/in/farhaan-khan-dev",
  resumeUrl: "/resume.pdf",
};

// Footer system copy — the physical bottom edge of the archive (§13).
export const footer = {
  domain: "farhaankhan.dev",
  lines: ["connection ready_", "awaiting human input"],
  year: "2026",
};
