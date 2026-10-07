"use client";

import { CalendarCheck2, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { sharepalUrl } from "@/config/site";

// Bottom-of-screen controls from sharepal.in: a reminder to pick dates (until
// dates are chosen) and the support chat button.
export default function FloatingActions() {
  const { dates, setDatePickerOpen } = useStore();

  return (
    <>
      {!dates && (
        <button
          onClick={() => setDatePickerOpen(true)}
          className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border-2 border-lime bg-navy px-5 py-3 text-sm font-medium text-white shadow-card sm:text-base"
        >
          <CalendarCheck2 className="h-5 w-5" aria-hidden />
          Select rental dates to see total rent
        </button>
      )}
      <a
        href={sharepalUrl("/contact-us")}
        aria-label="Contact support"
        className="fixed bottom-5 right-4 z-30 hidden h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-card hover:bg-brand-dark sm:grid lg:right-8"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </>
  );
}
