export type Task = {
  id: string;
  title: string;
};

export type MonthData = {
  key: string;          // e.g. "2025-11"
  label: string;        // e.g. "November 2025"
  tasks: Task[];        // max 8
  // checks[taskId][day] = true/false (day = 1..daysInMonth)
  checks: Record<string, Record<number, boolean>>;
};

export type AppState = {
  months: MonthData[];  // exactly 3 months (rolling window)
  activeMonthKey: string;
};
