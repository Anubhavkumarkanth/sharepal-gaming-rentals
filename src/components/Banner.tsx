/* eslint-disable @next/next/no-img-element -- static banner artwork from SharePal's CDN */
import { asset, optimizedSharepalImage, sharepalImage } from "@/lib/asset";

const BRAND_LOGOS = [
  { src: "super-categories-brand-logos/gaming/XBOX.svg", alt: "Xbox" },
  { src: "super-categories-brand-logos/gaming/PS5.svg", alt: "PS5" },
  { src: "super-categories-brand-logos/gaming/Sony.svg", alt: "Meta" },
];

function Tagline({ logoClass }: { logoClass: string }) {
  return (
    <>
      Rent the latest gaming gadgets from{" "}
      <img src={asset("/sharepal-logo.svg")} alt="SharePal" width={137} height={27} className={`inline-block align-baseline ${logoClass}`} /> PS5,
      Xbox, Oculus VR, Racing Wheel on rent.
    </>
  );
}

function BrandLogos({ className }: { className: string }) {
  return (
    <div className="flex items-center gap-3">
      {BRAND_LOGOS.map((logo, i) => (
        <span key={logo.alt} className="flex items-center gap-3">
          {i > 0 && <span className="h-4 w-px bg-white/40 lg:h-6" aria-hidden />}
          <img src={sharepalImage(logo.src)} alt={logo.alt} width={96} height={30} className={className} />
        </span>
      ))}
    </div>
  );
}

// Desktop banner: sits in the main column next to the sidebar.
export function DesktopBanner() {
  return (
    <section className="relative hidden h-[228px] overflow-hidden rounded-xl bg-gradient-to-b from-[#4f1981] to-[#872add] lg:block">
      <img src={optimizedSharepalImage("super-categories/gaming-left.webp", 256)} alt="" width={250} height={250} className="absolute left-0 top-[26px] hidden h-[250px] w-[250px] xl:block" />
      <img src={optimizedSharepalImage("super-categories/gaming-right.webp", 256)} alt="" width={250} height={250} className="absolute right-0 top-[26px] hidden h-[250px] w-[250px] xl:block" />
      <div className="relative mx-auto flex h-full max-w-[540px] flex-col items-center justify-center text-center text-white">
        <h1 className="font-display text-[40px] font-bold leading-tight">Gaming Consoles</h1>
        <p className="mt-2 text-lg font-bold leading-snug">
          <Tagline logoClass="mx-0.5 h-[18px] w-auto" />
        </p>
        <div className="mt-6">
          <BrandLogos className="h-[30px] w-24" />
        </div>
      </div>
    </section>
  );
}

// Mobile banner: continues the purple header area above the product list.
export function MobileBanner() {
  return (
    <div className="bg-purple px-2 pb-3 lg:hidden">
      <section className="relative h-[180px] overflow-hidden rounded-xl bg-gradient-to-b from-[#5a1c97] to-[#7e27cc] px-4 py-5 text-white">
        <img src={optimizedSharepalImage("super-categories/gaming-right.webp", 256)} alt="" width={192} height={192} className="absolute -right-4 top-0 h-[180px] w-[180px] object-contain" />
        <div className="relative max-w-[62%]">
          <h1 className="font-display text-2xl font-bold">Gaming Consoles</h1>
          <p className="mt-2 text-xs font-bold leading-relaxed">
            <Tagline logoClass="mx-0.5 h-3 w-auto" />
          </p>
          <div className="mt-3">
            <BrandLogos className="h-[15px] w-12" />
          </div>
        </div>
      </section>
    </div>
  );
}
