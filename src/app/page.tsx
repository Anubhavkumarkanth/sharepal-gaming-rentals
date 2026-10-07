import Link from "next/link";
import Redirect from "@/components/Redirect";
import { CATEGORY_SLUG } from "@/config/site";

// The assignment page is /bangalore/gaming-gadgets-on-rent, same URL as on sharepal.in.
// Static exports can't send a server redirect, so the redirect happens on the client.
const HOME = `/bangalore/${CATEGORY_SLUG}/`;

export default function Home() {
  return (
    <main className="p-6 text-center">
      <Redirect href={HOME} />
      <Link href={HOME} className="text-brand underline">
        Go to Gaming Gadgets on Rent
      </Link>
    </main>
  );
}
