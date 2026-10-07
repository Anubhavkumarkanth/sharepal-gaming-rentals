"use client";

import { MapPin, X } from "lucide-react";
import Dialog from "@/components/Dialog";
import Logo from "@/components/Logo";
import { CATEGORY_SLUG, CATEGORY_TABS, getCityName, sharepalUrl } from "@/config/site";

type Props = { city: string; isOpen: boolean; onClose: () => void; onChangeCity: () => void };

export default function MobileMenu({ city, isOpen, onClose, onChangeCity }: Props) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      label="Menu"
      className="m-0 h-dvh max-h-none w-[300px] max-w-[85vw] bg-white p-0"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <Logo className="h-9 rounded-lg px-3 text-lg" />
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
        {CATEGORY_TABS.map(({ label, slug }) =>
          slug === CATEGORY_SLUG ? (
            <a key={slug} href="#products" onClick={onClose} className="block border-l-4 border-purple-light bg-page px-4 py-3 text-sm font-medium text-purple">
              {label}
            </a>
          ) : (
            <a key={slug} href={sharepalUrl(`/${city}/${slug}`)} className="block border-l-4 border-transparent px-4 py-3 text-sm text-body hover:bg-page">
              {label}
            </a>
          ),
        )}
      </nav>
    </Dialog>
  );
}
