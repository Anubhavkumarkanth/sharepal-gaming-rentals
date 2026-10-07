// Files in /public need the GitHub Pages base path in front of them.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// SharePal's own image CDN, used for banner artwork and category icons.
export const sharepalImage = (path: string) => `https://images.sharepal.in/${path}`;

// Large artwork goes through sharepal.in's image optimiser (as the original page
// does), which serves a resized WebP instead of the multi-megabyte source PNG.
export const optimizedSharepalImage = (path: string, width: number) =>
  `https://sharepal.in/_next/image?url=${encodeURIComponent(sharepalImage(path))}&w=${width}&q=75`;
