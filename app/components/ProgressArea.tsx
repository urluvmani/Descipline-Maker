"use client";

import { MonthData } from "@/app/lib/types";
import { dailySeries, monthStats } from "@/app/lib/stats";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ProgressArea({ month }: { month: MonthData }) {
  const data = dailySeries(month);
  const s = monthStats(month);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="text-sm text-zinc-400">Progress graph</div>
          <div className="text-lg font-semibold">Daily completion</div>
          <div className="text-xs text-zinc-500 mt-1">
            Tasks: {s.tasks} • Days: {s.days}
          </div>
        </div>
      </div>

      <div className="mt-4 h-56">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="day" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12 }}
              labelStyle={{ color: "#e4e4e7" }}
            />
            <Area type="monotone" dataKey="progress" stroke="#22c55e" fill="#22c55e" fillOpacity={0.18} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
