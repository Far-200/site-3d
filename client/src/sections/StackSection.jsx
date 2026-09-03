import { Fragment, useState } from "react";
import { stackGroups } from "../data/stack";
import { archiveProjects } from "../data/projects";
import { useArchivePrefs } from "../lib/archivePrefsContext";
import useReveal from "../lib/useReveal";

// STACK — "STACK // 04" (art-design.md §12).
//
// Live selection across the three groups (BUILD WITH / REGULARLY USE /
// EXPLORING). Every technology is a <button>; keyboard focus or a click
// selects it (hover-select was removed in Phase 4.6 — sweeping the
// pointer across the list thrashed the panel). The selected row gets
// orange emphasis plus a structural cue (▸ marker + left rule). One state
// (`selectedName`) drives the pressed row and the detail panel in the
// same render, so they can never disagree.
//
// The detail panel is rendered TWICE from one <StackDetail>: once as a
// side column (desktop) and once inline directly beneath the selected
// row (mobile, per §12 "contextual details appear below selected item").
// CSS shows exactly one per breakpoint; the hidden one is display:none so
// it leaves the a11y tree and never double-announces.
//
// Technology → project mapping is data (`item.usedIn` slugs in
// data/stack.js), resolved here against the project archive — no switch
// statements, no fabricated associations. Never bars / ratings / logos.

const DEFAULT_SELECTED = "React";

const titleBySlug = Object.fromEntries(
  archiveProjects.map((p) => [p.slug, p.shortTitle ?? p.title]),
);

function findItem(name) {
  for (const group of stackGroups) {
    const item = group.items.find((i) => i.name === name);
    if (item) return { group, item };
  }
  return null;
}

function StackDetail({ selected, usedIn, isExploring, variant }) {
  return (
    <aside
      className={`stack-detail stack-detail--${variant}`}
      aria-label="Selected technology detail"
      aria-live="polite"
    >
      {/* Rendered directly from `selected` — no keyed remount, no
          keyframe. One state (selectedName) drives both the pressed row
          and this panel in the same render, so they can never disagree
          and the content can never get stuck mid-animation. */}
      <p className="meta-label stack-detail__kicker">{selected.group.title}</p>
      <p className="stack-detail__name">{selected.item.name}</p>
      <p className="stack-detail__blurb">{selected.item.note}</p>

      {usedIn.length > 0 && (
        <>
          <p className="meta-label stack-detail__used-label">Used in</p>
          <ul className="stack-detail__used">
            {usedIn.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </>
      )}
      {usedIn.length === 0 && isExploring && (
        <p className="stack-detail__none">Exploring — no shipped project yet.</p>
      )}
    </aside>
  );
}

function StackSection() {
  const revealRef = useReveal();
  const { playCue } = useArchivePrefs();
  const [selectedName, setSelectedName] = useState(DEFAULT_SELECTED);

  const selected = findItem(selectedName) ?? findItem(DEFAULT_SELECTED);
  const usedIn = selected
    ? selected.item.usedIn.map((slug) => titleBySlug[slug]).filter(Boolean)
    : [];
  // The "no shipped project yet" line is only meaningful for EXPLORING
  // items with no mapping. A BUILD WITH / REGULARLY USE tool with an empty
  // usedIn (Git, Docker, SQL, …) is used everywhere — its note already
  // says so — so that branch shows nothing rather than implying otherwise.
  const isExploring = selected?.group.id === "exploring";

  const select = (name, { fromClick = false } = {}) => {
    setSelectedName((current) => (current === name ? current : name));
    if (fromClick) playCue("select");
  };

  return (
    <section
      id="stack"
      className="section"
      aria-labelledby="stack-title"
      ref={revealRef}
    >
      <div className="frame">
        <span className="section__eyebrow">STACK // 04</span>
        <h2 id="stack-title" className="section__title">
          What actually gets used
        </h2>
        <p className="section__intro">
          Grouped by how often it shows up in real work — not by how
          impressive it looks in a list.
        </p>

        <div className="stack-layout">
          <div className="cols-3 stack-taxonomy">
            {stackGroups.map((group) => (
              <div className="stack-group" key={group.id}>
                <h3 className="stack-group__title">{group.title}</h3>
                <p className="stack-group__blurb">{group.blurb}</p>
                <ul className="stack-group__items">
                  {group.items.map((item) => {
                    const isSelected = item.name === selected?.item.name;
                    return (
                      <Fragment key={item.name}>
                        <li>
                          <button
                            type="button"
                            className="stack-group__item"
                            aria-pressed={isSelected}
                            onFocus={() => select(item.name)}
                            onClick={() =>
                              select(item.name, { fromClick: true })
                            }
                          >
                            <span
                              className="stack-group__cue"
                              aria-hidden="true"
                            />
                            {item.name}
                          </button>
                        </li>
                        {isSelected && selected && (
                          <li className="stack-group__detail-host">
                            <StackDetail
                              selected={selected}
                              usedIn={usedIn}
                              isExploring={isExploring}
                              variant="inline"
                            />
                          </li>
                        )}
                      </Fragment>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {selected && (
            <StackDetail
              selected={selected}
              usedIn={usedIn}
              isExploring={isExploring}
              variant="aside"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default StackSection;
