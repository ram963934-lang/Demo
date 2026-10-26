"use client";

import { Calendar, IndianRupee, Wallet } from "lucide-react";
import { useMemo, useState } from "react";

import {
  FkButton,
  FkDataTable,
  FkKpiCard,
  FkPageHeader,
  FkPageTransition,
  FkSearchInput,
  FkSelect,
  FkStatusBadge,
} from "@/components/flipkart/fk-ui";
import { FLIPKART_PAYMENTS, type FlipkartPayment } from "@/lib/demo/flipkart";
import { formatDate } from "@/lib/date";

export function FlipkartPaymentsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const filtered = useMemo(() => {
    return FLIPKART_PAYMENTS.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (search && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, type]);

  const settled = FLIPKART_PAYMENTS.filter((p) => p.status === "completed" && p.amount > 0).reduce((s, p) => s + p.amount, 0);
  const fees = FLIPKART_PAYMENTS.filter((p) => p.amount < 0).reduce((s, p) => s + Math.abs(p.amount), 0);
  const next = FLIPKART_PAYMENTS.find((p) => p.status === "scheduled");

  return (
    <FkPageTransition>
      <FkPageHeader title="Payments" subtitle="Settlements, fees, and payouts" actions={<FkButton variant="outline">Download Statement</FkButton>} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <FkKpiCard label="Total Settled" value={`₹${settled.toLocaleString("en-IN")}`} change={8.4} icon={IndianRupee} sparkline={[32, 34, 35, 36, 37, 38, 39]} tone="green" />
        <FkKpiCard label="Next Payout" value={next ? `₹${next.amount.toLocaleString("en-IN")}` : "—"} change={12} icon={Calendar} sparkline={[38, 40, 41, 42, 43, 42, 43]} tone="blue" />
        <FkKpiCard label="Fees & Deductions" value={`₹${fees.toLocaleString("en-IN")}`} change={-3.2} icon={Wallet} sparkline={[8, 7, 9, 8, 7, 8, 7]} tone="yellow" />
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <FkSearchInput value={search} onChange={setSearch} placeholder="Search transactions..." />
        <FkSelect
          value={type}
          onChange={setType}
          label="Type"
          options={[
            { value: "all", label: "All" },
            { value: "settlement", label: "Settlements" },
            { value: "fee", label: "Fees" },
            { value: "refund", label: "Refunds" },
            { value: "ads", label: "Ads" },
          ]}
        />
      </div>

      <FkDataTable<FlipkartPayment>
        data={filtered}
        pageSize={6}
        columns={[
          { key: "date", label: "Date", sortable: true, render: (p) => formatDate(p.date) },
          { key: "description", label: "Description", sortable: true },
          { key: "type", label: "Type", sortable: true, render: (p) => <span style={{ textTransform: "capitalize" }}>{p.type}</span> },
          {
            key: "amount",
            label: "Amount",
            sortable: true,
            render: (p) => (
              <span style={{ fontWeight: 600, color: p.amount < 0 ? "var(--fk-danger)" : "var(--fk-text)" }}>
                {p.amount < 0 ? "-" : ""}₹{Math.abs(p.amount).toLocaleString("en-IN")}
              </span>
            ),
          },
          { key: "status", label: "Status", render: (p) => <FkStatusBadge status={p.status} /> },
        ]}
      />
    </FkPageTransition>
  );
}
