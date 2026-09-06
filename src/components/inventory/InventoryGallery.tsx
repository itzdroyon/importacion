import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { cars } from "../../data/cars";
import CarCard from "./CarCard";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function InventoryGallery() {
  const headingRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!headingRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="inventory" className="relative bg-ink px-6 py-28 md:px-12 md:py-40">
      <div ref={headingRef} className="mx-auto mb-16 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Inventario propio</span>
        <h2 className="mt-4 font-display text-3xl font-semibold text-paper sm:text-4xl md:text-5xl">
          Disponibles ahora, sin esperar al bajo demanda.
        </h2>
        <p className="mt-5 max-w-xl text-mist">
          Tres unidades verificadas y listas para entrega. Cada una con historial completo e inspección independiente.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car, i) => (
          <CarCard key={car.slug} car={car} index={i} />
        ))}
      </div>
    </section>
  );
}
