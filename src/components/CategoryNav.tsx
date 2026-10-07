import { CATEGORY_SLUG, CATEGORY_TABS, sharepalUrl } from "@/config/site";

// Desktop: centred tabs on the grey page. Mobile: part of the purple header area.
export default function CategoryNav({ city }: { city: string }) {
  return (
    <nav aria-label="Categories" className="bg-purple lg:bg-transparent">
      <ul className="no-scrollbar mx-auto flex max-w-3xl overflow-x-auto px-2 lg:justify-center">
        {CATEGORY_TABS.map(({ label, slug }) => {
          const isCurrent = slug === CATEGORY_SLUG;
          return (
            <li key={slug} className="shrink-0">
              <a
                href={isCurrent ? "#products" : sharepalUrl(`/${city}/${slug}`)}
                aria-current={isCurrent ? "page" : undefined}
                className={`relative block min-w-28 px-4 py-2.5 text-center text-base font-semibold lg:w-[186px] lg:py-2.5 lg:text-sm ${
                  isCurrent ? "text-white lg:text-body" : "text-white/75 hover:text-white lg:text-body lg:hover:text-ink"
                }`}
              >
                {label}
                {isCurrent && <span className="absolute bottom-0 left-1/2 h-[3px] w-[120px] -translate-x-1/2 bg-violet" aria-hidden />}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
