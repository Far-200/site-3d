import DeveloperTerminal from "../DeveloperTerminal";

// "Currently building" / developer-status area on the home page —
// the classic terminal personality integrated into the 3D system.
const FOCUS_ITEMS = [
  {
    title: "3D portfolio ecosystem",
    text: "Rebuilding the portfolio as a cohesive interactive 3D experience with proper project pages and storytelling.",
  },
  {
    title: "Learning systems & visualizers",
    text: "Pushing AptiVision and FlowTrace further — making reasoning and program execution visible.",
  },
  {
    title: "Full-stack + AI growth",
    text: "Exploring React, FastAPI, developer tools, and AI/security-inspired projects toward internship readiness.",
  },
];

function StatusSection() {
  return (
    <section className="page-section" aria-labelledby="status-heading">
      <div className="page-section-inner section-panel section-panel--status">
        <div className="section-panel-copy">
          <p className="section-kicker">Now</p>
          <h2 id="status-heading" className="section-title">
            Currently building
          </h2>

          <ul className="focus-list">
            {FOCUS_ITEMS.map((item, index) => (
              <li className="focus-item" key={item.title}>
                <span className="focus-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <DeveloperTerminal />
      </div>
    </section>
  );
}

export default StatusSection;
