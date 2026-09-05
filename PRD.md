# PRD — Wooden Desk Portfolio

**Project:** Farhaan Khan Portfolio — Greenfield V3  
**Working branch:** `redesign-v3-greenfield`  
**Status:** Concept / pre-production  
**Primary experience:** Interactive 3D wooden desk inside a log cabin at night  
**Tech direction:** React + React Three Fiber + Drei + Three.js, with HTML/CSS overlays where appropriate

---

## 1. Product Vision

The portfolio should feel like entering a quiet personal workspace rather than scrolling through a conventional developer website.

The primary scene is a handcrafted wooden desk inside a warm log cabin at night. A window behind or near the desk looks out into a living forest: the moon hangs in the sky, stars twinkle, rare shooting stars cross the view, and trees occasionally sway in the wind.

The desk itself is the portfolio's navigation system.

Instead of a standard navbar and a sequence of webpage sections, physical objects on and inside the desk represent parts of the portfolio:

- **Project books** represent projects.
- **A framed photograph** contains `profile.png`.
- **Drawers** can be labelled **About**, **Contact**, and potentially other categories.
- Clicking a drawer physically pulls it open and reveals its contents.
- Clicking a project-book object can focus/select it and eventually open its associated project experience.
- Additional objects may be introduced only if they serve a clear information or interaction purpose.

The result should feel like a small interactive place that happens to be a portfolio.

The experience must remain understandable, performant, accessible, and usable on non-desktop devices.

---

## 2. Product Principle

> **The portfolio is a place, not a page.**

Every major visual element should either:

1. establish the room,
2. contain meaningful portfolio content, or
3. enable navigation/interaction.

Avoid decorative complexity that does not improve the experience.

The 3D scene should not become a game for its own sake.

---

## 3. Core Experience

### 3.1 Initial View

On first load, the visitor sees a composed view of the desk and cabin wall.

The scene should contain, eventually:

- log-cabin wall,
- a window,
- night sky,
- moon,
- forest/tree silhouettes,
- wooden desk,
- project bookshelf / project books,
- framed profile photograph,
- labelled drawers,
- subtle environmental lighting.

The first frame should already look intentional before any interaction occurs.

The camera should feel like the visitor is standing or sitting in front of the desk — not floating freely inside a 3D game.

Free camera movement is not part of the initial product scope.

---

## 4. Information Architecture

The physical desk replaces most traditional top-level navigation.

### Projects
Represented as books or book-like objects.

Possible organization:

- flagship projects displayed prominently on the desk or shelf,
- secondary projects stored together on a shelf,
- spine labels identify each project,
- clicking/tapping a project focuses it,
- a second deliberate action can open its project detail experience.

Existing project pages/routes may eventually be reused or redesigned, but they are **not part of the first scene-building phases**.

### About
Represented by a physical drawer labelled **ABOUT**.

Interaction:

1. user selects the drawer,
2. drawer slides outward,
3. camera may subtly reframe,
4. content inside becomes readable/interactable.

Possible contents later:

- short personal introduction,
- current focus,
- working principles,
- education/experience fragments,
- selected interests.

No implementation of this content should happen before the drawer interaction is approved.

### Contact
Represented by a physical drawer labelled **CONTACT**.

Possible contents later:

- email,
- GitHub,
- LinkedIn,
- résumé.

The physical interaction comes first; content is added later.

### Lab / Experiments
Potentially represented as:

- another drawer,
- a smaller shelf,
- loose notebooks,
- labelled prototype boxes.

This is not yet decided and must not be implemented speculatively.

---

## 5. Scene Composition

The scene should use **stylized realism**, not photorealism.

Target qualities:

- warm,
- calm,
- tactile,
- personal,
- slightly cinematic,
- handmade,
- readable.

Avoid:

- hyper-realistic asset requirements,
- excessive clutter,
- fantasy-game UI,
- neon cyberpunk lighting,
- heavy bloom,
- constant particle effects,
- camera shake,
- dramatic idle animations,
- unnecessary physics.

### Visual balance

The desk should be the main foreground object.

The window should be a strong secondary focal point.

The cabin wall supports the composition rather than dominating it.

Enough negative space should remain for the scene to breathe.

---

## 6. Environmental Animation

Animation should be sparse and believable.

### Trees

