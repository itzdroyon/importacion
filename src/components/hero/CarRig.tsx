import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface ScrollProgress {
  /** 0 → 1 across the pinned hero scroll range, driven by GSAP/ScrollTrigger */
  value: number;
}

/**
 * PLACEHOLDER 3D CAR — built from primitives (no external .glb) so the
 * hero renders with zero asset dependencies. Swap this whole component
 * for a real model, e.g.:
 *
 *   const { scene } = useGLTF("/models/car.glb");
 *   return <primitive object={scene} ref={groupRef} />;
 *
 * and keep the same ref/useFrame wiring below so scroll-driven rotation
 * and part animation keep working.
 */
export default function CarRig({ progress }: { progress: RefObject<ScrollProgress> }) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<(THREE.Mesh | null)[]>([]);
  const spoilerRef = useRef<THREE.Mesh>(null);
  const headlightRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const p = progress.current?.value ?? 0;
    if (groupRef.current) {
      // Base scroll-driven turntable rotation, plus a slow idle drift so
      // the car never feels perfectly static even before the user scrolls.
      groupRef.current.rotation.y = p * Math.PI * 1.2 + Math.sin(state.clock.elapsedTime * 0.15) * 0.03;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
    }

    // Wheels spin continuously (rolling) with extra speed tied to scroll speed feel
    wheelRefs.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += delta * (1.5 + p * 3);
    });

    // Spoiler rises/extends as the user scrolls deeper into the hero
    if (spoilerRef.current) {
      spoilerRef.current.position.z = THREE.MathUtils.lerp(0.95, 1.15, p);
      spoilerRef.current.position.y = THREE.MathUtils.lerp(0.62, 0.72, p);
    }

    // Headlights "wake up" — emissive intensity ramps with scroll progress
    headlightRefs.current.forEach((light) => {
      if (light) {
        const mat = light.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = THREE.MathUtils.lerp(0.2, 2.2, p);
      }
    });
  });

  const wheelPositions: [number, number, number][] = [
    [-0.95, -0.35, 1.3],
    [0.95, -0.35, 1.3],
    [-0.95, -0.35, -1.3],
    [0.95, -0.35, -1.3],
  ];

  return (
    <group ref={groupRef} dispose={null}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.55, 3.4]} />
        <meshStandardMaterial color="#15161a" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.42, -0.2]} castShadow>
        <boxGeometry args={[1.5, 0.42, 1.7]} />
        <meshStandardMaterial color="#0b0c0e" metalness={0.6} roughness={0.15} />
      </mesh>

      {/* Hood accent */}
      <mesh position={[0, 0.31, 1.25]}>
        <boxGeometry args={[1.75, 0.08, 0.9]} />
        <meshStandardMaterial color="#d8dce2" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Spoiler */}
      <mesh ref={spoilerRef} position={[0, 0.62, 0.95]}>
        <boxGeometry args={[1.6, 0.06, 0.22]} />
        <meshStandardMaterial color="#8b9099" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Headlights */}
      {[-0.65, 0.65].map((x, i) => (
        <mesh
          key={x}
          ref={(el) => {
            headlightRefs.current[i] = el;
          }}
          position={[x, 0.05, 1.72]}
        >
          <boxGeometry args={[0.32, 0.14, 0.05]} />
          <meshStandardMaterial color="#f3f2ee" emissive="#c9a24a" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Wheels */}
      {wheelPositions.map((pos, i) => (
        <mesh
          key={pos.join(",")}
          ref={(el) => {
            wheelRefs.current[i] = el;
          }}
          position={pos}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.42, 0.42, 0.32, 24]} />
          <meshStandardMaterial color="#1c1e22" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}
