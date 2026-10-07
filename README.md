# SharePal – Gaming Gadgets on Rent

A recreation of SharePal's [Gaming Gadgets on Rent](https://sharepal.in/bangalore/gaming-gadgets-on-rent) page, built
for a frontend assignment. The product listing is driven by the supplied `product-list.json`.

**Live demo:** https://anubhavkumarkanth.github.io/sharepal-gaming-rentals/bangalore/gaming-gadgets-on-rent/

## Tech stack

- Next.js 16 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS v4
- lucide-react for icons
- Ubuntu font (via `next/font`)

## Features

Layout follows the live SharePal page: purple header with the city and delivery/pickup date bar, category tabs,
a sidebar of product types, the "Gaming Consoles" banner, the product grid with the "Asset Partner" promo after
the first row, and the floating "select dates" button.

- Product grid built from the JSON data:
  - `tag` → Trending / New / Vote to Launch badge
  - `rating` and `booked_count` → shown under the name (votes for Vote to Launch items)
  - `out_of_stock` → greyed out, with a "notify me" button instead of "+"
  - `per_day_rent` → per-day price, or the total once dates are selected
- Sidebar groups (All, PS5 + 100 Games, FC Combos, Game Titles, Console Only, PS Portal)
- Search from the header search icon
- Filters: in stock, 1 / 2 / 4 controllers
- Sorting: relevance, most booked, price, rating
- Rental dates: pick delivery and pickup dates; every card then shows the total rent for that period
- Cart drawer with quantity controls, a rent breakdown and a free-delivery note (orders above ₹1200)
- One page per city (`/bangalore/...`, `/mumbai/...`, …) generated at build time
- Cart, dates, votes and notify alerts are saved in `localStorage`
- Mobile: menu drawer, the date bar on its own row, product types as a scrolling row, date picker as a bottom sheet

**Changed from the original on purpose:** sharepal.in blurs prices until dates are picked. Here the per-day price is
always visible and turns into the total once dates are chosen, so visitors can compare products straight away.

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
    CategoryPage.tsx        puts the page together
    Header.tsx              logo, city + date bar, search, cart
    CategoryNav.tsx         Photography / Gaming / Outdoor / Entertainment tabs
    ProductSection.tsx      sidebar + banner + filters + product grid
    Sidebar.tsx             product type groups
    Banner.tsx              "Gaming Consoles" banner
    ProductCard.tsx         one product and its states
    AssetPartnerBanner.tsx  promo shown after the first row
    ProductImage.tsx        image with a fallback when it fails to load
    DatePicker.tsx          delivery / pickup calendar
    CartDrawer.tsx          cart panel
    FloatingActions.tsx     "select dates" button and support chat link
    CityPicker.tsx, MobileMenu.tsx, Dialog.tsx, Logo.tsx
    HowItWorks.tsx, Faq.tsx, Footer.tsx, Toast.tsx
  config/site.ts            cities, tabs, promo text, FAQ text and footer links
  data/products.json        supplied product data (unchanged)
  lib/
    products.ts             product type, groups, filters and sorting
    store.tsx               React context for cart, dates and UI state
    format.ts               price and date helpers
```

## How the data is used

`products.json` is imported in `lib/products.ts` and used as-is. The data has no separate fields for controllers or
included games, so the sidebar groups and filters read them from the product name (for example "2 Controllers" or
"No Games Included").

The pages are pre-rendered at build time, so the product grid is already in the HTML when the page loads.

Shared state (cart, dates, search) lives in a React context in `lib/store.tsx`. The selected group, filters and sorting are local
state in `ProductSection`, because nothing else needs them.

Modals and drawers use the native `<dialog>` element, which handles focus trapping and closing with Escape. The FAQ uses
`<details>`/`<summary>`.

## Deployment

The site is a static export (`output: "export"` in `next.config.ts`).

- **GitHub Pages:** `.github/workflows/deploy.yml` builds the site on every push to `main` and publishes `out/` to the
  `gh-pages` branch. `NEXT_PUBLIC_BASE_PATH` is set to the repository name so links work under `/<repo>/`.
- **Vercel:** import the repository with the default settings. No base path is needed.

## Limitations

- Login and checkout are not implemented. The checkout button shows a message.
- Only PS5 consoles have product data. The other category links go to the live SharePal site.
- Product images load from SharePal's image server. If an image can't be loaded, a placeholder is shown.
- The earliest selectable delivery date is tomorrow. That is my assumption, not a SharePal rule.
- The logo is a text recreation, not SharePal's actual logo file, and the banner uses product photos instead of
  SharePal's banner artwork.
