"use client";

import { useEffect, useRef } from "react";
import { CalendarDays, Minus, Plus, ShoppingCart, Trash2, Truck, X } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { useStore } from "@/lib/store";
import { rupees, shortDate } from "@/lib/format";
import { SITE } from "@/config/site";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, cartCount, perDayTotal, setQty, dates, days, setDatesOpen, showToast } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cartOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, setCartOpen]);

  const rentDays = days ?? 1;
  const total = perDayTotal * rentDays;
  const remaining = Math.max(0, SITE.freeDeliveryThreshold - total);
  const progress = Math.min(100, (total / SITE.freeDeliveryThreshold) * 100);

  return (
    <div className={`fixed inset-0 z-[65] ${cartOpen ? "" : "pointer-events-none"}`} aria-hidden={!cartOpen}>
      <div
        className={`absolute inset-0 bg-navy/50 backdrop-blur-[2px] transition-opacity duration-300 ${cartOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        inert={!cartOpen}
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-lift transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-lg font-bold text-navy">
            Your cart <span className="text-sm font-medium text-muted">({cartCount})</span>
          </h2>
          <button ref={closeRef} onClick={() => setCartOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-50">
              <ShoppingCart className="h-9 w-9 text-brand" aria-hidden />
            </span>
            <p className="mt-4 text-lg font-bold text-navy">Your cart is empty</p>
            <p className="mt-1 text-sm text-muted">Add a PS5 combo to plan your next gaming weekend.</p>
            <button
              onClick={() => {
                setCartOpen(false);
                document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-6 h-11 rounded-xl bg-brand px-6 text-sm font-bold text-white hover:bg-brand-600"
            >
              Browse combos
            </button>
          </div>
        ) : (
          <>
            {/* Free delivery progress */}
            <div className="border-b border-line bg-surface px-5 py-3">
              <p className="flex items-center gap-2 text-[13px] text-navy">
                <Truck className="h-4 w-4 text-brand" aria-hidden />
                {remaining > 0 ? (
                  <span>
                    Add <b>{rupees(remaining)}</b> more for <b>free delivery</b>
                  </span>
                ) : (
                  <span className="font-semibold text-success">You&apos;ve unlocked free delivery &amp; pickup!</span>
                )}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ${remaining > 0 ? "bg-brand" : "bg-success"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {cartItems.map(({ product: p, qty }) => (
                <li key={p.id} className="flex gap-3 py-4">
                  <ProductImage src={p.image} alt={p.name} className="h-20 w-20 shrink-0 rounded-xl bg-surface p-1.5" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-navy">{p.name}</p>
                    <p className="mt-0.5 text-[12.5px] text-muted">{rupees(p.per_day_rent)}/day</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex h-8 items-center rounded-lg border border-line">
                        <button onClick={() => setQty(p.id, qty - 1)} className="grid h-8 w-8 place-items-center text-navy hover:bg-surface" aria-label="Decrease quantity">
                          {qty === 1 ? <Trash2 className="h-3.5 w-3.5 text-carmine" /> : <Minus className="h-3.5 w-3.5" />}
                        </button>
                        <span className="w-7 text-center text-sm font-bold">{qty}</span>
                        <button
                          onClick={() => setQty(p.id, qty + 1)}
                          disabled={qty >= 5}
                          className="grid h-8 w-8 place-items-center text-navy hover:bg-surface disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-navy">{rupees(p.per_day_rent * qty * rentDays)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-5 py-4">
              <button
                onClick={() => setDatesOpen(true)}
                className="mb-3 flex w-full items-center justify-between rounded-xl border border-line px-3.5 py-2.5 text-left text-sm transition hover:border-brand/40"
              >
                <span className="flex items-center gap-2 text-navy">
                  <CalendarDays className="h-4 w-4 text-brand" aria-hidden />
                  {dates ? (
                    <span>
                      {shortDate(dates.from)} → {shortDate(dates.to)} · <b>{days} days</b>
                    </span>
                  ) : (
                    <span className="font-semibold">Select rental dates</span>
                  )}
                </span>
                <span className="text-[12.5px] font-semibold text-brand">{dates ? "Change" : "Required"}</span>
              </button>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted">
                  <dt>Rent per day</dt>
                  <dd>{rupees(perDayTotal)}</dd>
                </div>
                <div className="flex justify-between text-muted">
                  <dt>Rental days</dt>
                  <dd>× {rentDays}</dd>
                </div>
                <div className="flex justify-between text-muted">
                  <dt>Security deposit</dt>
                  <dd className="font-semibold text-success">₹0</dd>
                </div>
                <div className="flex justify-between text-muted">
                  <dt>Delivery &amp; pickup</dt>
                  <dd className={remaining > 0 ? "" : "font-semibold text-success"}>{remaining > 0 ? "At checkout" : "FREE"}</dd>
                </div>
                <div className="flex justify-between border-t border-dashed border-line pt-2 text-base font-extrabold text-navy">
                  <dt>Total rent</dt>
                  <dd>{rupees(total)}</dd>
                </div>
              </dl>
              <button
                onClick={() => {
                  if (!dates) {
                    setDatesOpen(true);
                    return;
                  }
                  showToast("Checkout isn't part of this page recreation");
                }}
                className="mt-4 h-12 w-full rounded-xl bg-brand text-[15px] font-bold text-white shadow-[0_8px_20px_rgb(30_79_216/0.3)] transition hover:bg-brand-600 active:scale-[0.98]"
              >
                {dates ? "Proceed to checkout" : "Select dates to continue"}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
