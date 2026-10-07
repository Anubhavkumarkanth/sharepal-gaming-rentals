"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronDown, MapPin, Menu, Search, ShoppingCart, X } from "lucide-react";
import Logo from "@/components/Logo";
import CityPicker from "@/components/CityPicker";
import MobileMenu from "@/components/MobileMenu";
import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/format";
import { CATEGORY_SLUG, getCityName } from "@/config/site";

function SearchBar({ id }: { id: string }) {
  const { search, setSearch } = useStore();

  return (
    <form
      role="search"
      className="flex h-11 w-full items-center rounded-lg border border-line bg-surface focus-within:border-brand focus-within:bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("products")?.scrollIntoView();
      }}
    >
      <Search className="ml-3 h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <input
        id={id}
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for PS5, FC26, controllers…"
        autoComplete="off"
        className="h-full w-full bg-transparent px-2.5 text-sm text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
      />
      {search && (
        <button type="button" onClick={() => setSearch("")} className="mr-1.5 rounded p-1.5 text-muted hover:text-ink" aria-label="Clear search">
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}

export default function Header({ city }: { city: string }) {
  const { cart, setCartOpen, dates, rentalDays, setDatePickerOpen } = useStore();
  const [isCityPickerOpen, setCityPickerOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const datesLabel = dates ? `${formatDate(dates.from)} – ${formatDate(dates.to)}` : "Select dates";

  return (
    <>
      <p className="bg-navy px-4 py-2 text-center text-xs font-medium text-white">
        Zero delivery charges on orders above ₹1200
      </p>

      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 md:gap-4 lg:px-6">
          <button onClick={() => setMenuOpen(true)} className="-ml-1 p-1 text-navy lg:hidden" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>

          <Link href={`/${city}/${CATEGORY_SLUG}/`} aria-label="SharePal home">
            <Logo />
          </Link>

          <button
            onClick={() => setCityPickerOpen(true)}
            className="flex items-center gap-1 rounded-md px-1.5 py-1 text-sm font-semibold text-navy hover:bg-surface"
            aria-label={`Change city, current city ${getCityName(city)}`}
          >
            <MapPin className="h-4 w-4 text-brand" aria-hidden />
            {getCityName(city)}
            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
          </button>

          <div className="hidden flex-1 md:block">
            <SearchBar id="search-desktop" />
          </div>

          <button
            onClick={() => setDatePickerOpen(true)}
            className="hidden h-11 items-center gap-2 rounded-lg border border-line px-3 text-sm font-medium text-navy hover:border-brand lg:flex"
          >
            <CalendarDays className="h-[18px] w-[18px] text-brand" aria-hidden />
            {datesLabel}
            {rentalDays && <span className="text-muted">({rentalDays} days)</span>}
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="relative ml-auto flex h-11 items-center gap-2 rounded-lg bg-brand px-3 text-sm font-semibold text-white hover:bg-brand-600 md:ml-0 md:px-4"
            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden />
            <span className="hidden md:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-navy">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Below md the search gets its own row, with the date picker next to it */}
        <div className="flex gap-2 px-4 pb-3 md:hidden">
          <SearchBar id="search-mobile" />
          <button
            onClick={() => setDatePickerOpen(true)}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg border ${dates ? "border-brand bg-brand-50 text-brand" : "border-line text-navy"}`}
            aria-label={dates ? `Rental dates: ${datesLabel}` : "Select rental dates"}
          >
            <CalendarDays className="h-5 w-5" />
          </button>
        </div>
      </header>

      <CityPicker city={city} isOpen={isCityPickerOpen} onClose={() => setCityPickerOpen(false)} />
      <MobileMenu
        city={city}
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        onChangeCity={() => {
          setMenuOpen(false);
          setCityPickerOpen(true);
        }}
      />
    </>
  );
}
