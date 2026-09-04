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
  // Personnel File facts — the first row is the always-visible teaser,
  // the rest sit behind the expand disclosure.
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

// ── Cobalt Forest Workshop homepage ("/") ──────────────────────────────
// Copy specific to the V2 homepage. It is deliberately warmer and more
// personal than the frozen archive wording above, but every claim stays
// consistent with the facts already established here and in
// data/projects.js — nothing new is invented. The frozen archive keeps
// using `identity` / `about` / `contact` unchanged.
export const cobalt = {
  hero: {
    kicker: "Farhaan Khan — full-stack developer",
    // Expressive serif headline; kept short and readable.
    headline: "Quiet nights, useful things.",
    // Personality-rich supporting copy.
    lead: "I build full-stack apps, developer tools, and AI-assisted systems — the kind of software people keep using instead of abandoning after the first GitHub push.",
    body: "Most of the work is unglamorous: reading docs, fixing the boring edge case, shipping the small version today so there's something real to improve tomorrow. I like it that way.",
    primaryCta: { label: "See selected work", href: "#selected-work" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
  },
  selectedWork: {
    kicker: "Selected work",
    title: "Three I'd show you first",
    intro:
      "Bigger builds where the idea, the system design, and the finish all had to hold together.",
  },
  lab: {
    kicker: "Lab / side quests",
    title: "Smaller experiments, kept sharp",
    intro:
      "Utilities, prototypes, and one-sitting builds — where new ideas get tried before they earn a bigger project.",
  },
  about: {
    kicker: "About the human",
    title: "I learn by shipping, not by finishing tutorials",
    paragraphs: [
      "I'm a computer-science undergraduate who got into this because building things is genuinely fun — the part where a strange idea turns into something that runs.",
      "I think in systems: how the pieces fit, where they'll break, what the person on the other end actually needs. Design and code aren't separate steps for me; they're the same decision made twice.",
      "Right now I'm going deep on full-stack fundamentals and data structures, and building small tools that remove friction from everyday dev work.",
    ],
    // "Core fuels" — note/paper treatment. Grounded in the frozen `about`
    // metadata, just phrased as personal traits rather than status labels.
    fuels: [
      {
        label: "Consistency",
        note: "Small commits, most days. Boring today, compounding later.",
      },
      {
        label: "Curiosity",
        note: "If I can't explain how it works, I go rebuild a rough version of it.",
      },
      {
        label: "Useful over flashy",
        note: "A tool that saves ten minutes beats a demo that wins a screenshot.",
      },
      {
        label: "Finish the last 10%",
        note: "The edge cases, the empty states, the README. That's where it becomes real.",
      },
    ],
  },
  contact: {
    kicker: "Contact",
    headline: "Have something worth building?",
    body: "I'm open to internships, entry-level roles, and collaborations on real dev work. Email is the fastest way to reach me.",
  },
};
