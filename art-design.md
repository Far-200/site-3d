# Farhaan Portfolio 3D — Art & Design Specification

**Status:** Design Freeze v1  
**Purpose:** Canonical visual and interaction source-of-truth for implementation.  
**Primary implementation target:** Desktop/laptop first, then authored mobile adaptation.  
**Design philosophy:** Editorial + technical + archival + restrained spatial depth.

---

## 1. Product Identity

This portfolio should not feel like a generic developer portfolio with a dark theme.

The intended identity is:

> **A builder's living archive.**

The interface behaves like one continuous working archive with different operational states:

- `SECTOR // HOME`
- `ARCHIVE // 02`
- `IDENTITY // 03`
- `STACK // 04`
- `COMMS // 05`

These are not five unrelated pages. They are five states of the same system.

The result should feel:

- editorial
- technical
- human
- slightly archival
- spatial without becoming a 3D demo
- restrained rather than futuristic
- distinctive without decorative noise

Avoid:
- generic SaaS layouts
- glassmorphism
- neon cyberpunk
- glowing orbs
- random particles
- abstract gradients
- logo clouds
- excessive cards/badges
- decorative 3D objects with no function
- giant section numbers
- fake terminal overload

---

## 2. Existing Technical Skeleton

The current client is already a Vite/React application with Three.js support.

Current package direction includes:

- React 19
- React DOM 19
- React Router
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- Vite
- ESLint

The implementation should build on this skeleton instead of restarting the project.

---

## 3. Design Freeze Rules

### Freeze these decisions

Do not reinterpret:

- warm near-black / dark brown background
- cream foreground typography
- restrained burnt-orange accent
- serif display typography
- monospaced utility/meta typography
- top-right desktop navigation
- archive-style section labels
- project accordion/archive concept
- portrait-led Home preview
- portrait + identity About composition
- three-column Stack taxonomy with contextual detail panel
- clean Contact finale
- understated terminal-style footer copy

### Not frozen

The following are implementation concerns and may be adjusted:

- exact pixel dimensions
- exact section heights
- breakpoint values
- `clamp()` values
- responsive spacing
- animation durations
- sticky behavior
- hover/tap mechanics
- Three.js depth values
- mobile layout
- transition choreography

The design is frozen conceptually, not geometrically.

---

## 4. Visual Language

### Background

Use one continuous page background.

Recommended direction:

```css
--bg: #15110f;
--bg-soft: #1c1713;
--surface: #1c1815;
```

Do not allow visible black bands between sections.

There must never be a browser-width black strip caused by:

- mismatched section backgrounds
- uncovered body background
- fixed-height wrappers
- overflow clipping
- transformed parent gaps

The page should visually read as one continuous material.

### Foreground

Recommended palette family:

```css
--text-primary: #efe8dc;
--text-secondary: #b8afa3;
--text-muted: #777067;
--accent: #c6632c;
--line: rgba(239, 232, 220, 0.12);
--success: muted green;
--maintained: muted steel-blue;
```

Exact values may be tuned in-browser, but maintain this relationship.

The accent is used sparingly.

Use orange for:

- active navigation
- archive labels
- selected skills
- key state labels
- primary CTA
- subtle dividers / interaction cues

Do not flood the interface with orange.

---

## 5. Typography

### Display serif

Used for:

- hero headline
- section headline
- selected contextual item titles where appropriate

Character:
- editorial
- expressive
- slightly literary
- not luxury-fashion exaggerated
- highly readable

The serif is the emotional layer of the site.

### Sans / body

Body copy should be calm and readable.

At 100% browser zoom on a 15–16" laptop:
- body text must never feel miniature
- supporting text should be immediately readable
- comfortable line length is preferred over wide paragraphs

### Mono

Use mono for:

- `SECTOR // HOME`
- archive labels
- utility navigation
- project indices
- status metadata
- footer system language
- compact technical annotations

Do not make mono text micro-sized merely because it is metadata.

---

## 6. Responsive Scale System

Primary desktop validation targets:

- `1536 × 864`
- `1440 × 900`
- `1366 × 768`
- `1920 × 1080`

Mobile validation:

- `390 × 844`
- `430 × 932`

Use responsive primitives:

```css
clamp()
min()
max()
max-width
minmax()
grid
```

Avoid fixed design-canvas scaling.

### Core rule

The site must be designed for normal browser zoom.

Do not assume:
- 80% zoom
- ultrawide monitor
- giant desktop canvas

---

## 7. Global Layout

Desktop should use a shared content frame.

Suggested conceptual frame:

```text
page edge
  ↓
[ consistent outer gutter ]

[ identity ]                         [ nav + utilities ]

[ section content spanning main grid ]

[ consistent outer gutter ]
```

Use shared horizontal anchors across all sections.

