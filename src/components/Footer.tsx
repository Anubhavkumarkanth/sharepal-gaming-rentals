import Link from "next/link";
import Logo from "@/components/Logo";
import { CATEGORY_SLUG, CITIES, FOOTER_LINKS, SUBCATEGORIES, sharepalUrl } from "@/config/site";

export default function Footer({ city }: { city: string }) {
  const columns = [
    { title: "Gaming", links: SUBCATEGORIES.map((s) => ({ label: s.label, href: `/${city}/${s.path}` })) },
    ...FOOTER_LINKS,
  ];

  return (
    <footer className="mt-16 bg-navy text-sm text-white/70">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 md:pb-10 lg:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <Logo inverted />
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
