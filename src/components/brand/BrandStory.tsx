import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { storyBlocks } from "../../data/brandStory";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Pinned "chapters" section: the section stays fixed on screen while the
 * user scrolls through it; each scroll increment crossfades the current
 * text block into the next and nudges the background tone, instead of
 * the page physically scrolling past four separate blocks.
 */
export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    if (reducedMotion) {
      // No pin/scrub: just reveal each block once, stacked normally in flow.
      const ctx = gsap.context(() => {
        blockRefs.current.forEach((block) => {
          if (!block) return;
          gsap.from(block, {
            opacity: 0,
            y: 24,
            duration: 0.6,
            scrollTrigger: { trigger: block, start: "top 85%" },
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${storyBlocks.length * 90}%`,
          scrub: 1,
          pin: true,
        },
      });

      blockRefs.current.forEach((block, i) => {
        if (!block) return;
        if (i > 0) {
          tl.to(blockRefs.current[i - 1], { opacity: 0, yPercent: -8, duration: 0.4 }, `chapter${i}`);
          tl.to(bgRef.current, { backgroundColor: storyBlocks[i].tone, duration: 0.4 }, `chapter${i}`);
          tl.fromTo(
            block,
            { opacity: 0, yPercent: 8 },
            { opacity: 1, yPercent: 0, duration: 0.4 },
            `chapter${i}`,
          );
          tl.to({}, { duration: 0.5 }); // hold so each chapter has reading time
        } else {
          tl.to({}, { duration: 0.5 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="brand"
      ref={sectionRef}
      className={`relative ${reducedMotion ? "" : "h-screen"} w-full overflow-hidden`}
    >
      <div ref={bgRef} className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(216,220,226,0.08),transparent_60%)]" />

      <div className={`relative mx-auto flex h-full max-w-4xl flex-col justify-center px-6 md:px-12 ${reducedMotion ? "gap-24 py-32" : ""}`}>
        {storyBlocks.map((block, i) => (
          <div
            key={block.kicker}
            ref={(el) => {
              blockRefs.current[i] = el;
            }}
            className={reducedMotion ? "" : i === 0 ? "" : "absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 md:inset-x-12"}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-accent">{block.kicker}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl md:text-5xl">
              {block.title}
            </h2>
            <p className="mt-6 max-w-xl text-base text-mist md:text-lg">{block.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
