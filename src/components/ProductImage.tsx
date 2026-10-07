"use client";

import { useState } from "react";
import { Gamepad2 } from "lucide-react";

// Product shots come from SharePal's image CDN. If one fails, show a branded
// placeholder instead of a broken-image icon.
export default function ProductImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  if (state === "error") {
    return (
      <div className={`grid place-items-center bg-gradient-to-br from-brand-50 to-surface ${className}`} role="img" aria-label={alt}>
        <Gamepad2 className="h-1/3 w-1/3 text-brand/30" aria-hidden />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {state === "loading" && <div className="skeleton absolute inset-0" aria-hidden />}
      {/* eslint-disable-next-line @next/next/no-img-element -- remote CDN image on a static export */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setState("ok")}
        onError={() => setState("error")}
        className={`h-full w-full object-contain transition-opacity duration-500 ${state === "ok" ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
