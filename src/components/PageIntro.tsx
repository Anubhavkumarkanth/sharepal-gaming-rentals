import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CATEGORY_SLUG, SITE_ORIGIN, TRUST_BADGES, getCityName } from "@/config/site";

export default function PageIntro({ city }: { city: string }) {
  const cityName = getCityName(city);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-xs text-muted">
          <li>
            <a href={SITE_ORIGIN} className="hover:text-brand">Home</a>
          </li>
          <li className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href={`/${city}/${CATEGORY_SLUG}/`} className="hover:text-brand">{cityName}</Link>
          </li>
          <li className="flex items-center gap-1 font-medium text-navy" aria-current="page">
            <ChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden />
            Gaming Gadgets
          </li>
        </ol>
      </nav>

      <div className="mt-4 rounded-xl bg-brand-50 px-5 py-6 sm:px-8 sm:py-8">
        <h1 className="text-2xl font-bold text-navy sm:text-3xl">Gaming Gadgets on Rent in {cityName}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
          Rent a PS5 with games and extra controllers for a weekend, a week or longer. Delivered to your doorstep and
          picked up on your return date.
        </p>

        <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {TRUST_BADGES.map(({ title, body, icon: Icon }) => (
            <li key={title} className="flex items-center gap-2.5 rounded-lg bg-white p-2.5 sm:gap-3 sm:p-3">
              <Icon className="h-5 w-5 shrink-0 text-brand sm:h-6 sm:w-6" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-navy">{title}</p>
                <p className="hidden text-xs text-muted sm:block">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
