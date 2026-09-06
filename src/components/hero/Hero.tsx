import { lazy, Suspense, useRef } from "react";
import HeroMobileFallback from "./HeroMobileFallback";
import HeroCopy from "./HeroCopy";
import { useIsMobile, useReducedMotion } from "../../hooks/useReducedMotion";

// Three.js + R3F + drei are ~350kB gzipped combined — code-split them into
// their own chunk so mobile/reduced-motion visitors (who never render this)
// don't pay for it, and desktop visitors only fetch it once past the shell.
const HeroScene = lazy(() => import("./HeroScene"));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const use3D = !isMobile && !reducedMotion;

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-ink">
      {use3D ? (
        <Suspense fallback={<HeroMobileFallback />}>
          <HeroScene sectionRef={sectionRef} />
        </Suspense>
      ) : (
        <HeroMobileFallback />
      )}

      {/* Vignette so copy stays legible over the 3D scene */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

      <HeroCopy />

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:hidden lg:block">
        <ScrollIndicator />
      </div>
    </section>
  );
}

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 text-mist">
      <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <div className="h-10 w-px overflow-hidden bg-steel">
        <div className="h-full w-full origin-top animate-[scrollline_1.8s_ease-in-out_infinite] bg-chrome" />
      </div>
      <style>{`
        @keyframes scrollline {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.1% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </div>
  );
}
