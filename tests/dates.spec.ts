import { test, expect } from "@playwright/test";

import {
  DEMO_REFERENCE_ISO,
  WEEKDAY,
  demoDay,
  demoDayAt,
  demoMinutesAgo,
  diffCalendarDays,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatTodayOrDate,
  getDemoNow,
  getDemoToday,
  getGreeting,
  getIsoWeekNumber,
  getIstParts,
  isWithinLastDays,
  toDate,
} from "@/lib/date";
import { getDashboardData } from "@/lib/demo/dashboard/data";
import { SC_DASHBOARD } from "@/lib/demo/dashboard/amazon-data";
import {
  FLIPKART_ORDERS,
  FLIPKART_PAYMENTS,
  FLIPKART_RETURNS,
  FLIPKART_CUSTOMERS,
  FLIPKART_REPORTS,
  FLIPKART_DASHBOARD,
} from "@/lib/demo/flipkart";
import {
  MEESHO_ORDERS,
  MEESHO_PAYMENTS,
  MEESHO_RETURNS,
  MEESHO_CATALOG_UPLOADS,
} from "@/lib/demo/meesho";
import {
  getPaymentSummary,
  getPayments,
  getReports,
  getOrders,
  UPLOADED_PRODUCT_CATALOG,
} from "@/lib/demo";

const TODAY = getDemoToday();
const NOW = getDemoNow();
const dayOf = (iso: string) => toDate(iso) as Date;
const weekdayOf = (iso: string) => getIstParts(dayOf(iso)).weekday;
const isPast = (iso: string) => dayOf(iso).getTime() <= NOW.getTime();
const isAfterToday = (iso: string) => diffCalendarDays(dayOf(iso), NOW) > 0;

test.describe("date utilities", () => {
  test("demo clock is Sunday 25 Oct 2026, 12:30 PM IST", () => {
    expect(DEMO_REFERENCE_ISO).toBe("2026-10-25T12:30:00+05:30");
    expect(TODAY).toBe("2026-10-25");
    expect(getIstParts(NOW)).toMatchObject({ year: 2026, month: 10, day: 25, hour: 12, minute: 30, weekday: WEEKDAY.Sunday });
  });

  test("formats dates and times consistently", () => {
    expect(formatDate("2026-10-25")).toBe("25 Oct 2026");
    expect(formatDate("2026-03-05")).toBe("05 Mar 2026");
    expect(formatDateTime("2026-10-25T10:30:00+05:30")).toBe("25 Oct 2026, 10:30 AM");
    expect(formatDateTime("2026-10-25T00:05:00+05:30")).toBe("25 Oct 2026, 12:05 AM");
    expect(formatDateTime("2026-10-25T23:59:00+05:30")).toBe("25 Oct 2026, 11:59 PM");
    expect(formatDateTime("2026-10-25")).toBe("25 Oct 2026"); // no invented time of day
  });

  test("a calendar date never slips a day, whatever the viewer's zone", () => {
    // 18:30 UTC on the 24th is already 00:00 on the 25th in IST.
    expect(formatDate("2026-10-24T18:30:00Z")).toBe("25 Oct 2026");
    // Offset-less timestamps are read as IST, not as the host's local time.
    expect(formatDateTime("2026-10-25T09:42:00")).toBe("25 Oct 2026, 09:42 AM");
    expect(formatDate("2026-12-31")).toBe("31 Dec 2026");
  });

  test("invalid and missing input is handled safely", () => {
    for (const bad of [null, undefined, "", "not a date", "2026-02-31", "2026-13-01", NaN, new Date("x")]) {
      expect(formatDate(bad as never)).toBe("—");
      expect(formatDateTime(bad as never)).toBe("—");
      expect(formatRelativeTime(bad as never)).toBe("—");
      expect(formatTodayOrDate(bad as never)).toBe("—");
    }
    expect(formatDate(undefined, "n/a")).toBe("n/a");
    expect(isWithinLastDays("garbage", 30)).toBe(false);
  });

  test("relative labels match the underlying timestamp", () => {
    expect(formatRelativeTime(demoMinutesAgo(0))).toBe("Just now");
    expect(formatRelativeTime(demoMinutesAgo(12))).toBe("12 min ago");
    expect(formatRelativeTime(demoMinutesAgo(120))).toBe("2 hr ago");
    expect(formatRelativeTime(demoDayAt(-1, "17:20"))).toBe("Yesterday");
    expect(formatRelativeTime(demoDayAt(-3, "11:00"))).toBe("3 days ago");
    expect(formatRelativeTime(demoDayAt(-8, "11:00"))).toBe("Last week");
    expect(formatRelativeTime(demoDayAt(-20, "11:00"))).toBe(formatDate(demoDay(-20)));
    expect(formatRelativeTime(demoDay(0))).toBe("Today");
    expect(formatRelativeTime(demoDay(-1))).toBe("Yesterday");
    // The future is never rendered as a negative "ago".
    expect(formatRelativeTime(demoDayAt(2, "10:00"))).toBe(formatDate(demoDay(2)));
  });

  test("today / yesterday labels", () => {
    expect(formatTodayOrDate(demoDayAt(0, "09:12"))).toBe("Today, 09:12 AM");
    expect(formatTodayOrDate(demoDay(-1))).toBe("Yesterday");
    expect(formatTodayOrDate(demoDay(-5))).toBe(formatDate(demoDay(-5)));
  });

  test("windows, weeks and greeting", () => {
    expect(isWithinLastDays(demoDay(0), 30)).toBe(true);
    expect(isWithinLastDays(demoDay(-29), 30)).toBe(true);
    expect(isWithinLastDays(demoDay(-30), 30)).toBe(false);
    expect(isWithinLastDays(demoDay(1), 30)).toBe(false);
    expect(getIsoWeekNumber(dayOf("2026-03-01"))).toBe(9);
    expect(getIsoWeekNumber(dayOf("2026-10-27"))).toBe(44);
    expect(getGreeting()).toBe("Good afternoon");
    expect(getGreeting("2026-10-25T08:00:00+05:30")).toBe("Good morning");
    expect(getGreeting("2026-10-25T19:00:00+05:30")).toBe("Good evening");
  });
});

