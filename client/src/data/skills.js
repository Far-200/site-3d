// Skills data — classic categories merged with technologies genuinely in
// use across current projects (see projects.js). `context` grounds each
// group in real project usage instead of fake proficiency percentages.

export const skillGroups = [
  {
    title: "Languages",
    context: "Daily drivers across projects and coursework.",
    items: [
      { name: "Python", usage: "Astra, scripting, backend experiments" },
      { name: "JavaScript", usage: "Every frontend project" },
      { name: "C/C++", usage: "FlowTrace's parsing target, systems coursework" },
      { name: "SQL", usage: "Data modelling coursework" },
    ],
  },
  {
    title: "Frontend",
    context: "Where most shipped work lives.",
    items: [
      { name: "React", usage: "AptiVision, FlowTrace, this portfolio, and more" },
      { name: "Three.js / R3F", usage: "This portfolio's 3D layer" },
      { name: "HTML", usage: "Foundation of everything shipped" },
      { name: "CSS", usage: "Hand-rolled design systems" },
      { name: "Tailwind CSS", usage: "AptiVision, Password Estimator" },
      { name: "Vite", usage: "Default build tool across projects" },
    ],
  },
  {
    title: "Backend",
    context: "Growing — the 'increasingly serious' part of the stack.",
    items: [
      { name: "FastAPI", usage: "Backend experimentation" },
      { name: "Node.js", usage: "Tooling and API work" },
    ],
  },
  {
    title: "Tools & Platforms",
    context: "The everyday workflow.",
    items: [
      { name: "Git", usage: "Version control on every project" },
      { name: "GitHub", usage: "Where the work lives" },
      { name: "VS Code", usage: "Primary editor" },
      { name: "Docker", usage: "Containerisation basics" },
      { name: "Chrome Extensions (MV3)", usage: "PromptRouter" },
    ],
  },
];
