// Loads the Blender-authored cabin shell (wall + real window opening) and
// drops it into the scene exactly as exported. No wall/window geometry is
// recreated here — this component only wires the GLB into the render tree
// and tags its meshes for shadowing.
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

const MODEL_URL = "/models/CabinShell.glb";

export default function CabinShell(props) {
  const { scene } = useGLTF(MODEL_URL);

  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      // The wall receives moonlight shadows; the frame/mullions cast them.
      obj.castShadow = true;
      obj.receiveShadow = true;
      if (obj.material) {
        obj.material.shadowSide = 2; // THREE.DoubleSide — clean self-shadow terminator
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload(MODEL_URL);
