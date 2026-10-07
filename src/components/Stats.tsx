import { STATS } from "@/config/site";

// "Served more than 1 Lakh Orders" band. The original also has a carousel of
// customer reviews here; this recreation leaves real customers' reviews out.
export default function Stats() {
  return (
    <section className="mt-4 bg-white py-12 lg:py-16" aria-labelledby="stats">
      <h2 id="stats" className="px-4 text-center font-display text-3xl font-bold text-ink lg:text-5xl">
        Served more than <span className="text-orange">1 Lakh Orders</span>
      </h2>
      <dl className="mx-auto mt-10 grid w-full max-w-[1520px] grid-cols-1 gap-8 border-y border-line px-4 py-10 sm:grid-cols-3 lg:w-[84.5%] lg:px-0">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse items-center gap-2 text-center">
            <dt className="text-base text-[#595959] lg:text-xl">{stat.label}</dt>
            <dd className="bg-gradient-to-r from-brand via-brand to-[#7cc800] bg-clip-text font-display text-5xl font-bold text-transparent lg:text-6xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
