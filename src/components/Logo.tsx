// Text wordmark in SharePal's blue block, instead of copying their logo file.
export default function Logo({ className = "h-14 rounded-b-xl px-3 text-xl lg:h-[84px] lg:px-5 lg:text-[32px]" }: { className?: string }) {
  return <span className={`flex items-center bg-brand font-bold italic tracking-tight text-white ${className}`}>SharePal</span>;
}
