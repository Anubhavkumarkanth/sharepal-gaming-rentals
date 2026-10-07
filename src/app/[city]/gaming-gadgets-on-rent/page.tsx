import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CITIES, getCityName } from "@/config/site";

type Props = { params: Promise<{ city: string }> };

// One static page per city. Any other city slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return { title: `Gaming Gadgets on Rent in ${getCityName(city)} | SharePal (recreation)` };
}

export default async function Page({ params }: Props) {
  const { city } = await params;
  return <CategoryPage city={city} />;
}
