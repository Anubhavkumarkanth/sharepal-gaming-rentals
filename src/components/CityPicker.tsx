"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Dialog from "@/components/Dialog";
import { CATEGORY_SLUG, CITIES } from "@/config/site";

export default function CityPicker({ city, isOpen, onClose }: { city: string; isOpen: boolean; onClose: () => void }) {
  const router = useRouter();

  function selectCity(slug: string) {
    onClose();
    if (slug !== city) router.push(`/${slug}/${CATEGORY_SLUG}/`);
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} label="Select your city" className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl p-0">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="text-base font-bold text-navy">Select your city</h2>
        <button onClick={onClose} className="rounded p-1 text-muted hover:text-ink" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <ul className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-3">
        {CITIES.map((c) => (
          <li key={c.slug}>
            <button
              onClick={() => selectCity(c.slug)}
              aria-current={c.slug === city}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm font-medium ${
                c.slug === city ? "border-brand bg-brand-50 text-brand" : "border-line text-navy hover:border-brand"
              }`}
            >
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </Dialog>
  );
}
