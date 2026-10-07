"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/lib/store";
import { FILTERS, SORT_OPTIONS, filterProducts, products, sortProducts, type SortOption } from "@/lib/products";
import { formatDate } from "@/lib/format";
import { SUBCATEGORIES, getCityName, sharepalUrl } from "@/config/site";

export default function ProductSection({ city }: { city: string }) {
  const { search, setSearch, dates, rentalDays, setDatePickerOpen } = useStore();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("relevance");

  const visibleProducts = sortProducts(filterProducts(products, activeFilters, search), sort);

  function toggleFilter(id: string) {
    setActiveFilters((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }

  function clearAll() {
    setActiveFilters([]);
    setSearch("");
  }

  return (
    <section id="products" className="mx-auto max-w-7xl scroll-mt-36 px-4 pt-8 lg:px-6">
      <h2 className="text-lg font-bold text-navy">Browse by category</h2>
      <ul className="no-scrollbar -mx-4 mt-3 flex gap-3 overflow-x-auto px-4 lg:mx-0 lg:grid lg:grid-cols-7 lg:px-0">
        {SUBCATEGORIES.map(({ label, path, icon: Icon, current }) => (
          <li key={label} className="shrink-0">
            <a
              href={current ? "#product-list" : sharepalUrl(`/${city}/${path}`)}
              aria-current={current ? "true" : undefined}
              className={`flex w-24 flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center text-xs font-medium lg:w-auto ${
                current ? "border-brand bg-brand-50 text-brand" : "border-line text-navy hover:border-brand"
              }`}
            >
              <Icon className="h-7 w-7" aria-hidden />
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div id="product-list" className="mt-8 flex scroll-mt-36 flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-navy sm:text-xl">PS5 Consoles on Rent in {getCityName(city)}</h2>
          <p className="text-sm text-muted" aria-live="polite">
            {visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}
            {search && ` for “${search}”`}
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-9 rounded-lg border border-line bg-white px-2 text-sm font-medium text-navy"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Filters">
        {FILTERS.map((filter) => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              aria-pressed={isActive}
              className={`h-8 shrink-0 rounded-full border px-3 text-xs font-medium ${
                isActive ? "border-brand bg-brand text-white" : "border-line bg-white text-navy hover:border-brand"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
        {activeFilters.length > 0 && (
          <button onClick={() => setActiveFilters([])} className="h-8 shrink-0 px-2 text-xs font-semibold text-brand">
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-navy">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-brand" aria-hidden />
          {dates
            ? `Prices for ${rentalDays} days: ${formatDate(dates.from)} – ${formatDate(dates.to)}`
            : "Select your rental dates to see the total rent for each product."}
        </p>
        <button onClick={() => setDatePickerOpen(true)} className="font-semibold text-brand hover:underline">
          {dates ? "Change dates" : "Select dates"}
        </button>
      </div>

      {visibleProducts.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {visibleProducts.map((product, index) => (
            <li key={product.id}>
              <ProductCard product={product} eager={index < 4} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-line px-6 py-12 text-center">
          <p className="font-semibold text-navy">No products match your search</p>
          <p className="mt-1 text-sm text-muted">Try a different keyword or remove some filters.</p>
          <button onClick={clearAll} className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
            Clear search and filters
          </button>
        </div>
      )}
    </section>
  );
}
