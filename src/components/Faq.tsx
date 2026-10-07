import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CATEGORY_SLUG, FAQS, getCityName, sharepalUrl } from "@/config/site";

// Native <details> handles open/close and keyboard support without any JS.
export default function Faq({ city }: { city: string }) {
  return (
    <section className="mx-auto mt-16 w-full max-w-[1520px] px-2 lg:mt-24 lg:w-[84.5%] lg:px-0" aria-labelledby="faq">
      <div className="rounded-3xl bg-white p-5 lg:p-10">
        <h2 id="faq" className="text-xl font-bold text-ink lg:text-2xl">Frequently Asked Questions (FAQs)</h2>
        <div className="mt-4 lg:mt-6">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-sm font-medium text-ink lg:px-4 lg:text-base [&::-webkit-details-marker]:hidden">
                {faq.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-body transition-transform duration-200 group-open:rotate-180" aria-hidden />
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-muted lg:px-4">{faq.a}</p>
            </details>
          ))}
        </div>
        <a
          href={sharepalUrl("/faq")}
          className="mt-4 flex h-11 items-center justify-center rounded-full bg-page font-semibold text-navy transition-colors hover:bg-line"
        >
          View more FAQ&apos;s
        </a>
      </div>

      <nav aria-label="Breadcrumb" className="mt-12 px-2 lg:px-4">
        <ol className="flex items-center gap-1 text-sm">
          <li className="text-muted">
            <Link href={`/${city}/${CATEGORY_SLUG}/`} className="hover:text-ink">{getCityName(city)}</Link>
          </li>
          <li className="flex items-center gap-1 font-medium text-ink" aria-current="page">
            <ChevronRight className="h-4 w-4 text-muted" aria-hidden />
            Gaming gadgets on rent
          </li>
        </ol>
      </nav>
    </section>
  );
}
