"use client";

import { MonthData } from "@/app/lib/types";
import { useMemo, useState } from "react";

export default function TaskManager({
  month,
  onAdd,
  onRemove
}: {
  month: MonthData;
  onAdd: (title: string) => void;
  onRemove: (taskId: string) => void;
}) {
  const [title, setTitle] = useState("");

  const remaining = useMemo(
    () => Math.max(0, 8 - month.tasks.length),
    [month.tasks.length]
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-4">

      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-400">Task Manager</p>
          <h3 className="text-lg font-semibold">Monthly Tasks</h3>
        </div>

        <div className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
          {remaining} slots left
        </div>
      </div>

      {/* ===== Input ===== */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task (e.g. Gym, Reading, Wake 5AM)"
          className="
            flex-1
            rounded-xl
            border border-zinc-800
            bg-zinc-900
            px-4 py-2.5
            text-sm
            outline-none
            focus:border-green-500
            placeholder:text-zinc-500
          "
        />

        <button
          onClick={() => {
            const t = title.trim();
            if (!t) return;
            if (month.tasks.length >= 8) return;
            onAdd(t);
            setTitle("");
          }}
          className="
            rounded-xl
            bg-green-600
            px-5 py-2.5
            text-sm
            font-semibold
            text-white
            hover:bg-green-500
            active:scale-95
            transition
          "
        >
          + Add
        </button>
      </div>

      {/* ===== Tasks List ===== */}
      <div className="space-y-2">
        {month.tasks.length === 0 ? (
          <div className="rounded-xl bg-zinc-900 p-4 text-center text-sm text-zinc-500">
            No tasks added yet  
            <br />
            <span className="text-xs">Add up to 8 tasks for this month</span>
          </div>
        ) : (
          month.tasks.map((t, index) => (
            <div
              key={t.id}
              className="
                flex items-center justify-between
                rounded-xl
                bg-zinc-900
                px-4 py-3
                border border-zinc-800
              "
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500">
                  {index + 1}.
                </span>
                <span className="text-sm">{t.title}</span>
              </div>

              <button
                onClick={() => onRemove(t.id)}
                className="
                  text-xs
                  text-red-400
                  hover:text-red-300
                  transition
                "
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
