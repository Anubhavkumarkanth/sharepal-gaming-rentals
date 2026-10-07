"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { chargeableDays } from "@/lib/format";

export type RentalDates = { from: Date; to: Date };

type StoreValue = {
  cart: Record<number, number>; // product id -> quantity
  addToCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  dates: RentalDates | null;
  setDates: (dates: RentalDates | null) => void;
  rentalDays: number | null; // chargeable days, null until dates are picked
  votes: number[];
  addVote: (id: number) => void;
  notifyList: number[];
  toggleNotify: (id: number) => void;
  search: string;
  setSearch: (value: string) => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isDatePickerOpen: boolean;
  setDatePickerOpen: (open: boolean) => void;
  toast: string | null;
  showToast: (message: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const STORAGE_KEY = "sharepal-rental";

type SavedState = {
  cart: Record<number, number>;
  dates: { from: string; to: string } | null;
  votes: number[];
  notifyList: number[];
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [dates, setDates] = useState<RentalDates | null>(null);
  const [votes, setVotes] = useState<number[]>([]);
  const [notifyList, setNotifyList] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [isCartOpen, setCartOpen] = useState(false);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load saved state after the first render so server HTML and client HTML match.
  useEffect(() => {
    try {
      const saved: SavedState | null = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved) {
        /* eslint-disable react-hooks/set-state-in-effect -- one-time restore from localStorage */
        setCart(saved.cart);
        setVotes(saved.votes);
        setNotifyList(saved.notifyList);
        // Drop saved dates whose delivery day has already passed.
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (saved.dates && new Date(saved.dates.from) >= today) {
          setDates({ from: new Date(saved.dates.from), to: new Date(saved.dates.to) });
        }
      }
    } catch {
      // Ignore unreadable or blocked storage and start fresh.
    }
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const state: SavedState = {
      cart,
      votes,
      notifyList,
      dates: dates && { from: dates.from.toISOString(), to: dates.to.toISOString() },
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be unavailable (e.g. private mode); the page still works without it.
    }
  }, [loaded, cart, votes, notifyList, dates]);

  function showToast(message: string) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }

  function addToCart(id: number) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    showToast("Added to cart");
  }

  function updateQuantity(id: number, quantity: number) {
    setCart((prev) => {
      const next = { ...prev };
      if (quantity > 0) next[id] = quantity;
      else delete next[id];
      return next;
    });
  }

  function addVote(id: number) {
    setVotes((prev) => [...prev, id]);
    showToast("Thanks for voting!");
  }

  function toggleNotify(id: number) {
    const isOn = notifyList.includes(id);
    setNotifyList((prev) => (isOn ? prev.filter((x) => x !== id) : [...prev, id]));
    showToast(isOn ? "Alert removed" : "We'll notify you when it's back in stock");
  }

  const value: StoreValue = {
    cart,
    addToCart,
    updateQuantity,
    dates,
    setDates,
    rentalDays: dates ? chargeableDays(dates.from, dates.to) : null,
    votes,
    addVote,
    notifyList,
    toggleNotify,
    search,
    setSearch,
    isCartOpen,
    setCartOpen,
    isDatePickerOpen,
    setDatePickerOpen,
    toast,
    showToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used inside StoreProvider");
  return store;
}
