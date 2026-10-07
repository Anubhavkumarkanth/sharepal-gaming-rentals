"use client";

import { CalendarClock } from "lucide-react";
import { useStore } from "@/lib/store";
import { asset } from "@/lib/asset";
import { sharepalUrl } from "@/config/site";

// Bottom-of-screen controls from sharepal.in: a reminder to pick dates (until
// dates are chosen) and the support chat button.
export default function FloatingActions() {
  const { dates, setDatePickerOpen } = useStore();

  return (
    <aside aria-label="Quick actions">
      {!dates && (
        <button
          onClick={() => setDatePickerOpen(true)}
          className="fixed bottom-20 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border-2 border-lime bg-navy px-5 py-3 text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.03] lg:bottom-6 lg:px-6 lg:text-base"
        >
          <CalendarClock className="h-5 w-5" aria-hidden />
          Select rental dates to see total rent
        </button>
      )}
      <a href={sharepalUrl("/support")} aria-label="Contact support" className="fixed bottom-36 right-3 z-30 lg:bottom-6 lg:right-6">
        {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG */}
        <img src={asset("/chat.svg")} alt="" width={112} height={112} className="h-16 w-16 lg:h-[72px] lg:w-[72px]" />
      </a>
    </aside>
  );
}
