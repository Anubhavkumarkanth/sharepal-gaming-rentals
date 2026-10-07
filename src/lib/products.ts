import raw from "@/data/products.json";
import type { QuickFilterId, SortValue } from "@/config/site";

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

export const PRODUCTS: Product[] = raw.products;

export const isVoteToLaunch = (p: Product) => p.tag.toLowerCase() === "vote to launch";

export function controllerCount(p: Product): number | null {
  const m = p.name.match(/(\d+)\s*Controllers?/i);
  return m ? Number(m[1]) : null;
}

export function includesGames(p: Product): boolean {
  if (/no games included/i.test(p.name)) return false;
  return /games|game\)|all in one|fc\d+|ea play/i.test(p.name);
}

const isFootball = (p: Product) => /\bFC\d+\b/i.test(p.name);

function matchesFilter(p: Product, id: QuickFilterId): boolean {
  switch (id) {
    case "in-stock":
      return !p.out_of_stock;
    case "games":
      return includesGames(p);
    case "c1":
      return controllerCount(p) === 1;
    case "c2":
      return controllerCount(p) === 2;
    case "c4":
      return controllerCount(p) === 4;
    case "fc":
      return isFootball(p);
  }
}

// Controller filters are alternatives (OR); every other filter narrows (AND).
export function applyFilters(products: Product[], active: QuickFilterId[], query: string): Product[] {
  const controllerIds = active.filter((id) => id.startsWith("c"));
  const otherIds = active.filter((id) => !id.startsWith("c"));
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return products.filter((p) => {
    if (controllerIds.length && !controllerIds.some((id) => matchesFilter(p, id))) return false;
    if (!otherIds.every((id) => matchesFilter(p, id))) return false;
    const name = p.name.toLowerCase();
    return terms.every((t) => name.includes(t));
  });
}

export function sortProducts(products: Product[], sort: SortValue): Product[] {
  const list = [...products];
  // Out-of-stock items always sink to the bottom so the first screen is rentable.
  const stock = (a: Product, b: Product) => Number(a.out_of_stock) - Number(b.out_of_stock);
  switch (sort) {
    case "popular":
      return list.filter((p) => !isVoteToLaunch(p)).sort((a, b) => stock(a, b) || b.booked_count - a.booked_count)
        .concat(list.filter(isVoteToLaunch));
    case "price-asc":
      return list.sort((a, b) => stock(a, b) || a.per_day_rent - b.per_day_rent);
    case "price-desc":
      return list.sort((a, b) => stock(a, b) || b.per_day_rent - a.per_day_rent);
    case "rating":
      return list.sort((a, b) => stock(a, b) || b.rating - a.rating);
    default:
      return list.sort(stock);
  }
}
