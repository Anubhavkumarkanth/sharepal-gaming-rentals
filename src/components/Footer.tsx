import { CITIES, FOOTER_LINKS, SITE, SUBCATEGORIES, sharepalUrl } from "@/config/site";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer({ city }: { city: string }) {
  const columns: { title: string; links: { label: string; href: string }[] }[] = [
    { title: "Gaming", links: SUBCATEGORIES.map((s) => ({ label: s.label, href: sharepalUrl(`/${city}/${s.path}`) })) },
    ...Object.entries(FOOTER_LINKS).map(([title, links]) => ({
      title,
      links: links.map((l) => ({ label: l.label, href: sharepalUrl(l.href) })),
    })),
  ];

  return (
    <footer className="mt-20 bg-navy pb-24 text-white/70 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed">
              India&apos;s lifestyle gear rental platform. Rent gaming consoles, cameras, projectors, travel and trekking gear —
              own less, live more.
            </p>
            <a
              href={sharepalUrl(SITE.contactPath)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 items-center rounded-xl bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
            >
              Contact support
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-bold text-white">{col.title}</h3>
                <ul className="mt-3 space-y-2 text-[13.5px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-accent">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <h3 className="text-sm font-bold text-white">Gaming gadgets on rent near you</h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}/${SITE.categorySlug}/`} className="transition hover:text-accent">
                  PS5 on rent in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-[12.5px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.name}. Product names, prices and images belong to their owners.</p>
          <p>Front-end recreation built as a hiring assignment — not the official SharePal website.</p>
        </div>
      </div>
    </footer>
  );
}
