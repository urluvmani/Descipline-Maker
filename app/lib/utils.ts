import { addMonths, format, startOfMonth } from "date-fns";

export function monthKey(d: Date) {
  return format(d, "yyyy-MM");
}

export function monthLabel(d: Date) {
  return format(d, "MMMM yyyy");
}

export function build3Months(base: Date) {
  const start = startOfMonth(base);
  return [0, 1, 2].map((i) => {
    const m = addMonths(start, i);
    return { key: monthKey(m), label: monthLabel(m), date: m };
  });
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
