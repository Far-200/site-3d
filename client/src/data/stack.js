// Stack taxonomy — frozen to three groups by art-design.md §12
// (BUILD WITH / REGULARLY USE / EXPLORING). This is intentionally a new,
// separate source from data/skills.js: the legacy skills page keeps its
// Languages/Frontend/Backend/Tools grouping, while the archive's Stack
// section is contractually the three-column usage taxonomy.
//
// `usedIn` slugs reference data/projects.js and drive the Phase 3
// contextual detail panel — unused by the Phase 1 static shell.

export const stackGroups = [
  {
    id: "build-with",
    title: "BUILD WITH",
    blurb: "Primary tools reached for on almost every shipped project.",
    items: [
      { name: "React", usedIn: ["aptivision", "flowtrace", "folder-structure-visualizer"] },
      { name: "JavaScript", usedIn: ["flowtrace", "devtool", "prompt-router"] },
      { name: "Python", usedIn: ["astra"] },
      { name: "FastAPI", usedIn: [] },
      { name: "Node.js", usedIn: [] },
    ],
  },
  {
    id: "regularly-use",
    title: "REGULARLY USE",
    blurb: "Part of the everyday workflow, across projects and coursework.",
    items: [
      { name: "Git", usedIn: [] },
      { name: "Docker", usedIn: [] },
      { name: "SQL", usedIn: [] },
      { name: "Three.js", usedIn: [] },
    ],
  },
  {
    id: "exploring",
    title: "EXPLORING",
    blurb: "Active areas of study — not yet a shipped project in each.",
    items: [
      { name: "AI systems", usedIn: [] },
      { name: "Security", usedIn: ["password-strength-crack-time-estimator"] },
      { name: "Developer tooling", usedIn: ["devtool", "prompt-router"] },
      { name: "3D web", usedIn: [] },
    ],
  },
];

export default stackGroups;
