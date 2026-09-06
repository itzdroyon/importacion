import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "../../lib/gsap";
import type { CarListing } from "../../data/cars";
import CarPlaceholderArt from "./CarPlaceholderArt";
import ViewTransitionLink from "../layout/ViewTransitionLink";
import { useMagnetic } from "../layout/Cursor";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function CarCard({ car, index }: { car: CarListing; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const magneticRef = useMagnetic<HTMLDivElement>(0.12);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!cardRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.94, rotateY: index % 2 === 0 ? -6 : 6 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        },
      );
    });
    return () => ctx.revert();
  }, [index, reducedMotion]);

  return (
    <div ref={cardRef} style={{ perspective: 1000 }}>
      <ViewTransitionLink
        to={`/coches/${car.slug}`}
        data-cursor="magnetic"
        className="group block"
      >
        <div
          ref={magneticRef}
          className="overflow-hidden rounded-2xl border border-steel/60 bg-graphite transition-colors group-hover:border-chrome/70"
        >
          <div
            className="relative aspect-[4/5] overflow-hidden"
            style={{ viewTransitionName: `car-image-${car.slug}` } as CSSProperties}
          >
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
              <CarPlaceholderArt label={`${car.make} ${car.model}`} />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />
          </div>
          <div className="p-6">
            <span className="text-xs uppercase tracking-widest text-chrome-dim">{car.origin}</span>
            <h3 className="mt-2 font-display text-2xl font-semibold text-paper">
              {car.make} {car.model}
            </h3>
            <p className="mt-1 text-sm text-mist">{car.tagline}</p>
            <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-widest text-chrome-dim">
              <span>{car.year}</span>
              <span>{car.power}</span>
              <span className="text-chrome opacity-0 transition-opacity group-hover:opacity-100">Ver ficha →</span>
            </div>
          </div>
        </div>
      </ViewTransitionLink>
    </div>
  );
}
