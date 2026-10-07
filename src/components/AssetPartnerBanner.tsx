import { ArrowUpRight } from "lucide-react";
import { ASSET_PARTNER, sharepalUrl } from "@/config/site";

function Benefit({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
      <p className="text-xl font-bold text-lime">{title}</p>
      <p className="mt-1 text-sm text-white/80">{body}</p>
    </div>
  );
}

export default function AssetPartnerBanner() {
  return (
    <section className="rounded-2xl bg-navy-light px-5 py-6 text-white sm:px-8">
      <h2 className="text-2xl font-bold sm:text-4xl">
        Become an <span className="text-lime">Asset Partner.</span> Earn Monthly.
      </h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <div>
          <p className="mb-2 text-xs font-bold tracking-wider">EARNING BENEFITS</p>
          <div className="grid grid-cols-2 gap-3">
            {ASSET_PARTNER.earning.map((b) => <Benefit key={b.title} {...b} />)}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold tracking-wider">RENTAL BENEFITS</p>
          <div className="grid grid-cols-2 gap-3">
            {ASSET_PARTNER.rental.map((b) => <Benefit key={b.title} {...b} />)}
          </div>
        </div>
        <a
          href={sharepalUrl(ASSET_PARTNER.href)}
          className="inline-flex h-12 items-center justify-center gap-1 rounded-full bg-lime px-6 text-lg font-bold text-navy hover:brightness-95"
        >
          Know More <ArrowUpRight className="h-5 w-5" aria-hidden />
        </a>
      </div>
    </section>
  );
}
