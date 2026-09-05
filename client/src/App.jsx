// Greenfield rebuild — Step 4: CabinShell integration + static WindowWorld V1.
// A single full-viewport R3F canvas holding the first composed hero scene:
// the Blender-authored cabin wall/window, a static cobalt night beyond it,
// and the cool/warm lighting relationship. No interaction, no animation yet.
// The previous routing tree, pages, and components remain dormant in the repo.
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./scene/Scene.jsx";

export default function App() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#0b1626" }}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
