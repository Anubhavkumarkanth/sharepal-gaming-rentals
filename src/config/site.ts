import {
  Bike,
  Camera,
  CarFront,
  Disc3,
  Dumbbell,
  Gamepad,
  Gamepad2,
  Glasses,
  Joystick,
  Luggage,
  Mountain,
  Projector,
  ShieldCheck,
  Tent,
  Truck,
  Tv,
  Wallet,
  BadgeCheck,
} from "lucide-react";

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

export const TOP_CATEGORIES = [
  { label: "Gaming", slug: "gaming-gadgets-on-rent", icon: Gamepad2 },
  { label: "Cameras", slug: "photography-on-rent", icon: Camera },
  { label: "Entertainment", slug: "entertainment-on-rent", icon: Tv },
  { label: "Trekking", slug: "trekking-gear-on-rent", icon: Mountain },
  { label: "Travel", slug: "travel-gear-on-rent", icon: Luggage },
  { label: "Riding Gear", slug: "riding-gear-on-rent", icon: Bike },
  { label: "Camping", slug: "camping-gear-on-rent", icon: Tent },
  { label: "Fitness", slug: "fitness-on-rent", icon: Dumbbell },
];

// Only PS5 consoles have data in this project; the other tiles go to SharePal.
export const SUBCATEGORIES = [
  { label: "PS5 Consoles", path: "gaming-gadgets/ps5-console-on-rent", icon: Gamepad2, current: true },
  { label: "PS5 Games", path: "gaming-gadgets-on-rent/ps5-games-on-rent", icon: Disc3 },
  { label: "Xbox", path: "gaming-gadgets/xbox-console-on-rent", icon: Joystick },
  { label: "Controllers", path: "gaming-gadgets/gaming-controllers-on-rent", icon: Gamepad },
  { label: "Big Screen Gaming", path: "gaming-gadgets-on-rent/big-screen-gaming", icon: Projector },
  { label: "Racing Wheels", path: "gaming-gadgets/racing-wheel-on-rent", icon: CarFront },
  { label: "VR Headsets", path: "gaming-gadgets/vr-on-rent", icon: Glasses },
];

export const TRUST_BADGES = [
  { title: "Zero Deposit", body: "No security deposit", icon: ShieldCheck },
  { title: "Free Delivery", body: "On orders above ₹1200", icon: Truck },
  { title: "Excellent Quality", body: "Checked before every rental", icon: BadgeCheck },
  { title: "Pay on Delivery", body: "Pay when it reaches you", icon: Wallet },
];

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
