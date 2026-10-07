import { optimizedSharepalImage } from "@/lib/asset";
import { ASSET_PARTNER_URL, RENT_YOUR_GEAR_URL } from "@/config/site";

// The two promo banners on sharepal.in are images with separate desktop and
// mobile artwork, each linking to a SharePal programme.
const PROMOS = {
  assetPartner: {
    href: ASSET_PARTNER_URL,
    alt: "Become an Asset Partner. Earn monthly: monthly earnings from rental assets, up to ₹10,000 instant wallet credits, 10% off when you rent and 10% cashback on every order.",
    desktop: "sharepal-banners/assets-fund-banner.png",
    mobile: "sharepal-banners/asset-partner-mobile.png",
  },
  rentYourGear: {
    href: RENT_YOUR_GEAR_URL,
    alt: "Got gear you don't use anymore? Rent out your gear on SharePal — Earn with us.",
    desktop: "sharepal-banners/ews-generic-banner-desktop.png",
    mobile: "sharepal-banners/ews-generic-banner-mobile.png",
  },
};

export default function PromoBanner({ promo }: { promo: keyof typeof PROMOS }) {
  const { href, alt, desktop, mobile } = PROMOS[promo];
  return (
    <a href={href} className="block overflow-hidden rounded-xl transition-transform duration-300 hover:scale-[1.01]">
      <picture>
        <source media="(min-width: 1024px)" srcSet={optimizedSharepalImage(desktop, 1920)} />
        <img src={optimizedSharepalImage(mobile, 828)} alt={alt} loading="lazy" className="h-auto w-full" />
      </picture>
    </a>
  );
}
