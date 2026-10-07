"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTS, type Product } from "@/lib/products";
import { rentalDays } from "@/lib/format";

type Dates = { from: Date; to: Date } | null;
type Toast = { id: number; message: string } | null;

type Store = {
  cart: Record<number, number>;
  cartItems: { product: Product; qty: number }[];
  cartCount: number;
  perDayTotal: number;
  days: number | null;
  dates: Dates;
  setDates: (d: Dates) => void;
  add: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  wishlist: Set<number>;
  toggleWishlist: (id: number) => void;
  votes: Set<number>;
  vote: (id: number) => void;
  notify: Set<number>;
  toggleNotify: (id: number) => void;
  query: string;
  setQuery: (q: string) => void;
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  datesOpen: boolean;
  setDatesOpen: (o: boolean) => void;
  toast: Toast;
  showToast: (message: string) => void;
};

const Ctx = createContext<Store | null>(null);

const STORAGE_KEY = "sp-state-v1";

type Persisted = {
  cart: Record<number, number>;
  wishlist: number[];
  votes: number[];
  notify: number[];
  dates: { from: string; to: string } | null;
};

function readPersisted(): Persisted | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Persisted) : null;
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [votes, setVotes] = useState<Set<number>>(new Set());
  const [notify, setNotify] = useState<Set<number>>(new Set());
  const [dates, setDates] = useState<Dates>(null);
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [datesOpen, setDatesOpen] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const hydrated = useRef(false);

  // Restore after mount so the static HTML and the first client render agree.
  useEffect(() => {
    const saved = readPersisted();
    if (saved) {
      /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from localStorage */
      setCart(saved.cart ?? {});
      setWishlist(new Set(saved.wishlist));
      setVotes(new Set(saved.votes));
      setNotify(new Set(saved.notify));
      if (saved.dates) {
        const from = new Date(saved.dates.from);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Dates that have already passed are dropped rather than silently shifted.
        if (from >= today) setDates({ from, to: new Date(saved.dates.to) });
      }
      /* eslint-enable react-hooks/set-state-in-effect */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    const data: Persisted = {
      cart,
      wishlist: [...wishlist],
      votes: [...votes],
      notify: [...notify],
      dates: dates ? { from: dates.from.toISOString(), to: dates.to.toISOString() } : null,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable (private mode) — state still works for this visit */
    }
  }, [cart, wishlist, votes, notify, dates]);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const toggleIn = (setter: React.Dispatch<React.SetStateAction<Set<number>>>) => (id: number) =>
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const add = useCallback(
    (id: number) => {
      setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
      const p = PRODUCTS.find((x) => x.id === id);
      if (p) showToast(`${p.name} added to cart`);
    },
    [showToast],
  );

  const setQty = useCallback((id: number, qty: number) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 5);
      return next;
    });
  }, []);

  const value = useMemo<Store>(() => {
    const cartItems = Object.entries(cart)
      .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id))!, qty }))
      .filter((i) => i.product);
    return {
      cart,
      cartItems,
      cartCount: cartItems.reduce((n, i) => n + i.qty, 0),
      perDayTotal: cartItems.reduce((n, i) => n + i.product.per_day_rent * i.qty, 0),
      days: dates ? rentalDays(dates.from, dates.to) : null,
      dates,
      setDates,
      add,
      setQty,
      wishlist,
      toggleWishlist: toggleIn(setWishlist),
      votes,
      vote: (id: number) => {
        setVotes((v) => new Set(v).add(id));
        showToast("Thanks! Your vote has been counted");
      },
      notify,
      toggleNotify: (id: number) => {
        const on = !notify.has(id);
        toggleIn(setNotify)(id);
        showToast(on ? "We'll let you know when it's back in stock" : "Back-in-stock alert removed");
      },
      query,
      setQuery,
      cartOpen,
      setCartOpen,
      datesOpen,
      setDatesOpen,
      toast,
      showToast,
    };
  }, [cart, dates, add, setQty, wishlist, votes, notify, query, cartOpen, datesOpen, toast, showToast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
