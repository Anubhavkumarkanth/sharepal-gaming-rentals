import Link from "next/link";
import { DEFAULT_CITY, SITE } from "@/config/site";
import Redirect from "@/components/Redirect";

// The assignment page lives at /bangalore/gaming-gadgets-on-rent, same as on sharepal.in.
export default function Home() {
  const href = `/${DEFAULT_CITY}/${SITE.categorySlug}/`;
  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <Redirect href={href} />
      <p className="text-muted">
        Taking you to <Link className="font-semibold text-brand underline" href={href}>Gaming Gadgets on Rent</Link>…
      </p>
    </main>
  );
}