- mostly still,
- occasional wind cycle,
- subtle sway,
- different movement strengths for near/far trees,
- return to rest after the wind cycle.

Do not animate every tree constantly at the same frequency.

### Stars

- subtle twinkling only,
- very low amplitude,
- avoid sparkling wallpaper behavior.

### Shooting stars

- rare,
- short-lived,
- randomized within reasonable limits,
- should feel like a small surprise rather than a recurring attraction.

### Moon

Mostly static.

Moonlight may produce cool directional illumination through the window.

### Ambient movement

Potential future additions:

- very slow cloud drift,
- slight fog motion,
- gentle curtain movement if curtains are eventually introduced.

None are required for the first implementation phases.

---

## 7. Lighting

Lighting is one of the primary reasons for using Three.js.

### Desired lighting relationship

**Interior:** warm and dim.  
**Exterior:** cool moonlit blue.

The contrast should create depth between the desk and the window.

Possible light sources:

- low-intensity warm ambient / hemisphere light,
- cool directional moonlight,
- optional warm desk lamp later,
- restrained contact shadows.

Lighting should preserve readability of desk objects.

Do not aim for physically perfect realism if it harms performance or clarity.

---

## 8. Interaction Model

### General

Interactions should feel physical but remain predictable.

Use pointer/tap selection for primary interactions.

Do not require drag gestures for essential navigation.

Hover may enhance desktop feedback but must not be the only way to discover an interaction.

### Drawer interaction

Target behavior:

1. idle drawer is fully closed,
2. selectable label is readable,
3. hover/focus gives restrained affordance,
4. click/tap opens drawer,
5. drawer moves along one axis,
6. contained content is revealed,
7. close action returns it to the exact resting position.

Only one drawer should need to be open at once unless later testing proves otherwise.

Drawer animation should be short, smooth, and interruptible.

### Project books

Target behavior later:

1. book spine is readable,
2. select/focus highlights book,
3. book may shift outward slightly,
4. project title/details become available,
5. visitor can deliberately open the project.

Avoid complex physics or free-form grabbing.

---

## 9. Camera

The camera should be authored, not freely controlled.

### Initial camera

- fixed perspective,
- frames the complete desk composition,
- preserves the window,
- provides enough room for drawer movement.

### Later camera transitions

Permitted only for meaningful focus states:

- inspect project shelf,
- inspect open drawer,
- focus desk object.

Transitions should be subtle.

No orbit controls in the final visitor experience unless explicitly approved later.

---

## 10. Technical Direction

### Core stack

- React
- `@react-three/fiber`
- `@react-three/drei`
- Three.js
- CSS / HTML overlays where appropriate

The repository already contains these dependencies.

### Architecture principle

Start minimal.

Do not build a large scene framework before the first blockout is approved.

A possible eventual structure:

```text
src/
  scene/
    PortfolioScene.jsx
    CabinWall.jsx
    Window.jsx
    Desk.jsx
    drawers/
    projects/
    environment/
```

This is an **eventual** structure only.

Do not scaffold all directories during the first implementation step.

---

## 11. Asset Strategy

Prefer simple geometry and authored textures over complex external 3D models where possible.

Possible sources:

- procedural/basic Three.js geometry,
- Blender-authored low-poly assets,
- original textures,
- user-provided images such as `profile.png`.

Do not use copyrighted or watermarked reference imagery in the final portfolio.

Reference images are visual guidance only.

### Profile photograph

`profile.png` should eventually appear inside a physical desk photo frame.

The photograph itself should remain unchanged unless separately requested.

---

## 12. Responsiveness

The desktop experience is the primary scene.

However, mobile must remain functional.

Possible mobile strategy:

- adjusted camera framing,
- simplified scene,
- fewer simultaneously visible decorative objects,
- tap-first interactions,
- reduced environmental effects.

Do not simply scale the desktop canvas until objects become unreadable.

A later dedicated mobile composition may be required.

---

## 13. Accessibility

The portfolio must not make content inaccessible simply because it is represented in 3D.

Requirements:

- keyboard-focusable interaction equivalents,
- useful labels for drawers and project objects,
- semantic DOM alternatives for essential actions,
- visible focus treatment,
- reduced-motion support,
- meaningful fallback if WebGL is unavailable,
- sufficient contrast for text displayed in HTML overlays.

