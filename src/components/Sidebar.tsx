import { Smile } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { GROUPS, products } from "@/lib/products";

// Each group's tile shows the first product in that group.
const groups = GROUPS.map((group) => ({
  ...group,
  image: group.id === "all" ? null : products.find(group.test)?.image,
}));

export default function Sidebar({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <nav aria-label="Product types" className="lg:sticky lg:top-32 lg:self-start">
      <ul className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-4 lg:rounded-2xl lg:bg-white lg:px-4 lg:py-5 lg:shadow-card">
        {groups.map((group) => {
          const isSelected = group.id === selected;
          return (
            <li key={group.id} className="shrink-0">
              <button
                onClick={() => onSelect(group.id)}
                aria-pressed={isSelected}
                className="flex w-20 flex-col items-center gap-1.5 text-center lg:w-full"
              >
                <span
                  className={`grid h-16 w-16 place-items-center overflow-hidden rounded-xl border-2 bg-white lg:h-20 lg:w-20 ${
                    isSelected ? "border-brand" : "border-line"
                  }`}
                >
                  {group.image ? (
                    <ProductImage src={group.image} alt="" className="h-full w-full p-1" />
                  ) : (
                    <Smile className="h-9 w-9 text-brand" aria-hidden />
                  )}
                </span>
                <span
                  className={`text-xs font-medium leading-tight lg:text-sm ${
                    isSelected ? "text-brand underline decoration-2 underline-offset-4" : "text-ink"
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
