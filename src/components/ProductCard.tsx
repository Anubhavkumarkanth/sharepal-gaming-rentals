"use client";

import { Bell, Minus, Plus, Star } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { useStore } from "@/lib/store";
import { isVoteToLaunch, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

const TAG_STYLES: Record<string, string> = {
  Trending: "bg-carmine text-white",
  New: "bg-success text-white",
  "Vote to Launch": "bg-navy text-white",
};

export default function ProductCard({ product, eager }: { product: Product; eager?: boolean }) {
  const { cart, addToCart, updateQuantity, rentalDays, votes, addVote, notifyList, toggleNotify } = useStore();
  const quantity = cart[product.id] ?? 0;
  const comingSoon = isVoteToLaunch(product);
  const hasVoted = votes.includes(product.id);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-card">
      <div className="relative">
        <ProductImage
          src={product.image}
          alt={product.name}
          eager={eager}
          className={`aspect-square w-full p-3 ${product.out_of_stock ? "opacity-50 grayscale" : ""}`}
        />
        {product.tag && (
          <span className={`absolute left-2 top-2 rounded px-2 py-0.5 text-[11px] font-semibold ${TAG_STYLES[product.tag] ?? "bg-navy text-white"}`}>
            {product.tag}
          </span>
        )}
        {product.out_of_stock && (
          <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-0.5 text-[11px] font-semibold text-carmine ring-1 ring-carmine/30">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 min-h-[2lh] text-sm font-semibold leading-snug text-navy sm:text-[15px]">{product.name}</h3>

        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-xs text-muted">
          {product.rating > 0 && (
            <span className="inline-flex items-center gap-0.5 font-semibold text-navy">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
              {product.rating}
            </span>
          )}
          {comingSoon ? (
            <span>{product.booked_count.toLocaleString("en-IN")} votes</span>
          ) : (
            <span>Booked {product.booked_count.toLocaleString("en-IN")} times</span>
          )}
        </p>

        <div className="mt-auto pt-3">
          <p>
            <span className="text-lg font-bold text-navy">{formatPrice(product.per_day_rent)}</span>
            <span className="text-xs text-muted"> /day</span>
          </p>
          {rentalDays && !comingSoon && !product.out_of_stock && (
            <p className="text-xs text-muted">
              {formatPrice(product.per_day_rent * rentalDays)} for {rentalDays} days
            </p>
          )}
        </div>

        <div className="mt-3">
          {comingSoon ? (
            <button
              onClick={() => addVote(product.id)}
              disabled={hasVoted}
              className="h-10 w-full rounded-lg border border-navy text-sm font-semibold text-navy hover:bg-navy hover:text-white disabled:border-line disabled:bg-surface disabled:text-muted"
            >
              {hasVoted ? "Voted" : "Vote to Launch"}
            </button>
          ) : product.out_of_stock ? (
            <button
              onClick={() => toggleNotify(product.id)}
              aria-pressed={notifyList.includes(product.id)}
              className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-line text-sm font-semibold text-navy hover:border-navy"
            >
              <Bell className="h-4 w-4" aria-hidden />
              {notifyList.includes(product.id) ? "Alert set" : "Notify me"}
            </button>
          ) : quantity === 0 ? (
            <button
              onClick={() => addToCart(product.id)}
              className="h-10 w-full rounded-lg bg-brand text-sm font-semibold text-white hover:bg-brand-600"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex h-10 items-center justify-between rounded-lg border border-brand text-brand">
              <button onClick={() => updateQuantity(product.id, quantity - 1)} className="grid h-full w-10 place-items-center" aria-label={`Remove one ${product.name}`}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold" aria-live="polite">
                {quantity} in cart
              </span>
              <button onClick={() => updateQuantity(product.id, quantity + 1)} className="grid h-full w-10 place-items-center" aria-label={`Add one more ${product.name}`}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