The 3D scene is the presentation layer, not the only source of meaning.

---

## 14. Performance Targets

The portfolio must remain lightweight enough to feel immediate.

Guidelines:

- keep geometry simple,
- reuse materials,
- minimize draw calls,
- avoid unnecessary real-time shadows,
- avoid excessive post-processing,
- cap device pixel ratio where appropriate,
- pause/reduce nonessential animation when the page is hidden,
- lazy-load heavier assets,
- prefer texture atlases or optimized textures when useful.

Target a stable experience on typical modern laptops and reasonable mobile hardware.

---

## 15. Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- disable shooting-star motion,
- disable tree swaying,
- remove decorative camera transitions,
- drawers may open with either no animation or a very short restrained transition,
- all content remains accessible.

---

## 16. Development Strategy

This project must be developed in **small visually reviewed increments**.

No large design prompts.

No agent is allowed to design future phases without explicit approval.

### Phase 0 — completed

Blank greenfield canvas.

### Phase 1 — Scene Blockout

Only:

- Canvas,
- camera,
- cabin back wall,
- window opening/frame,
- desk blockout,
- optional shelf blockout,
- basic lighting sufficient to see geometry.

No textures required initially.

No profile photo.

No project books.

No labels.

No drawers opening.

No stars.

No trees.

No shooting stars.

No portfolio text.

Goal:

> Approve camera, proportions, and physical composition.

### Phase 2 — Materials & Lighting

Only after Phase 1 approval:

- log material,
- wood desk material,
- window framing,
- warm interior/cool moonlight relationship,
- basic shadows.

### Phase 3 — Window Environment

- night sky,
- moon,
- stars,
- forest silhouettes,
- subtle tree sway,
- rare shooting stars.

### Phase 4 — Desk Identity

- profile photo frame,
- project shelf/books,
- carefully selected props.

### Phase 5 — Drawer Navigation

- About drawer,
- Contact drawer,
- drawer animation/state,
- accessible interaction equivalents.

### Phase 6 — Project Interaction

- project-book focus,
- project metadata,
- project navigation.

### Phase 7 — Mobile / Accessibility / Performance

- mobile composition,
- reduced motion,
- keyboard behavior,
- WebGL fallback,
- profiling and optimization.

---

## 17. Explicit Non-Goals for Early Phases

Do not implement yet:

- full project pages,
- scroll-based webpage sections,
- standard navbar,
- sound,
- first-person camera controls,
- physics,
- character/avatar,
- multiplayer,
- day/night cycle,
- weather system,
- dynamic time-of-day,
- AI chatbot,
- animated custom cursor,
- complex shader effects,
- post-processing stack.

These may only be reconsidered after the core portfolio experience is complete.

---

## 18. Success Criteria

The concept succeeds if a visitor can say:

> “I remember the portfolio with the wooden desk in the cabin.”

without the scene making it harder to understand:

- who Farhaan is,
- what he builds,
- which projects matter,
- how to learn more,
- how to contact him.

The room must create identity.

The portfolio must still communicate.

---

## 19. Current Approved Decisions

- Greenfield rebuild branch: `redesign-v3-greenfield`.
- Base commit: `fc71ee7`.
- Initial greenfield commit: `f79ea70`.
- Do not reuse the previous Cobalt implementation.
- The portfolio concept is now an interactive wooden desk inside a log cabin at night.
- Three.js / React Three Fiber is appropriate because lighting, depth, environmental motion, and physical navigation are core to the concept.
- The desk will serve as the primary navigational metaphor.
- About and Contact are strong candidates for labelled interactive drawers.
- Projects are strong candidates for book-like objects on/around the desk.
- `profile.png` is intended to appear inside a physical photo frame on the desk.
- The scene will be built and approved one component/phase at a time.

---

## 20. Open Decisions

Do not resolve these without explicit visual review:

- exact camera angle,
- desk width/height,
- window size and exact position,
- number of visible drawers,
- whether Lab is a drawer, shelf, notebook, or another object,
- exact project-book arrangement,
- whether a desk lamp is included,
- final degree of stylization,
- final mobile scene strategy,
- exact project interaction transition,
- whether project detail pages remain route-based or become part of the room experience.

These are intentionally undecided.
