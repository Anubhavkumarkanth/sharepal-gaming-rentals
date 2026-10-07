# SharePal — Gaming Gadgets on Rent (recreation)

A front-end recreation of SharePal's city category page,
[`/bangalore/gaming-gadgets-on-rent`](https://sharepal.in/bangalore/gaming-gadgets-on-rent),
built as a hiring assignment. The provided `product-list.json` drives the whole product listing, and
every interaction on the page works without a backend.

**Live:** https://sudhanshu49880.github.io/sharepal-gaming-rentals/bangalore/gaming-gadgets-on-rent/

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Icons | lucide-react |
| Font | Inter via `next/font` (self-hosted at build time) |
| Hosting | GitHub Pages via GitHub Actions (Vercel works with zero config too) |

There are no other runtime dependencies. State, the calendar, the drawer and the animations are written by hand.

## Features

**Layout (SharePal visual language)**
- Scrolling offer strip, sticky header that gains a shadow on scroll, category rail with an active underline
- Breadcrumbs, navy hero with the city name, live stats derived from the data, and a floating product collage
- Trust badges (Zero Deposit · Free Delivery · Excellent Quality · Pay on Delivery)
- "Shop by category" tiles, product grid, "How it works", expandable SEO copy, FAQ accordion, footer

**Working interactions**
- **City selector**: 10 cities, each pre-rendered at `/<city>/gaming-gadgets-on-rent`, so the page copy follows the city
- **Search**: live filtering with matched terms highlighted and rotating placeholder hints; Enter scrolls to results
- **Filters**: In stock, Games included, 1/2/4 controllers (OR'd together), FC/FIFA, with a live result count and an empty state
- **Sort**: Recommended, Most booked, Price ↑/↓, Top rated. Out-of-stock items always sink to the bottom
- **Rental dates**: a custom range calendar (two months on desktop, a bottom sheet on mobile) with 1 day/3 days/1 week/1 month presets. Once dates are set, every card shows the total rent for the stay
- **Cart**: add → quantity stepper on the card, slide-in cart drawer, free-delivery progress toward ₹1200, rent × days breakdown, ₹0 deposit
- **Card states** driven by the data: `Trending` / `New` / `Vote to Launch` badges, `rating: 0` → "New launch", `out_of_stock` → greyed out with **Notify me**, `Vote to Launch` → **Vote** button with a live count
- Wishlist hearts, toasts, a sticky cart bar on mobile, a mobile menu drawer and a back-to-top button
- Cart, dates, wishlist, votes and alerts persist in `localStorage`

**Quality**
- Semantic landmarks, labelled controls, `aria-pressed`/`aria-expanded`, Escape closes every overlay, visible focus styles
- Scroll-reveal animations hide content only when JavaScript is running, so content is never hidden without JS
- `prefers-reduced-motion` turns animation off
- Images lazy-load behind a shimmer skeleton and fall back to a branded placeholder if the CDN fails
- No horizontal overflow from 360px to 1440px, and the build passes with no lint or type errors

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /bangalore/gaming-gadgets-on-rent
npm run build      # static export into ./out
npm run lint
```

To preview the production build: `npx serve out`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx                              # font, metadata, html shell
│   ├── page.tsx                                # redirects / → /bangalore/gaming-gadgets-on-rent
│   └── [city]/gaming-gadgets-on-rent/page.tsx  # one static page per city (generateStaticParams)
├── components/
│   ├── CategoryPage.tsx     # composes the page inside the store provider
│   ├── Header.tsx           # offer strip, search, city picker, dates, cart, category rail, mobile menu
│   ├── Hero.tsx             # breadcrumbs, hero banner, trust badges
│   ├── ProductSection.tsx   # subcategory tiles, sort, filters, date nudge, grid, empty state
│   ├── ProductCard.tsx      # every card state (in stock, in cart, out of stock, vote to launch)
│   ├── ProductImage.tsx     # lazy image + skeleton + error fallback
│   ├── DatePicker.tsx       # range calendar modal / bottom sheet
│   ├── CartDrawer.tsx       # cart drawer and price breakdown
│   ├── InfoSections.tsx     # How it works, SEO copy, FAQ
│   ├── Footer.tsx
│   ├── Floating.tsx         # toast, mobile cart bar, back-to-top
│   ├── Reveal.tsx           # IntersectionObserver scroll reveal
│   └── Logo.tsx
├── config/site.ts           # all copy, cities, categories, FAQs, filters and sort options
├── data/products.json       # the supplied product list, unmodified
└── lib/
    ├── products.ts          # typed data layer: derived attributes, filtering, sorting
    ├── store.tsx            # React context: cart, dates, wishlist, votes, UI state, persistence
    └── format.ts            # ₹ formatting, compact counts, date maths
```

## How product data is loaded

`src/data/products.json` is the supplied file, unchanged. `lib/products.ts` imports it at build time and types it as
`Product`. It derives the extra attributes the UI needs from the product name instead of editing the data:

- `controllerCount()`: parses "1/2/4 Controller(s)"
- `includesGames()`: true for "Games (100+)", "All in one", EA Play, FC and titled game combos, and false for "No Games Included"
- `isVoteToLaunch()`: reads the `tag`

Because the page is statically exported, the products are in the initial HTML: there is no client fetch and no loading flash.
Prices, ratings, booked counts, tags and stock status are always shown exactly as supplied.

## Deployment

**GitHub Pages (current).** `.github/workflows/deploy.yml` runs on every push to `main`. It installs, lints, builds with
`NEXT_PUBLIC_BASE_PATH=/<repo-name>` and publishes `out/` to the `gh-pages` branch. In the repo's
Settings → Pages, set the source to *Deploy from a branch → `gh-pages` / root*.

**Vercel.** Import the repository at vercel.com/new with the default settings. Vercel detects Next.js, and since
`NEXT_PUBLIC_BASE_PATH` is unset there, the site is served from the domain root.

## Known limitations

- Login and checkout are out of scope; those buttons show a notice instead.
- Only the PS5 console subcategory has data. The other category and subcategory tiles link to the matching live SharePal pages.
- Product images are loaded from SharePal's image CDN (`images.sharepal.in`). If it is unreachable, the cards show a branded
  placeholder instead of a broken image.
- The SharePal logo is redrawn as an SVG wordmark rather than copied from their assets.

---

Built as a hiring assignment. This is not the official SharePal website, and it is excluded from search indexing.
