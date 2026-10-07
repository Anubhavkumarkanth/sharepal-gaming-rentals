"use client";

import { ChevronUp, Headset, Heart, Mail } from "lucide-react";
import { useState } from "react";
import { asset } from "@/lib/asset";
import { FOOTER_CATEGORIES, FOOTER_LINKS, getCityName, sharepalUrl } from "@/config/site";

export default function Footer({ city }: { city: string }) {
  const [showMore, setShowMore] = useState(false);
  const cityName = getCityName(city);

  return (
    <footer className="bg-navy pb-24 text-sm text-white/70 lg:pb-0">
      <div className="mx-auto w-full max-w-[1520px] px-4 pt-14 lg:w-[84.5%] lg:px-4 lg:pt-20">
        {/* Category links */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER_CATEGORIES.map((column) => (
            <div key={column.title}>
              <h3 className="text-base font-semibold text-white lg:text-lg">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, path]) => (
                  <li key={label}>
                    <a href={sharepalUrl(`/${city}/${path}`)} className="hover:text-white">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SEO copy, collapsed by default like the original */}
        <div className="mt-14">
          <h3 className="font-semibold text-white underline underline-offset-2">Renting from SharePal in {cityName}</h3>
          <p className="mt-3 leading-relaxed">
            Rent cameras, action cameras, gaming consoles, projectors, speakers, trekking gear, riding gear and creator gear
            in {cityName} instead of buying them. Free home delivery and pickup, flexible rental periods and zero deposit make
            it easy to rent what you need, when you need it.
          </p>
          {showMore && (
            <p className="mt-3 leading-relaxed">
              Gaming consoles on rent: play the latest PS5 and Xbox titles without the upfront cost. Pick a combo with 100+
              games, an FC edition or extra controllers, choose your dates and get it delivered to your door.
            </p>
          )}
          <button onClick={() => setShowMore((v) => !v)} className="mt-3 text-xs font-semibold text-white" aria-expanded={showMore}>
            {showMore ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* Logo band */}
        <div className="mt-12 rounded-sm bg-gradient-to-r from-navy via-[#06134a] to-[#0a1d6b] py-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG */}
          <img src={asset("/sharepal-logo.svg")} alt="SharePal" width={137} height={27} className="h-7 w-auto" />
        </div>

        {/* Company links */}
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER_LINKS.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-white">{column.title}</h3>
              <ul className="mt-6 space-y-5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={sharepalUrl(link.href)} className="inline-flex items-center gap-2 hover:text-white">
                      {link.label === "Contact Support" && <Headset className="h-4 w-4" aria-hidden />}
                      {link.label}
                      {"isNew" in link && link.isNew && (
                        <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-semibold text-navy">New</span>
                      )}
                    </a>
                  </li>
                ))}
                {column.title === "Need Help" && (
                  <li>
                    <a href="mailto:care@sharepal.in" className="inline-flex items-center gap-2 hover:text-white">
                      <Mail className="h-4 w-4" aria-hidden /> care@sharepal.in
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 py-8 text-sm text-[#7b93ff] lg:flex-row lg:justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 hover:text-white">
            Go up <ChevronUp className="h-4 w-4" aria-hidden />
          </button>
          <p className="text-center">Recreation of a SharePal page for a frontend assignment — not the official website.</p>
          <p className="inline-flex items-center gap-1">
            Made with <Heart className="h-4 w-4 fill-[#e11d48] text-[#e11d48]" aria-label="love" /> for India
          </p>
        </div>
      </div>
    </footer>
  );
}
