// Single source of truth for every project across the site.
//
// Consumed by: the Featured Work section (home), the /work archive page,
// and the shared /work/:slug project detail template. Cards and detail
// pages read the same object — never duplicate metadata elsewhere.
//
// Field notes:
// - slug          canonical route segment: /work/{slug}
// - legacySlugs   old route segments (classic site + earlier data) that
//                 redirect to the canonical slug. Never reuse for new work.
// - index         display string, not an array position — check for
//                 collisions manually when adding projects.
// - featured      flagship treatment inside Featured Work (one project).
// - featuredWork  whether the project appears in Featured Work on home.
//                 false keeps the data but holds the project back — it
//                 still appears in the /work archive.
// - availability  short, honest deployment/access metadata (not a warning).
// - description   overview paragraphs for the detail page.
// - features / projectFocus / learnings / nextImprovements
//                 detail-page sections; empty/null hides the section
//                 cleanly — no placeholders are ever rendered.
// - image         /projects/{slug}.jpg in public/. <ProjectMedia> falls
//                 back to an abstract placeholder if the file is missing.
// - gallery       extra screenshots for the detail page.
// - liveUrl / githubUrl
//                 null when no confirmed URL exists — never "#".
// - scenePreset   drives the lightweight 3D motif on the detail page.

const projects = [
  {
    // Record 01 factual data restored from the original project repository:
    // github.com/Far-200/the-last-website (its README and package.json are
    // the authoritative source). "The Last Website" is a SEPARATE, shipped
    // 3D web project — NOT this portfolio site. An earlier pass invented a
    // "this site itself / portfolio-template experiment" description; that
    // fabrication stays removed.
    //
    // Fields still unsupported by that source stay null: role, problem,
    // contribution and builtBecause are not documented anywhere in the
    // repo, and repository ownership alone is not evidence of a team role.
    // dataComplete stays false until those gaps are filled from the author.
    slug: "the-last-website",
    legacySlugs: [],
    index: "01",
    title: "The Last Website",
    shortTitle: "The Last Website",
    eyebrow: "3D web — hackathon build",
    role: null, // not documented in the project repository
    // Visitor-facing summary states only what the project repo confirms.
    summary:
      "A linear, progression-driven 3D web narrative set after the death of the internet, where one surviving server holds a partial, corrupted archive of ordinary human life. The visitor moves forward through five authored scenes, recovering fragments of everyday communication rather than the platforms that carried them.",
    problem: null, // not documented in the project repository
    contribution: null, // not documented in the project repository
    description: [
      "The Last Website is a shipped, single-page 3D interactive narrative with a fixed emotional arc. One server has outlived the internet and has spent years rebuilding a corrupted index of ordinary human life; the visitor arrives as its first connection in that time and moves through what it managed to keep.",
      "The experience is one-directional — no free roam, no inventory, nothing to win. It runs through five scenes: Prelude, Feed, Graveyard, Memories and Last Message (uncertainty, recognition, desolation, intimacy, absence). What survived is not the platforms but the people inside them: a group chat about whether the cat was fed, an unsent draft, an answering-machine message someone meant to return.",
      "The visitor controls pace, not aim. Three of the five scenes advance on wheel, trackpad or vertical drag while the camera stays authored, and every required interaction is a real focusable control, so the whole sequence can be completed from the keyboard. Screen-reader narration of the visual-only beats and full prefers-reduced-motion support are built into the scene architecture, and a single continuous soundtrack runs from the visitor's connect gesture and drains to silence before the ending.",
      "The archive is built almost entirely from procedural React Three Fiber geometry — the one modelled asset is a small grave-marker kit used in the Graveyard — with no backend, no global state library and no post-processing stack.",
    ],
    builtBecause: null, // not documented in the project repository
    technologies: [
      "React 19",
      "Vite 8",
      "Three.js",
      "React Three Fiber",
      "Drei",
      "GSAP",
      "Native browser audio",
    ],
    features: [],
    projectFocus: [
      "The world as the interface — no HUD, no nav, restraint over spectacle",
      "An authored camera with one-directional progression the visitor paces but cannot aim",
      "Accessibility built into the scene architecture: screen-reader narration and reduced-motion parity",
    ],
    learnings: [],
    nextImprovements: null,
    liveUrl: "https://the-last-website-beta.vercel.app/",
    githubUrl: "https://github.com/Far-200/the-last-website",
    // Real screenshot chosen from public/project_images/the-last-website/
    // by viewing every candidate — see Phase 4.7 report.
    image: "/project_images/the-last-website/prelude.png",
    imageAlt:
      "The Last Website — a dark low-poly 3D scene with a glowing monitor reading CONNECT TO SIGNAL",
    gallery: [],
    featured: true,
    featuredWork: true,
    status: "Shipped · hackathon",
    availability: null,
    dataComplete: false,
    scenePreset: "orbit",
  },
  {
    slug: "aptivision",
    legacySlugs: [],
    index: "02",
    title: "AptiVision",
    shortTitle: "AptiVision",
    eyebrow: "Reasoning-first aptitude learning system",
    role: "Independent Developer · Product & Frontend Architecture",
    summary:
      "An interactive aptitude learning environment that visualises reasoning, diagnoses misconceptions, and recommends targeted practice instead of presenting formula-only solutions.",
    problem:
      "Most aptitude prep tools hand over a formula and an answer, so learners memorise steps without ever seeing why a solution works — and never find out where their reasoning actually breaks down.",
    contribution:
      "Designed the product structure, visual reasoning system, reusable learning modules, misconception engine, practice flow, and browser-based progress architecture.",
    description: [
      "AptiVision treats aptitude preparation as a reasoning problem, not a memorisation problem. Instead of presenting a formula and a final answer, it visualises the path between them — so learners can see where a solution turns, why each step exists, and which step their own thinking diverged on.",
      "The system is built around reusable learning modules, a misconception engine that diagnoses recurring reasoning errors, and a practice flow that recommends targeted questions based on what actually went wrong rather than on broad topic labels.",
    ],
    builtBecause: null,
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide",
      "React Router",
    ],
    features: [],
    projectFocus: [
      "Making reasoning visible instead of showing formula-only solutions",
      "Diagnosing misconceptions and recommending targeted practice",
    ],
    learnings: [],
    nextImprovements: null,
    liveUrl: null,
    githubUrl: null,
    image: "/project_images/aptivision/Home.png",
    imageAlt:
      "AptiVision landing screen — 'Learn Aptitude Visually' with a live train-speed simulator preview",
    gallery: [],
    featured: false,
    featuredWork: true,
    status: null,
    availability: "Source / case study",
    scenePreset: "vision",
  },
  {
    slug: "flowtrace",
    legacySlugs: [],
    index: "03",
    title: "FlowTrace",
    shortTitle: "FlowTrace",
    eyebrow: "C execution and control-flow visualiser",
    role: "Lead Developer · Parser & Visualization Logic",
    summary:
      "A browser-based tool that parses a useful subset of C and visualises execution through control flow, variable changes, loops, and conditional branches.",
    problem:
      "Reading C line by line rarely builds an intuition for what the machine is actually doing — control flow, loop iteration, and variable mutation stay invisible unless you step through it yourself.",
    contribution:
      "Led the execution engine and visualisation architecture, including tokenisation, parsing, AST interpretation, control-flow progression, and variable-state differences.",
    description: [
      "FlowTrace makes C execution visible. It tokenises and parses a useful subset of C, interprets the resulting AST, and renders execution as it happens — control-flow progression, loop iteration, conditional branching, and variable-state changes step by step.",
      "The goal is intuition: instead of mentally simulating what the machine does, learners and developers can watch it, compare their expectation against the actual path, and see exactly where the two diverge.",
    ],
    builtBecause: null,
    technologies: [
      "React",
      "JavaScript",
      "Monaco Editor",
      "Custom Lexer/Parser",
      "AST Interpreter",
    ],
    features: [],
    projectFocus: [
      "Turning invisible control flow and variable mutation into a visual timeline",
      "Building a tokenizer, parser, and AST interpreter from scratch in the browser",
    ],
    learnings: [],
    nextImprovements: null,
    liveUrl: null,
    githubUrl: null,
    image: null, // no screenshot supplied — text/metadata carry the record
    imageAlt: null,
    gallery: [],
    featured: false,
    featuredWork: true,
    status: null,
    availability: "Source / local demo",
    scenePreset: "flow",
  },
  {
    slug: "folder-structure-visualizer",
    legacySlugs: ["cortex-ai"],
    index: "04",
    title: "Folder Structure Visualizer",
    shortTitle: "Folder Visualizer",
    eyebrow: "Developer productivity utility",
    role: "Solo Developer · Frontend & Utility Design",
    summary:
      "Converts typed or pasted folder structures into an interactive nested tree and can export the result as a ready-made ZIP scaffold.",
    problem:
      "Folder trees shared in docs, READMEs, or chat are easy to sketch as ASCII but tedious to actually turn into real files and directories.",
    contribution:
      "Designed and implemented the complete parsing, nested-tree rendering, validation, interaction, and ZIP scaffold export workflow.",
    description: [
      "Folder Structure Visualizer helps developers quickly plan project layouts without manually creating every folder and file from scratch. Users can type a structure themselves or work from a basic scaffold idea, and the app turns that into a readable visual tree.",
      "The project focuses on developer workflow speed. Instead of wasting time making folders one by one like a sleep-deprived file clerk, the tool helps users sketch a project structure fast and export it in a way that is actually useful.",
    ],
    builtBecause: "manually creating 70 files was painful",
    technologies: ["React", "JavaScript", "Vite", "ZIP Export"],
    features: [
      "Paste or type folder structures manually with indentation support",
      "Generate clean project trees for different stack templates",
      "Supports common starter structures like React, Vite, Node, Express, and Tailwind setups",
      "Parses user input into structured folder and file hierarchies",
      "Exports the generated structure as a ZIP file",
      "Skips unnecessary folders like node_modules, dist, build, and coverage during export",
      "Simple visual workflow for planning projects before writing actual code",
    ],
    projectFocus: [
      "Recursive parsing and rendering of nested folder hierarchies",
      "A planning workflow that ends in a usable ZIP scaffold, not just a picture",
    ],
    learnings: [
      "Building logic that converts plain text indentation into a structured folder tree",
      "Handling dynamic nested data and recursive rendering in a clean way",
      "Exporting folder structures as downloadable ZIP files for real-world usability",
      "Designing a tool that solves an actual developer planning problem instead of being just another flashy UI",
    ],
    nextImprovements:
      "Strong future upgrades would include live tree editing, more preset templates, drag-and-drop node management, custom starter kits, and a downloadable config system for different frameworks and languages.",
    liveUrl: "https://foldervisualiser.farhaankhan.dev",
    githubUrl: "https://github.com/Far-200/folder-structure-visualizer",
    // Folder on disk is public/project_images/folder-structure-viewer/
    // (spelled "viewer", not the "visualizer" slug).
    image: "/project_images/folder-structure-viewer/example_use.png",
    imageAlt:
      "Folder Structure Visualizer — a pasted ASCII tree on the left rendered as an interactive visual folder tree on the right",
    gallery: [
      {
        src: "/projects/folder-structure-visualizer-placement.jpg",
        alt: "Folder Structure Visualizer rendering a nested project tree from pasted text",
        caption: "Pasted input rendered as a structured project tree",
      },
      {
        src: "/projects/folder-structure-visualizer-search.jpg",
        alt: "Folder Structure Visualizer searching within a generated project tree",
        caption: "Searching inside a generated structure",
      },
    ],
    featured: false,
    featuredWork: true,
    status: null,
    availability: "Live / open source",
    scenePreset: "tree",
  },
  {
    slug: "password-strength-crack-time-estimator",
    legacySlugs: ["password-estimator", "password-strength-estimator"],
    index: "05",
    title: "Password Strength & Crack Time Estimator",
    shortTitle: "Password Estimator",
    eyebrow: "Browser-based security utility",
    role: "Solo Developer · Frontend & Security Logic",
    summary:
      "A browser-based tool that evaluates password strength and estimates approximate crack time using entropy-based logic instead of returning only a generic strength label.",
    problem:
      "Most password checkers only return labels such as weak or strong without explaining the practical resistance of a password.",
    contribution:
      "Designed and implemented the complete frontend experience, password-analysis logic, entropy-oriented estimation, feedback states, and responsive interface.",
    description: [
      "This project focuses on helping users understand password quality in a more useful way than a simple “weak” or “strong” label. It checks password characteristics, estimates brute-force crack time, and also gives users the option to generate stronger passwords instantly.",
      "Everything runs fully client-side — no password ever leaves the browser. It was built as part of a small daily project challenge, with a strong focus on clean UI, practical utility, and beginner-friendly security feedback.",
    ],
    builtBecause: "most password checkers just say 'strong' with zero math",
    technologies: ["React", "Vite", "JavaScript", "CSS"],
    features: [
      "Password strength analysis",
      "Brute-force crack time estimation",
      "Secure password generator",
      "Copy to clipboard support",
      "Character validation feedback",
      "Clean responsive UI",
    ],
    projectFocus: [
      "Security-oriented user feedback",
      "Quick usability with generator + copy flow",
    ],
    learnings: [
      "Breaking password quality into meaningful visual feedback",
      "Using entropy-style logic to estimate crack time more practically",
      "Designing a responsive UI for security tooling",
      "Building a small utility project that feels polished and useful",
    ],
    nextImprovements:
      "Strong next upgrades would include better attack model explanations, more detailed entropy breakdowns, password history checks, common password detection, and live visual comparisons between weak and stronger password patterns.",
    liveUrl: "https://password.farhaankhan.dev",
    githubUrl:
      "https://github.com/Far-200/Password-Strength-Crack-Time-Estimator",
    image: null, // no screenshot supplied — text/metadata carry the record
    imageAlt: null,
    gallery: [],
    featured: false,
    featuredWork: true,
    status: null,
    availability: "Live / open source",
    scenePreset: "entropy",
  },
  {
    slug: "devtool",
    legacySlugs: [],
    index: "06",
    title: "DevTool — JSON Formatter & API Tester",
    shortTitle: "DevTool",
    eyebrow: "Developer workflow utility",
    role: "Solo Developer · Utility Design",
    summary:
      "A lightweight developer utility for formatting JSON, testing APIs, and making raw responses easier to read, inspect, and work with.",
    problem:
      "Working with JSON and API responses usually means bouncing between multiple single-purpose websites — formatting here, testing there, copying everywhere.",
    contribution:
      "Designed and built the combined formatter, minifier, validator, and API tester as one compact interface with response status, timing, and pretty-printed output.",
    description: [
      "DevTool is built for developers who frequently work with JSON data and API responses. Instead of jumping between multiple tools, this project combines formatting, minifying, copying, and basic API testing in one compact interface.",
      "The goal of the project is simple: make common developer tasks feel faster, cleaner, and less annoying during debugging or testing.",
    ],
    builtBecause: "copy-pasting JSON into random websites felt wrong",
    technologies: ["React", "Vite", "JavaScript", "CSS", "API Testing"],
    features: [
      "JSON formatter for readable structured output",
      "JSON minifier for compact payloads",
      "Copy JSON to clipboard",
      "Safe clear with confirmation",
      "API request tester",
      "Response status indicator",
      "Response time measurement",
      "Pretty JSON response viewer",
    ],
    projectFocus: [
      "Cleaner JSON readability and validation",
      "Faster API inspection and response testing",
    ],
    learnings: [
      "Designing small developer tools that solve practical workflow problems",
      "Handling JSON formatting, validation, and cleanup in a user-friendly way",
      "Displaying API responses more clearly with readable structure and useful feedback",
      "Building utility-style UI where usability matters more than visual noise",
    ],
    nextImprovements:
      "Strong next upgrades would be custom request methods and headers, better error highlighting, collapsible JSON nodes, saved request history, and side-by-side request/response comparison for smoother debugging.",
    liveUrl: "https://devtool.farhaankhan.dev",
    githubUrl: "https://github.com/Far-200/DevTool",
    image: "/project_images/devtool/image.png",
    imageAlt:
      "DevTool API Tester — a GET request with a 200 response, response time, and pretty-printed JSON",
    gallery: [],
    featured: false,
    featuredWork: false,
    status: null,
    availability: "Live / open source",
    scenePreset: "blocks",
  },
  {
    slug: "prompt-router",
    legacySlugs: [],
    index: "07",
    title: "PromptRouter",
    shortTitle: "PromptRouter",
    eyebrow: "Privacy-first Chrome extension",
    role: "Solo Developer · Extension & Classification Logic",
    summary:
      "A privacy-first Chrome extension that recommends the right AI model for your prompt in real time — 100% local, no API calls, no data sent.",
    problem:
      "People routinely burn premium AI models on tiny tasks because nothing tells them, while typing, that a lighter model would do the job.",
    contribution:
      "Built the Manifest V3 extension, the rule-based local prompt classifier, selected-model detection, attachment-aware suggestions, and the floating recommendation widget.",
    description: [
      "PromptRouter watches the prompt box on supported AI platforms and suggests whether a lightweight, balanced, or premium model is the better fit for the task.",
      "The extension runs completely inside the browser. It analyzes text locally, detects visible attachment hints, reads the currently selected model from the page UI, and shows a floating recommendation widget without sending prompts anywhere.",
    ],
    builtBecause: "people use expensive AI models for tiny prompts",
    technologies: [
      "Vanilla JavaScript",
      "Chrome Extension",
      "Manifest V3",
      "Local Rule Engine",
    ],
    features: [
      "Real-time AI model recommendation while typing",
      "Works on Claude, ChatGPT, and Gemini",
      "Rule-based prompt classification engine",
      "Detects selected model and warns about overkill",
      "Attachment-aware suggestions without reading files",
      "100% local privacy-first Chrome extension",
    ],
    projectFocus: [
      "Routing prompts to the right model tier",
      "Keeping prompt analysis fully local and private",
    ],
    learnings: [
      "Building browser extensions using Manifest V3 and content scripts",
      "Observing dynamic AI chat UIs using MutationObserver",
      "Designing a local prompt classifier without APIs or backend calls",
      "Handling privacy-sensitive workflows where user prompts never leave the browser",
    ],
    nextImprovements:
      "Next upgrades would include stronger prompt classification rules, better model detection across UI changes, improved provider support, cleaner onboarding, and a more polished Chrome Web Store-ready experience.",
    liveUrl: null,
    githubUrl: "https://github.com/Far-200/prompt-model-suggester",
    image: "/project_images/prompt-router/ChatGPT_Dark_Medium_Prompt.png",
    imageAlt:
      "PromptRouter widget docked in the ChatGPT UI, recommending GPT-4o at 75% signal strength for a technical prompt",
    gallery: [],
    featured: false,
    featuredWork: false,
    status: null,
    availability: "Open source",
    scenePreset: "router",
  },
  {
    slug: "astra",
    legacySlugs: [],
    index: "08",
    title: "Astra",
    shortTitle: "Astra",
    eyebrow: "Experimental desktop AI assistant",
    role: "Creator · Desktop AI Systems Prototype",
    summary:
      "An experimental desktop assistant combining an always-on-top character interface, asynchronous AI requests, state-driven visual feedback, speech bubbles, cancellation handling, and desktop interaction experiments.",
    problem:
      "Chat-based AI assistants live in a browser tab; Astra explores what an always-present, state-aware assistant character feels like directly on the desktop.",
    contribution:
      "Designed the assistant lifecycle, state-driven UI architecture, asynchronous request handling, cancellation safety, speech-bubble behaviour, and desktop character presentation.",
    description: [
      "Astra explores what an AI assistant feels like when it lives on the desktop instead of in a browser tab — an always-on-top character with state-driven visual feedback, speech bubbles, and asynchronous request handling with safe cancellation.",
    ],
    builtBecause: null,
    technologies: ["Python", "Tkinter"],
    features: [],
    projectFocus: [
      "State-driven assistant lifecycle and visual feedback",
      "Safe asynchronous request and cancellation handling on the desktop",
    ],
    learnings: [],
    nextImprovements: null,
    liveUrl: null,
    githubUrl: null,
    image: null, // no screenshot supplied — text/metadata carry the record
    imageAlt: null,
    gallery: [],
    featured: false,
    featuredWork: false,
    status: "Experimental / In development",
    availability: null,
    scenePreset: "orbit",
  },
];

// ── Derived helpers (single place for selection logic) ──

export const featuredWorkProjects = projects.filter((p) => p.featuredWork);

export const archiveProjects = projects;

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}

// Maps any legacy slug to its canonical project (or null).
export function getProjectByLegacySlug(slug) {
  return projects.find((p) => p.legacySlugs.includes(slug)) ?? null;
}

// Previous/next within the full archive order, wrapping around.
export function getAdjacentProjects(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: null, next: null };
  const previous = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return { previous, next };
}

export default projects;
