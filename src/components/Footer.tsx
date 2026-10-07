import Link from "next/link";
import Logo from "@/components/Logo";
import { CATEGORY_SLUG, CATEGORY_TABS, CITIES, FOOTER_LINKS, sharepalUrl } from "@/config/site";

export default function Footer({ city }: { city: string }) {
  const columns = [
    { title: "Categories", links: CATEGORY_TABS.map((tab) => ({ label: tab.label, href: `/${city}/${tab.slug}` })) },
    ...FOOTER_LINKS,
  ];

  return (
    <footer className="mt-16 bg-navy text-sm text-white/70">
      <div className="mx-auto max-w-[1520px] px-4 pb-24 pt-10 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <Logo className="inline-flex h-11 rounded-lg px-4 text-2xl" />
            <p className="mt-3 max-w-xs">Rent gaming consoles, cameras, travel gear and more, delivered to your doorstep.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold text-white">{column.title}</h3>
                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={sharepalUrl(link.href)} className="hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <h3 className="font-semibold text-white">Gaming gadgets on rent in other cities</h3>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {CITIES.filter((c) => c.slug !== city).map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}/${CATEGORY_SLUG}/`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 border-t border-white/10 pt-6 text-xs">
          Recreation of a SharePal page built for a frontend assignment. Not the official SharePal website.
        </p>
      </div>
    </footer>
  );
}
