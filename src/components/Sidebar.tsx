/* eslint-disable @next/next/no-img-element -- small category icons from SharePal's CDN */
import { GROUPS, products } from "@/lib/products";
import { sharepalImage } from "@/lib/asset";

// "All" uses SharePal's own icon; every other group shows its first product.
const groups = GROUPS.map((group) => ({
  ...group,
  image: group.id === "all" ? sharepalImage("misc/hard-coded/sharepal/Product=All%20Products.webp") : products.find(group.test)?.image,
}));

export default function Sidebar({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <nav aria-label="Product types" className="sticky top-[150px] self-start lg:top-[100px]">
      <ul className="flex flex-col gap-3 rounded-xl bg-white px-1.5 py-3 lg:gap-5 lg:rounded-2xl lg:px-3 lg:py-3">
        {groups.map((group) => {
          const isSelected = group.id === selected;
          return (
            <li key={group.id}>
              <button onClick={() => onSelect(group.id)} aria-pressed={isSelected} className="group flex w-full flex-col items-center gap-1.5 text-center">
                <span
                  className={`grid h-12 w-12 place-items-center overflow-hidden rounded-lg bg-white transition-colors lg:h-16 lg:w-16 lg:rounded-xl ${
                    isSelected ? "border-2 border-brand" : "border border-line group-hover:border-subtle"
                  }`}
                >
                  {group.image && <img src={group.image} alt="" width={50} height={50} loading="lazy" className="h-[38px] w-[38px] object-contain lg:h-[50px] lg:w-[50px]" />}
                </span>
                <span
                  className={`text-xs font-semibold leading-tight lg:text-sm ${
                    isSelected ? "text-brand underline decoration-2 underline-offset-[6px]" : "text-ink"
                  }`}
                >
                  {group.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
