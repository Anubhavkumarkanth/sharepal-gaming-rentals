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

// The JSON has no structured attributes, so filters read them from the product name.
function controllerCount(p: Product) {
  const match = p.name.match(/(\d+) Controllers?/i);
  return match ? Number(match[1]) : null;
}

function hasGames(p: Product) {
  if (/no games/i.test(p.name)) return false;
  return /games|all in one|ea play|fc\d+/i.test(p.name);
}

export const FILTERS = [
  { id: "in-stock", label: "In stock", test: (p: Product) => !p.out_of_stock },
  { id: "with-games", label: "Games included", test: hasGames },
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

export function filterProducts(list: Product[], activeFilters: string[], search: string) {
  const query = search.trim().toLowerCase();
  const filters = FILTERS.filter((f) => activeFilters.includes(f.id));

  // Controller counts are alternatives: "1 Controller" + "2 Controllers" shows both.
  const controllerFilters = filters.filter((f) => f.id.includes("controller"));
  const otherFilters = filters.filter((f) => !f.id.includes("controller"));

  return list.filter(
    (p) =>
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
