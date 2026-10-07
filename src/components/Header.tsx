"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarCheck2, CalendarDays, ChevronDown, MapPin, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import Logo from "@/components/Logo";
import CityPicker from "@/components/CityPicker";
import MobileMenu from "@/components/MobileMenu";
import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/format";
import { CATEGORY_SLUG, getCityName } from "@/config/site";

// City + delivery/pickup dates, shown as one pill like on sharepal.in.
function DateBar({ city, onCityClick }: { city: string; onCityClick: () => void }) {
  const { dates, setDatePickerOpen } = useStore();
  const openDates = () => setDatePickerOpen(true);

  return (
    <div className="flex w-full items-center rounded-full bg-white p-1 text-sm text-body lg:w-auto lg:text-base">
      <button onClick={onCityClick} className="flex shrink-0 items-center gap-1 rounded-full bg-brand-50 px-3 py-2 font-medium text-ink lg:px-4 lg:py-2.5" aria-label={`Change city, current city ${getCityName(city)}`}>
        <MapPin className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">{getCityName(city)}</span>
        <ChevronDown className="h-4 w-4" aria-hidden />
      </button>
      <button onClick={openDates} className="flex min-w-0 flex-1 items-center gap-1.5 px-2.5 py-2 lg:flex-none lg:px-4 lg:py-2.5">
        <CalendarDays className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden />
        <span className="truncate">{dates ? formatDate(dates.from) : <>Delivery<span className="hidden sm:inline"> Date</span></>}</span>
      </button>
      <button onClick={openDates} className="flex min-w-0 flex-1 items-center gap-1.5 px-2.5 py-2 lg:flex-none lg:px-4 lg:py-2.5">
        <CalendarDays className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden />
        <span className="truncate">{dates ? formatDate(dates.to) : <>Pickup<span className="hidden sm:inline"> Date</span></>}</span>
      </button>
      <button onClick={openDates} className="flex shrink-0 items-center gap-1.5 rounded-full bg-navy px-4 py-2 font-medium text-white hover:bg-navy-light lg:px-5 lg:py-2.5">
        <CalendarCheck2 className="h-4 w-4" aria-hidden />
        {dates ? "Change" : "Select"}
      </button>
    </div>
  );
}

export default function Header({ city }: { city: string }) {
  const { cart, setCartOpen, search, setSearch, showToast } = useStore();
  const [isCityPickerOpen, setCityPickerOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <>
      <header className="sticky top-0 z-40 bg-purple">
        <div className="mx-auto flex h-16 max-w-[1520px] items-center gap-3 px-4 lg:h-[104px] lg:gap-6 lg:px-8">
          <button onClick={() => setMenuOpen(true)} className="-ml-1 p-1 text-white lg:hidden" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>

          <Link href={`/${city}/${CATEGORY_SLUG}/`} aria-label="SharePal home" className="self-start">
            <Logo />
          </Link>

          <div className="hidden flex-1 justify-center lg:flex">
            <DateBar city={city} onCityClick={() => setCityPickerOpen(true)} />
          </div>

          <div className="ml-auto flex items-center gap-1 text-white lg:ml-0 lg:gap-3">
            <button onClick={() => setSearchOpen((open) => !open)} className="rounded-full p-2 hover:bg-white/10" aria-label="Search" aria-expanded={isSearchOpen}>
              <Search className="h-6 w-6" />
            </button>
            <button onClick={() => setCartOpen(true)} className="relative rounded-full p-2 hover:bg-white/10" aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}>
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[11px] font-bold text-navy">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => showToast("Login is not part of this demo")} className="hidden items-center gap-3 lg:flex">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy">
                <UserRound className="h-6 w-6" aria-hidden />
              </span>
              <span className="text-lg font-medium">Hi, Login</span>
            </button>
          </div>
        </div>

        {/* Below lg the city/date pill moves to its own row */}
        <div className="px-4 pb-3 lg:hidden">
          <DateBar city={city} onCityClick={() => setCityPickerOpen(true)} />
        </div>

        {(isSearchOpen || search) && (
          <div className="border-t border-white/10 bg-white px-4 py-3 shadow-card">
            <form role="search" onSubmit={(e) => { e.preventDefault(); document.getElementById("products")?.scrollIntoView(); }} className="mx-auto flex h-11 max-w-2xl items-center rounded-full border border-line bg-page px-4 focus-within:border-brand">
              <Search className="h-[18px] w-[18px] shrink-0 text-muted" aria-hidden />
              <label htmlFor="search" className="sr-only">Search products</label>
              <input
                id="search"
                type="search"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for PS5, FC26, controllers…"
                autoComplete="off"
                className="h-full w-full bg-transparent px-2.5 text-sm outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
              />
              <button
                type="button"
                onClick={() => { setSearch(""); setSearchOpen(false); }}
                className="rounded-full p-1 text-muted hover:text-ink"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
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
