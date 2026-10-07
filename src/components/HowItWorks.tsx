import { HOW_IT_WORKS } from "@/config/site";

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 lg:px-6" aria-labelledby="how-it-works">
      <h2 id="how-it-works" className="text-xl font-bold text-navy">How renting works</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS.map((step, index) => (
          <li key={step.title} className="rounded-xl border border-line p-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand">{index + 1}</span>
            <h3 className="mt-3 font-semibold text-navy">{step.title}</h3>
            <p className="mt-1 text-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
