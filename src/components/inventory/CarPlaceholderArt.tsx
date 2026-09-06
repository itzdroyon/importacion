/**
 * PLACEHOLDER visual standing in for real vehicle photography.
 * Replace <img> usage of `car.image` (see src/data/cars.ts) with actual
 * studio shots once available — this component only exists so the
 * gallery/detail pages render something on-brand in the meantime.
 */
export default function CarPlaceholderArt({ label }: { label: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-graphite via-charcoal to-ink">
      <svg viewBox="0 0 200 100" className="w-3/4 text-chrome-dim" fill="none">
        <path
          d="M10 70 Q22 45 55 42 L75 30 Q105 22 130 32 L165 42 Q185 48 190 70 L185 76 L15 76 Z"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.55"
        />
        <circle cx="45" cy="76" r="12" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <circle cx="155" cy="76" r="12" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      </svg>
      <span className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-mist/60">
        {label} — placeholder
      </span>
    </div>
  );
}