The left identity block and top-right navigation should feel like part of the same frame throughout.

### Section rhythm

Do **not** force every section to `100vh`.

The site should scroll as one continuous editorial archive.

Good:

```text
HOME
   ↓
PROJECTS
   ↓
ABOUT
   ↓
STACK
   ↓
CONTACT
```

Bad:

```text
CONTENT
████████████ empty viewport ████████████
NEXT SECTION
```

Use content-driven height for most sections.

Home may be close to a full opening viewport.

Projects may be visually substantial.

About / Stack / Contact should end when their composition naturally ends.

---

## 8. Global Header / Navigation

### Left

```text
Farhaan Khan / builder
SECTOR // [current]
```

### Right

Primary navigation:

```text
01 HOME
02 PROJECTS
03 ABOUT
04 STACK
05 CONTACT
```

Secondary utilities:

```text
RM off/on
SND off/on
Resume ↗
Mobile
↻
```

### Behavior

- active section receives orange emphasis
- subtle underline or border is acceptable
- navigation should remain visually quiet
- use section-aware active state
- desktop navigation may be sticky/fixed if tested carefully
- avoid covering content
- keyboard focus must be visible

`RM` = Reduced Motion  
`SND` = Sound

Controls should have actual behavior in implementation.

---

# 9. HOME

## Purpose

Immediate identity + thesis + human anchor + selected-work preview.

This should feel like the opening state of the builder's archive.

### Desktop composition

Approximate visual balance:

```text
LEFT CONTENT               RIGHT PREVIEW SYSTEM
55–60%                     32–36%
```

Do not let the portrait dominate the headline.

### Left content

Maintain:

```text
FARHAAN KHAN — FULL-STACK DEVELOPER

I build software by turning strange
ideas into working systems.

Full-stack apps, developer tools, and AI-assisted systems
that people might actually use — instead of abandoning
after the GitHub push.

[ View Projects → ]   Resume ↗   Contact   GitHub
```

### Right preview system

Contains:

- `PREVIEW`
- portrait / selected work visual
- small context hint such as `hover selected work →`
- caption line over/under image
- `SELECTED WORK`
- compact list of selected projects and statuses

Portrait should remain a stable human anchor.

Recommended constraints:
- roughly 32–36% of content width
- roughly 55–60vh maximum visual height on laptop
- must not become IMAX-sized
- should not push Selected Work outside the initial composition

### Interaction

Hover/focus a Selected Work item:
- preview transitions from portrait to project visual
- project state remains legible
- transition should be restrained
- portrait returns when nothing is selected, or when pointer leaves the preview system

Touch:
- tap to select
- do not require hover

### Spatial behavior

The right preview panel can sit subtly forward in Z-space.

Very restrained:
- slight perspective
- tiny parallax
- no floating object effect

---

# 10. PROJECTS

## Purpose

The primary visual mechanic of the portfolio.

### Freeze

Keep the horizontal archive / accordion.

Do not replace with:
- cards grid
- masonry
- conventional project tiles
- vertical list

### Resting composition

Eight project records are shown as a horizontal archive shelf.

Each record should preserve:
- number
- category/state
- title
- status

Non-active cards remain readable.

Inactive cards must not become meaningless dark slabs.

### Expansion

Hover/focus/tap expands a record.

Expanded state may reveal:
- title
- short description
- role
- stack
- status
- year
- repository link
- live/demo link if available
- one useful supporting fact

Neighbors remain visible.

### Depth

The archive is the best place for meaningful 3D.

Possible treatment:
- active record moves slightly toward camera
- inactive records recede slightly
- small perspective shift
- subtle shadow/depth change

Do not build a theatrical 3D carousel.

### Current flagship visual

`The Last Website` remains the flagship/first archive entry.

---

# 11. ABOUT

## Purpose

Human context and current trajectory.

### Composition

Approximate:

```text
LEFT IDENTITY CONTENT      RIGHT PERSONNEL SYSTEM
55–58%                     32–36%
```

### Copy direction

Maintain the frozen tone:

```text
Farhaan Khan — I learn by shipping,
not by finishing tutorials.
```

Body copy remains concise.

Supporting metadata includes:

- BUILDING
- LEARNING
- EXPLORING
- OPEN TO

Example direction:

```text
BUILDING
PromptRouter heuristics, FlowTrace engine

LEARNING
DSA — C++ fundamentals, two pointers

EXPLORING
AI systems, security, 3D web

OPEN TO
Internships, collaborations, real dev work
```

### Portrait

Smaller than earlier concepts.

The image supports identity; it does not dominate the screen.

### Personnel File

Below/adjacent to portrait:

```text
PERSONNEL FILE        ▸ expand
```

