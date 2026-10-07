export const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

// "Oct 15, 2026" — used in the date inputs
export const formatFullDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// "15th Oct" — used in the header and rental summary
export function formatShortDate(date: Date) {
  const day = date.getDate();
  const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
  return `${day}${suffix} ${date.toLocaleDateString("en-US", { month: "short" })}`;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

// Like sharepal.in, delivery and pickup days are free: delivery on the 15th and
// pickup on the 19th is charged for the 16th–18th, i.e. 3 days.
export function chargeableDays(delivery: Date, pickup: Date) {
  return Math.round((pickup.getTime() - delivery.getTime()) / DAY_MS) - 1;
}
