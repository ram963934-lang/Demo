/**
 * India Standard Time (Asia/Kolkata) date primitives.
 *
 * IST is a fixed UTC+05:30 offset with no daylight-saving changes, so every calendar calculation can be done
 * with plain arithmetic. Nothing in this file reads the host machine's time zone, which is what keeps the
 * server render, the build-time prerender and the browser hydration byte-for-byte identical.
 *
 * Conventions used across the date library:
 *  - A "date key" is a calendar date in IST written `YYYY-MM-DD` (e.g. `2026-10-25`).
 *  - A "timestamp" is an ISO-8601 string with an explicit offset (e.g. `2026-10-25T09:42:00+05:30`).
 *  - Date-only strings mean "that calendar day in IST", never "midnight UTC", so the day can't slip by one
 *    when a viewer's own time zone differs.
 */

export const DEMO_TIME_ZONE = "Asia/Kolkata";
export const IST_OFFSET_MINUTES = 330;

const MS_PER_MINUTE = 60_000;
const MS_PER_DAY = 86_400_000;
const IST_OFFSET_MS = IST_OFFSET_MINUTES * MS_PER_MINUTE;

/** Anything the date helpers accept. Invalid or missing values are handled safely (see `toDate`). */
export type DateInput = string | number | Date | null | undefined;

export type IstParts = {
  year: number;
  /** 1–12 */
  month: number;
  day: number;
  hour: number;
  minute: number;
  /** 0 = Sunday … 6 = Saturday */
  weekday: number;
};

/** Day of week using the same numbering as `Date#getDay`. */
export const WEEKDAY = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;

const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
/** ISO date-time with no `Z` / offset. JS would read this in the *host's* zone, so we read it as IST instead. */
const NAIVE_DATE_TIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?$/;

function pad(value: number, length = 2) {
  return String(value).padStart(length, "0");
}

/** Builds the instant that corresponds to an IST wall-clock time. Returns null for impossible dates (e.g. 31 Feb). */
export function fromIstWallClock(year: number, month: number, day: number, hour = 0, minute = 0, second = 0): Date | null {
  const utcMs = Date.UTC(year, month - 1, day, hour, minute, second);
  const probe = new Date(utcMs);
  // Date.UTC silently rolls 31 Feb over to 3 Mar; reject anything that did not round-trip.
  if (
    probe.getUTCFullYear() !== year ||
    probe.getUTCMonth() !== month - 1 ||
    probe.getUTCDate() !== day ||
    hour > 23 ||
    minute > 59 ||
    second > 59
  ) {
    return null;
  }
  return new Date(utcMs - IST_OFFSET_MS);
}

/** True for a bare calendar date such as `2026-10-25` (no time component). */
export function isDateOnly(input: DateInput): boolean {
  return typeof input === "string" && DATE_ONLY_PATTERN.test(input.trim());
}

/** Safely converts any supported input to a `Date`. Returns null (never throws) for missing/invalid values. */
export function toDate(input: DateInput): Date | null {
  if (input === null || input === undefined || input === "") return null;

  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input;
  }

  if (typeof input === "number") {
    const fromNumber = new Date(input);
    return Number.isNaN(fromNumber.getTime()) ? null : fromNumber;
  }

  if (typeof input !== "string") return null;
  const text = input.trim();

  const dateOnly = DATE_ONLY_PATTERN.exec(text);
  if (dateOnly) {
    return fromIstWallClock(Number(dateOnly[1]), Number(dateOnly[2]), Number(dateOnly[3]));
  }

  const naive = NAIVE_DATE_TIME_PATTERN.exec(text);
  if (naive) {
    return fromIstWallClock(
      Number(naive[1]),
      Number(naive[2]),
      Number(naive[3]),
      Number(naive[4]),
      Number(naive[5]),
      Number(naive[6] ?? 0),
    );
  }

  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** Calendar/clock components of an instant, as seen in IST. */
export function getIstParts(date: Date): IstParts {
  const shifted = new Date(date.getTime() + IST_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    weekday: shifted.getUTCDay(),
  };
}

/** `YYYY-MM-DD` for the IST calendar day containing the instant. */
export function toDateKey(date: Date): string {
  const { year, month, day } = getIstParts(date);
  return `${pad(year, 4)}-${pad(month)}-${pad(day)}`;
}

/** ISO-8601 timestamp with an explicit `+05:30` offset, e.g. `2026-10-25T09:42:00+05:30`. */
export function toIstIsoString(date: Date): string {
  const { year, month, day, hour, minute } = getIstParts(date);
  const second = new Date(date.getTime() + IST_OFFSET_MS).getUTCSeconds();
  return `${pad(year, 4)}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}+05:30`;
}

/** Whole IST calendar days between two instants (`later` minus `earlier`), ignoring time of day. */
export function diffCalendarDays(later: Date, earlier: Date): number {
  const dayNumber = (d: Date) => Math.floor((d.getTime() + IST_OFFSET_MS) / MS_PER_DAY);
  return dayNumber(later) - dayNumber(earlier);
}

/** Adds whole days, keeping the IST wall-clock time (IST has no DST, so this is exact). */
export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

/** Adds calendar months to a date key, clamping the day (31 Jan + 1 month → 28/29 Feb). */
export function addMonthsToDateKey(dateKey: string, months: number): string {
  const base = toDate(dateKey);
  if (!base) throw new RangeError(`Invalid date key: ${dateKey}`);
  const { year, month, day } = getIstParts(base);
  const index = year * 12 + (month - 1) + months;
  const targetYear = Math.floor(index / 12);
  const targetMonth = (index % 12) + 1;
  const lastDay = new Date(Date.UTC(targetYear, targetMonth, 0)).getUTCDate();
  return `${pad(targetYear, 4)}-${pad(targetMonth)}-${pad(Math.min(day, lastDay))}`;
}

/** Start (00:00 IST) of the IST calendar day containing the instant. */
export function startOfIstDay(date: Date): Date {
  const { year, month, day } = getIstParts(date);
  return fromIstWallClock(year, month, day) as Date;
}

/** ISO-8601 week number (weeks start on Monday; week 1 contains the year's first Thursday). */
export function getIsoWeekNumber(date: Date): number {
  const { year, month, day } = getIstParts(date);
  const target = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = target.getUTCDay() || 7; // Monday = 1 … Sunday = 7
  target.setUTCDate(target.getUTCDate() + 4 - dayOfWeek); // move to this week's Thursday
  const yearStart = Date.UTC(target.getUTCFullYear(), 0, 1);
  return Math.ceil(((target.getTime() - yearStart) / MS_PER_DAY + 1) / 7);
}

/** Calendar quarter (1–4) of the IST date. */
export function getQuarter(date: Date): number {
  return Math.ceil(getIstParts(date).month / 3);
}
