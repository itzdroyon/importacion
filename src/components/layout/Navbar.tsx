import { useMagnetic } from "./Cursor";
import ViewTransitionLink from "./ViewTransitionLink";

export default function Navbar() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <ViewTransitionLink to="/" className="font-display text-sm font-semibold tracking-[0.2em] text-paper uppercase">
        Fuzz<span className="text-chrome">Imports</span>
      </ViewTransitionLink>
      <a
        ref={ctaRef}
        href="#cta"
        data-cursor="magnetic"
        className="rounded-full border border-steel px-5 py-2 text-xs uppercase tracking-widest text-paper transition-colors hover:border-chrome hover:text-chrome"
      >
        Solicitar importación
      </a>
    </header>
  );
}
