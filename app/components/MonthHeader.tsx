import { MonthData } from "@/app/lib/types";
import { monthStats } from "@/app/lib/stats";

export default function MonthHeader({ month }: { month: MonthData }) {
  const s = monthStats(month);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-sm text-zinc-400">Active month</div>
          <div className="text-xl font-semibold">{month.label}</div>
        </div>

        <div className="flex gap-3 text-sm">
          <div className="rounded-xl bg-zinc-900 px-3 py-2">
            <div className="text-zinc-400 text-xs">Progress</div>
            <div className="font-semibold">{s.progressPct}%</div>
          </div>
          <div className="rounded-xl bg-zinc-900 px-3 py-2">
            <div className="text-zinc-400 text-xs">Done</div>
            <div className="font-semibold">{s.done}</div>
          </div>
          <div className="rounded-xl bg-zinc-900 px-3 py-2">
            <div className="text-zinc-400 text-xs">Distracted</div>
            <div className="font-semibold">{s.distracted}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
