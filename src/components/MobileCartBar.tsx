"use client";

import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/format";

// On small screens the header cart button only shows a count; this bar also
// shows the running rent so it is visible while scrolling the list.
export default function MobileCartBar() {
  const { cart, rentalDays, setCartOpen } = useStore();

  const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  if (itemCount === 0) return null;

  const rentPerDay = products.reduce((sum, p) => sum + p.per_day_rent * (cart[p.id] ?? 0), 0);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white p-3 md:hidden">
      <button onClick={() => setCartOpen(true)} className="flex h-12 w-full items-center justify-between rounded-lg bg-brand px-4 text-white">
        <span className="text-sm">
          {itemCount} {itemCount === 1 ? "item" : "items"} ·{" "}
          <strong>{rentalDays ? `${formatPrice(rentPerDay * rentalDays)} for ${rentalDays} days` : `${formatPrice(rentPerDay)}/day`}</strong>
        </span>
        <span className="text-sm font-semibold">View Cart</span>
      </button>
    </div>
  );
}
