import { nanoid } from "nanoid";
import { AppState, MonthData } from "./types";
import { build3Months } from "./utils";

const STORAGE_KEY = "routine_game_state_v1";

function emptyMonth(key: string, label: string): MonthData {
  return {
    key,
    label,
    tasks: [],
    checks: {}
  };
}

export function initState(now = new Date()): AppState {
  const three = build3Months(now);
  const months = three.map((m) => emptyMonth(m.key, m.label));
  return { months, activeMonthKey: months[0].key };
}

export function loadState(): AppState {
  if (typeof window === "undefined") return initState();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return initState();
  try {
    return JSON.parse(raw) as AppState;
  } catch {
    return initState();
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function ensureRolling3Months(state: AppState, now = new Date()): AppState {
  // Keep the same structure but refresh months to current rolling window if user comes later.
  const target = build3Months(now);
  const map = new Map(state.months.map((m) => [m.key, m]));
  const months = target.map((t) => map.get(t.key) ?? { ...initState(now).months[0], key: t.key, label: t.label });
  const activeMonthKey = months.some((m) => m.key === state.activeMonthKey) ? state.activeMonthKey : months[0].key;
  return { months, activeMonthKey };
}

export function addTaskToMonth(state: AppState, monthKey: string, title: string): AppState {
  const months = state.months.map((m) => {
    if (m.key !== monthKey) return m;
    if (m.tasks.length >= 8) return m;

    const id = nanoid(8);
    const next = { ...m };
    next.tasks = [...m.tasks, { id, title }];
    next.checks = { ...m.checks, [id]: next.checks[id] ?? {} };
    return next;
  });
  return { ...state, months };
}

export function removeTaskFromMonth(state: AppState, monthKey: string, taskId: string): AppState {
  const months = state.months.map((m) => {
    if (m.key !== monthKey) return m;
    const next = { ...m };
    next.tasks = m.tasks.filter((t) => t.id !== taskId);
    const { [taskId]: _, ...rest } = m.checks;
    next.checks = rest;
    return next;
  });
  return { ...state, months };
}

export function toggleCheck(state: AppState, monthKey: string, taskId: string, day: number): AppState {
  const months = state.months.map((m) => {
    if (m.key !== monthKey) return m;
    const next = { ...m };
    const taskMap = { ...(next.checks[taskId] ?? {}) };
    taskMap[day] = !taskMap[day];
    next.checks = { ...next.checks, [taskId]: taskMap };
    return next;
  });
  return { ...state, months };
}

export function setActiveMonth(state: AppState, monthKey: string): AppState {
  return { ...state, activeMonthKey: monthKey };
}
