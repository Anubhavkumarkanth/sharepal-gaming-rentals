// Page copy and link lists live here so components stay focused on layout.
// Text and link targets mirror sharepal.in/bangalore/gaming-gadgets-on-rent.

export const SITE_ORIGIN = "https://sharepal.in";
export const CATEGORY_SLUG = "gaming-gadgets-on-rent";
export const FREE_DELIVERY_ABOVE = 1200;
export const PAGE_SIZE = 12;

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
export const sharepalUrl = (path: string) => (path.startsWith("http") ? path : `${SITE_ORIGIN}${path}`);

// Tabs under the header. Only Gaming is part of this project.
export const CATEGORY_TABS = [
  { label: "Photography", slug: "photography-on-rent" },
  { label: "Gaming", slug: CATEGORY_SLUG },
  { label: "Outdoor", slug: "outdoor-gears-on-rent" },
  { label: "Entertainment", slug: "entertainment-on-rent" },
];

export const ASSET_PARTNER = {
  href: "https://assets.sharepal.in",
  earning: [
    { title: "Monthly Earnings", body: "From rental assets" },
    { title: "Upto ₹10,000", body: "Instant Wallet credits" },
  ],
  rental: [
    { title: "10% Off", body: "Exclusive discount when you rent" },
    { title: "Get 10% Cashback", body: "On every order" },
  ],
};

export const RENT_YOUR_GEAR_URL = "https://earnwithus.sharepal.in/";

export const FAQS = [
  {
    q: "How can I rent from SharePal?",
    a: "Renting from SharePal is quick and easy. You can browse the products, select your dates and add them to cart and checkout. You can choose to pay online or upon delivery.",
  },
  {
    q: "If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?",
    a: "No, partial extension is not possible, all the products that are rented in that particular order have to be extended.",
  },
  {
    q: "When does the rental start?",
    a: "The rental starts from the following day of the delivery day and ends a day prior to the return date. So for example, if you select the delivery date as 5th June and return date as 8th June. The rental is charged for 2 days.",
  },
  {
    q: "What will be the condition of the products at the time of delivery?",
    a: "We thoroughly inspect and clean each item before sending it your way, so the products you receive are in great condition upon delivery. If you ever face any issues, customer support is there to help.",
  },
  {
    q: "Why is verification required?",
    a: "Profile verification helps confirm the identity of users, prevent fraud and keep the platform safe and secure for everyone.",
  },
];

// Figures shown on sharepal.in under "Served more than 1 Lakh Orders".
export const STATS = [
  { value: "250Cr+", label: "Saved Together" },
  { value: "4.5M Kg", label: "CO₂E Emissions Saved" },
  { value: "100K+", label: "Products In Circulation" },
];

