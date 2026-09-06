import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "../../lib/gsap";
import { useMagnetic } from "../layout/Cursor";

export default function HeroCopy() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  useEffect(() => {
    if (!headlineRef.current) return;

    // Split into lines/chars once on mount; entrance plays a single time
    // (onEnter), it is not scroll-scrubbed like the pinned sections below.
    const split = new SplitType(headlineRef.current, { types: "lines,words,chars" });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      stagger: 0.015,
      duration: 0.9,
      ease: "power4.out",
    }).from(
      subRef.current,
      { opacity: 0, y: 16, duration: 0.6, ease: "power2.out" },
      "-=0.4",
    );

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:px-12 md:pb-32">
      <h1
        ref={headlineRef}
        className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-chrome-gradient sm:text-6xl md:text-7xl"
      >
        Importamos tu próximo coche alemán.
      </h1>
      <p ref={subRef} className="mt-6 max-w-md text-base text-mist md:text-lg">
        Bajo demanda o desde nuestro inventario propio. Procedencia verificada, transparencia total, entrega en tu puerta.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          ref={ctaRef}
          href="#cta"
          data-cursor="magnetic"
          className="rounded-full bg-paper px-7 py-3 text-sm font-medium uppercase tracking-widest text-ink transition-transform hover:scale-[1.03]"
        >
          Solicitar mi coche
        </a>
        <a
          href="#inventory"
          className="rounded-full border border-steel px-7 py-3 text-sm uppercase tracking-widest text-paper transition-colors hover:border-chrome hover:text-chrome"
        >
          Ver inventario
        </a>
      </div>
    </div>
  );
}
