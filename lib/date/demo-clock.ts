import {
  addDays,
  addMonthsToDateKey,
  fromIstWallClock,
  getIstParts,
  toDate,
  toDateKey,
  toIstIsoString,
} from "./ist";

/**
 * The demo's "now".
 *
 * The dashboard is a demo, so its clock is deliberately fixed rather than read from the system:
 *  - seeded history, "today" widgets and relative labels ("12 min ago") always agree with each other;
 *  - server render, build-time prerender and client hydration all see the same instant (no hydration drift);
 *  - reloading never reshuffles historical records.
 *
 * To re-anchor the whole demo to another day, change this one constant. Every mock date is written as an
 * offset from it (see the builders below), so nothing else needs editing.
 *
 * Sunday 25 October 2026, 12:30 PM India Standard Time.
 */
export const DEMO_REFERENCE_ISO = "2026-10-25T12:30:00+05:30";

const DEMO_NOW_MS = new Date(DEMO_REFERENCE_ISO).getTime();

/** The demo's current instant (a fresh `Date` each call so callers can't mutate the shared clock). */
export function getDemoNow(): Date {
  return new Date(DEMO_NOW_MS);
}

/** IST calendar date of the demo's "today" as `YYYY-MM-DD`. */
export function getDemoToday(): string {
  return toDateKey(getDemoNow());
}

function parseTime(time: string): { hour: number; minute: number } {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) throw new RangeError(`Expected "HH:mm", received "${time}"`);
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

/** Calendar date `offsetDays` from today (negative = past, positive = future) as `YYYY-MM-DD`. */
export function demoDay(offsetDays: number): string {
  return toDateKey(addDays(getDemoNow(), offsetDays));
}

/** Timestamp at `HH:mm` IST on the day `offsetDays` from today, e.g. `demoDayAt(-1, "16:30")`. */
export function demoDayAt(offsetDays: number, time: string): string {
  const { hour, minute } = parseTime(time);
  const { year, month, day } = getIstParts(addDays(getDemoNow(), offsetDays));
  const instant = fromIstWallClock(year, month, day, hour, minute);
  if (!instant) throw new RangeError(`Invalid time "${time}"`);
  return toIstIsoString(instant);
}

/** Timestamp `minutes` before the demo's "now". */
export function demoMinutesAgo(minutes: number): string {
  return toIstIsoString(new Date(DEMO_NOW_MS - minutes * 60_000));
}

/** Timestamp `hours` before the demo's "now". */
export function demoHoursAgo(hours: number): string {
  return demoMinutesAgo(hours * 60);
}

/** Shifts a `YYYY-MM-DD` date key by whole days. */
export function shiftDay(dateKey: string, days: number): string {
  const base = toDate(dateKey);
  if (!base) throw new RangeError(`Invalid date key: ${dateKey}`);
  return toDateKey(addDays(base, days));
}

/**
 * The first given weekday that falls strictly after today (so a "scheduled" item is always in the future).
 * Use `WEEKDAY` from `./ist` for the argument.
 */
export function demoNextWeekday(weekday: number): string {
  const todayWeekday = getIstParts(getDemoNow()).weekday;
  const ahead = ((weekday - todayWeekday + 7) % 7) || 7;
  return demoDay(ahead);
}

/** First day (`YYYY-MM-01`) of the calendar month `offsetMonths` from the demo's current month. */
export function demoMonthStart(offsetMonths: number): string {
  return addMonthsToDateKey(getDemoToday(), offsetMonths).slice(0, 8) + "01";
}

/** Short month label (`"May"`) for a calendar month `offsetMonths` from the demo's current month. */
export function demoMonthShort(offsetMonths: number): string {
  const key = addMonthsToDateKey(getDemoToday(), offsetMonths);
  return MONTH_SHORT[Number(key.slice(5, 7)) - 1];
}

// Kept here (not imported from format.ts) so the clock has no circular dependency on the formatters.
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
