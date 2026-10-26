import { getDemoNow } from "./demo-clock";
import {
  diffCalendarDays,
  getIstParts,
  getQuarter,
  isDateOnly,
  toDate,
  type DateInput,
} from "./ist";

/**
 * Display formatters. Month and weekday names are fixed tables (not `Intl`), so output is identical in Node,
 * every browser and every locale — one more guard against server/client hydration mismatches.
 *
 * Every formatter returns `fallback` ("—") for missing or invalid input instead of throwing or printing "NaN".
 */

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const EMPTY_DATE_LABEL = "—";

const pad2 = (value: number) => String(value).padStart(2, "0");

/** `25 Oct 2026` */
export function formatDate(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  if (!date) return fallback;
  const { year, month, day } = getIstParts(date);
  return `${pad2(day)} ${MONTH_SHORT[month - 1]} ${year}`;
}

/** `09:42 AM` (IST) */
export function formatTime(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  if (!date) return fallback;
  const { hour, minute } = getIstParts(date);
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${pad2(hour12)}:${pad2(minute)} ${hour < 12 ? "AM" : "PM"}`;
}

/** `25 Oct 2026, 09:42 AM`. A date-only input has no time of day, so only the date is shown. */
export function formatDateTime(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  if (!date) return fallback;
  return isDateOnly(input) ? formatDate(date) : `${formatDate(date)}, ${formatTime(date)}`;
}

/** `Oct 25` — compact form used by the Seller Central forum list. */
export function formatMonthDay(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  if (!date) return fallback;
  const { month, day } = getIstParts(date);
  return `${MONTH_SHORT[month - 1]} ${day}`;
}

/** `November 8` — for dates inside prose. */
export function formatLongMonthDay(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  if (!date) return fallback;
  const { month, day } = getIstParts(date);
  return `${MONTH_LONG[month - 1]} ${day}`;
}

/** `22-Oct-2026` — the Seller Central news-item style. */
export function formatDashedDate(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  if (!date) return fallback;
  const { year, month, day } = getIstParts(date);
  return `${pad2(day)}-${MONTH_SHORT[month - 1]}-${year}`;
}

/** `12 Oct` — chart axis ticks. */
export function formatDayMonth(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  if (!date) return fallback;
  const { month, day } = getIstParts(date);
  return `${day} ${MONTH_SHORT[month - 1]}`;
}

/** `Oct 2026` */
export function formatMonthYear(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  if (!date) return fallback;
  const { year, month } = getIstParts(date);
  return `${MONTH_SHORT[month - 1]} ${year}`;
}

/** `October` */
export function formatMonthName(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  if (!date) return fallback;
  return MONTH_LONG[getIstParts(date).month - 1];
}

/** `Mon` */
export function formatWeekdayShort(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  if (!date) return fallback;
  return WEEKDAY_SHORT[getIstParts(date).weekday];
}

/** `Q4` (calendar quarter) */
export function formatQuarter(input: DateInput, fallback = EMPTY_DATE_LABEL): string {
  const date = toDate(input);
  return date ? `Q${getQuarter(date)}` : fallback;
}

/** Four-digit year of the IST date. */
export function getYear(input: DateInput): number | null {
  const date = toDate(input);
  return date ? getIstParts(date).year : null;
}

/**
 * Relative label measured against the demo clock (or `now` if given):
 * `Just now` · `12 min ago` · `5 hr ago` · `Yesterday` · `3 days ago` · `Last week` · then a plain date.
 * Future instants are shown as plain dates, never as a negative "ago".
 */
export function formatRelativeTime(
  input: DateInput,
  now: DateInput = getDemoNow(),
  fallback = EMPTY_DATE_LABEL,
): string {
  const date = toDate(input);
  const reference = toDate(now);
  if (!date || !reference) return fallback;

  const dayDiff = diffCalendarDays(reference, date);
  if (dayDiff < 0) return formatDate(date);

  if (isDateOnly(input)) {
    if (dayDiff === 0) return "Today";
    return relativeDays(dayDiff, date);
  }

  const elapsedMinutes = Math.floor((reference.getTime() - date.getTime()) / 60_000);
  if (elapsedMinutes < 0) return formatDate(date); // later today, but still in the future
  if (elapsedMinutes < 1) return "Just now";
  if (elapsedMinutes < 60) return `${elapsedMinutes} min ago`;
  if (dayDiff === 0) return `${Math.floor(elapsedMinutes / 60)} hr ago`;
  return relativeDays(dayDiff, date);
}

function relativeDays(dayDiff: number, date: Date): string {
  if (dayDiff === 1) return "Yesterday";
  if (dayDiff < 7) return `${dayDiff} days ago`;
  if (dayDiff < 14) return "Last week";
  return formatDate(date);
}

/**
 * `Today, 09:12 AM` · `Yesterday, 06:30 PM` · otherwise `22 Oct 2026`.
 * Date-only inputs drop the time (`Today`, `Yesterday`).
 */
export function formatTodayOrDate(
  input: DateInput,
  now: DateInput = getDemoNow(),
  fallback = EMPTY_DATE_LABEL,
): string {
  const date = toDate(input);
  const reference = toDate(now);
  if (!date || !reference) return fallback;

  const dayDiff = diffCalendarDays(reference, date);
  const label = dayDiff === 0 ? "Today" : dayDiff === 1 ? "Yesterday" : null;
  if (!label) return formatDate(date);
  return isDateOnly(input) ? label : `${label}, ${formatTime(date)}`;
}

/** `Good morning` / `Good afternoon` / `Good evening` for the IST hour of `now` (default: demo clock). */
export function getGreeting(now: DateInput = getDemoNow()): string {
  const date = toDate(now) ?? getDemoNow();
  const { hour } = getIstParts(date);
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/** True when the date falls within the last `days` calendar days, today included. */
export function isWithinLastDays(input: DateInput, days: number, now: DateInput = getDemoNow()): boolean {
  const date = toDate(input);
  const reference = toDate(now);
  if (!date || !reference) return false;
  const dayDiff = diffCalendarDays(reference, date);
  return dayDiff >= 0 && dayDiff < days;
}
