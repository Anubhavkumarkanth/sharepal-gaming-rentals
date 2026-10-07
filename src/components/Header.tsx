"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarClock, ChevronDown, House, LayoutGrid, MapPin, Search, ShoppingCart, UserRound, X } from "lucide-react";
import Logo from "@/components/Logo";
import CityPicker from "@/components/CityPicker";
import MobileMenu from "@/components/MobileMenu";
import { useStore } from "@/lib/store";
import { formatShortDate } from "@/lib/format";
import { CATEGORY_SLUG, SITE_ORIGIN, getCityName } from "@/config/site";

// Desktop: city + delivery/pickup dates in one pill, like sharepal.in.
function DesktopDateBar({ city, onCityClick }: { city: string; onCityClick: () => void }) {
  const { dates, setDatePickerOpen } = useStore();
  const openDates = () => setDatePickerOpen(true);

  return (
    <div className="flex h-10 items-center overflow-hidden whitespace-nowrap rounded-full border-2 border-line bg-white text-sm font-semibold text-navy">
      <button onClick={onCityClick} className="flex h-full items-center gap-1.5 bg-line px-3.5" aria-label={`Change city, current city ${getCityName(city)}`}>
        <MapPin className="h-[18px] w-[18px]" aria-hidden />
        {getCityName(city)}
        <ChevronDown className="h-4 w-4" aria-hidden />
      </button>
      <button onClick={openDates} className="flex h-full items-center gap-1.5 px-3 hover:bg-page">
        <CalendarClock className="h-4 w-4" aria-hidden />
        <span className="hidden xl:inline">Delivery Date{dates && ":"}</span>
        {dates ? formatShortDate(dates.from) : <span className="xl:hidden">Delivery</span>}
      </button>
      <button onClick={openDates} className="flex h-full items-center gap-1.5 px-3 hover:bg-page">
        <CalendarClock className="h-4 w-4" aria-hidden />
        <span className="hidden xl:inline">Pickup Date{dates && ":"}</span>
        {dates ? formatShortDate(dates.to) : <span className="xl:hidden">Pickup</span>}
      </button>
      <button onClick={openDates} className="flex h-full items-center gap-1.5 rounded-full bg-navy px-3.5 text-white hover:bg-navy-light">
        <CalendarClock className="h-4 w-4" aria-hidden />
        {dates ? "Edit" : "Select"}
      </button>
    </div>
  );
}

// Mobile: one wide pill under the logo row.
function MobileDateBar() {
  const { dates, setDatePickerOpen } = useStore();
  return (
    <button
      onClick={() => setDatePickerOpen(true)}
      className="flex h-11 w-full items-center justify-between rounded-full bg-white pl-4 pr-1 text-[15px] font-semibold text-navy"
    >
      <span className="flex items-center gap-2">
        <CalendarClock className="h-[18px] w-[18px]" aria-hidden />
        {dates ? `${formatShortDate(dates.from)} – ${formatShortDate(dates.to)}` : "Select Rental Dates"}
      </span>
      <span className="flex h-9 items-center gap-1.5 rounded-full bg-navy px-3 text-sm text-white">
        <CalendarClock className="h-4 w-4" aria-hidden />
        {dates ? "Edit" : "Select"}
      </span>
    </button>
  );
}

export default function Header({ city }: { city: string }) {
  const { cart, setCartOpen, search, setSearch, showToast } = useStore();
  const [isCityPickerOpen, setCityPickerOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartLabel = `Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`;
  const login = () => showToast("Login is not part of this demo");

  function openSearch() {
    setSearchOpen(true);
    window.scrollTo({ top: 0 });
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-purple">
        <div className="mx-auto flex h-14 w-full max-w-[1480px] items-start justify-between px-4 lg:h-[84px] lg:w-[82%] lg:items-center lg:px-0">
          <Link href={`/${city}/${CATEGORY_SLUG}/`} aria-label="SharePal home" className="self-start">
            <Logo className="h-10 w-[120px] rounded-b-xl px-2.5 pb-2 lg:h-[68px] lg:w-40 lg:rounded-b-2xl lg:p-3" />
          </Link>

          <div className="hidden lg:block">
            <DesktopDateBar city={city} onCityClick={() => setCityPickerOpen(true)} />
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 text-white lg:flex xl:gap-6">
            <button onClick={() => (isSearchOpen ? setSearchOpen(false) : openSearch())} aria-label="Search" aria-expanded={isSearchOpen}>
              <Search className="h-7 w-7" />
            </button>
            <button onClick={() => setCartOpen(true)} className="relative" aria-label={cartLabel}>
              <ShoppingCart className="h-7 w-7" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[11px] font-bold text-navy">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={login} className="flex items-center gap-3" aria-label="Login">
              <span className="grid h-[42px] w-[42px] place-items-center rounded-full border-2 border-white bg-white text-purple">
                <UserRound className="h-6 w-6" aria-hidden />
              </span>
              <span className="hidden whitespace-nowrap font-semibold xl:inline">Hi, Login</span>
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 pt-2 lg:hidden">
            <button
              onClick={() => setCityPickerOpen(true)}
              className="flex h-8 items-center gap-1 rounded-full border border-white/40 bg-violet/50 px-3 text-sm font-semibold text-white"
              aria-label={`Change city, current city ${getCityName(city)}`}
            >
              <MapPin className="h-4 w-4" aria-hidden />
              {getCityName(city)}
              <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
            <button onClick={login} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-navy text-white" aria-label="Login">
              <UserRound className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-3 lg:hidden">
          <MobileDateBar />
        </div>

        {(isSearchOpen || search) && (
          <div className="bg-white px-4 py-3 shadow-card">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                document.getElementById("products")?.scrollIntoView();
              }}
              className="mx-auto flex h-11 max-w-2xl items-center rounded-full border border-line bg-page px-4 focus-within:border-brand"
            >
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
                onClick={() => {
                  setSearch("");
                  setSearchOpen(false);
                }}
                className="rounded-full p-1 text-muted hover:text-ink"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile bottom navigation, as on sharepal.in */}
      <nav aria-label="Quick links" className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-4 border-t border-line bg-white text-xs text-body lg:hidden">
        <a href={SITE_ORIGIN} className="flex flex-col items-center justify-center gap-1">
          <House className="h-6 w-6" aria-hidden /> Home
        </a>
        <button onClick={() => setMenuOpen(true)} className="flex flex-col items-center justify-center gap-1">
          <LayoutGrid className="h-6 w-6" aria-hidden /> Category
        </button>
        <button onClick={openSearch} className="flex flex-col items-center justify-center gap-1">
          <Search className="h-6 w-6" aria-hidden /> Search
        </button>
        <button onClick={() => setCartOpen(true)} className="relative flex flex-col items-center justify-center gap-1" aria-label={cartLabel}>
          <ShoppingCart className="h-6 w-6" aria-hidden />
          <span aria-hidden>Cart</span>
          {cartCount > 0 && (
            <span className="absolute right-[calc(50%-20px)] top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-lime px-1 text-[10px] font-bold text-navy">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

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
