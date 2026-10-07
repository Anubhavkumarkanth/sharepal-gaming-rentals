import type { Metadata } from "next";
import { CITIES, cityName } from "@/config/site";
import CategoryPage from "@/components/CategoryPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const name = cityName(city);
  return {
    title: `Rent Gaming Gadgets in ${name} | PS5 on Rent — SharePal (recreation)`,
    description: `Rent PS5 combos in ${name} with zero deposit, free delivery above ₹1200 and pay on delivery.`,
  };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return <CategoryPage city={city} />;
}
