import { asset } from "@/lib/asset";

// SharePal's logo ("Share" in white, "Pal" in lime) on its blue tab.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-end justify-center bg-brand ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG */}
      <img src={asset("/sharepal-logo.svg")} alt="SharePal" width={137} height={27} className="h-auto w-full" />
    </span>
  );
}
