import { MonthData } from "@/app/lib/types";
import { weeklySummary } from "@/app/lib/stats";

export default function WeeklySummary({ month }: { month: MonthData }) {
  const weeks = weeklySummary(month);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <h3 className="text-lg font-semibold mb-3">
        📊 Weekly Summary
      </h3>

      <div className="space-y-3">
        {weeks.map((w) => (
          <div
            key={w.week}
            className="rounded-xl bg-zinc-900 p-3 flex justify-between items-center"
          >
            <div>
              <p className="text-sm font-medium">{w.week}</p>
              <p className="text-xs text-zinc-400">
                Done: {w.done} • Distracted: {w.distracted}
              </p>
            </div>

            <div className="text-lg font-semibold text-green-400">
              {w.percent}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