// Footer category columns. `path` is relative to the city.
export const FOOTER_CATEGORIES = [
  {
    title: "Action Cameras",
    links: [
      ["Action Cameras", "photography-on-rent/action-cameras-on-rent"],
      ["Pocket Cameras", "photography-on-rent/pocket-cameras-on-rent"],
      ["GoPro Cameras", "photography-on-rent/gopro-cameras-on-rent"],
      ["DJI Cameras", "photography-on-rent/dji-cameras-on-rent"],
      ["DJI Drones", "photography-on-rent/dji-drones-on-rent"],
      ["360 Cameras", "photography-on-rent/360-cameras-on-rent"],
    ],
  },
  {
    title: "Cameras",
    links: [
      ["DSLR Cameras", "photography-on-rent/dslr-cameras-on-rent"],
      ["Cameras", "photography-on-rent/all-cameras-on-rent"],
      ["iPhones", "photography-on-rent/iphones-on-rent"],
      ["DSLR Gimbal Combos", "photography-on-rent/dslr-gimbal-on-rent"],
      ["Wildlife Photography", "photography-on-rent/wildlife-photography-cameras-on-rent"],
      ["Tripod and camera accessories", "photography-on-rent/tripod-and-camera-accessories-on-rent"],
    ],
  },
  {
    title: "Trekking Gear",
    links: [
      ["Trekking Gear", "outdoor-gears-on-rent/trekking-gear-on-rent"],
      ["Trekking Jackets", "outdoor-gears-on-rent/trekking-jackets-on-rent"],
      ["Trek/Snow Pants", "outdoor-gears-on-rent/trek-snow-pants-on-rent"],
      ["Trekking Shoes", "outdoor-gears-on-rent/trekking-shoes-on-rent"],
      ["Trek Accessories", "outdoor-gears-on-rent/trek-accessories-on-rent"],
    ],
  },
  {
    title: "Riding Gear",
    links: [
      ["Riding Gear", "outdoor-gears-on-rent/riding-gear-on-rent"],
      ["Riding Luggage", "outdoor-gears-on-rent/riding-luggage-on-rent"],
      ["Riding Jackets", "outdoor-gears-on-rent/riding-jackets-on-rent"],
      ["Riding Essentials", "outdoor-gears-on-rent/riding-essentials-on-rent"],
      ["Riding Boots", "outdoor-gears-on-rent/riding-boots-on-rent"],
      ["Binoculars", "outdoor-gears-on-rent/binoculars-on-rent"],
    ],
  },
  {
    title: "Creator Gear",
    links: [
      ["Wireless & Collar Mics", "photography-on-rent/wireless-and-collar-mics-on-rent"],
      ["Professional Cameras", "photography-on-rent/professional-cameras-on-rent"],
      ["Mirrorless Cameras", "photography-on-rent/mirrorless-cameras-on-rent"],
      ["Mobile Gimbals", "photography-on-rent/mobile-gimbals-on-rent"],
      ["Vlogging", "photography-on-rent/vlogging-cameras-on-rent"],
    ],
  },
  {
    title: "Gaming Console",
    links: [
      ["PS5 Console", "gaming-gadgets-on-rent/ps5-console-on-rent"],
      ["VR", "gaming-gadgets-on-rent/vr-on-rent"],
      ["Racing Wheel", "gaming-gadgets-on-rent/gaming-controllers-on-rent"],
      ["Big Screen Gaming", "gaming-gadgets-on-rent/big-screen-gaming"],
      ["Xbox Console", "gaming-gadgets-on-rent/xbox-console-on-rent"],
    ],
  },
  {
    title: "Winter Wear",
    links: [
      ["Snow Boots", "outdoor-gears-on-rent/snow-boots-on-rent"],
      ["Winter Jackets", "outdoor-gears-on-rent/winter-jackets-on-rent"],
      ["Backpacks", "outdoor-gears-on-rent/backpacks-on-rent"],
    ],
  },
  {
    title: "Camping Gear",
    links: [
      ["Camping Gear", "outdoor-gears-on-rent/camping-gear-on-rent"],
      ["Camping Stools & Tables", "outdoor-gears-on-rent/camping-stools-and-tables-on-rent"],
      ["Camping Tents", "outdoor-gears-on-rent/camping-tents-on-rent"],
      ["Sleeping Bags & Mats", "outdoor-gears-on-rent/sleeping-bags-and-mats-on-rent"],
    ],
  },
  {
    title: "Audio Visual Equipment",
    links: [
      ["Projectors", "entertainment-on-rent/projectors-on-rent"],
      ["VR", "entertainment-on-rent/vr-on-rent"],
      ["Mics", "entertainment-on-rent/mics-on-rent"],
      ["Speakers", "entertainment-on-rent/speakers-on-rent"],
    ],
  },
];

export const FOOTER_LINKS = [
  {
    title: "Sharepal",
    links: [
      { label: "About", href: "/about-us" },
      { label: "Why SharePal", href: "/why-sharepal" },
      { label: "Sitemap", href: "/sitemap" },
      { label: "CarePal", href: "/carepal" },
    ],
  },
  {
    title: "Become a Pal",
    links: [
      { label: "Sharepal for Creators", href: "/sharepal-for-creators" },
      { label: "Careers", href: "/life-at-sharepal?active=careers" },
      { label: "Sharepal for Brands", href: "/sharepal-for-brands" },
      { label: "Asset Funding Program", href: "https://assets.sharepal.in", isNew: true },
      { label: "Rent Your Gear", href: RENT_YOUR_GEAR_URL, isNew: true },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "How it works?", href: "/how-sharepal-works" },
      { label: "FAQs", href: "/faq" },
      { label: "Verification", href: "/complete-verification" },
      { label: "Cancellation Policy", href: "/cancellation-policy" },
      { label: "Life at Sharepal", href: "/life-at-sharepal" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Terms & Condition", href: "/terms-and-conditions" },
      { label: "Shipping policy", href: "/shipping-policy" },
      { label: "Damage Policy", href: "/damage-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Need Help",
    links: [
      { label: "Contact Support", href: "/support" },
      { label: "Contact Us", href: "/support" },
    ],
  },
];
