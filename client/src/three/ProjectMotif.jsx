import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { supportsWebGL } from "../lib/webgl";
import useReducedMotion from "../lib/useReducedMotion";

// Lightweight procedural scene motifs for project detail pages, driven by
// each project's `scenePreset`. Deliberately cheap: small geometry counts,
// basic materials, one canvas per detail page, capped DPR, no
// postprocessing. Falls back to nothing (caller renders DOM placeholder)
// when WebGL is unavailable, and renders a single static frame under
// reduced motion.

const ACCENT = "#2fd9a6";
const ACCENT_SOFT = "#9fffe2";
const SURFACE = "#163d32";

function useSpin(ref, speed = 0.25, axis = "y") {
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation[axis] += delta * speed;
  });
}

// AptiVision — analytical scanning rings around an "observed" core.
function VisionMotif() {
  const rings = useRef();
  const core = useRef();
  useSpin(rings, 0.35, "z");
  useSpin(core, 0.2, "y");
  return (
    <group>
      <mesh ref={core}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive="#063a2c"
          emissiveIntensity={1.2}
          metalness={0.5}
          roughness={0.3}
          flatShading
        />
      </mesh>
      <group ref={rings}>
        {[1.4, 1.75, 2.1].map((radius, i) => (
          <mesh key={radius} rotation={[Math.PI / 2 + i * 0.35, 0, i * 0.5]}>
            <torusGeometry args={[radius, 0.014, 10, 90]} />
            <meshBasicMaterial
              color={i === 0 ? ACCENT : ACCENT_SOFT}
              transparent
              opacity={0.55 - i * 0.14}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// FlowTrace — nodes connected along an execution path.
function FlowMotif() {
  const group = useRef();
  useSpin(group, 0.22, "y");
  const points = useMemo(
    () => [
      new THREE.Vector3(-1.7, 0.9, 0),
      new THREE.Vector3(-0.7, 0.1, 0.4),
      new THREE.Vector3(0.3, 0.7, -0.3),
      new THREE.Vector3(1.1, -0.3, 0.2),
      new THREE.Vector3(1.8, -1, -0.2),
    ],
    [],
  );
  const lineGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points],
  );
  return (
    <group ref={group}>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.7} />
      </line>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.32, 0.32, 0.32]} />
          <meshStandardMaterial
            color={i === 2 ? ACCENT : SURFACE}
            emissive="#082119"
            emissiveIntensity={i === 2 ? 1.4 : 0.7}
            metalness={0.4}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

// Folder Structure Visualizer — a branching directory tree.
function TreeMotif() {
  const group = useRef();
  useSpin(group, 0.24, "y");
  const nodes = useMemo(() => {
    const list = [{ position: [0, 1.4, 0], size: 0.42 }];
    const level1 = [-1.1, 0, 1.1];
    level1.forEach((x) => {
      list.push({ position: [x, 0.2, 0], size: 0.32 });
      [-0.45, 0.45].forEach((dx) => {
        list.push({ position: [x + dx, -1, 0], size: 0.22 });
      });
    });
    return list;
  }, []);
  const lines = useMemo(() => {
    const segments = [];
    const root = new THREE.Vector3(0, 1.4, 0);
    [-1.1, 0, 1.1].forEach((x) => {
      const mid = new THREE.Vector3(x, 0.2, 0);
      segments.push(root, mid);
      [-0.45, 0.45].forEach((dx) => {
        segments.push(mid, new THREE.Vector3(x + dx, -1, 0));
      });
    });
    return new THREE.BufferGeometry().setFromPoints(segments);
  }, []);
  return (
    <group ref={group}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.5} />
      </lineSegments>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <boxGeometry args={[node.size, node.size, node.size]} />
          <meshStandardMaterial
            color={i === 0 ? ACCENT : SURFACE}
            emissive="#082119"
            emissiveIntensity={i === 0 ? 1.3 : 0.7}
            metalness={0.4}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

// Password Estimator — a security lattice with an entropy core.
function EntropyMotif() {
  const shell = useRef();
  const core = useRef();
  useSpin(shell, 0.3, "y");
  useSpin(core, -0.4, "x");
  return (
    <group>
      <mesh ref={core}>
        <torusKnotGeometry args={[0.65, 0.2, 90, 12]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive="#063a2c"
          emissiveIntensity={1.2}
          metalness={0.55}
          roughness={0.25}
          flatShading
        />
      </mesh>
      <mesh ref={shell} scale={1.85}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={ACCENT_SOFT}
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

// DevTool — structured JSON/data blocks in a stack.
function BlocksMotif() {
  const group = useRef();
  useSpin(group, 0.26, "y");
  const blocks = useMemo(
    () => [
      { position: [0, 1, 0], scale: [1.6, 0.4, 1.1] },
      { position: [0.2, 0.35, 0.1], scale: [2, 0.4, 1.3] },
      { position: [-0.15, -0.3, -0.05], scale: [1.7, 0.4, 1.2] },
      { position: [0.05, -0.95, 0.05], scale: [2.1, 0.4, 1.4] },
    ],
    [],
  );
  return (
    <group ref={group}>
      {blocks.map((block, i) => (
        <mesh key={i} position={block.position} scale={block.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={i === 1 ? ACCENT : SURFACE}
            emissive="#082119"
            emissiveIntensity={i === 1 ? 1.2 : 0.7}
            metalness={0.4}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

// PromptRouter — a prompt node routing a signal to model nodes.
function RouterMotif() {
  const group = useRef();
  const signal = useRef();
  useSpin(group, 0.2, "y");
  const targets = useMemo(
    () => [
      new THREE.Vector3(1.6, 1, 0),
      new THREE.Vector3(1.9, 0, 0),
      new THREE.Vector3(1.6, -1, 0),
    ],
    [],
  );
  const origin = useMemo(() => new THREE.Vector3(-1.6, 0, 0), []);
  const lines = useMemo(() => {
    const pts = [];
    targets.forEach((t) => pts.push(origin, t));
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [origin, targets]);
  useFrame(({ clock }) => {
    if (!signal.current) return;
    const t = (clock.elapsedTime * 0.5) % 1;
    const target = targets[Math.floor(clock.elapsedTime * 0.5) % 3];
    signal.current.position.lerpVectors(origin, target, t);
  });
  return (
    <group ref={group}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.45} />
      </lineSegments>
      <mesh position={origin}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive="#063a2c"
          emissiveIntensity={1.3}
          flatShading
        />
      </mesh>
      {targets.map((t, i) => (
        <mesh key={i} position={t}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color={SURFACE}
            emissive="#082119"
            emissiveIntensity={0.8}
            metalness={0.4}
            roughness={0.35}
          />
        </mesh>
      ))}
      <mesh ref={signal}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color={ACCENT_SOFT} />
      </mesh>
    </group>
  );
}

// Astra / default — a small orbital presence.
function OrbitMotif() {
  const group = useRef();
  useSpin(group, 0.3, "y");
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive="#063a2c"
          emissiveIntensity={1.2}
          metalness={0.5}
          roughness={0.3}
          flatShading
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[1.6, 0.016, 10, 90]} />
        <meshBasicMaterial color={ACCENT_SOFT} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

const MOTIFS = {
  vision: VisionMotif,
  flow: FlowMotif,
  tree: TreeMotif,
  entropy: EntropyMotif,
  blocks: BlocksMotif,
  router: RouterMotif,
  orbit: OrbitMotif,
};

function ProjectMotif({ preset = "orbit", label }) {
  const reduced = useReducedMotion();

  if (!supportsWebGL()) return null;

  const Motif = MOTIFS[preset] ?? OrbitMotif;

  return (
    <div className="motif-frame" role="img" aria-label={label}>
      <Canvas
        camera={{ position: [0, 0.2, 5.4], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={reduced ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 5, 5]} intensity={2.4} color="#c9fff0" />
        <pointLight position={[-4, 0, 3]} intensity={14} distance={9} color="#0bc98f" />
        <Motif />
      </Canvas>
      <span className="scene-corner scene-corner--top-left" aria-hidden="true" />
      <span className="scene-corner scene-corner--bottom-right" aria-hidden="true" />
    </div>
  );
}

export default ProjectMotif;
