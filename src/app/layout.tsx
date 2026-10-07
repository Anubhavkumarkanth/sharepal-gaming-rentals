import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";

// sharepal.in uses Inter for text and Ubuntu Bold for display headings.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const ubuntu = Ubuntu({ variable: "--font-ubuntu", subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Gaming Gadgets on Rent | SharePal (recreation)",
  description: "Rent PS5 combos with zero deposit, free delivery above ₹1200 and pay on delivery.",
  // A recreation for an assignment shouldn't compete with the real site in search.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ubuntu.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
