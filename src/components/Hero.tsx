"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, ChevronRight, ShieldCheck, Sparkles, Truck, Wallet } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import Reveal from "@/components/Reveal";
import { useStore } from "@/lib/store";
import { PRODUCTS, isVoteToLaunch } from "@/lib/products";
import { compactCount } from "@/lib/format";
import { SITE, TRUST_BADGES, cityName } from "@/config/site";

const BADGE_ICONS = { shield: ShieldCheck, truck: Truck, sparkles: Sparkles, wallet: Wallet } as const;

const mostBooked = [...PRODUCTS].filter((p) => !p.out_of_stock && !isVoteToLaunch(p)).sort((a, b) => b.booked_count - a.booked_count);

export default function Hero({ city }: { city: string }) {
  const { setDatesOpen, dates } = useStore();
  const name = cityName(city);
  const [first, second, third] = mostBooked;
  const rentable = PRODUCTS.filter((p) => !p.out_of_stock && !isVoteToLaunch(p)).length;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
      <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1 text-[12.5px] text-muted">
        <a href={SITE.origin} className="hover:text-brand">Home</a>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <Link href={`/${city}/${SITE.categorySlug}/`} className="hover:text-brand">{name}</Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        <span className="font-medium text-navy" aria-current="page">{SITE.categoryName}</span>
      </nav>

      <div className="relative overflow-hidden rounded-3xl bg-navy text-white">
        {/* glow + grid backdrop */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand/50 blur-3xl" />
          <div className="absolute -bottom-32 right-10 h-96 w-96 rounded-full bg-[#5b3df5]/35 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:36px_36px]" />
        </div>

        <div className="relative grid items-center gap-8 px-6 py-9 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:py-12">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-white/15">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> 1 Lakh+ orders served
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-4 text-[30px] font-extrabold leading-[1.1] tracking-tight sm:text-[42px]">
                Rent Gaming Gadgets <br className="hidden sm:block" />
                in <span className="text-accent">{name}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75">
                PS5 combos with 100+ games, FC26 bundles and extra controllers — delivered to your door, picked up when
                you&apos;re done. No deposit, no ownership.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-5 text-[15px] font-bold text-navy shadow-[0_8px_24px_rgb(255_201_60/0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
                >
                  Browse PS5 combos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
                <button
                  onClick={() => setDatesOpen(true)}
                  className="inline-flex h-12 items-center gap-2 rounded-xl px-5 text-[15px] font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden /> {dates ? "Change dates" : "Pick rental dates"}
                </button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-8 flex gap-8 text-sm">
                <div>
                  <dt className="text-white/60">Combos available</dt>
                  <dd className="text-2xl font-bold">{rentable}</dd>
                </div>
                <div>
                  <dt className="text-white/60">Starting at</dt>
                  <dd className="text-2xl font-bold">
                    ₹{Math.min(...PRODUCTS.filter((p) => !isVoteToLaunch(p)).map((p) => p.per_day_rent))}
                    <span className="text-sm font-medium text-white/60">/day</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-white/60">Security deposit</dt>
                  <dd className="text-2xl font-bold text-accent">₹0</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* product collage */}
          <div className="relative mx-auto hidden h-[340px] w-full max-w-[460px] sm:block" aria-hidden>
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] ring-1 ring-white/10" />
            <div className="absolute left-[8%] top-[6%] w-[46%] animate-float rounded-2xl bg-white p-3 shadow-lift [animation-delay:-2s]">
              <ProductImage src={second.image} alt="" className="aspect-square" priority />
            </div>
            <div className="absolute right-[6%] top-[22%] w-[50%] animate-float rounded-2xl bg-white p-3 shadow-lift">
              <ProductImage src={first.image} alt="" className="aspect-square" priority />
            </div>
            <div className="absolute bottom-[2%] left-[20%] w-[38%] animate-float rounded-2xl bg-white p-3 shadow-lift [animation-delay:-4s]">
              <ProductImage src={third.image} alt="" className="aspect-square" priority />
            </div>
            <div className="absolute bottom-[8%] right-0 rounded-xl bg-white/95 px-3.5 py-2.5 text-navy shadow-lift backdrop-blur">
              <p className="text-[11px] font-medium text-muted">Most booked combo</p>
              <p className="text-sm font-bold">{first.name}</p>
              <p className="text-xs font-semibold text-success">{compactCount(first.booked_count)} bookings</p>
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
        {TRUST_BADGES.map((b, i) => {
          const Icon = BADGE_ICONS[b.icon];
          return (
            <Reveal as="li" key={b.title} delay={i * 70} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 sm:p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand sm:h-11 sm:w-11">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-[13.5px] font-bold text-navy sm:text-[15px]">{b.title}</span>
                <span className="block text-[11.5px] leading-snug text-muted sm:text-[13px]">{b.body}</span>
              </span>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
