"use client";

import { Fragment, useState } from "react";
import Banner from "@/components/Banner";
import Sidebar from "@/components/Sidebar";
import ProductCard from "@/components/ProductCard";
import AssetPartnerBanner from "@/components/AssetPartnerBanner";
import { useStore } from "@/lib/store";
import { FILTERS, SORT_OPTIONS, filterProducts, products, sortProducts, type SortOption } from "@/lib/products";

// The promo banner sits after the first row of products, as on sharepal.in.
const PROMO_AFTER = 4;

export default function ProductSection() {
  const { search, setSearch } = useStore();
  const [group, setGroup] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("relevance");

  const visibleProducts = sortProducts(filterProducts(products, group, activeFilters, search), sort);

  function toggleFilter(id: string) {
    setActiveFilters((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }

  function clearAll() {
    setGroup("all");
    setActiveFilters([]);
    setSearch("");
  }

  return (
    <div id="products" className="mx-auto grid max-w-[1520px] scroll-mt-32 grid-cols-[minmax(0,1fr)] gap-6 px-4 pt-5 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-10 lg:px-8 lg:pt-6">
      <Sidebar selected={group} onSelect={setGroup} />

      <div className="min-w-0">
        <Banner />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <h2 className="text-2xl font-medium text-ink sm:text-3xl">Gaming Gadgets On Rent</h2>
          <p className="text-muted sm:text-lg" aria-live="polite">
            Total items: <span className="font-medium text-body">{visibleProducts.length} items</span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filters">
            {FILTERS.map((filter) => {
              const isActive = activeFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  aria-pressed={isActive}
                  className={`h-9 shrink-0 rounded-full border px-4 text-sm ${
                    isActive ? "border-navy bg-navy text-white" : "border-line bg-white text-body hover:border-navy"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <label className="flex items-center gap-2 text-sm text-muted">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="h-9 rounded-full border border-line bg-white px-3 text-sm text-ink"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {visibleProducts.length > 0 ? (
          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {visibleProducts.map((product, index) => (
              <Fragment key={product.id}>
                {index === PROMO_AFTER && (
                  <li className="col-span-full">
                    <AssetPartnerBanner />
                  </li>
                )}
                <li>
                  <ProductCard product={product} eager={index < 4} />
                </li>
              </Fragment>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-2xl bg-white px-6 py-12 text-center shadow-card">
            <p className="text-lg font-medium text-ink">No products match your search</p>
            <p className="mt-1 text-sm text-muted">Try a different keyword or remove some filters.</p>
            <button onClick={clearAll} className="mt-4 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-light">
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
