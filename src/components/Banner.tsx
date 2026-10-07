import ProductImage from "@/components/ProductImage";
import { products } from "@/lib/products";

// Purple category banner. The side images reuse product shots from the data
// instead of SharePal's banner artwork.
const leftImage = products[1];
const rightImage = products[12];

export default function Banner() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#531b87] via-[#7821c7] to-[#8229d6] px-6 py-8 text-center text-white sm:py-10">
      <ProductImage src={leftImage.image} alt="" className="absolute left-8 top-1/2 hidden h-[75%] w-auto -translate-y-1/2 -rotate-3 rounded-2xl bg-white p-3 shadow-card xl:block" />
      <ProductImage src={rightImage.image} alt="" className="absolute right-8 top-1/2 hidden h-[75%] w-auto -translate-y-1/2 rotate-3 rounded-2xl bg-white p-3 shadow-card xl:block" />

      <div className="relative mx-auto max-w-xl">
        <h1 className="text-3xl font-bold sm:text-5xl">Gaming Consoles</h1>
        <p className="mt-3 text-base font-medium sm:text-xl">
          Rent the latest gaming gadgets from SharePal. PS5, Xbox, Oculus VR, Racing Wheel on rent.
        </p>
        <p className="mt-5 flex items-center justify-center gap-4 text-lg font-bold tracking-wide sm:text-2xl" aria-label="Xbox, PS5 and Meta">
          <span>XBOX</span>
          <span className="h-6 w-px bg-white/40" aria-hidden />
          <span>PS5</span>
          <span className="h-6 w-px bg-white/40" aria-hidden />
          <span>Meta</span>
        </p>
      </div>
    </section>
  );
}
