// Stack taxonomy — frozen to three groups by art-design.md §12
// (BUILD WITH / REGULARLY USE / EXPLORING). This is intentionally a new,
// separate source from data/skills.js: the legacy skills page keeps its
// Languages/Frontend/Backend/Tools grouping, while the archive's Stack
// section is contractually the three-column usage taxonomy.
//
// `usedIn` slugs reference data/projects.js and drive the contextual
// detail panel. `note` is the one-line context shown in that panel.
// Phase 2 renders the panel statically for the default selection
// (React); per-row selection is Phase 3.

export const stackGroups = [
  {
    id: "build-with",
    title: "BUILD WITH",
    blurb: "Primary tools reached for on almost every shipped project.",
    items: [
      {
        name: "React",
        // "the-last-website" is included: React 19 is verified for Record 01
        // by the original project repo (github.com/Far-200/the-last-website
        // — README "Built With" and package.json).
        note: "Primary UI library across most shipped projects — component structure, state, and routing.",
        usedIn: [
          "the-last-website",
          "aptivision",
          "flowtrace",
          "folder-structure-visualizer",
        ],
      },
      {
        name: "JavaScript",
        note: "The working language for browser tooling — parsers, interpreters, and utility logic.",
        usedIn: ["flowtrace", "devtool", "prompt-router"],
      },
      {
        name: "Python",
        note: "Reached for on desktop and scripting work, and while studying data structures.",
        usedIn: ["astra"],
      },
      {
        name: "FastAPI",
        note: "Current pick for building small, typed HTTP services behind the front-end.",
        usedIn: [],
      },
      {
        name: "Node.js",
        note: "Build tooling, scripts, and lightweight servers around the front-end stack.",
        usedIn: [],
      },
    ],
  },
  {
    id: "regularly-use",
    title: "REGULARLY USE",
    blurb: "Part of the everyday workflow, across projects and coursework.",
    items: [
      {
        name: "Git",
        note: "Version control on every project, solo and shared.",
        usedIn: [],
      },
      {
        name: "Docker",
        note: "Reproducible local environments and service containers.",
        usedIn: [],
      },
      {
        name: "SQL",
        note: "Relational modelling and querying for app data.",
        usedIn: [],
      },
      {
        name: "Three.js",
        // "the-last-website" is included: Three.js (via React Three Fiber)
        // is verified for Record 01 by the original project repo
        // (github.com/Far-200/the-last-website — README "Built With").
        note: "The spatial layer behind the archive — depth and perspective, not decoration.",
        usedIn: ["the-last-website"],
      },
    ],
  },
  {
    id: "exploring",
    title: "EXPLORING",
    blurb: "Active areas of study — not yet a shipped project in each.",
    items: [
      {
        name: "AI systems",
        note: "Model routing, prompt engineering, and applied AI UX. Exploring — no shipped project yet.",
        usedIn: [],
      },
      {
        name: "Security",
        note: "Entropy, crack-time estimation, and client-side safety.",
        usedIn: ["password-strength-crack-time-estimator"],
      },
      {
        name: "Developer tooling",
        note: "Small utilities that remove friction from everyday dev work.",
        usedIn: ["devtool", "prompt-router"],
      },
      {
        name: "3D web",
        note: "Restrained spatial interfaces built on WebGL. Exploring — no shipped project yet.",
        usedIn: [],
      },
    ],
  },
];

export default stackGroups;
