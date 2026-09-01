import { stackGroups } from "../data/stack";

// STACK — "STACK // 04" (art-design.md §12).
// Phase 1: the three-column taxonomy (BUILD WITH / REGULARLY USE /
// EXPLORING) as a static list. Row selection and the contextual detail
// panel are Phase 3. No progress bars / ratings / percentages ever.

function StackSection() {
  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="frame">
        <span className="section__eyebrow">STACK // 04</span>
        <h2 id="stack-title" className="section__title">
          What actually gets used
        </h2>
        <p className="section__intro">
          Grouped by how often it shows up in real work — not by how
          impressive it looks in a list.
        </p>

        <div className="cols-3" style={{ marginTop: "var(--space-lg)" }}>
          {stackGroups.map((group) => (
            <div className="stack-group" key={group.id}>
              <h3 className="stack-group__title">{group.title}</h3>
              <p className="stack-group__blurb">{group.blurb}</p>
              <ul className="stack-group__items">
                {group.items.map((item) => (
                  <li className="stack-group__item" key={item.name}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StackSection;
