"use client";
import WeeklySummary from "./WeeklySummary";

import { useEffect, useMemo, useState } from "react";
import { AppState } from "@/app/lib/types";
import {
  ensureRolling3Months,
  initState,
  loadState,
  saveState,
  setActiveMonth,
  addTaskToMonth,
  removeTaskFromMonth,
  toggleCheck
} from "@/app/lib/storage";

import MonthCircles from "./MonthCircles";
import MonthHeader from "./MonthHeader";
import TaskManager from "./TaskManager";
import MonthGrid from "./MonthGrid";
import ProgressArea from "./ProgressArea";

export default function Dashboard() {
  const [state, setState] = useState<AppState>(() => initState());

  useEffect(() => {
    const s = ensureRolling3Months(loadState(), new Date());
    setState(s);
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const activeMonth = useMemo(
    () =>
      state.months.find((m) => m.key === state.activeMonthKey) ??
      state.months[0],
    [state]
  );

  return (
    <div className="space-y-6 px-2 sm:px-0">

      {/* ===== Header ===== */}
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Routine Tracker
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Tick = Done • Unticked = Distracted
        </p>
      </div>

      {/* ===== Month Circles ===== */}
      <div className="overflow-x-auto">
        <MonthCircles
          months={state.months}
          activeKey={state.activeMonthKey}
          onSelect={(k) =>
            setState((s) => setActiveMonth(s, k))
          }
        />
      </div>

      {/* ===== Main Layout ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <MonthHeader month={activeMonth} />

          {/* Grid always scrollable on mobile */}
          <div className="overflow-x-auto">
            <MonthGrid
              month={activeMonth}
              onToggle={(taskId, day) =>
                setState((s) =>
                  toggleCheck(s, activeMonth.key, taskId, day)
                )
              }
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <TaskManager
            month={activeMonth}
            onAdd={(title) =>
              setState((s) =>
                addTaskToMonth(s, activeMonth.key, title)
              )
            }
            onRemove={(taskId) =>
              setState((s) =>
                removeTaskFromMonth(s, activeMonth.key, taskId)
              )
            }
          />

          <ProgressArea month={activeMonth} />
          <WeeklySummary month={activeMonth} />

        </div>
      </div>
    </div>
  );
}
