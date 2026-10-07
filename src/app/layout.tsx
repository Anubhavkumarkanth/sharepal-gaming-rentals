import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({ variable: "--font-ubuntu", subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Gaming Gadgets on Rent | SharePal (recreation)",
  description: "Rent PS5 combos with zero deposit, free delivery above ₹1200 and pay on delivery.",
  // A recreation for an assignment shouldn't compete with the real site in search.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ubuntu.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
