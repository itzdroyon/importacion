import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import CarRig, { type ScrollProgress } from "./CarRig";
import { gsap } from "../../lib/gsap";

/**
 * Desktop hero: R3F canvas pinned for the duration of the hero section.
 * A single tween drives `progressRef.current.value` from 0 to 1, scrubbed
 * to scroll; CarRig reads that ref every frame (no React re-renders on
 * scroll, keeping this smooth at 60fps).
 */
export default function HeroScene({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const progressRef = useRef<ScrollProgress>({ value: 0 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const tween = gsap.to(progressRef.current, {
      value: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [sectionRef]);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [3.2, 1.4, 4.2], fov: 32 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#08090a"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} castShadow />
      <pointLight position={[-4, 2, -3]} intensity={0.6} color="#c9a24a" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.65, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0c0d10" roughness={1} />
      </mesh>
      <CarRig progress={progressRef} />
    </Canvas>
  );
}
