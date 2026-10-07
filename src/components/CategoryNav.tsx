import { CATEGORY_SLUG, CATEGORY_TABS, sharepalUrl } from "@/config/site";

export default function CategoryNav({ city }: { city: string }) {
  return (
    <nav aria-label="Categories" className="bg-white">
      <ul className="no-scrollbar mx-auto flex max-w-3xl justify-between overflow-x-auto px-2 sm:justify-center sm:gap-6">
        {CATEGORY_TABS.map(({ label, slug }) => {
          const isCurrent = slug === CATEGORY_SLUG;
          return (
            <li key={slug} className="shrink-0">
              <a
                href={isCurrent ? "#products" : sharepalUrl(`/${city}/${slug}`)}
                aria-current={isCurrent ? "page" : undefined}
                className={`block border-b-2 px-3 py-3 text-sm font-medium sm:min-w-36 sm:px-6 sm:text-lg ${
                  isCurrent ? "border-purple-light text-ink" : "border-transparent text-body hover:text-ink"
                } text-center`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
