import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

const satellites = [
  {
    position: [-2.1, 0.8, 0.15],
    rotation: [0.3, 0.2, 0.4],
    scale: 0.2,
  },
  {
    position: [2, 0.65, -0.2],
    rotation: [0.5, 0.8, 0.2],
    scale: 0.14,
  },
  {
    position: [-1.55, -1.3, 0.35],
    rotation: [0.2, 0.6, 0.8],
    scale: 0.12,
  },
  {
    position: [1.65, -1.25, -0.1],
    rotation: [0.7, 0.1, 0.4],
    scale: 0.17,
  },
];

function DeveloperCore() {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const firstRingRef = useRef(null);
  const secondRingRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = isHovered ? "grab" : "default";

    return () => {
      document.body.style.cursor = "default";
    };
  }, [isHovered]);

  useFrame(({ pointer }, delta) => {
    const group = groupRef.current;

    if (!group) return;

    // Follow the pointer gently.
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      pointer.x * 0.35,
      4,
      delta,
    );

    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      -pointer.y * 0.2,
      4,
      delta,
    );

    // Smooth hover scaling.
    const targetScale = isHovered ? 1.08 : 1;

    const scale = THREE.MathUtils.damp(group.scale.x, targetScale, 6, delta);

    group.scale.setScalar(scale);

    // Independent rotations make the object feel mechanical.
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.2;
      coreRef.current.rotation.y += delta * 0.3;
    }

    if (firstRingRef.current) {
      firstRingRef.current.rotation.z += delta * 0.18;
    }

    if (secondRingRef.current) {
      secondRingRef.current.rotation.x -= delta * 0.16;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.45}>
        <group ref={groupRef}>
          {/* Main inner core */}
          <mesh
            ref={coreRef}
            onPointerOver={(event) => {
              event.stopPropagation();
              setIsHovered(true);
            }}
            onPointerOut={() => setIsHovered(false)}
          >
            <icosahedronGeometry args={[1.05, 1]} />

            <meshStandardMaterial
              color={isHovered ? "#8dffe0" : "#27dba8"}
              emissive="#063a2c"
              emissiveIntensity={1.5}
              metalness={0.55}
              roughness={0.22}
              flatShading
            />
          </mesh>

          {/* Transparent wireframe shell */}
          <mesh scale={1.24}>
            <icosahedronGeometry args={[1.05, 2]} />

            <meshBasicMaterial
              color="#78f6d1"
              wireframe
              transparent
              opacity={0.16}
            />
          </mesh>

          {/* Horizontal orbital ring */}
          <mesh ref={firstRingRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.75, 0.018, 12, 120]} />

            <meshBasicMaterial color="#30dca9" transparent opacity={0.65} />
          </mesh>

          {/* Tilted orbital ring */}
          <mesh ref={secondRingRef} rotation={[0.55, 0.35, 0.65]}>
            <torusGeometry args={[1.5, 0.012, 12, 120]} />

            <meshBasicMaterial color="#9fffe2" transparent opacity={0.3} />
          </mesh>

          {/* Floating data blocks */}
          {satellites.map((satellite, index) => (
            <mesh
              key={index}
              position={satellite.position}
              rotation={satellite.rotation}
              scale={satellite.scale}
            >
              <boxGeometry args={[1, 1, 1]} />

              <meshStandardMaterial
                color="#163d32"
                emissive="#082119"
                emissiveIntensity={0.8}
                metalness={0.4}
                roughness={0.35}
              />
            </mesh>
          ))}
        </group>
      </Float>

      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.45}
        scale={6}
        blur={2.5}
        far={4.5}
        color="#05271e"
      />
    </>
  );
}

export default DeveloperCore;
