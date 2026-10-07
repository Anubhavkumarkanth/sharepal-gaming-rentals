export const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export const formatDate = (date: Date) => date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

const DAY_MS = 24 * 60 * 60 * 1000;

// Number of rental days between delivery and pickup (pickup the next day = 1 day).
export function daysBetween(from: Date, to: Date) {
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}
