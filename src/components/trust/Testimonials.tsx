import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { testimonials, trustStats } from "../../data/testimonials";
import { useIsMobile, useReducedMotion } from "../../hooks/useReducedMotion";

export default function Testimonials() {
  return (
    <section id="trust" className="relative bg-ink py-28 md:py-40">
      <StatsRow />
      <TestimonialTrack />
    </section>
  );
}

function StatsRow() {
  const rowRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!rowRef.current) return;
    const ctx = gsap.context(() => {
      trustStats.forEach((stat, i) => {
        const el = valueRefs.current[i];
        if (!el) return;
        if (reducedMotion) {
          el.textContent = `${stat.value}${stat.suffix}`;
          return;
        }
        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: rowRef.current, start: "top 80%" },
          onUpdate: () => {
            const formatted = Number.isInteger(stat.value)
              ? Math.round(counter.value).toString()
              : counter.value.toFixed(1);
            el.textContent = `${formatted}${stat.suffix}`;
          },
        });
      });
    }, rowRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={rowRef} className="mx-auto mb-24 grid max-w-5xl grid-cols-1 gap-10 px-6 sm:grid-cols-3 md:px-12">
      {trustStats.map((stat, i) => (
        <div key={stat.label} className="text-center sm:text-left">
          <span
            ref={(el) => {
              valueRefs.current[i] = el;
            }}
            className="font-display text-4xl font-semibold text-chrome-gradient md:text-5xl"
          >
            0
          </span>
          <p className="mt-2 text-sm text-mist">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Desktop: classic ScrollTrigger horizontal-scroll pattern — the section
 * pins and vertical scroll is translated 1:1 into horizontal movement of
 * the card track. Mobile/reduced-motion get a plain swipeable/stacked row.
 */
function TestimonialTrack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const useHorizontalScroll = !isMobile && !reducedMotion;

  useEffect(() => {
    if (!useHorizontalScroll || !sectionRef.current || !trackRef.current) return;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 96;

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [useHorizontalScroll]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <div
        ref={trackRef}
        className={
          useHorizontalScroll
            ? "flex w-max gap-8 px-6 md:px-12"
            : "flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:px-12"
        }
      >
        {testimonials.map((t) => (
          <blockquote
            key={t.name}
            className="w-[85vw] shrink-0 snap-start rounded-2xl border border-steel/60 bg-graphite p-8 sm:w-[420px]"
          >
            <p className="font-display text-xl leading-snug text-paper md:text-2xl">“{t.quote}”</p>
            <footer className="mt-6 text-sm text-mist">
              <span className="text-paper">{t.name}</span> · {t.location} · {t.car}
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
