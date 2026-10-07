"use client";

import { Bell, BellRing, Flame, Heart, Minus, Plus, Rocket, ShoppingCart, Sparkles, Star, ThumbsUp } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { useStore } from "@/lib/store";
import { isVoteToLaunch, type Product } from "@/lib/products";
import { compactCount, rupees } from "@/lib/format";

function TagBadge({ tag }: { tag: string }) {
  if (!tag) return null;
  const styles: Record<string, { cls: string; Icon: typeof Flame }> = {
    trending: { cls: "bg-gradient-to-r from-carmine to-[#e0663a] text-white", Icon: Flame },
    new: { cls: "bg-success text-white", Icon: Sparkles },
    "vote to launch": { cls: "bg-[#5b3df5] text-white", Icon: Rocket },
  };
  const { cls, Icon } = styles[tag.toLowerCase()] ?? { cls: "bg-navy text-white", Icon: Sparkles };
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-[3px] text-[11px] font-bold tracking-wide shadow-sm ${cls}`}>
      <Icon className="h-3 w-3" aria-hidden />
      {tag}
    </span>
  );
}

export default function ProductCard({ product: p, priority = false, highlight = "" }: { product: Product; priority?: boolean; highlight?: string }) {
  const { cart, add, setQty, wishlist, toggleWishlist, votes, vote, notify, toggleNotify, days } = useStore();
  const qty = cart[p.id] ?? 0;
  const vote2launch = isVoteToLaunch(p);
  const voted = votes.has(p.id);
  const wished = wishlist.has(p.id);
  const notifying = notify.has(p.id);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition duration-300 ${
        p.out_of_stock
          ? "border-line"
          : "border-line hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift"
      }`}
    >
      <div className="relative overflow-hidden bg-gradient-to-b from-surface to-white">
        <ProductImage
          src={p.image}
          alt={p.name}
          priority={priority}
          className={`aspect-square p-4 transition-transform duration-500 ${p.out_of_stock ? "opacity-50 grayscale" : "group-hover:scale-[1.06]"}`}
        />
        <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
          <TagBadge tag={p.tag} />
        </div>
        <button
          onClick={() => toggleWishlist(p.id)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
          className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-muted shadow-sm ring-1 ring-line transition hover:scale-110 hover:text-carmine active:scale-90"
        >
          <Heart className={`h-4 w-4 transition ${wished ? "fill-carmine text-carmine" : ""}`} aria-hidden />
        </button>
        {p.out_of_stock && (
          <span className="absolute inset-x-0 bottom-3 mx-auto w-max rounded-full bg-navy/85 px-3 py-1 text-[11.5px] font-semibold text-white">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <h3 className="line-clamp-2 min-h-[2.6em] text-[13.5px] font-semibold leading-[1.3] text-navy sm:text-[15px]">
          <Highlight text={p.name} query={highlight} />
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] text-muted sm:text-[12.5px]">
          {p.rating > 0 ? (
            <span className="inline-flex items-center gap-0.5 rounded-md bg-success/10 px-1.5 py-0.5 font-bold text-success">
              {p.rating.toFixed(1)} <Star className="h-3 w-3 fill-current" aria-label="stars" />
            </span>
          ) : (
            !vote2launch && <span className="rounded-md bg-accent-50 px-1.5 py-0.5 font-semibold text-[#8a6400]">New launch</span>
          )}
          {vote2launch ? (
            <span className="inline-flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" aria-hidden /> {compactCount(p.booked_count + (voted ? 1 : 0))} votes
            </span>
          ) : (
            <span>Booked {p.booked_count.toLocaleString("en-IN")} times</span>
          )}
        </div>

        <div className="mt-auto pt-1">
          {vote2launch ? (
            <p className="text-[12.5px] leading-snug text-muted">
              Coming soon at <span className="font-bold text-navy">{rupees(p.per_day_rent)}</span>/day
            </p>
          ) : (
            <p className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-navy sm:text-xl">{rupees(p.per_day_rent)}</span>
              <span className="text-[12.5px] text-muted">/day</span>
            </p>
          )}
          {!vote2launch && !p.out_of_stock && (
            <p className="h-4 text-[11.5px] font-medium text-brand">
              {days ? `${rupees(p.per_day_rent * days)} for ${days} day${days > 1 ? "s" : ""}` : ""}
            </p>
          )}
        </div>

        {vote2launch ? (
          <button
            onClick={() => !voted && vote(p.id)}
            disabled={voted}
            className={`flex h-10 items-center justify-center gap-1.5 rounded-xl text-[13.5px] font-bold transition active:scale-[0.97] ${
              voted ? "bg-[#5b3df5]/10 text-[#5b3df5]" : "bg-[#5b3df5] text-white hover:bg-[#4a2ee0]"
            }`}
          >
            <ThumbsUp className="h-4 w-4" aria-hidden /> {voted ? "Voted" : "Vote to Launch"}
          </button>
        ) : p.out_of_stock ? (
          <button
            onClick={() => toggleNotify(p.id)}
            aria-pressed={notifying}
            className={`flex h-10 items-center justify-center gap-1.5 rounded-xl border text-[13.5px] font-bold transition active:scale-[0.97] ${
              notifying ? "border-success/30 bg-success/10 text-success" : "border-line text-navy hover:border-navy/30"
            }`}
          >
            {notifying ? <BellRing className="h-4 w-4" aria-hidden /> : <Bell className="h-4 w-4" aria-hidden />}
            {notifying ? "We'll notify you" : "Notify me"}
          </button>
        ) : qty === 0 ? (
          <button
            onClick={() => add(p.id)}
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl border-[1.5px] border-brand text-[13.5px] font-bold text-brand transition hover:bg-brand hover:text-white active:scale-[0.97]"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden /> Add to Cart
          </button>
        ) : (
          <div className="flex h-10 items-center justify-between rounded-xl bg-brand text-white" role="group" aria-label={`Quantity of ${p.name}`}>
            <button onClick={() => setQty(p.id, qty - 1)} className="grid h-10 w-10 place-items-center rounded-l-xl hover:bg-brand-600" aria-label="Decrease quantity">
              <Minus className="h-4 w-4" />
            </button>
            <span key={qty} className="animate-pop text-sm font-bold" aria-live="polite">
              {qty} in cart
            </span>
            <button
              onClick={() => setQty(p.id, qty + 1)}
              disabled={qty >= 5}
              className="grid h-10 w-10 place-items-center rounded-r-xl hover:bg-brand-600 disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!terms.length) return <>{text}</>;
  const parts = text.split(new RegExp(`(${terms.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-accent/50 px-0.5 text-inherit">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
