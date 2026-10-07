// Every piece of copy, link and list the page renders lives here, so content
// changes never touch component code.

export const SITE = {
  name: "SharePal",
  origin: "https://sharepal.in",
  freeDeliveryThreshold: 1200,
  contactPath: "/contact-us",
  categorySlug: "gaming-gadgets-on-rent",
  categoryName: "Gaming Gadgets",
} as const;

export type City = { slug: string; name: string };

export const CITIES: City[] = [
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

export const DEFAULT_CITY = "bangalore";

export const ANNOUNCEMENTS = [
  "Zero delivery charges on orders above ₹1200",
  "Zero security deposit on every rental",
  "Pay on delivery available",
  "Free doorstep delivery & pickup",
];

export const SEARCH_HINTS = ["PS5", "FC26", "Xbox Series S", "Racing Wheel", "Meta Quest 3", "God of War"];

// Top-level categories shown under the header. `icon` maps to a lucide icon in CategoryNav.
export const TOP_CATEGORIES = [
  { label: "Gaming", slug: "gaming-gadgets-on-rent", icon: "gamepad" },
  { label: "Cameras", slug: "photography-on-rent", icon: "camera" },
  { label: "Entertainment", slug: "entertainment-on-rent", icon: "tv" },
  { label: "Trekking", slug: "trekking-gear-on-rent", icon: "mountain" },
  { label: "Travel", slug: "travel-gear-on-rent", icon: "luggage" },
  { label: "Riding Gear", slug: "riding-gear-on-rent", icon: "bike" },
  { label: "Camping", slug: "camping-gear-on-rent", icon: "tent" },
  { label: "Fitness", slug: "fitness-on-rent", icon: "dumbbell" },
] as const;

// Gaming subcategories. Only "PS5 Consoles" has data in this build; the rest link
// to the live SharePal listing for the selected city.
export const SUBCATEGORIES = [
  { label: "PS5 Consoles", path: "gaming-gadgets/ps5-console-on-rent", icon: "ps5", active: true },
  { label: "PS5 Games", path: "gaming-gadgets-on-rent/ps5-games-on-rent", icon: "disc" },
  { label: "Xbox", path: "gaming-gadgets/xbox-console-on-rent", icon: "xbox" },
  { label: "Controllers", path: "gaming-gadgets/gaming-controllers-on-rent", icon: "gamepad" },
  { label: "Big Screen Gaming", path: "gaming-gadgets-on-rent/big-screen-gaming", icon: "projector" },
  { label: "Racing Wheels", path: "gaming-gadgets/racing-wheel-on-rent", icon: "wheel" },
  { label: "VR Headsets", path: "gaming-gadgets/vr-on-rent", icon: "vr" },
] as const;

export const TRUST_BADGES = [
  { title: "Zero Deposit", body: "No security deposit, ever", icon: "shield" },
  { title: "Free Delivery", body: "On orders above ₹1200", icon: "truck" },
  { title: "Excellent Quality", body: "Sanitised & tested before every rental", icon: "sparkles" },
  { title: "Pay on Delivery", body: "Pay when the gear reaches you", icon: "wallet" },
] as const;

export const HOW_IT_WORKS = [
  { title: "Pick your dates", body: "Choose delivery and pickup dates. Rent is calculated for exactly those days." },
  { title: "Add to cart", body: "Pick the console combo that suits your plan — solo nights or a 4-player FIFA weekend." },
  { title: "Quick verification", body: "A one-time KYC keeps rentals deposit-free for everyone." },
  { title: "Play, we pick up", body: "We deliver to your doorstep and collect it on your return date. No trips, no hassle." },
] as const;

export const FAQS = [
  {
    q: "How do I rent a PS5 from SharePal?",
    a: "Select your delivery and pickup dates, add the PS5 combo you want to the cart and place the order. We deliver it to your doorstep on the delivery date and pick it up on the return date.",
  },
  {
    q: "When does my rental start and how is the rent calculated?",
    a: "Rental starts on your delivery date and ends on your pickup date. The rent is the per-day price multiplied by the number of rental days you selected — the total is shown on every product card once you pick dates.",
  },
  {
    q: "Is there a security deposit?",
    a: "No. SharePal rentals are zero deposit. A one-time verification is done instead so that everyone can rent without blocking money.",
  },
  {
    q: "Do you charge for delivery and pickup?",
    a: "Delivery and pickup are free on orders above ₹1200. For smaller orders, the delivery charge is shown in the cart before you pay.",
  },
  {
    q: "Can I pay on delivery?",
    a: "Yes. Pay on delivery is available, along with online payment options at checkout.",
  },
  {
    q: "What documents do I need for verification?",
    a: "A government-issued photo ID is needed for a one-time KYC. Once verified, your future rentals go through without repeating it.",
  },
  {
    q: "What condition will the console be in?",
    a: "Every console, controller and accessory is cleaned, sanitised and tested before it is packed, so it reaches you in ready-to-play condition.",
  },
  {
    q: "Are games included with the PS5?",
    a: "Combos marked “Games (100+)”, “All in one”, FC or a game title come with games ready to play. Combos marked “No Games Included” are console and controllers only.",
  },
] as const;

export const FOOTER_LINKS = {
  Company: [
    { label: "About Us", href: "/about-us" },
    { label: "Why SharePal", href: "/why-sharepal" },
    { label: "Earn with us", href: "/earn-with-us" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  Help: [
    { label: "FAQs", href: "/faq" },
    { label: "Verification", href: "/verification" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
} as const;

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "popular", label: "Most booked" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const QUICK_FILTERS = [
  { id: "in-stock", label: "In stock" },
  { id: "games", label: "Games included" },
  { id: "c1", label: "1 Controller" },
  { id: "c2", label: "2 Controllers" },
  { id: "c4", label: "4 Controllers" },
  { id: "fc", label: "FC / FIFA" },
] as const;

export type QuickFilterId = (typeof QUICK_FILTERS)[number]["id"];

export const cityName = (slug: string) => CITIES.find((c) => c.slug === slug)?.name ?? "Bangalore";
export const sharepalUrl = (path: string) => `${SITE.origin}${path}`;
