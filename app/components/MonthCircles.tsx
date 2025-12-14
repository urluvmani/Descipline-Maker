"use client";

import { MonthData } from "@/app/lib/types";
import { monthStats } from "@/app/lib/stats";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import clsx from "clsx";

function Donut({ value }: { value: number }) {
  const data = [
    { name: "done", v: value },
    { name: "rest", v: Math.max(0, 100 - value) }
  ];

  return (
    <div className="h-20 w-20">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="v" innerRadius={26} outerRadius={38} startAngle={90} endAngle={-270}>
            <Cell fill="#22c55e" />
            <Cell fill="#27272a" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="-mt-16 text-center text-sm font-semibold">{value}%</div>
    </div>
  );
}

export default function MonthCircles({
  months,
  activeKey,
  onSelect
}: {
  months: MonthData[];
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {months.map((m) => {
        const s = monthStats(m);
        const active = m.key === activeKey;

        return (
          <button
            key={m.key}
            onClick={() => onSelect(m.key)}
            className={clsx(
              "rounded-2xl border p-4 text-left transition",
              active ? "border-zinc-700 bg-zinc-900" : "border-zinc-800 bg-zinc-950 hover:bg-zinc-900/50"
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-zinc-400">Month</div>
                <div className="font-semibold">{m.label}</div>
                <div className="mt-2 text-xs text-zinc-500">
                  Tasks: {s.tasks} • Done: {s.done} • Distracted: {s.distracted}
                </div>
              </div>
              <Donut value={s.progressPct} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
