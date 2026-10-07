"use client";

import { Fragment, useState } from "react";
import { DesktopBanner } from "@/components/Banner";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import { useStore } from "@/lib/store";
import { FILTERS, SORT_OPTIONS, filterProducts, products, sortProducts, type SortOption } from "@/lib/products";
import { PAGE_SIZE } from "@/config/site";

// Promo banners sit after the 4th and 8th products, as on sharepal.in.
const PROMOS_AFTER: Record<number, "assetPartner" | "rentYourGear"> = { 4: "assetPartner", 8: "rentYourGear" };

export default function ProductSection() {
  const { search, setSearch } = useStore();
  const [group, setGroup] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const matching = sortProducts(filterProducts(products, group, activeFilters, search), sort);
  const shown = matching.slice(0, limit);

  function selectGroup(id: string) {
    setGroup(id);
    setLimit(PAGE_SIZE);
  }

  function toggleFilter(id: string) {
    setActiveFilters((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
    setLimit(PAGE_SIZE);
  }

  function clearAll() {
    selectGroup("all");
    setActiveFilters([]);
    setSearch("");
  }

  return (
    <div
      id="products"
      className="mx-auto grid w-full max-w-[1520px] scroll-mt-40 grid-cols-[76px_minmax(0,1fr)] gap-2 px-2 pt-3 lg:w-[84.5%] lg:grid-cols-[120px_minmax(0,1fr)] lg:gap-8 lg:px-0 lg:pt-1"
    >
      <Sidebar selected={group} onSelect={selectGroup} />

      <div>
        <DesktopBanner />

        <div className="flex items-center justify-between border-b border-line pb-2 lg:mt-4 lg:pb-4">
          <h2 className="text-base font-bold text-ink lg:text-2xl">Gaming Gadgets On Rent</h2>
          <p className="text-sm font-medium text-subtle lg:text-base" aria-live="polite">
            <span className="hidden lg:inline">Total items: </span>
            <span className="text-body">{matching.length} items</span>
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 lg:mt-4">
          <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto" role="group" aria-label="Filters">
            {FILTERS.map((filter) => {
              const isActive = activeFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  aria-pressed={isActive}
                  className={`h-8 shrink-0 rounded-full border px-3 text-xs font-medium lg:h-9 lg:px-4 lg:text-sm ${
                    isActive ? "border-navy bg-navy text-white" : "border-line bg-white text-body hover:border-navy"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <label className="flex items-center gap-2 text-xs font-medium text-muted lg:text-sm">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-8 rounded-full border border-line bg-white px-3 text-xs font-medium text-ink lg:h-9 lg:text-sm"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {shown.length > 0 ? (
          <ul className="mt-3 grid grid-cols-2 gap-2 lg:mt-4 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-4 xl:grid-cols-4">
            {shown.map((product, index) => (
              <Fragment key={product.id}>
                {PROMOS_AFTER[index] && (
                  <li className="col-span-full py-2 lg:py-4">
                    <PromoBanner promo={PROMOS_AFTER[index]} />
                  </li>
                )}
                <li>
                  <ProductCard product={product} eager={index < 4} />
                </li>
              </Fragment>
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-2xl bg-white px-6 py-12 text-center">
            <p className="text-lg font-semibold text-ink">No products match your search</p>
            <p className="mt-1 text-sm text-muted">Try a different keyword or remove some filters.</p>
            <button onClick={clearAll} className="mt-4 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light">
              Clear search and filters
            </button>
          </div>
        )}

        {matching.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-3 border-t border-line pt-8 lg:mt-10">
            <p className="text-sm text-subtle lg:text-base">
              Showing {shown.length} of {matching.length} results
            </p>
            {shown.length < matching.length && (
              <button
                onClick={() => setLimit((l) => l + PAGE_SIZE)}
                className="h-12 w-60 rounded-full border-2 border-navy bg-white font-medium text-ink transition-colors hover:bg-navy hover:text-white lg:h-[52px] lg:w-72"
              >
                Show More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
