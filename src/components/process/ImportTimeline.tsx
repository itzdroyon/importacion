import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { importSteps } from "../../data/importSteps";
import { useIsMobile, useReducedMotion } from "../../hooks/useReducedMotion";

export default function ImportTimeline() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const useScrub = !isMobile && !reducedMotion;

  return useScrub ? <ScrubbedTimeline /> : <StackedTimeline />;
}

/**
 * Desktop: the section pins while a single scrubbed timeline (a) draws
 * the connecting SVG line via stroke-dashoffset and (b) lights up each
 * step's icon in sequence — both driven by the same scroll-mapped
 * progress, so the line "arrives" at a step exactly as it activates.
 */
function ScrubbedTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(lineRef.current, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: importSteps.length, ease: "none" }, 0);

      importSteps.forEach((_, i) => {
        tl.fromTo(
          iconRefs.current[i],
          { scale: 0.85, opacity: 0.35 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
          i * 0.92,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative flex h-screen w-full items-center bg-charcoal px-6 md:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Importación bajo demanda</span>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-paper sm:text-4xl md:text-5xl">
          De tu petición a las llaves en mano, en cinco pasos.
        </h2>

        <div className="relative mt-20">
          <svg viewBox="0 0 1000 4" preserveAspectRatio="none" className="absolute left-0 top-6 h-1 w-full">
            <path d="M0 2 H1000" stroke="#3a3d44" strokeWidth="2" />
            <path
              ref={lineRef}
              d="M0 2 H1000"
              stroke="#d8dce2"
              strokeWidth="2"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
          </svg>

          <div className="grid grid-cols-5 gap-4">
            {importSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-start">
                <div
                  ref={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-chrome bg-ink text-chrome opacity-35"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d={step.icon} />
                  </svg>
                </div>
                <span className="mt-4 text-xs uppercase tracking-widest text-chrome-dim">{step.label}</span>
                <h3 className="mt-1 font-display text-lg font-semibold text-paper">{step.title}</h3>
                <p className="mt-2 text-sm text-mist">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Mobile / reduced-motion: plain vertical list, each row fades in as it enters view — no pin, no scrub. */
function StackedTimeline() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item) => {
        if (!item) return;
        gsap.from(item, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          scrollTrigger: { trigger: item, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="process" className="bg-charcoal px-6 py-24">
      <span className="text-xs uppercase tracking-[0.3em] text-accent">Importación bajo demanda</span>
      <h2 className="mt-4 font-display text-3xl font-semibold text-paper">
        De tu petición a las llaves en mano, en cinco pasos.
      </h2>

      <div className="mt-12 flex flex-col gap-8 border-l border-steel pl-6">
        {importSteps.map((step, i) => (
          <div
            key={step.label}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative"
          >
            <div className="absolute -left-[31px] flex h-8 w-8 items-center justify-center rounded-full border border-chrome bg-ink text-chrome">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d={step.icon} />
              </svg>
            </div>
            <span className="text-xs uppercase tracking-widest text-chrome-dim">{step.label}</span>
            <h3 className="mt-1 font-display text-lg font-semibold text-paper">{step.title}</h3>
            <p className="mt-2 text-sm text-mist">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