test.describe("Flipkart data is internally consistent", () => {
  test("orders are in the past and sorted by real time", () => {
    for (const order of FLIPKART_ORDERS) expect(isPast(order.orderDate), order.orderId).toBe(true);
    const dates = FLIPKART_ORDERS.map((o) => o.orderDate);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  test("payments: scheduled in the future, completed in the past, Tuesday settlements", () => {
    for (const p of FLIPKART_PAYMENTS) {
      if (p.status === "scheduled") expect(isAfterToday(p.date), p.id).toBe(true);
      else expect(isPast(p.date), p.id).toBe(true);
      if (p.type === "settlement") expect(weekdayOf(p.date), p.id).toBe(WEEKDAY.Tuesday);
    }
    const settlements = FLIPKART_PAYMENTS.filter((p) => p.type === "settlement");
    expect(settlements[0].description).toContain(`Week ${getIsoWeekNumber(dayOf(settlements[0].date)) - 1}`);
    expect(FLIPKART_PAYMENTS.filter((p) => p.status === "scheduled")).toHaveLength(1);
  });

  test("a refund never predates the order or return it belongs to", () => {
    const refund = FLIPKART_PAYMENTS.find((p) => p.type === "refund")!;
    const orderId = refund.description.match(/OD\d+/)![0];
    const order = FLIPKART_ORDERS.find((o) => o.orderId === orderId)!;
    const ret = FLIPKART_RETURNS.find((r) => r.orderId === orderId)!;
    expect(diffCalendarDays(dayOf(refund.date), dayOf(order.orderDate))).toBeGreaterThanOrEqual(0);
    expect(diffCalendarDays(dayOf(refund.date), dayOf(ret.date))).toBeGreaterThanOrEqual(0);
    // An unfinished return cannot have a finished refund.
    if (ret.status === "pending") expect(refund.status).not.toBe("completed");
  });

  test("returns, customers, reports and charts are dated sensibly", () => {
    for (const r of FLIPKART_RETURNS) expect(isPast(r.date), r.returnId).toBe(true);
    for (const c of FLIPKART_CUSTOMERS) expect(isPast(c.lastOrder), c.name).toBe(true);
    for (const r of FLIPKART_REPORTS) expect(isPast(r.generated), r.name).toBe(true);

    const trend = FLIPKART_DASHBOARD.revenueTrend;
    expect(trend).toHaveLength(7);
    expect(trend[6].date).toBe(TODAY);
    expect(trend.map((t) => t.day)).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    expect(trend.reduce((s, t) => s + t.revenue, 0)).toBe(FLIPKART_DASHBOARD.revenue7d);

    const months = FLIPKART_DASHBOARD.monthlySales.map((m) => m.month);
    expect(months).toEqual(["May", "Jun", "Jul", "Aug", "Sep", "Oct (MTD)"]);
  });
});

test.describe("Meesho data is internally consistent", () => {
  const IN_FLIGHT = ["pending", "processing", "packed", "shipped", "out_for_delivery"];

  test("expected delivery is after the order and agrees with the status", () => {
    for (const o of MEESHO_ORDERS) {
      expect(isPast(o.orderDateIso), o.orderId).toBe(true);
      expect(diffCalendarDays(dayOf(o.expectedDeliveryDate), dayOf(o.orderDateIso)), o.orderId).toBeGreaterThan(0);
      if (IN_FLIGHT.includes(o.status)) {
        // Still on its way: it can't already be overdue.
        expect(diffCalendarDays(dayOf(o.expectedDeliveryDate), NOW), `${o.orderId} ${o.status}`).toBeGreaterThanOrEqual(0);
      }
      if (o.status === "delivered") expect(diffCalendarDays(NOW, dayOf(o.expectedDeliveryDate)), o.orderId).toBeGreaterThanOrEqual(0);
    }
  });

  test("payouts: one scheduled in the future, others completed in the past, every Friday", () => {
    for (const p of MEESHO_PAYMENTS) {
      expect(weekdayOf(p.date), p.id).toBe(WEEKDAY.Friday);
      if (p.status === "scheduled") expect(isAfterToday(p.date), p.id).toBe(true);
      else expect(isPast(p.date), p.id).toBe(true);
    }
    expect(MEESHO_PAYMENTS.filter((p) => p.status === "scheduled")).toHaveLength(1);
  });

  test("returns and catalog uploads are in the past", () => {
    for (const r of MEESHO_RETURNS) expect(isPast(r.date), r.returnId).toBe(true);
    for (const u of MEESHO_CATALOG_UPLOADS) expect(isPast(u.uploadedAt), u.fileId).toBe(true);
  });
});

test.describe("Amazon data is internally consistent", () => {
  test("payments: scheduled in the future, completed in the past, summary uses a real 30-day window", () => {
    for (const p of getPayments()) {
      if (p.status === "scheduled") expect(isAfterToday(p.date), p.id).toBe(true);
      else expect(isPast(p.date), p.id).toBe(true);
    }
    const completedFees = getPayments().filter((p) => p.status === "completed" && p.type === "fee");
    const within30 = completedFees.filter((p) => isWithinLastDays(p.date, 30));
    expect(within30.length).toBeLessThan(completedFees.length); // an older fee exists and must be excluded
    const expected = Math.abs(within30.reduce((s, p) => s + p.amount, 0));
    expect(getPaymentSummary().fees30d).toBeCloseTo(expected, 2);
    expect(getPaymentSummary().scheduledDisbursement).toBe(88516.64);
    expect(getPaymentSummary().lastDisbursement).toBe(72430.18);
  });

  test("orders: placement time fits the status, nothing is placed in the future", () => {
    const orders = getOrders();
    expect(orders.length).toBeGreaterThan(0);
    for (const o of orders) {
      const age = NOW.getTime() - dayOf(o.placedAt).getTime();
      const hours = age / 3_600_000;
      expect(age, o.orderNumber).toBeGreaterThanOrEqual(0);
      if (o.status === "pending") expect(hours, o.orderNumber).toBeLessThan(24);
      if (o.status === "delivered") expect(hours, o.orderNumber).toBeGreaterThanOrEqual(72);
      if (o.status === "returned") expect(hours, o.orderNumber).toBeGreaterThanOrEqual(168);
      expect(o.shipBy === null, `${o.orderNumber} shipBy`).toBe(o.status !== "pending");
    }
  });

  test("reports, products and the dashboard replica carry current dates", () => {
    for (const r of getReports()) expect(isPast(r.lastGenerated), r.name).toBe(true);
    for (const p of UPLOADED_PRODUCT_CATALOG) expect(isPast(p.lastUpdated), p.sku).toBe(true);
    expect(SC_DASHBOARD.greeting).toBe("Good afternoon");
    expect(SC_DASHBOARD.forums[0].date).toBe("Oct 23");
    expect(SC_DASHBOARD.news[0].date).toBe("22-Oct-2026");
    expect(SC_DASHBOARD.news[0].body).toContain("Starting November 8");
    expect(SC_DASHBOARD.news[2].title).toContain("Q4");
  });

  test("daily trend is 30 real consecutive days ending today", () => {
    const { dailyTrend } = getDashboardData("home-decor");
    expect(dailyTrend).toHaveLength(30);
    expect(dailyTrend[29].date).toBe(TODAY);
    expect(dailyTrend[0].date).toBe(demoDay(-29));
    for (let i = 1; i < dailyTrend.length; i++) {
      expect(diffCalendarDays(dayOf(dailyTrend[i].date), dayOf(dailyTrend[i - 1].date))).toBe(1);
    }
  });
});
