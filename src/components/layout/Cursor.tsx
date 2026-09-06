import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useIsMobile, useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Custom cursor dot that trails the pointer with easing, and grows/
 * dims when hovering any element carrying [data-cursor="magnetic"].
 * Elements marked that way also get their own magnetic pull handled
 * in useMagnetic() below — the two are separate so cards can opt into
 * the pull without every hoverable thing needing this cursor.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isMobile || reducedMotion) return;
    const dot = dotRef.current;
    if (!dot) return;

    const quickX = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3" });
    const quickY = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    const onEnter = () => gsap.to(dot, { scale: 2.4, opacity: 0.4, duration: 0.3 });
    const onLeave = () => gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });

    window.addEventListener("mousemove", onMove);
    const magneticEls = document.querySelectorAll('[data-cursor="magnetic"]');
    magneticEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      magneticEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [isMobile, reducedMotion]);

  if (isMobile || reducedMotion) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chrome mix-blend-difference"
      aria-hidden="true"
    />
  );
}

/**
 * Attaches a magnetic pull to a ref'd element: on mousemove within its
 * bounds, the element translates a fraction of the way toward the
 * pointer; on leave it springs back. Used by CTAs and car cards.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isMobile || reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      quickX(relX * strength);
      quickY(relY * strength);
    };

    const onLeave = () => {
      quickX(0);
      quickY(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile, reducedMotion, strength]);

  return ref;
}
