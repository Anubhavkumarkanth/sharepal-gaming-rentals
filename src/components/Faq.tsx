import { ChevronDown } from "lucide-react";
import { FAQS } from "@/config/site";

// Native <details> handles open/close and keyboard support without any JS.
export default function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-14 lg:px-6" aria-labelledby="faq">
      <h2 id="faq" className="text-xl font-bold text-navy">Frequently Asked Questions</h2>
      <div className="mt-4 divide-y divide-line rounded-xl border border-line">
        {FAQS.map((faq) => (
          <details key={faq.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 font-medium text-navy [&::-webkit-details-marker]:hidden">
              {faq.q}
              <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="px-4 pb-4 text-sm text-muted">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
