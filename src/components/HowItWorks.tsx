import { HOW_IT_WORKS } from "@/config/site";

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1520px] px-4 pt-16 lg:px-8" aria-labelledby="how-it-works">
      <h2 id="how-it-works" className="text-2xl font-medium text-ink">How renting works</h2>
      <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS.map((step, index) => (
          <li key={step.title} className="rounded-2xl bg-white p-5 shadow-card">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-sm font-bold text-white">{index + 1}</span>
            <h3 className="mt-3 text-lg font-medium text-ink">{step.title}</h3>
            <p className="mt-1 text-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
