// Composition root for the static hero scene.
// Owns the background, fog, the cool/warm lighting pair, and the deliberate
// desktop camera framing. Renders the Blender-authored CabinShell plus the
// runtime-only WindowWorld exterior.
import { useLayoutEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import CabinShell from "./CabinShell.jsx";
import WindowWorld from "./WindowWorld.jsx";

// Window aperture centre in world space (from the exported GLB): x 0, y ~2.1.
const LOOK_TARGET = new THREE.Vector3(-0.1, 1.82, -1.25);

// A deliberate 3/4 interior framing: viewer stood inside the room, slightly
// to one side of the window, looking toward the workspace wall. Mild
// perspective, never a flat elevation. On narrower viewports the camera
// pulls back and widens so the window never crops and there is always wall
// left below the sill for a future desk.
function CameraRig() {
  const ref = useRef(null);
  const { width, height } = useThree((state) => state.size);

  const { position, fov } = useMemo(() => {
    const aspect = width / Math.max(height, 1);
    const narrow = THREE.MathUtils.clamp((1.7 - aspect) / 0.95, 0, 1);
    return {
      position: [0.72, 1.3 + narrow * 0.08, 2.78 + narrow * 1.5],
      fov: 45 + narrow * 5,
    };
  }, [width, height]);

  useLayoutEffect(() => {
    if (ref.current) ref.current.lookAt(LOOK_TARGET);
  }, [position, fov]);

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={position}
      fov={fov}
      near={0.1}
      far={280}
    />
  );
}

export default function Scene() {
  return (
    <>
      <color attach="background" args={["#0c1a2e"]} />
      <fog attach="fog" args={["#183355", 20, 95]} />

      <CameraRig />

      {/* --- COOL EXTERIOR: moonlight raking in through the real opening --- */}
      <directionalLight
        position={[-6, 7.5, -20]}
        intensity={2.4}
        color="#a6c0f0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00022}
        shadow-normalBias={0.025}
        shadow-camera-near={1}
        shadow-camera-far={46}
        shadow-camera-left={-3.4}
        shadow-camera-right={3.4}
        shadow-camera-top={4.4}
        shadow-camera-bottom={-0.8}
      />

      {/* --- WARM INTERIOR: restrained amber fill, no lamp object yet --- */}
      <hemisphereLight
        color="#9fb6e0"
        groundColor="#5a4026"
        intensity={0.85}
      />
      <directionalLight
        position={[3.4, 2.6, 4.2]}
        intensity={0.55}
        color="#ffbe86"
      />
      <pointLight
        position={[1.5, 1.85, 2.7]}
        intensity={11}
        distance={16}
        decay={2}
        color="#ffb265"
      />
      <ambientLight intensity={0.46} color="#3a5a8a" />

      <CabinShell position={[0, 0, 0]} />
      <WindowWorld />
    </>
  );
}
