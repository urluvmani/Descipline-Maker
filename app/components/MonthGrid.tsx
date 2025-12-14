"use client";

import { MonthData } from "@/app/lib/types";
import { monthDays } from "@/app/lib/stats";

export default function MonthGrid({
  month,
  onToggle
}: {
  month: MonthData;
  onToggle: (taskId: string, day: number) => void;
}) {
  const days = monthDays(month);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 sm:p-5">

      {/* horizontal scroll wrapper */}
      <div className="overflow-x-auto">
        <div className="min-w-[680px]">

          <div
            className="grid"
            style={{
              gridTemplateColumns: `200px repeat(${days}, minmax(36px, 1fr))`
            }}
          >
            {/* ===== Header Row ===== */}
            <div className="sticky left-0 z-20 bg-zinc-950 text-sm font-semibold text-zinc-300 py-2 px-2">
              Tasks
            </div>

            {Array.from({ length: days }, (_, i) => (
              <div
                key={i}
                className="text-center text-[10px] sm:text-xs text-zinc-500 py-2"
              >
                {i + 1}
              </div>
            ))}

            {/* ===== No Tasks ===== */}
            {month.tasks.length === 0 ? (
              <div className="col-span-full py-10 text-center text-sm text-zinc-500">
                Add tasks to start tracking
              </div>
            ) : (
              month.tasks.map((t) => {
                const row = month.checks[t.id] ?? {};

                return (
                  <div key={t.id} className="contents">

                    {/* ===== Task Name (Sticky) ===== */}
                    <div className="sticky left-0 z-20 bg-zinc-950 border-t border-zinc-800 px-2 py-2">
                      <div className="rounded-lg bg-zinc-900 px-3 py-2 text-xs sm:text-sm truncate">
                        {t.title}
                      </div>
                    </div>

                    {/* ===== Days ===== */}
                    {Array.from({ length: days }, (_, i) => {
                      const day = i + 1;
                      const checked = !!row[day];

                      return (
                        <div
                          key={day}
                          className="border-t border-zinc-800 flex items-center justify-center py-2"
                        >
                          <button
                            onClick={() => onToggle(t.id, day)}
                            className={[
                              "rounded-md border transition flex items-center justify-center",
                              "h-7 w-7 sm:h-6 sm:w-6",
                              checked
                                ? "bg-green-600 border-green-500 text-white"
                                : "bg-zinc-950 border-zinc-700 hover:border-zinc-500"
                            ].join(" ")}
                            aria-label={`toggle day ${day}`}
                          >
                            {checked && (
                              <span className="text-xs font-bold">✓</span>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>

          {/* ===== Footer Note ===== */}
          <div className="mt-4 text-center text-[11px] sm:text-xs text-zinc-500">
            Unticked = <span className="text-red-400">Distracted</span> • Ticked = <span className="text-green-400">Done</span>
          </div>
        </div>
      </div>
    </div>
  );
}
