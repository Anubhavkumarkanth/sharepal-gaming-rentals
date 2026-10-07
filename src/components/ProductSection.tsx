"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, CarFront, Check, Disc3, Gamepad, Gamepad2, Glasses, Joystick, Projector, SearchX, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { useStore } from "@/lib/store";
import { PRODUCTS, applyFilters, sortProducts } from "@/lib/products";
import { QUICK_FILTERS, SORT_OPTIONS, SUBCATEGORIES, cityName, sharepalUrl, type QuickFilterId, type SortValue } from "@/config/site";
import { shortDate } from "@/lib/format";

const SUB_ICONS = {
  ps5: Gamepad2,
  disc: Disc3,
  xbox: Joystick,
  gamepad: Gamepad,
  projector: Projector,
  wheel: CarFront,
  vr: Glasses,
} as const;

export default function ProductSection({ city }: { city: string }) {
  const { query, setQuery, dates, days, setDatesOpen } = useStore();
  const [sort, setSort] = useState<SortValue>("recommended");
  const [filters, setFilters] = useState<QuickFilterId[]>([]);
  const deferredQuery = useDeferredValue(query);

  const visible = useMemo(
    () => sortProducts(applyFilters(PRODUCTS, filters, deferredQuery), sort),
    [filters, deferredQuery, sort],
  );

  const toggle = (id: QuickFilterId) =>
    setFilters((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const reset = () => {
    setFilters([]);
    setQuery("");
    setSort("recommended");
  };
  const name = cityName(city);

  return (
    <section id="products" className="mx-auto max-w-7xl scroll-mt-40 px-4 pt-10 lg:px-6">
      {/* Subcategories */}
      <Reveal>
        <h2 className="text-xl font-extrabold tracking-tight text-navy sm:text-2xl">Shop by category</h2>
      </Reveal>
      <ul className="no-scrollbar -mx-4 mt-4 flex gap-3 overflow-x-auto px-4 pb-1 lg:mx-0 lg:grid lg:grid-cols-7 lg:px-0">
        {SUBCATEGORIES.map((s, i) => {
          const Icon = SUB_ICONS[s.icon];
          const active = "active" in s && s.active;
          const body = (
            <>
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl transition duration-300 group-hover:-translate-y-1 group-hover:rotate-[-4deg] ${
                  active ? "bg-brand text-white shadow-[0_8px_20px_rgb(30_79_216/0.35)]" : "bg-brand-50 text-brand"
                }`}
              >
                <Icon className="h-7 w-7" aria-hidden />
              </span>
              <span className={`flex items-center gap-0.5 text-center text-[12.5px] font-semibold leading-tight ${active ? "text-brand" : "text-navy"}`}>
                {s.label}
                {!active && <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-60" aria-hidden />}
              </span>
            </>
          );
          const cls = `group flex w-[104px] shrink-0 flex-col items-center gap-2 rounded-2xl border px-2 py-4 transition lg:w-auto ${
            active ? "border-brand/30 bg-brand-50/60" : "border-line bg-white hover:border-brand/25 hover:shadow-card"
          }`;
          return (
            <Reveal as="li" key={s.label} delay={i * 50}>
              {active ? (
                <a href="#product-grid" className={cls} aria-current="true">
                  {body}
                </a>
              ) : (
                <a href={sharepalUrl(`/${city}/${s.path}`)} target="_blank" rel="noopener noreferrer" className={cls}>
                  {body}
                </a>
              )}
            </Reveal>
          );
        })}
      </ul>

      {/* Title + controls */}
      <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-navy sm:text-2xl">PS5 Consoles on rent in {name}</h2>
          <p className="mt-1 text-sm text-muted" aria-live="polite">
            Showing <span className="font-semibold text-navy">{visible.length}</span> of {PRODUCTS.length} products
            {query && (
              <>
                {" "}for “<span className="font-semibold text-navy">{query}</span>”
              </>
            )}
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          <span className="sr-only sm:not-sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="h-10 cursor-pointer rounded-xl border border-line bg-white px-3 pr-8 text-sm font-semibold text-navy outline-none transition focus:border-brand"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0" role="group" aria-label="Filters">
        {QUICK_FILTERS.map((f) => {
          const on = filters.includes(f.id);
          return (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              aria-pressed={on}
              className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold transition active:scale-95 ${
                on ? "border-brand bg-brand text-white" : "border-line bg-white text-navy hover:border-brand/40"
              }`}
            >
              {on && <Check className="h-3.5 w-3.5" aria-hidden />}
              {f.label}
            </button>
          );
        })}
        {(filters.length > 0 || query) && (
          <button onClick={reset} className="h-9 shrink-0 px-2 text-[13px] font-semibold text-brand underline-offset-2 hover:underline">
            Clear all
          </button>
        )}
      </div>

      {/* Date nudge: totals appear on every card once dates are picked */}
      <div
        className={`mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${
          dates ? "border-success/25 bg-success/5" : "border-accent/50 bg-accent-50"
        }`}
      >
        <p className="flex items-center gap-2 text-sm text-navy">
          <CalendarDays className={`h-5 w-5 shrink-0 ${dates ? "text-success" : "text-[#b78400]"}`} aria-hidden />
          {dates ? (
            <span>
              Showing total rent for <b>{days} day{days === 1 ? "" : "s"}</b> · {shortDate(dates.from)} → {shortDate(dates.to)}
            </span>
          ) : (
            <span>
              <b>Pick your delivery &amp; pickup dates</b> to see the total rent on every product.
            </span>
          )}
        </p>
        <button
          onClick={() => setDatesOpen(true)}
          className="h-9 rounded-lg bg-navy px-4 text-[13px] font-bold text-white transition hover:bg-navy-800 active:scale-95"
        >
          {dates ? "Change dates" : "Select dates"}
        </button>
      </div>

      {visible.length > 0 ? (
        <ul id="product-grid" className="mt-5 grid scroll-mt-40 grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 60}>
              <ProductCard product={p} priority={i < 4} highlight={deferredQuery} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-14 text-center">
          <SearchX className="h-10 w-10 text-muted" aria-hidden />
          <p className="mt-3 text-lg font-bold text-navy">No combos match these filters</p>
          <p className="mt-1 max-w-sm text-sm text-muted">Try removing a filter or searching for something broader, like “PS5”.</p>
          <button onClick={reset} className="mt-5 h-10 rounded-xl bg-brand px-5 text-sm font-bold text-white hover:bg-brand-600">
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
