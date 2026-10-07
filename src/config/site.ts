// Page copy and link lists live here so components stay focused on layout.

export const SITE_ORIGIN = "https://sharepal.in";
export const CATEGORY_SLUG = "gaming-gadgets-on-rent";
export const FREE_DELIVERY_ABOVE = 1200;

export const CITIES = [
  { slug: "bangalore", name: "Bangalore" },
  { slug: "mumbai", name: "Mumbai" },
  { slug: "delhi", name: "Delhi" },
  { slug: "gurgaon", name: "Gurgaon" },
  { slug: "noida", name: "Noida" },
  { slug: "pune", name: "Pune" },
  { slug: "hyderabad", name: "Hyderabad" },
  { slug: "chennai", name: "Chennai" },
  { slug: "kolkata", name: "Kolkata" },
  { slug: "ahmedabad", name: "Ahmedabad" },
];

export const getCityName = (slug: string) => CITIES.find((c) => c.slug === slug)?.name ?? "Bangalore";

// Links to the rest of SharePal open the real site.
export const sharepalUrl = (path: string) => `${SITE_ORIGIN}${path}`;

// Tabs under the header. Only Gaming is part of this project.
export const CATEGORY_TABS = [
  { label: "Photography", slug: "photography-on-rent" },
  { label: "Gaming", slug: CATEGORY_SLUG },
  { label: "Outdoor", slug: "outdoor-on-rent" },
  { label: "Entertainment", slug: "entertainment-on-rent" },
];

export const ASSET_PARTNER = {
  href: "/earn-with-us",
  earning: [
    { title: "Monthly Earnings", body: "From rental assets" },
    { title: "Upto ₹10,000", body: "Instant Wallet credits" },
  ],
  rental: [
    { title: "10% Off", body: "Exclusive discount when you rent" },
    { title: "Get 10% Cashback", body: "On every order" },
  ],
};

export const HOW_IT_WORKS = [
  { title: "Select dates", body: "Pick your delivery and pickup dates. You pay rent only for those days." },
  { title: "Add to cart", body: "Choose the combo you want — with games, extra controllers or console only." },
  { title: "Get it delivered", body: "We deliver to your doorstep on the delivery date." },
  { title: "We pick it up", body: "On your return date we collect it from you. No trips needed." },
];

export const FAQS = [
  {
    q: "How do I rent a PS5?",
    a: "Select your delivery and pickup dates, add the PS5 combo you want to the cart and place the order. It is delivered on your delivery date and picked up on your return date.",
  },
  {
    q: "How is the rent calculated?",
    a: "Rent is the per-day price multiplied by the number of days between your delivery and pickup dates. Once you select dates, the total is shown on every product.",
  },
  {
    q: "Is there a security deposit?",
    a: "No, rentals are zero deposit.",
  },
  {
    q: "Is delivery free?",
    a: "Delivery and pickup are free on orders above ₹1200. For smaller orders, the delivery charge is shown at checkout.",
  },
  {
    q: "Can I pay on delivery?",
    a: "Yes, pay on delivery is available.",
  },
  {
    q: "Are games included?",
    a: "Combos with “Games (100+)”, “All in one”, EA Play, FC or a game title in the name come with games. Combos marked “No Games Included” are console and controllers only.",
  },
];

export const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Why SharePal", href: "/why-sharepal" },
      { label: "Earn with us", href: "/earn-with-us" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQs", href: "/faq" },
      { label: "Verification", href: "/verification" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];
