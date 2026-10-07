"use client";

import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";

export default function ProductImage({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The <img> is in the static HTML, so it can fail before React hydrates and
  // attaches onError. Catch that case on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-page text-muted ${className}`} role="img" aria-label={alt}>
        <ImageOff className="h-6 w-6" aria-hidden />
      </div>
    );
  }

  return (
    // Plain <img>: the site is a static export, so next/image can't resize images anyway.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={400}
      height={400}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-contain ${className}`}
    />
  );
}
