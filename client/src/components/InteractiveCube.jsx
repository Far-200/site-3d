import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function InteractiveCube({ isPaused, onTogglePause }) {
  const cubeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "default";

    return () => {
      document.body.style.cursor = "default";
    };
  }, [isHovered]);

  useFrame((state, delta) => {
    const cube = cubeRef.current;

    if (!cube) return;

    if (!isPaused) {
      cube.rotation.x += delta * 0.35;
      cube.rotation.y += delta * 0.65;
    }

    // Float gently up and down.
    cube.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.12;

    // Smoothly grow when hovered.
    const targetScale = isHovered ? 1.15 : 1;

    const newScale = THREE.MathUtils.damp(cube.scale.x, targetScale, 8, delta);

    cube.scale.setScalar(newScale);
  });

  const handleClick = (event) => {
    event.stopPropagation();
    onTogglePause();
  };

  const handlePointerOver = (event) => {
    event.stopPropagation();
    setIsHovered(true);
  };

  const handlePointerOut = () => {
    setIsHovered(false);
  };

  return (
    <mesh
      ref={cubeRef}
      rotation={[0.3, 0.4, 0]}
      castShadow
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[1.8, 1.8, 1.8]} />

      <meshStandardMaterial
        color={isHovered ? "#ffaaaa" : "#ef8585"}
        metalness={0.2}
        roughness={0.35}
      />
    </mesh>
  );
}

export default InteractiveCube;
