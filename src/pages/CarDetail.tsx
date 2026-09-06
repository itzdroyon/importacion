import { useEffect } from "react";
import type { CSSProperties } from "react";
import { useParams } from "react-router-dom";
import { cars } from "../data/cars";
import CarPlaceholderArt from "../components/inventory/CarPlaceholderArt";
import ViewTransitionLink from "../components/layout/ViewTransitionLink";
import Footer from "../components/layout/Footer";
import { ScrollTrigger } from "../lib/gsap";

export default function CarDetail() {
  const { slug } = useParams<{ slug: string }>();
  const car = cars.find((c) => c.slug === slug);

  useEffect(() => {
    // Fresh page/route: any ScrollTriggers from the previous route are
    // already killed by their own component cleanup, but a refresh
    // guards against stale trigger positions after the layout change.
    ScrollTrigger.refresh();
  }, []);

  if (!car) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
        <p className="text-mist">No hemos encontrado ese vehículo.</p>
        <ViewTransitionLink to="/" className="text-chrome underline">
          Volver al inicio
        </ViewTransitionLink>
      </main>
    );
  }

  return (
    <main className="bg-ink pt-24">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <ViewTransitionLink to="/" className="text-xs uppercase tracking-widest text-mist hover:text-chrome">
          ← Volver al inventario
        </ViewTransitionLink>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div
            className="aspect-[4/5] overflow-hidden rounded-2xl border border-steel/60"
            style={{ viewTransitionName: `car-image-${car.slug}` } as CSSProperties}
          >
            <CarPlaceholderArt label={`${car.make} ${car.model}`} />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-chrome-dim">{car.origin}</span>
            <h1 className="mt-2 font-display text-4xl font-semibold text-paper md:text-5xl">
              {car.make} {car.model}
            </h1>
            <p className="mt-2 text-lg text-mist">{car.tagline}</p>
            <p className="mt-6 max-w-xl text-mist">{car.description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-steel/60 pt-8">
              {car.specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs uppercase tracking-widest text-chrome-dim">{spec.label}</dt>
                  <dd className="mt-1 text-paper">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <a
              href="#cta"
              className="mt-10 inline-block rounded-full bg-paper px-8 py-3 text-sm font-medium uppercase tracking-widest text-ink transition-transform hover:scale-[1.03]"
            >
              Consultar disponibilidad
            </a>
          </div>
        </div>
      </div>

      <div className="mt-28">
        <Footer />
      </div>
    </main>
  );
}
