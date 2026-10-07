# SharePal – Gaming Gadgets on Rent

A recreation of SharePal's [Gaming Gadgets on Rent](https://sharepal.in/bangalore/gaming-gadgets-on-rent) page, built
for a frontend assignment. The product listing is driven by the supplied `product-list.json`.

**Live demo:** https://anubhavkumarkanth.github.io/sharepal-gaming-rentals/bangalore/gaming-gadgets-on-rent/

## Tech stack

- Next.js 16 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS v4
- lucide-react for icons
- Inter (text) and Ubuntu Bold (display headings), the same fonts sharepal.in uses

## What's on the page

Layout, colours, spacing and copy were matched against the live page at 1440px and 390px.

- **Header** — SharePal logo tab, city + Delivery Date / Pickup Date / Select bar, search, cart and login.
  On mobile: city pill, a full-width "Select Rental Dates" bar and a bottom navigation bar (Home, Category, Search, Cart).
- **Category tabs** — Photography / Gaming / Outdoor / Entertainment (other tabs link to sharepal.in).
- **Sidebar** of product types that filters the grid (stays as a narrow column on mobile, like the original).
- **"Gaming Consoles" banner** with SharePal's banner artwork and brand logos.
- **Product grid** — 12 products at first, then **Show More**; the "Asset Partner" and "Rent Out Your Gear" promo
  banners after the 4th and 8th products.
- **Date picker** — the original's two-panel design: delivery/pickup fields, rental period and chargeable period,
  and a two-month calendar.
- **FAQ** (SharePal's own questions), breadcrumb, "Served more than 1 Lakh Orders" stats band and the full footer.
- Floating "select rental dates" button and support chat button.

## Features

- Product cards from the JSON data:
  - `tag` → Trending / New / Vote to Launch badge
  - `rating`, `booked_count` → shown under the name (votes for Vote to Launch items)
  - `out_of_stock` → greyed out, with **Notify Me** instead of Add to Cart
  - `per_day_rent` → per-day price, or the total once dates are selected
- Rental dates follow SharePal's rule: delivery and pickup days are free, so delivery on the 10th and pickup on the
  17th is charged for 6 days (11th–16th). Pickup must leave at least one chargeable day.
- Search (header search icon / mobile Search tab), sidebar groups, filters (in stock, 1 / 2 / 4 controllers) and sorting
- Cart drawer with quantity controls, rent breakdown and a free-delivery note (orders above ₹1200)
- City switcher — one page per city, generated at build time
- Cart, dates, votes and notify alerts are saved in `localStorage`

### Changes from the original

- **Prices are visible before dates are picked.** sharepal.in blurs prices until you choose dates; here each card shows
  the per-day price straight away and switches to the total once dates are set, so products can be compared immediately.
- **The date picker doesn't open by itself on page load.** The floating button and the header bar open it instead.
- **Extra filters and sorting** above the grid, and a short rating / bookings line on each card.
- The customer review carousel is left out, as are login and checkout (they show a message).

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
npm run lint
```

## Project structure

```
src/
  app/
    page.tsx                                 redirects to /bangalore/gaming-gadgets-on-rent
    [city]/gaming-gadgets-on-rent/page.tsx   city page, pre-rendered for each city
  components/
    CategoryPage.tsx     puts the page together
    Header.tsx           logo, city + date bar, search, cart, mobile bottom nav
    CategoryNav.tsx      category tabs
    Banner.tsx           "Gaming Consoles" banner (desktop and mobile versions)
    ProductSection.tsx   sidebar, filters, product grid, promos, Show More
    Sidebar.tsx          product-type groups
    ProductCard.tsx      one product and its states
    PromoBanner.tsx      Asset Partner / Rent Your Gear banners
    DatePicker.tsx       delivery / pickup calendar
    CartDrawer.tsx       cart panel
    Faq.tsx, Stats.tsx, Footer.tsx
    FloatingActions.tsx, Toast.tsx, CityPicker.tsx, MobileMenu.tsx, Dialog.tsx, Logo.tsx, ProductImage.tsx
  config/site.ts         cities, tabs, FAQ text, stats and footer links
  data/products.json     supplied product data (unchanged)
  lib/
    products.ts          product type, groups, filters and sorting
    store.tsx            React context for cart, dates and UI state
    format.ts            price and date helpers (including chargeable days)
    asset.ts             URLs for local files and SharePal's image CDN
public/                  SharePal logo and chat icon (SVG)
```

## How the data is used

`products.json` is imported in `lib/products.ts` and used as-is. The data has no separate fields for controllers or
included games, so the sidebar groups and filters read them from the product name (for example "2 Controllers" or
"No Games Included").

The pages are pre-rendered at build time, so the product grid is already in the HTML when the page loads.

Shared state (cart, dates, search) lives in a React context in `lib/store.tsx`. The selected group, filters, sorting
and the Show More count are local state in `ProductSection`, because nothing else needs them.

Modals and drawers use the native `<dialog>` element, which handles focus trapping and closing with Escape. The FAQ uses
`<details>`/`<summary>`.

## Images

Product photos, banner artwork, category icons and promo banners load from SharePal's image CDN. The large promo and
banner images go through sharepal.in's image optimiser (as the original page does), which serves ~50 KB WebP files
instead of the 2–4 MB source PNGs. If a product image fails to load, the card shows a placeholder.

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`).

- **GitHub Pages:** `.github/workflows/deploy.yml` lints and builds the site on every push to `main` and publishes `out/`
  to the `gh-pages` branch. `NEXT_PUBLIC_BASE_PATH` is set to the repository name so links work under `/<repo>/`.
- **Vercel:** import the repository with the default settings. No base path is needed.

## Limitations

- Only the supplied PS5 products are listed (the live page also has Xbox, VR and racing wheels).
- Totals are `per_day_rent × chargeable days`. SharePal's live prices for a date range can differ (they include GST and
  long-rental discounts that aren't in the supplied data).
- Login and checkout are not implemented.
