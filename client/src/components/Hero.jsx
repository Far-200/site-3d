import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import DeveloperCore from "../three/DeveloperCore";
import { supportsWebGL } from "../lib/webgl";
import useReducedMotion from "../lib/useReducedMotion";

const technologies = [
  "React",
  "JavaScript",
  "Python",
  "Three.js",
  "Java — learning",
];

function Hero() {
  const reduced = useReducedMotion();
  const webgl = supportsWebGL();

  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <section className="hero-copy">
        <p className="hero-kicker">
          <span className="status-light" />
          Final-year CSE student · Open to internships &amp; roles
        </p>

        <h1 id="hero-heading" className="hero-title">
          Farhaan Khan.
          <span className="hero-title-accent">Making complexity visible.</span>
        </h1>

        <p className="hero-description">
          I build interactive web tools, visualizers, and AI-assisted
          experiences using React, Python, and an increasingly serious backend
          stack. Building weirdly useful software since 2023.
        </p>

        <div className="hero-actions">
          <Link className="button button--primary" to="/work">
            Explore my work
            <span aria-hidden="true">→</span>
          </Link>

          <a
            className="button button--secondary"
            href="https://github.com/Far-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub
          </a>
        </div>

        <ul className="tech-list" aria-label="Technologies">
          {technologies.map((technology) => (
            <li className="tech-item" key={technology}>
              {technology}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="hero-visual"
        aria-label="Interactive three-dimensional developer core"
      >
        <div className="scene-frame">
          {webgl ? (
            <Canvas
              camera={{
                position: [0, 0.1, 6],
                fov: 42,
              }}
              dpr={[1, 1.6]}
              frameloop={reduced ? "demand" : "always"}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
            >
              <ambientLight intensity={0.75} />

              <directionalLight
                position={[4, 5, 5]}
                intensity={2.7}
                color="#c9fff0"
              />

              <pointLight
                position={[-4, 0, 3]}
                intensity={18}
                distance={9}
                color="#0bc98f"
              />

              <pointLight
                position={[3, -2, 2]}
                intensity={9}
                distance={7}
                color="#17624d"
              />

              <DeveloperCore />
            </Canvas>
          ) : (
            <div className="scene-fallback" aria-hidden="true">
              <span className="project-media-grid" />
              <span className="scene-fallback-mark">FK</span>
            </div>
          )}

          <div className="scene-label">
            <span>01</span>
            Developer core
          </div>

          {webgl && !reduced && (
            <p className="scene-instruction">Move your cursor to inspect</p>
          )}

          <span className="scene-corner scene-corner--top-left" />
          <span className="scene-corner scene-corner--top-right" />
          <span className="scene-corner scene-corner--bottom-left" />
          <span className="scene-corner scene-corner--bottom-right" />
        </div>
      </section>
    </section>
  );
}

export default Hero;
