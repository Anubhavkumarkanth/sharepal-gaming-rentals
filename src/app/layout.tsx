import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Rent Gaming Gadgets in Bangalore | PS5 on Rent — SharePal (recreation)",
  description:
    "Recreation of SharePal's gaming gadgets rental page: rent PS5 combos with zero deposit, free delivery and pay on delivery.",
  // This is a portfolio recreation, not the real storefront — keep it out of search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#030d31",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Scroll-reveal hides content only when JS is running to reveal it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
