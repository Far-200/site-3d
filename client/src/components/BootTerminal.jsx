import { useEffect, useRef, useState } from "react";

// One-time boot overlay carrying the classic terminal personality.
// - Runs once per browser session (sessionStorage key "fk-booted").
// - Immediately skippable; skipped entirely under reduced motion.
// - Purely decorative: hidden from assistive technologies.

const FIRST_LINE = "farhaan@portfolio:~$ sudo apt install weirdly-useful-tools";

const BOOT_LINES = [
  { text: "[sudo] password accepted", delay: 480, style: "muted" },
  { text: "installing devtools...", delay: 820, style: "muted" },
  { text: "compiling developer core...", delay: 1140, style: "muted" },
  { text: "running npm run build", delay: 1420, style: "muted" },
  { text: "✓ build complete", delay: 1780, style: "success" },
  { text: "launching interface...", delay: 2080, style: "muted" },
];

const TYPE_INTERVAL = 30;
const DONE_AT = 2500;
const FADE_MS = 360;

function BootTerminal({ onDone }) {
  const [typed, setTyped] = useState("");
  const [visibleCount, setVisibleCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    const timers = timersRef.current;

    let charIndex = 0;
    const typeNext = () => {
      charIndex += 1;
      setTyped(FIRST_LINE.slice(0, charIndex));
      if (charIndex < FIRST_LINE.length) {
        timers.push(setTimeout(typeNext, TYPE_INTERVAL));
      }
    };
    timers.push(setTimeout(typeNext, 100));

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), line.delay));
    });

    timers.push(setTimeout(() => setExiting(true), DONE_AT));
    timers.push(setTimeout(onDone, DONE_AT + FADE_MS));

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const skip = () => {
    timersRef.current.forEach(clearTimeout);
    onDone();
  };

  return (
    <div
      className={`boot-overlay${exiting ? " boot-overlay--exit" : ""}`}
      role="presentation"
    >
      <div className="terminal boot-window" aria-hidden="true">
        <div className="terminal-bar">
          <span className="terminal-dot terminal-dot--red" />
          <span className="terminal-dot terminal-dot--yellow" />
          <span className="terminal-dot terminal-dot--green" />
          <span className="terminal-title">farhaan@portfolio — boot</span>
        </div>

        <div className="terminal-body">
          <p className="boot-line boot-line--cmd">
            {typed}
            {typed.length < FIRST_LINE.length && (
              <span className="terminal-cursor">▋</span>
            )}
          </p>

          {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
            <p
              key={line.text}
              className={`boot-line boot-line--${line.style}${
                i === visibleCount - 1 ? " boot-line--latest" : ""
              }`}
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>

      <button className="boot-skip" type="button" onClick={skip}>
        skip
      </button>
    </div>
  );
}

export default BootTerminal;
