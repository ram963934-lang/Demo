import { demoDay, demoDayAt } from "@/lib/date";

export type DemoReport = {
  id: string;
  name: string;
  category: string;
  /** ISO timestamp, or a bare date when the time of day is not tracked. */
  lastGenerated: string;
  format: "CSV" | "TSV" | "PDF";
};

export const DEMO_REPORTS: DemoReport[] = [
  { id: "rep-1", name: "All Orders Report", category: "Orders", lastGenerated: demoDayAt(0, "09:12"), format: "CSV" },
  { id: "rep-2", name: "FBA Inventory Report", category: "Inventory", lastGenerated: demoDayAt(0, "08:45"), format: "CSV" },
  { id: "rep-3", name: "Settlement Report", category: "Payments", lastGenerated: demoDay(-1), format: "TSV" },
  { id: "rep-4", name: "Business Reports — Detail Page Sales", category: "Sales", lastGenerated: demoDay(-1), format: "CSV" },
  { id: "rep-5", name: "Stranded Inventory Report", category: "Inventory", lastGenerated: demoDay(-2), format: "CSV" },
  { id: "rep-6", name: "Restock Inventory Report", category: "Inventory", lastGenerated: demoDay(-3), format: "CSV" },
  { id: "rep-7", name: "Fee Preview Report", category: "Payments", lastGenerated: demoDay(-4), format: "PDF" },
  { id: "rep-8", name: "Brand Analytics Search Terms", category: "Advertising", lastGenerated: demoDay(-5), format: "CSV" },
];

export function getReports() {
  return DEMO_REPORTS;
}
