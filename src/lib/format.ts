const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export const rupees = (n: number) => `₹${inr.format(n)}`;

export function compactCount(n: number): string {
  if (n >= 100000) return `${Math.floor(n / 100000)}L+`;
  if (n >= 1000) return `${Math.floor(n / 1000)}K+`;
  return String(n);
}

const MS_PER_DAY = 86_400_000;

export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
export const sameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime();

// Rental days between delivery and pickup; delivering and collecting on the same day is one day.
export const rentalDays = (from: Date, to: Date) =>
  Math.max(1, Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / MS_PER_DAY));

export const shortDate = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
export const longDate = (d: Date) =>
  d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
