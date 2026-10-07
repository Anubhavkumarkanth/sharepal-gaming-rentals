"use client";

import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Dialog from "@/components/Dialog";
import ProductImage from "@/components/ProductImage";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { formatShortDate, formatPrice } from "@/lib/format";
import { FREE_DELIVERY_ABOVE } from "@/config/site";

export default function CartDrawer() {
  const { cart, updateQuantity, isCartOpen, setCartOpen, dates, rentalDays, setDatePickerOpen, showToast } = useStore();

  const items = products.filter((p) => cart[p.id]).map((product) => ({ product, quantity: cart[product.id] }));
  const rentPerDay = items.reduce((sum, { product, quantity }) => sum + product.per_day_rent * quantity, 0);
  const totalRent = rentPerDay * (rentalDays ?? 1);
  // Free delivery depends on the total rent, which is only known once dates are picked.
  const amountForFreeDelivery = rentalDays ? FREE_DELIVERY_ABOVE - totalRent : null;

  function checkout() {
    if (!dates) {
      setDatePickerOpen(true);
      return;
    }
    showToast("Checkout is not part of this demo");
  }

  return (
    <Dialog
      isOpen={isCartOpen}
      onClose={() => setCartOpen(false)}
      label="Cart"
      className="my-0 ml-auto mr-0 h-dvh max-h-none w-full max-w-md bg-white p-0"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-base font-bold text-navy">Your Cart</h2>
          <button onClick={() => setCartOpen(false)} className="rounded p-1 text-muted hover:text-ink" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingCart className="h-10 w-10 text-muted" aria-hidden />
            <p className="mt-3 font-semibold text-navy">Your cart is empty</p>
            <p className="mt-1 text-sm text-muted">Add a PS5 combo to get started.</p>
            <button onClick={() => setCartOpen(false)} className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 py-4">
                  <ProductImage src={product.image} alt={product.name} className="h-16 w-16 shrink-0 rounded-lg p-1" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy">{product.name}</p>
                    <p className="text-xs text-muted">{formatPrice(product.per_day_rent)}/day</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-line">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5" aria-label={`Remove one ${product.name}`}>
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5" aria-label={`Add one more ${product.name}`}>
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button onClick={() => updateQuantity(product.id, 0)} className="text-xs font-medium text-muted hover:text-danger">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-5 py-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">Rental dates</span>
                <button onClick={() => setDatePickerOpen(true)} className="font-medium text-brand hover:underline">
                  {dates ? `${formatShortDate(dates.from)} – ${formatShortDate(dates.to)}` : "Select dates"}
                </button>
              </div>
              <div className="mt-2 flex justify-between text-muted">
                <span>Rent per day</span>
                <span>{formatPrice(rentPerDay)}</span>
              </div>
              {rentalDays && (
                <div className="mt-1 flex justify-between text-muted">
                  <span>Days</span>
                  <span>× {rentalDays}</span>
                </div>
              )}
              <div className="mt-1 flex justify-between text-muted">
                <span>Security deposit</span>
                <span>₹0</span>
              </div>
              <div className="mt-1 flex justify-between text-muted">
                <span>Delivery</span>
                <span>{amountForFreeDelivery !== null && amountForFreeDelivery <= 0 ? "Free" : "Calculated at checkout"}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-line pt-3 text-base font-bold text-navy">
                <span>Total rent</span>
                <span>{rentalDays ? formatPrice(totalRent) : `${formatPrice(rentPerDay)}/day`}</span>
              </div>
              {amountForFreeDelivery !== null && amountForFreeDelivery > 0 && (
                <p className="mt-2 text-xs text-muted">Add {formatPrice(amountForFreeDelivery)} more for free delivery.</p>
              )}
              <button onClick={checkout} className="mt-4 h-11 w-full rounded-lg bg-brand font-semibold text-white hover:bg-brand-dark">
                {dates ? "Proceed to Checkout" : "Select Dates to Continue"}
              </button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}
