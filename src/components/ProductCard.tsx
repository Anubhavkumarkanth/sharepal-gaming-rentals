"use client";

import { Bell, BellRing, Minus, Plus, Star, ThumbsUp } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { useStore } from "@/lib/store";
import { isVoteToLaunch, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

const TAG_STYLES: Record<string, string> = {
  Trending: "border-orange text-orange",
  New: "border-sky text-sky",
  "Vote to Launch": "border-purple-light text-purple-light",
};

const circleButton =
  "grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-navy hover:text-white disabled:border-line disabled:text-muted disabled:hover:bg-transparent";

export default function ProductCard({ product, eager }: { product: Product; eager?: boolean }) {
  const { cart, addToCart, updateQuantity, rentalDays, votes, addVote, notifyList, toggleNotify } = useStore();
  const quantity = cart[product.id] ?? 0;
  const comingSoon = isVoteToLaunch(product);
  const hasVoted = votes.includes(product.id);
  const isNotifying = notifyList.includes(product.id);

  let priceLabel = "Rent per day";
  let price = `${formatPrice(product.per_day_rent)}/day`;
  if (comingSoon) priceLabel = "Expected rent";
  else if (rentalDays) {
    priceLabel = `Total for ${rentalDays} ${rentalDays === 1 ? "day" : "days"}`;
    price = formatPrice(product.per_day_rent * rentalDays);
  }

  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-card">
        <ProductImage
          src={product.image}
          alt={product.name}
          eager={eager}
          className={`aspect-square w-full p-4 transition-transform duration-300 group-hover:scale-105 ${product.out_of_stock ? "opacity-40 grayscale" : ""}`}
        />
        {product.tag && (
          <span className={`absolute left-3 top-3 rounded-md border bg-white px-2 py-0.5 text-xs font-medium sm:text-sm ${TAG_STYLES[product.tag] ?? "border-line text-body"}`}>
            {product.tag}
          </span>
        )}
        {product.out_of_stock && (
          <span className="absolute bottom-3 left-3 rounded-md bg-navy px-2 py-0.5 text-xs font-medium text-white">Out of stock</span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3">
        <h3 className="line-clamp-2 min-h-[2lh] text-[15px] font-medium leading-snug text-ink sm:text-lg">{product.name}</h3>
        <p className="mb-3 mt-1 flex items-center gap-1.5 text-xs text-muted sm:text-sm">
          {product.rating > 0 && (
            <>
              <Star className="h-3.5 w-3.5 fill-orange text-orange" aria-hidden />
              <span className="font-medium text-body">{product.rating}</span>
              <span aria-hidden>·</span>
            </>
          )}
          {comingSoon
            ? `${product.booked_count.toLocaleString("en-IN")} votes`
            : `${product.booked_count.toLocaleString("en-IN")} booked`}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-line pt-3">
          <div className="min-w-0">
            <p className="text-xs text-muted sm:text-sm">{priceLabel}</p>
            <p className="text-base font-bold text-ink sm:text-lg">{price}</p>
          </div>

          {comingSoon ? (
            <button onClick={() => addVote(product.id)} disabled={hasVoted} className={circleButton} aria-label={hasVoted ? "Voted" : `Vote to launch ${product.name}`}>
              <ThumbsUp className="h-5 w-5" />
            </button>
          ) : product.out_of_stock ? (
            <button onClick={() => toggleNotify(product.id)} aria-pressed={isNotifying} className={circleButton} aria-label={isNotifying ? "Cancel back-in-stock alert" : `Notify me when ${product.name} is back`}>
              {isNotifying ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
            </button>
          ) : quantity === 0 ? (
            <button onClick={() => addToCart(product.id)} className={circleButton} aria-label={`Add ${product.name} to cart`}>
              <Plus className="h-6 w-6" />
            </button>
          ) : (
            <div className="flex h-12 shrink-0 items-center rounded-full bg-navy text-white" role="group" aria-label={`Quantity of ${product.name}`}>
              <button onClick={() => updateQuantity(product.id, quantity - 1)} className="grid h-12 w-9 place-items-center" aria-label="Remove one">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-4 text-center text-sm font-bold" aria-live="polite">{quantity}</span>
              <button onClick={() => updateQuantity(product.id, quantity + 1)} className="grid h-12 w-9 place-items-center" aria-label="Add one more">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