Expansion can reveal concise facts such as:
- location
- education
- current focus
- availability
- preferred work areas

Keep it human and useful.

Do not turn it into a resume dump.

### Spatial behavior

Personnel File can feel like a record moving toward the foreground.

Very subtle:
- slight shift
- slight perspective
- opacity/line emphasis
- no page-flipping gimmick

---

# 12. STACK

## Purpose

Show what is actually used, how often, and where.

### Taxonomy

Freeze to:

```text
BUILD WITH
REGULARLY USE
EXPLORING
```

### Example contents

**BUILD WITH**
- React
- JavaScript
- Python
- FastAPI
- Node.js

**REGULARLY USE**
- Git
- Docker
- SQL
- Three.js

**EXPLORING**
- AI systems
- Security
- Developer tooling
- 3D web

Exact contents can evolve with the portfolio.

### Context panel

Selecting a technology reveals:

```text
[usage label]

React

Primary UI library across most shipped projects.

USED IN
The Last Website
Folder Structure Visualizer
God of Code
...
```

For exploratory items:

```text
EXPLORING

AI systems

Model routing, prompt engineering,
applied AI UX.

Exploring — no shipped project yet.
```

### Behavior

Desktop:
- hover/focus selects
- selected row receives orange emphasis
- neighboring rows remain readable

Mobile:
- tap selects
- contextual details appear below selected item/category

### Do not add

- progress bars
- star ratings
- skill percentages
- proficiency circles
- logo clouds

---

# 13. CONTACT

## Purpose

Clear ending and real call to action.

### Headline

Freeze:

```text
Have something interesting to build?
```

### Metadata

Maintain:

```text
AVAILABLE FOR
Internships & entry-level roles

BASED IN
Remote-friendly, open to relocation

BEST WAY TO REACH ME
Email
```

### Actions

```text
Email ↗
GitHub ↗
LinkedIn ↗
Resume ↗
```

### Closing line

Use one small rotating/static human-tech caption such as:

```text
// turning caffeine into commits_
```

or:

```text
// shipping developer tools_
```

Keep only one at a time.

### Footer

Freeze language:

```text
farhaankhan.dev

connection ready_

awaiting human input

2026
```

The footer is the physical bottom edge of the archive.

There should be no giant dead region beneath it.

---

# 14. Mobile Design

Mobile is not a scaled desktop.

Do not preserve desktop composition merely by stacking columns.

### Mobile principles

- natural content height
- readable body text
- no miniature desktop navigation
- no hover dependency
- no fake phone shell
- no giant portrait
- no giant empty gaps
- no horizontal overflow
- no eight-column archive squeezed into viewport

### Suggested mobile Home order

```text
FARHAAN KHAN — BUILDER

I build software by turning strange ideas
into working systems.

[ View Projects → ]

Resume   Contact   GitHub

SELECTED WORK

[ project visual ]
The Last Website

[ project visual ]
Think Before Code

ABOUT
short identity copy

Email Me
GitHub
```

### Mobile Projects

Do not use the full horizontal desktop archive.

Transform it intentionally into one of:

- stacked expandable records
- vertically layered archive cards
- snap-scroll records

Tap to expand.

### Mobile navigation

Use a small authored mobile menu.

Could be:
- compact menu button
- bottom sheet
- simple full-screen index

Keep the archive language.

---

# 15. Motion

Motion should clarify state.

### Preferred

- short opacity fades
- small translate shifts
- subtle depth movement
- accordion interpolation
- preview crossfades
- restrained parallax
- active record forward movement

### Avoid

- elastic/bouncy motion
- continuous floating
- excessive springiness
- dramatic camera flights
- rotation for decoration
- slow animations that block navigation

Suggested timing range:

```text
micro interaction: 120–180ms
normal state change: 220–350ms
major archive transition: 400–650ms
```

Honor `prefers-reduced-motion`.

`RM on` should disable/reduce:
- depth interpolation
- parallax
- large translations
- nonessential transitions

---

# 16. Sound

Sound is optional and disabled by default unless explicitly enabled.

If used:
- small UI ticks
- restrained archive/mechanical cues
- no ambient soundtrack by default
- no autoplay

`SND off/on` must be functional.

---

# 17. 3D / Spatial Layer

Three.js exists to support the interface, not replace it.

The portfolio should remain fully understandable if the user never consciously thinks:

> "This is Three.js."

### Meaningful uses

- project archive depth
- foreground/background state changes
- preview card perspective
- subtle shared camera/parallax
- personnel record depth
- transitions between archive states

### Bad uses

- floating geometric shapes
- planets
- random models
- decorative cubes
- particles
- physics toys
- full 3D room unless a future redesign explicitly requires it

### Progressive enhancement

Core content and navigation must remain available in DOM.

Use R3F as enhancement, not as the only way content exists.

