import data from "@/data/products.json";

export type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  booked_count: number;
  tag: string;
  per_day_rent: number;
  out_of_stock: boolean;
};

export const products: Product[] = data.products;

export const isVoteToLaunch = (p: Product) => p.tag === "Vote to Launch";

// The JSON has no structured attributes, so groups and filters read them from the product name.
function controllerCount(p: Product) {
  const match = p.name.match(/(\d+) Controllers?/i);
  return match ? Number(match[1]) : null;
}

// Sidebar groups. The supplied data is all PS5, so the groups split it by
// what comes in the box rather than by console.
export const GROUPS = [
  { id: "all", label: "All", test: () => true },
  { id: "games-100", label: "PS5 + 100 Games", test: (p: Product) => /games \(100\+\)|all in one|ea play/i.test(p.name) },
  { id: "fc", label: "FC Combos", test: (p: Product) => /\bFC\d+/i.test(p.name) },
  { id: "game-titles", label: "Game Titles", test: (p: Product) => /digital game/i.test(p.name) },
  { id: "console", label: "Console Only", test: (p: Product) => /no games/i.test(p.name) },
  { id: "portal", label: "PS Portal", test: (p: Product) => /portal/i.test(p.name) },
];

export const FILTERS = [
  { id: "in-stock", label: "In stock", test: (p: Product) => !p.out_of_stock },
  { id: "1-controller", label: "1 Controller", test: (p: Product) => controllerCount(p) === 1 },
  { id: "2-controllers", label: "2 Controllers", test: (p: Product) => controllerCount(p) === 2 },
  { id: "4-controllers", label: "4 Controllers", test: (p: Product) => controllerCount(p) === 4 },
];

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "popular", label: "Most booked" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export function filterProducts(list: Product[], groupId: string, activeFilters: string[], search: string) {
  const query = search.trim().toLowerCase();
  const group = GROUPS.find((g) => g.id === groupId) ?? GROUPS[0];
  const filters = FILTERS.filter((f) => activeFilters.includes(f.id));

  // Controller counts are alternatives: "1 Controller" + "2 Controllers" shows both.
  const controllerFilters = filters.filter((f) => f.id.includes("controller"));
  const otherFilters = filters.filter((f) => !f.id.includes("controller"));

  return list.filter(
    (p) =>
      group.test(p) &&
      p.name.toLowerCase().includes(query) &&
      otherFilters.every((f) => f.test(p)) &&
      (controllerFilters.length === 0 || controllerFilters.some((f) => f.test(p))),
  );
}

export function sortProducts(list: Product[], sort: SortOption) {
  const sorted = [...list];
  if (sort === "popular") sorted.sort((a, b) => b.booked_count - a.booked_count);
  if (sort === "price-low") sorted.sort((a, b) => a.per_day_rent - b.per_day_rent);
  if (sort === "price-high") sorted.sort((a, b) => b.per_day_rent - a.per_day_rent);
  if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
  // Products that can't be rented right now go last, whatever the sort.
  return sorted.sort((a, b) => rentableRank(a) - rentableRank(b));
}

const rentableRank = (p: Product) => (p.out_of_stock ? 2 : isVoteToLaunch(p) ? 1 : 0);
