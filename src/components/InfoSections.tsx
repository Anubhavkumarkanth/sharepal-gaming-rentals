"use client";

import { useId, useState } from "react";
import { CalendarCheck2, ChevronDown, Gamepad2, IdCard, ShoppingCart } from "lucide-react";
import Reveal from "@/components/Reveal";
import { FAQS, HOW_IT_WORKS, cityName } from "@/config/site";

const STEP_ICONS = [CalendarCheck2, ShoppingCart, IdCard, Gamepad2];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 lg:px-6" aria-labelledby="how-title">
      <Reveal className="text-center">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">How it works</p>
        <h2 id="how-title" className="mt-1 text-2xl font-extrabold tracking-tight text-navy sm:text-[28px]">
          Renting a PS5 takes four easy steps
        </h2>
      </Reveal>
      <ol className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <span className="absolute left-[12%] right-[12%] top-[38px] hidden h-px border-t-2 border-dashed border-brand/20 lg:block" aria-hidden />
        {HOW_IT_WORKS.map((s, i) => {
          const Icon = STEP_ICONS[i];
          return (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative rounded-2xl border border-line bg-white p-5 text-center transition hover:-translate-y-1 hover:shadow-card">
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-[0_8px_20px_rgb(30_79_216/0.3)]">
                <Icon className="h-6 w-6" aria-hidden />
                <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-accent text-xs font-extrabold text-navy ring-2 ring-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-4 text-[16px] font-bold text-navy">{s.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

export function AboutRental({ city }: { city: string }) {
  const [open, setOpen] = useState(false);
  const name = cityName(city);
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 lg:px-6" aria-labelledby="about-title">
      <Reveal className="rounded-3xl bg-surface p-6 sm:p-10">
        <h2 id="about-title" className="text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
          Rent gaming gadgets in {name} with SharePal
        </h2>
        <div className={`relative mt-3 space-y-3 overflow-hidden text-[14.5px] leading-relaxed text-muted transition-[max-height] duration-500 ${open ? "max-h-[800px]" : "max-h-[120px]"}`}>
          <p>
            Buying a console for a weekend of FIFA with friends or one long story game rarely makes sense. SharePal lets you
            rent a PS5 in {name} for exactly the days you want to play — with 100+ games, extra controllers or the latest FC
            edition bundled in — and takes it back when you&apos;re done.
          </p>
          <p>
            Every rental is zero deposit, delivered to your doorstep and picked up on your return date. Orders above ₹1200
            ship free, and you can pay on delivery. Each console and controller is sanitised and tested before it is packed,
            so it reaches you ready to play.
          </p>
          <p>
            Planning a house party? The 4-controller FC combos cover a full room. Want to try a game before buying it? The
            single-controller digital game combos are the cheapest way in. Not sure which to pick? Sort by “Most booked” to
            see what other gamers in {name} rent the most.
          </p>
          {!open && <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface" aria-hidden />}
        </div>
        <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand">
          {open ? "Read less" : "Read more"}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </Reveal>
    </section>
  );
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className={`rounded-2xl border bg-white transition ${open ? "border-brand/30 shadow-card" : "border-line"}`}>
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold text-navy"
        >
          {q}
          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition ${open ? "rotate-180 bg-brand text-white" : "bg-surface text-navy"}`}>
            <ChevronDown className="h-4 w-4" aria-hidden />
          </span>
        </button>
      </h3>
      {/* grid-rows trick animates height without measuring */}
      <div id={id} role="region" className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-4 pt-16 lg:px-6" aria-labelledby="faq-title">
      <Reveal className="text-center">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand">FAQs</p>
        <h2 id="faq-title" className="mt-1 text-2xl font-extrabold tracking-tight text-navy sm:text-[28px]">
          Frequently asked questions
        </h2>
      </Reveal>
      <div className="mt-8 space-y-3">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={Math.min(i, 4) * 50}>
            <FaqItem q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