---

# 18. Accessibility

Required:

- semantic section landmarks
- proper heading order
- keyboard-accessible project archive
- keyboard-accessible Stack
- visible focus states
- alt text for portrait and project imagery
- color contrast sufficient for readable copy
- interaction not based on color alone
- no essential hover-only information
- reduced-motion support
- touch-friendly hit targets

---

# 19. Implementation Architecture Suggestion

Conceptual structure:

```text
src/
├── app/
│   ├── App.jsx
│   └── routes/
├── components/
│   ├── navigation/
│   ├── typography/
│   ├── archive/
│   ├── preview/
│   ├── personnel/
│   ├── stack/
│   └── controls/
├── sections/
│   ├── Home/
│   ├── Projects/
│   ├── About/
│   ├── Stack/
│   └── Contact/
├── three/
│   ├── ArchiveDepth.jsx
│   ├── SpatialRig.jsx
│   └── effects/
├── data/
│   ├── projects.js
│   ├── stack.js
│   └── profile.js
├── hooks/
│   ├── useActiveSection.js
│   ├── useReducedMotion.js
│   └── useSoundPreference.js
├── styles/
│   ├── tokens.css
│   ├── global.css
│   └── responsive.css
└── main.jsx
```

This is guidance, not a mandatory rewrite.

Do not churn working files simply to match this tree.

---

# 20. Data Model Principle

Project information should come from structured data rather than repeated hard-coded markup.

Example:

```js
{
  id: "the-last-website",
  number: "01",
  title: "The Last Website",
  category: "FLAGSHIP",
  status: "Experimental",
  description: "...",
  stack: ["React", "Three.js", "GSAP"],
  image: "...",
  github: "...",
  live: "..."
}
```

Stack details should similarly map technologies to projects.

This makes:
- Home Selected Work
- Projects archive
- Stack contextual panel

share the same source of truth.

---

# 21. Implementation Sequence

## Phase 1 — Foundation

Build:
- global tokens
- page background
- typography
- shared layout frame
- header/navigation
- responsive primitives
- section flow

Do not add 3D yet.

## Phase 2 — Static parity

Implement:
- Home
- Projects
- About
- Stack
- Contact

Goal:
- match design intent at `1536 × 864`
- remove black bars
- remove accidental viewport voids

## Phase 3 — Interaction

Add:
- Home Selected Work preview
- Projects archive expansion
- Personnel File expansion
- Stack selection/detail panel
- active nav tracking
- RM/SND controls
- keyboard/touch behavior

## Phase 4 — Spatial enhancement

Add restrained:
- Z-depth
- perspective
- parallax
- archive transitions

Only after static layout is stable.

## Phase 5 — Mobile

Author mobile-specific composition.

Do not merely shrink desktop.

## Phase 6 — Polish

Validate:
- performance
- accessibility
- reduced motion
- responsive dimensions
- image optimization
- loading state
- metadata / title / favicon
- cross-browser behavior

---

# 22. Hard "Do Not" List

Do not:

- redesign the palette
- switch to neon
- add glassmorphism
- add random 3D objects
- create another card-grid portfolio
- make portraits huge
- make metadata unreadably tiny
- force every section to 100vh
- create black gaps between sections
- add giant decorative section numbers
- add arbitrary filler to consume whitespace
- require hover for essential content
- treat mobile as desktop scaled down
- replace the Projects archive
- add fake skill percentages
- overanimate the site

---

# 23. Definition of Done

The implementation is successful when:

1. The design looks intentional at 100% browser zoom on a 16" laptop.
2. No portrait overwhelms the content.
3. Body copy remains comfortable to read.
4. No section has an unexplained giant blank lower half.
5. No black bands appear between sections.
6. Projects retain the archive/accordion identity.
7. About feels human, not like a resume template.
8. Stack explains real usage instead of merely listing logos.
9. Contact feels like the designed end of the site.
10. Mobile feels authored, not compressed.
11. 3D creates spatial continuity rather than decoration.
12. The site no longer feels like the previous portfolio wearing a new theme.
13. The whole experience reads as one **builder's living archive**.

---

# 24. Agent Handoff Rule

For Claude Code, Codex, Copilot, or any other coding agent:

> **Treat this document as the canonical art-direction contract.**

When implementation constraints conflict with exact mockup geometry:

1. preserve intent;
2. preserve hierarchy;
3. preserve interaction;
4. fix responsiveness;
5. prefer usable layout over literal pixel matching.

Do not reinterpret the visual language without explicit approval.

If a change would materially alter the frozen design, stop and flag it instead of silently redesigning it.

---

**Design Freeze:** v1  
**Next phase:** implementation / vibe-coding  
**Primary rule:** build the frozen idea; fix geometry in-browser.
