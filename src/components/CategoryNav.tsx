import { CATEGORY_SLUG, TOP_CATEGORIES, sharepalUrl } from "@/config/site";

export default function CategoryNav({ city }: { city: string }) {
  return (
    <nav aria-label="Categories" className="border-b border-line bg-white">
      <ul className="no-scrollbar mx-auto flex max-w-7xl overflow-x-auto px-2 lg:justify-between lg:px-6">
        {TOP_CATEGORIES.map(({ label, slug, icon: Icon }) => {
          const isCurrent = slug === CATEGORY_SLUG;
          return (
            <li key={slug} className="shrink-0">
              <a
                href={isCurrent ? "#products" : sharepalUrl(`/${city}/${slug}`)}
                aria-current={isCurrent ? "page" : undefined}
                className={`flex flex-col items-center gap-1 border-b-2 px-4 py-2.5 text-xs font-medium ${
                  isCurrent ? "border-brand text-brand" : "border-transparent text-muted hover:text-navy"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
