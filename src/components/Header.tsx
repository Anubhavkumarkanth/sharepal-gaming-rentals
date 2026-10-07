"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  Dumbbell,
  Gamepad2,
  Luggage,
  MapPin,
  Mountain,
  Search,
  ShoppingCart,
  Tent,
  Tv,
  UserRound,
  Bike,
  Menu,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";
import { useStore } from "@/lib/store";
import { shortDate } from "@/lib/format";
import { ANNOUNCEMENTS, CITIES, SEARCH_HINTS, SITE, TOP_CATEGORIES, cityName, sharepalUrl } from "@/config/site";

const CATEGORY_ICONS = {
  gamepad: Gamepad2,
  camera: Camera,
  tv: Tv,
  mountain: Mountain,
  luggage: Luggage,
  bike: Bike,
  tent: Tent,
  dumbbell: Dumbbell,
} as const;

function AnnouncementBar() {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];
  return (
    <div className="overflow-hidden bg-navy text-[12.5px] font-medium text-white/90">
      <div className="flex w-max animate-marquee gap-12 py-2 hover:[animation-play-state:paused]">
        {items.map((text, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap" aria-hidden={i >= ANNOUNCEMENTS.length}>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

function SearchBox({ className = "" }: { className?: string }) {
  const { query, setQuery } = useStore();
  const [hint, setHint] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputId = useId();

  useEffect(() => {
    const t = setInterval(() => setHint((h) => (h + 1) % SEARCH_HINTS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const showHint = !query && !focused;

  return (
    <form
      role="search"
      className={`group relative flex h-11 items-center rounded-xl border border-line bg-surface transition focus-within:border-brand focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgb(30_79_216/0.12)] ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <Search className="ml-3.5 h-[18px] w-[18px] shrink-0 text-muted group-focus-within:text-brand" aria-hidden />
      <label htmlFor={inputId} className="sr-only">
        Search gaming gadgets
      </label>
      <input
        id={inputId}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer h-full w-full bg-transparent px-3 text-[14.5px] text-ink outline-none"
        autoComplete="off"
        type="search"
      />
      {showHint && (
        <span className="pointer-events-none absolute left-11 flex items-center gap-1 text-[14.5px] text-muted" aria-hidden>
          Search for
          <span key={hint} className="inline-block animate-hint font-medium text-ink/70">
            “{SEARCH_HINTS[hint]}”
          </span>
        </span>
      )}
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="mr-2 grid h-7 w-7 place-items-center rounded-full text-muted hover:bg-line"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}

function CityPicker({ city, open, onClose }: { city: string; open: boolean; onClose: () => void }) {
  const router = useRouter();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-navy/50 p-4 backdrop-blur-[2px] animate-fade" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="city-title"
        className="w-full max-w-lg animate-hint rounded-2xl bg-white p-6 shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 id="city-title" className="text-lg font-bold text-navy">
              Select your city
            </h2>
            <p className="mt-0.5 text-sm text-muted">Prices and availability depend on your city.</p>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {CITIES.map((c) => {
            const active = c.slug === city;
            return (
              <button
                key={c.slug}
                autoFocus={active}
                onClick={() => {
                  onClose();
                  if (!active) router.push(`/${c.slug}/${SITE.categorySlug}/`);
                }}
                className={`flex items-center justify-between rounded-xl border px-3.5 py-3 text-left text-sm font-semibold transition ${
                  active
                    ? "border-brand bg-brand-50 text-brand"
                    : "border-line text-ink hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card"
                }`}
              >
                {c.name}
                {active && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ city, open, onClose, onCity }: { city: string; open: boolean; onClose: () => void; onCity: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-navy/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <nav
        aria-label="Menu"
        inert={!open}
        className={`absolute left-0 top-0 flex h-full w-[82%] max-w-[320px] flex-col bg-white shadow-lift transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <Logo />
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={() => {
            onClose();
            onCity();
          }}
          className="mx-4 mt-4 flex items-center justify-between rounded-xl bg-brand-50 px-3.5 py-3 text-sm font-semibold text-navy"
        >
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand" aria-hidden /> {cityName(city)}
          </span>
          <span className="text-brand">Change</span>
        </button>
        <p className="px-4 pb-1 pt-5 text-[11.5px] font-bold uppercase tracking-wider text-muted">Categories</p>
        <ul className="flex-1 overflow-y-auto px-2">
          {TOP_CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c.icon];
            const active = c.slug === SITE.categorySlug;
            return (
              <li key={c.slug}>
                <a
                  href={active ? "#products" : sharepalUrl(`/${city}/${c.slug}`)}
                  onClick={active ? onClose : undefined}
                  {...(active ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium ${active ? "bg-brand-50 text-brand" : "text-navy hover:bg-surface"}`}
                >
                  <Icon className="h-5 w-5" aria-hidden /> {c.label}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href={sharepalUrl(SITE.contactPath)}
          target="_blank"
          rel="noopener noreferrer"
          className="m-4 flex h-11 items-center justify-center rounded-xl border border-line text-sm font-semibold text-navy"
        >
          Contact support
        </a>
      </nav>
    </div>
  );
}

export default function Header({ city }: { city: string }) {
  const { cartCount, setCartOpen, dates, setDatesOpen, days, showToast } = useStore();
  const [cityOpen, setCityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevCount = useRef(cartCount);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-key the badge whenever the count rises so it replays the pop animation.
  useEffect(() => {
    if (cartCount > prevCount.current) setBump((b) => b + 1);
    prevCount.current = cartCount;
  }, [cartCount]);

  const dateLabel = dates ? `${shortDate(dates.from)} – ${shortDate(dates.to)}` : "Select dates";

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "border-transparent shadow-[0_6px_24px_rgb(3_13_49/0.08)]" : "border-line"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-3 lg:gap-5 lg:px-6">
          <button
            onClick={() => setMenuOpen(true)}
            className="-ml-1.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg text-navy hover:bg-surface lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href={`/${city}/${SITE.categorySlug}/`} className="shrink-0" aria-label="SharePal home">
            <Logo />
          </Link>

          <button
            onClick={() => setCityOpen(true)}
            className="flex min-w-0 shrink items-center gap-1 rounded-lg px-1.5 py-1.5 text-left transition hover:bg-surface sm:gap-1.5 sm:px-2"
            aria-haspopup="dialog"
          >
            <MapPin className="h-[18px] w-[18px] text-brand" aria-hidden />
            <span className="leading-tight">
              <span className="hidden text-[11px] text-muted sm:block">Renting in</span>
              <span className="flex items-center gap-0.5 truncate text-sm font-semibold text-navy">
                {cityName(city)} <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              </span>
            </span>
          </button>

          <SearchBox className="hidden flex-1 md:flex" />

          <button
            onClick={() => setDatesOpen(true)}
            className={`hidden h-11 shrink-0 items-center gap-2 rounded-xl border px-3.5 text-sm font-medium transition lg:flex ${
              dates ? "border-brand/30 bg-brand-50 text-brand" : "border-line text-ink hover:border-brand/40"
            }`}
          >
            <CalendarDays className="h-[18px] w-[18px]" aria-hidden />
            <span className="text-left leading-tight">
              <span className="block text-[11px] font-normal text-muted">Delivery – Pickup</span>
              {dateLabel}
              {days && <span className="ml-1 text-muted">· {days}d</span>}
            </span>
          </button>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <button
              onClick={() => showToast("Login isn't part of this page recreation")}
              className="hidden h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-navy transition hover:bg-surface sm:flex"
            >
              <UserRound className="h-5 w-5" aria-hidden /> Login
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 items-center gap-2 rounded-xl bg-brand px-3.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgb(30_79_216/0.3)] transition hover:bg-brand-600 active:scale-95"
              aria-label={`Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingCart className="h-5 w-5" aria-hidden />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span
                  key={bump}
                  className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-navy ring-2 ring-white"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile: search + dates get their own row */}
        <div className="flex gap-2 px-4 pb-3 md:hidden">
          <SearchBox className="flex-1" />
          <button
            onClick={() => setDatesOpen(true)}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${dates ? "border-brand bg-brand-50 text-brand" : "border-line text-ink"}`}
            aria-label={dates ? `Rental dates ${dateLabel}` : "Select rental dates"}
          >
            <CalendarDays className="h-5 w-5" />
          </button>
        </div>
        <div className="hidden px-4 pb-3 md:flex lg:hidden">
          <button onClick={() => setDatesOpen(true)} className="flex items-center gap-2 text-sm font-medium text-brand">
            <CalendarDays className="h-4 w-4" /> {dates ? `${dateLabel} · ${days} days` : "Select delivery & pickup dates"}
          </button>
        </div>
      </header>

      <nav aria-label="Categories" className="border-b border-line bg-white">
        <ul className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2 lg:justify-between lg:px-6">
          {TOP_CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c.icon];
            const active = c.slug === SITE.categorySlug;
            const className = `group relative flex shrink-0 flex-col items-center gap-1 px-4 pb-2.5 pt-3 text-[12.5px] font-medium transition ${
              active ? "text-brand" : "text-muted hover:text-navy"
            }`;
            const inner = (
              <>
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full transition group-hover:-translate-y-0.5 ${
                    active ? "bg-brand-50" : "bg-surface group-hover:bg-brand-50"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                {c.label}
                <span
                  className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-brand transition-transform ${active ? "scale-x-100" : "scale-x-0"}`}
                />
              </>
            );
            return (
              <li key={c.slug}>
                {active ? (
                  <span className={className} aria-current="page">
                    {inner}
                  </span>
                ) : (
                  <a className={className} href={sharepalUrl(`/${city}/${c.slug}`)} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <CityPicker city={city} open={cityOpen} onClose={() => setCityOpen(false)} />
      <MobileMenu city={city} open={menuOpen} onClose={() => setMenuOpen(false)} onCity={() => setCityOpen(true)} />
    </>
  );
}
