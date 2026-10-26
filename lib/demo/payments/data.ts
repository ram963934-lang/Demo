import { WEEKDAY, demoNextWeekday, isWithinLastDays, shiftDay } from "@/lib/date";

export type PaymentStatus = "completed" | "pending" | "scheduled";

export type DemoPayment = {
  id: string;
  /** Calendar date (IST), `YYYY-MM-DD`. */
  date: string;
  description: string;
  amount: number;
  status: PaymentStatus;
  type: "disbursement" | "fee" | "refund" | "reserve";
};

/**
 * Disbursements run on a weekly cycle (Wednesdays). The next one is the first Wednesday after today, so the
 * "scheduled" row is always in the future, and every completed row sits in the past, relative to the demo clock.
 */
const NEXT_DISBURSEMENT = demoNextWeekday(WEEKDAY.Wednesday);
const before = (days: number) => shiftDay(NEXT_DISBURSEMENT, -days);

export const DEMO_PAYMENTS: DemoPayment[] = [
  { id: "pay-1", date: before(0), description: "Standard disbursement", amount: 88516.64, status: "scheduled", type: "disbursement" },
  { id: "pay-2", date: before(7), description: "Standard disbursement", amount: 72430.18, status: "completed", type: "disbursement" },
  { id: "pay-3", date: before(14), description: "FBA fulfillment fees", amount: -8420.55, status: "completed", type: "fee" },
  { id: "pay-4", date: before(21), description: "Standard disbursement", amount: 65890.42, status: "completed", type: "disbursement" },
  { id: "pay-5", date: before(26), description: "Customer refund — LJ-ER-068", amount: -1499, status: "completed", type: "refund" },
  { id: "pay-6", date: before(35), description: "Reserve hold release", amount: 12400, status: "completed", type: "reserve" },
  { id: "pay-7", date: before(42), description: "Advertising charges", amount: -5306.46, status: "completed", type: "fee" },
  { id: "pay-8", date: before(49), description: "Standard disbursement", amount: 91204.33, status: "completed", type: "disbursement" },
];

export function getPayments() {
  return DEMO_PAYMENTS;
}

export function getPaymentSummary() {
  const completed = DEMO_PAYMENTS.filter((p) => p.status === "completed");
  const recent = completed.filter((p) => isWithinLastDays(p.date, 30));
  const sumAbs = (rows: DemoPayment[], type: DemoPayment["type"]) =>
    Math.abs(rows.filter((p) => p.type === type).reduce((s, p) => s + p.amount, 0));
  const scheduled = DEMO_PAYMENTS.find((p) => p.status === "scheduled" && p.type === "disbursement");
  const lastDisbursement = completed
    .filter((p) => p.type === "disbursement")
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  return {
    // The balance is what the next disbursement will pay out.
    totalBalance: scheduled?.amount ?? 0,
    scheduledDisbursement: scheduled?.amount ?? 0,
    lastDisbursement: lastDisbursement?.amount ?? 0,
    // "30 days" means the last 30 days — older completed fees no longer count.
    fees30d: sumAbs(recent, "fee"),
    refunds30d: sumAbs(recent, "refund"),
  };
}
