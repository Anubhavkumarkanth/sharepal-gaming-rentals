"use client";

import { MapPin, X } from "lucide-react";
import Dialog from "@/components/Dialog";
import Logo from "@/components/Logo";
import { CATEGORY_SLUG, TOP_CATEGORIES, getCityName, sharepalUrl } from "@/config/site";

type Props = { city: string; isOpen: boolean; onClose: () => void; onChangeCity: () => void };

export default function MobileMenu({ city, isOpen, onClose, onChangeCity }: Props) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      label="Menu"
      className="m-0 h-dvh max-h-none w-[300px] max-w-[85vw] p-0"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <Logo />
        <button onClick={onClose} className="rounded p-1 text-muted hover:text-ink" aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>

      <button onClick={onChangeCity} className="flex w-full items-center justify-between border-b border-line px-4 py-3 text-sm">
        <span className="flex items-center gap-2 font-semibold text-navy">
          <MapPin className="h-4 w-4 text-brand" aria-hidden /> {getCityName(city)}
        </span>
        <span className="font-medium text-brand">Change</span>
      </button>

      <nav aria-label="Categories" className="py-2">
        {TOP_CATEGORIES.map(({ label, slug, icon: Icon }) =>
          slug === CATEGORY_SLUG ? (
            <a key={slug} href="#products" onClick={onClose} className="flex items-center gap-3 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand">
              <Icon className="h-5 w-5" aria-hidden /> {label}
            </a>
          ) : (
            <a key={slug} href={sharepalUrl(`/${city}/${slug}`)} className="flex items-center gap-3 px-4 py-3 text-sm text-navy hover:bg-surface">
              <Icon className="h-5 w-5 text-muted" aria-hidden /> {label}
            </a>
          ),
        )}
      </nav>
    </Dialog>
  );
}
