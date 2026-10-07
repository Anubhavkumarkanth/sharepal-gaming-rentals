import { ChevronDown } from "lucide-react";
import { FAQS } from "@/config/site";

// Native <details> handles open/close and keyboard support without any JS.
export default function Faq() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-16 lg:px-8" aria-labelledby="faq">
      <h2 id="faq" className="text-2xl font-medium text-ink">Frequently Asked Questions</h2>
      <div className="mt-4 divide-y divide-line rounded-2xl bg-white shadow-card">
        {FAQS.map((faq) => (
          <details key={faq.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
              {faq.q}
              <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="px-5 pb-4 text-sm text-muted">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
