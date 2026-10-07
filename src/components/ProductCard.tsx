"use client";

import { Bell, BellRing, Minus, Plus, Star, ThumbsUp } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { useStore } from "@/lib/store";
import { isVoteToLaunch, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

const TAG_COLORS: Record<string, string> = {
  Trending: "border-orange text-orange",
  New: "border-sky text-sky",
  "Vote to Launch": "border-violet text-violet",
};

// Desktop uses a round icon button, mobile a full-width pill — same as sharepal.in.
const circle = "hidden h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-navy text-navy transition-colors hover:bg-navy hover:text-white disabled:border-line disabled:text-subtle disabled:hover:bg-transparent lg:grid";
const pill = "mt-2.5 flex h-10 w-full items-center justify-center gap-1.5 rounded-full border-2 border-navy text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white disabled:border-line disabled:text-subtle disabled:hover:bg-transparent lg:hidden";

export default function ProductCard({ product, eager }: { product: Product; eager?: boolean }) {
  const { cart, addToCart, updateQuantity, rentalDays, votes, addVote, notifyList, toggleNotify } = useStore();
  const quantity = cart[product.id] ?? 0;
  const comingSoon = isVoteToLaunch(product);
  const hasVoted = votes.includes(product.id);
  const isNotifying = notifyList.includes(product.id);

  let action: { label: string; icon: React.ReactNode; onClick: () => void; disabled?: boolean; pressed?: boolean };
  if (comingSoon) {
    action = { label: hasVoted ? "Voted" : "Vote to Launch", icon: <ThumbsUp className="h-5 w-5" />, onClick: () => addVote(product.id), disabled: hasVoted };
  } else if (product.out_of_stock) {
    action = {
      label: isNotifying ? "Alert Set" : "Notify Me",
      icon: isNotifying ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />,
      onClick: () => toggleNotify(product.id),
      pressed: isNotifying,
    };
  } else {
    action = { label: "Add to Cart", icon: <Plus className="h-6 w-6" />, onClick: () => addToCart(product.id) };
  }

  const stepper = (
    <div className="flex h-10 items-center justify-between rounded-full bg-navy text-white lg:h-12 lg:w-[104px]" role="group" aria-label={`Quantity of ${product.name}`}>
      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="grid h-full w-10 place-items-center" aria-label="Remove one">
        <Minus className="h-4 w-4" />
      </button>
      <span className="text-sm font-bold" aria-live="polite">{quantity}</span>
      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="grid h-full w-10 place-items-center" aria-label="Add one more">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-2.5 transition-shadow duration-300 lg:bg-transparent lg:p-3 lg:hover:bg-white lg:hover:shadow-card">
      <div className="relative overflow-hidden rounded-2xl bg-white">
        <ProductImage
          src={product.image}
          alt={product.name}
          eager={eager}
          className={`aspect-square w-full p-5 lg:p-8 ${product.out_of_stock ? "opacity-50 grayscale" : ""}`}
        />
        {product.tag && (
          <span className={`absolute left-1 top-1 rounded-lg border bg-white px-2 py-0.5 text-xs font-semibold lg:left-3 lg:top-3 ${TAG_COLORS[product.tag] ?? "border-line text-body"}`}>
            {product.tag}
          </span>
        )}
        {product.out_of_stock && (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-navy px-2 py-0.5 text-xs font-semibold text-white">Out of stock</span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-3 lg:px-2 lg:pt-4">
        <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-ink lg:text-base lg:leading-6">{product.name}</h2>
        {(product.rating > 0 || product.booked_count > 0) && (
          <p className="mt-1 flex items-center gap-1 text-xs text-subtle">
            {product.rating > 0 && (
              <>
                <Star className="h-3 w-3 fill-orange text-orange" aria-hidden />
                <span className="font-medium text-body">{product.rating}</span>
                <span aria-hidden>·</span>
              </>
            )}
            {product.booked_count.toLocaleString("en-IN")} {comingSoon ? "votes" : "booked"}
          </p>
        )}

        <div className="mt-auto pt-2">
          <div className="flex items-end justify-between gap-2 border-t border-line pt-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-muted lg:text-sm">
                {comingSoon ? "Expected rent" : rentalDays ? <>Rent for <span className="text-ink">{rentalDays}</span> {rentalDays === 1 ? "day" : "days"}</> : "Rent per day"}
              </p>
              <p className="text-base font-bold text-ink lg:text-lg">
                {rentalDays && !comingSoon ? formatPrice(product.per_day_rent * rentalDays) : `${formatPrice(product.per_day_rent)}/day`}
              </p>
            </div>
            {quantity > 0 ? (
              <div className="hidden lg:block">{stepper}</div>
            ) : (
              <button onClick={action.onClick} disabled={action.disabled} aria-pressed={action.pressed} className={circle} aria-label={`${action.label}: ${product.name}`}>
                {action.icon}
              </button>
            )}
          </div>
          {quantity > 0 ? (
            <div className="mt-2.5 lg:hidden">{stepper}</div>
          ) : (
            <button onClick={action.onClick} disabled={action.disabled} aria-pressed={action.pressed} className={pill}>
              {action.label}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
