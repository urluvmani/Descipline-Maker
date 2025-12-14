import { MonthData } from "./types";
import { getDaysInMonth, parse } from "date-fns";

function monthKeyToDate(key: string) {
  // key: yyyy-MM
  return parse(key + "-01", "yyyy-MM-dd", new Date());
}

export function monthDays(month: MonthData) {
  return getDaysInMonth(monthKeyToDate(month.key));
}
export function weeklySummary(month: MonthData) {
  const weeks = [];
  const daysInWeek = 7;

  for (let w = 0; w < 4; w++) {
    let done = 0;
    let total = 0;

    for (let d = w * daysInWeek + 1; d <= (w + 1) * daysInWeek; d++) {
      for (const task of month.tasks) {
        total++;
        if (month.checks[task.id]?.[d]) done++;
      }
    }

    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    weeks.push({
      week: `Week ${w + 1}`,
      percent,
      done,
      distracted: total - done
    });
  }

  return weeks;
}

export function monthStats(month: MonthData) {
  const days = monthDays(month);
  const tasks = month.tasks.length;

  const totalCells = tasks * days;
  let done = 0;

  for (const t of month.tasks) {
    const row = month.checks[t.id] ?? {};
    for (let d = 1; d <= days; d++) if (row[d]) done++;
  }

  const distracted = totalCells - done; // unticked = distracted
  const progressPct = totalCells === 0 ? 0 : Math.round((done / totalCells) * 100);

  return { days, tasks, totalCells, done, distracted, progressPct };
}

export function dailySeries(month: MonthData) {
  const days = monthDays(month);
  const tasks = month.tasks.length;

  const series = [];
  for (let d = 1; d <= days; d++) {
    let done = 0;
    for (const t of month.tasks) {
      const row = month.checks[t.id] ?? {};
      if (row[d]) done++;
    }
    const pct = tasks === 0 ? 0 : Math.round((done / tasks) * 100);
    series.push({ day: d, progress: pct });
  }
  return series;
}
