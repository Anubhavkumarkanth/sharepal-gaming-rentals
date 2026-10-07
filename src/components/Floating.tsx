"use client";

import { useEffect, useState } from "react";
import { ArrowUp, CheckCircle2, ShoppingCart } from "lucide-react";
import { useStore } from "@/lib/store";
import { rupees } from "@/lib/format";

export function Toast() {
  const { toast } = useStore();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[80] flex justify-center px-4 lg:top-auto lg:bottom-8" role="status" aria-live="polite">
      {toast && (
        <div key={toast.id} className="flex max-w-md animate-toast items-center gap-2.5 rounded-xl bg-navy px-4 py-3 text-sm font-medium text-white shadow-lift">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden />
          <span className="line-clamp-2">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

// Mobile-only sticky bar: keeps the cart one tap away while scrolling the grid.
export function MobileCartBar() {
  const { cartCount, perDayTotal, days, setCartOpen } = useStore();
  if (cartCount === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-hint border-t border-line bg-white/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
      <button
        onClick={() => setCartOpen(true)}
        className="flex h-12 w-full items-center justify-between rounded-xl bg-brand px-4 text-white shadow-[0_8px_20px_rgb(30_79_216/0.3)] active:scale-[0.98]"
      >
        <span className="text-left leading-tight">
          <span className="block text-[11.5px] text-white/75">
            {cartCount} item{cartCount > 1 ? "s" : ""}
          </span>
          <span className="text-[15px] font-bold">
            {days ? `${rupees(perDayTotal * days)} for ${days}d` : `${rupees(perDayTotal)}/day`}
          </span>
        </span>
        <span className="flex items-center gap-2 text-sm font-bold">
          View cart <ShoppingCart className="h-4 w-4" aria-hidden />
        </span>
      </button>
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-8 right-6 z-40 hidden h-11 w-11 place-items-center rounded-full bg-white text-navy shadow-lift ring-1 ring-line transition duration-300 hover:-translate-y-0.5 lg:grid ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
