// The world beyond the real window opening — runtime R3F only, kept fully
// separate from the Blender CabinShell asset. V1 is entirely static:
// a deep cobalt sky dome, one restrained moon, a modest layered star field,
// and three depth bands of instanced conifer silhouettes. No animation.
import { useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Instances, Instance } from "@react-three/drei";

// ---------------------------------------------------------------------------
// deterministic PRNG so the layout is stable across reloads and un-gridlike
// ---------------------------------------------------------------------------
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// a soft round sprite so stars / glow are discs, not squares
function softDotTexture() {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// ---------------------------------------------------------------------------
// sky: a large inverted sphere with a baked vertical cobalt gradient
// (no shader, no fullscreen plane, no CSS-hero look)
// ---------------------------------------------------------------------------
function SkyDome() {
  const geometry = useMemo(() => {
    const R = 170;
    const g = new THREE.SphereGeometry(R, 32, 24);
    const pos = g.attributes.position;
    const zenith = new THREE.Color("#0c1a30");
    const horizon = new THREE.Color("#31517f");
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const t = THREE.MathUtils.smoothstep(pos.getY(i) / R, -0.35, 0.75);
      const c = horizon.clone().lerp(zenith, t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, []);

  return (
    <mesh geometry={geometry} renderOrder={-1000} frustumCulled={false}>
      <meshBasicMaterial
        vertexColors
        side={THREE.BackSide}
        fog={false}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// moon: a cool disc + faint additive halo, framed in the upper window
// ---------------------------------------------------------------------------
function Moon({ position }) {
  const glow = useMemo(() => softDotTexture(), []);
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[2.4, 32, 24]} />
        <meshBasicMaterial color="#e7ebf4" fog={false} toneMapped={false} />
      </mesh>
      <sprite scale={[26, 26, 1]}>
        <spriteMaterial
          map={glow}
          color="#b6c8f2"
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          fog={false}
          toneMapped={false}
        />
      </sprite>
    </group>
  );
}

// ---------------------------------------------------------------------------
// stars: three fixed-size point groups (dim / mid / bright), one draw call
// each, no per-point shader. Concentrated toward the sky the window sees.
// ---------------------------------------------------------------------------
function starGeometry(count, rMin, rMax, rng) {
  const p = new Float32Array(count * 3);
  let n = 0;
  let guard = 0;
  while (n < count && guard < count * 60) {
    guard++;
    const u = rng() * 2 - 1;
    const th = rng() * Math.PI * 2;
    const r = rMin + (rMax - rMin) * Math.cbrt(rng());
    const s = Math.sqrt(1 - u * u);
    const x = r * s * Math.cos(th);
    const y = r * u;
    const z = r * s * Math.sin(th);
    if (z > -10 || y < -6) continue; // keep the field behind + above the window
    p[n * 3] = x;
    p[n * 3 + 1] = y;
    p[n * 3 + 2] = z;
    n++;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(p.subarray(0, n * 3), 3));
  return g;
}

function Stars() {
  const dot = useMemo(() => softDotTexture(), []);
  const groups = useMemo(() => {
    const rng = mulberry32(0xc0ba17);
    return [
      { geo: starGeometry(620, 70, 150, rng), size: 1.5, color: "#8397c4", opacity: 0.75 },
      { geo: starGeometry(240, 60, 140, rng), size: 2.1, color: "#b9c5e6", opacity: 0.92 },
      { geo: starGeometry(70, 55, 130, rng), size: 3.2, color: "#eef2ff", opacity: 1 },
    ];
  }, []);

  return (
    <group>
      {groups.map((g, i) => (
        <points key={i} geometry={g.geo} frustumCulled={false}>
          <pointsMaterial
            map={dot}
            size={g.size}
            color={g.color}
            sizeAttenuation={false}
            transparent
            opacity={g.opacity}
            depthWrite={false}
            fog={false}
            toneMapped={false}
          />
        </points>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// forest: one shared low-poly conifer (three stacked cones), instanced
// across three depth bands
// ---------------------------------------------------------------------------
const BANDS = [
  { count: 20, z: [-13, -24], x: 22, scale: [1.15, 1.9], jitterY: 0.15 },
  { count: 26, z: [-24, -46], x: 44, scale: [1.0, 1.9], jitterY: 0.1 },
  { count: 54, z: [-46, -82], x: 82, scale: [0.55, 1.2], jitterY: 0.05 },
];

function coniferGeometry() {
  const tiers = [
    new THREE.ConeGeometry(1.15, 2.2, 8).translate(0, 1.0, 0),
    new THREE.ConeGeometry(0.92, 2.2, 8).translate(0, 2.3, 0),
    new THREE.ConeGeometry(0.66, 2.0, 8).translate(0, 3.7, 0),
    new THREE.ConeGeometry(0.4, 1.7, 8).translate(0, 5.0, 0),
  ];
  const merged = mergeGeometries(tiers, false);
  tiers.forEach((t) => t.dispose());
  return merged;
}

function Forest() {
  const geometry = useMemo(() => coniferGeometry(), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#223458",
        roughness: 1,
        metalness: 0,
      }),
    [],
  );

  const trees = useMemo(() => {
    const rng = mulberry32(0x5eed21);
    const out = [];
    BANDS.forEach((b, bi) => {
      for (let i = 0; i < b.count; i++) {
        let z = b.z[0] + (b.z[1] - b.z[0]) * rng();
        const x = (rng() * 2 - 1) * b.x;
        // keep the nearest trees from crowding the glass directly behind it
        if (Math.abs(x) < 3.5 && z > -17) z -= 7;
        const sBase = b.scale[0] + (b.scale[1] - b.scale[0]) * rng();
        const sx = sBase * (0.8 + rng() * 0.4);
        const sy = sBase * (0.85 + rng() * 0.55);
        out.push({
          key: `${bi}-${i}`,
          position: [x, -0.25 + rng() * b.jitterY, z],
          rotation: [0, rng() * Math.PI * 2, 0],
          scale: [sx, sy, sx],
        });
      }
    });
    return out;
  }, []);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -55]}>
        <planeGeometry args={[280, 210]} />
        <meshStandardMaterial color="#0a1220" roughness={1} metalness={0} />
      </mesh>
      <Instances
        geometry={geometry}
        material={material}
        limit={trees.length}
        castShadow={false}
        receiveShadow={false}
      >
        {trees.map((t) => (
          <Instance
            key={t.key}
            position={t.position}
            rotation={t.rotation}
            scale={t.scale}
          />
        ))}
      </Instances>
    </>
  );
}

// ---------------------------------------------------------------------------
export default function WindowWorld() {
  return (
    <group>
      <SkyDome />
      <Stars />
      <Moon position={[-11.5, 9.5, -26]} />
      <Forest />
    </group>
  );
}
