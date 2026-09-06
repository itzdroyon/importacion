import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

/**
 * Mobile/reduced-motion substitute for the 3D canvas: a static graphic
 * with a light, non-pinned parallax (translateY tied to scroll) instead
 * of a WebGL scene, keeping battery/GPU cost low on phones.
 *
 * PLACEHOLDER: replace the inline SVG silhouette below with a real hero
 * photograph (e.g. /public/placeholders/hero-mobile.jpg) once available.
 */
export default function HeroMobileFallback() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    const tween = gsap.to(imgRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={imgRef} className="absolute inset-0 flex items-center justify-center opacity-80">
      <svg viewBox="0 0 400 200" className="w-[130%] max-w-none text-chrome-dim" fill="none">
        <path
          d="M20 140 Q40 90 110 85 L150 60 Q210 45 260 65 L330 85 Q370 95 380 140 L370 150 L30 150 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle cx="90" cy="150" r="24" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <circle cx="310" cy="150" r="24" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      </svg>
    </div>
  );
}
