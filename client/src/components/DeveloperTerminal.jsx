import { useEffect, useState } from "react";
import useReducedMotion from "../lib/useReducedMotion";

// Developer-console status panel — the personality layer from the classic
// site, restyled into the 3D system. Content reflects genuinely current
// work (see src/data/projects.js).

const ROTATING_LINES = [
  "turning caffeine into commits",
  "debugging life choices",
  "shipping weirdly useful tools",
  "making things people actually use",
  "convincing CSS to cooperate",
];

const CURRENTLY_BUILDING = [
  "AptiVision reasoning modules",
  "FlowTrace execution engine",
  "AI-assisted tooling",
];

function RotatingLine() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % ROTATING_LINES.length),
      3500,
    );
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <p className="terminal-rotating">
      <span className="terminal-prompt" aria-hidden="true">
        {">"}
      </span>{" "}
      {ROTATING_LINES[index]}
    </p>
  );
}

function DeveloperTerminal() {
  return (
    <div className="terminal dev-terminal">
      <div className="terminal-bar">
        <span className="terminal-dot terminal-dot--red" aria-hidden="true" />
        <span
          className="terminal-dot terminal-dot--yellow"
          aria-hidden="true"
        />
        <span
          className="terminal-dot terminal-dot--green"
          aria-hidden="true"
        />
        <span className="terminal-title">farhaan@portfolio — status</span>
      </div>

      <div className="terminal-body">
        <p className="terminal-cmd">
          <span className="terminal-prompt">farhaan@portfolio:~$</span> status
          <span className="terminal-cursor" aria-hidden="true">
            ▋
          </span>
        </p>

        <div className="terminal-section">
          <p className="terminal-label">Currently building:</p>
          {CURRENTLY_BUILDING.map((item) => (
            <p className="terminal-item" key={item}>
              <span className="terminal-arrow" aria-hidden="true">
                {">"}
              </span>{" "}
              {item}
            </p>
          ))}
        </div>

        <div className="terminal-section">
          <p className="terminal-label">Last deploy:</p>
          <p className="terminal-item terminal-item--success">
            <span aria-hidden="true">✓</span> portfolio — 3D rebuild shipped
          </p>
        </div>

        <div className="terminal-section">
          <p className="terminal-label">System mood:</p>
          <p className="terminal-item terminal-item--mood">stable-ish</p>
        </div>

        <div className="terminal-divider" aria-hidden="true" />
        <RotatingLine />
      </div>
    </div>
  );
}

export default DeveloperTerminal;
