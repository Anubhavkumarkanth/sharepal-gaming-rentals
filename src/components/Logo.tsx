// Simple SVG + text wordmark instead of copying SharePal's logo file.
export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" aria-hidden>
        <rect width="32" height="32" rx="9" className={inverted ? "fill-white" : "fill-brand"} />
        <path
          d="M10 20.5c1.6 1.6 3.6 2.4 6 2.4 3.3 0 5.6-1.6 5.6-4.1 0-2.3-1.6-3.3-5-4l-1.6-.3c-1.6-.3-2.2-.8-2.2-1.6 0-1 1-1.7 2.6-1.7 1.5 0 2.8.5 3.9 1.5"
          fill="none"
          strokeWidth="2.6"
          strokeLinecap="round"
          className={inverted ? "stroke-navy" : "stroke-white"}
        />
        <circle cx="23.5" cy="8.5" r="2.2" className="fill-accent" />
      </svg>
      <span className={`text-xl font-extrabold tracking-tight sm:text-[22px] ${inverted ? "text-white" : "text-navy"}`}>
        Share<span className={inverted ? "text-accent" : "text-brand"}>Pal</span>
      </span>
    </span>
  );
}
