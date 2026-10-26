"use client";

import { Clock, RotateCcw, TrendingDown } from "lucide-react";
import { useMemo, useState } from "react";

import {
  FkButton,
  FkCard,
  FkDataTable,
  FkKpiCard,
  FkPageHeader,
  FkPageTransition,
  FkSearchInput,
  FkStatusBadge,
} from "@/components/flipkart/fk-ui";
import { FLIPKART_RETURNS, type FlipkartReturn } from "@/lib/demo/flipkart";
import { formatDate } from "@/lib/date";

const TABS = ["all", "pending", "approved", "completed", "rejected"] as const;

export function FlipkartReturnsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<(typeof TABS)[number]>("all");

  const filtered = useMemo(() => {
    return FLIPKART_RETURNS.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      const q = search.toLowerCase();
      if (q && !r.returnId.toLowerCase().includes(q) && !r.orderId.toLowerCase().includes(q) && !r.productName.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, status]);

  const pending = FLIPKART_RETURNS.filter((r) => r.status === "pending").length;
  const totalAmount = FLIPKART_RETURNS.reduce((s, r) => s + r.amount, 0);

  return (
    <FkPageTransition>
      <FkPageHeader title="Returns" subtitle="Manage customer return requests" actions={<FkButton variant="outline">Export</FkButton>} />

      <FkCard style={{ padding: "16px 20px", marginBottom: 20, background: "linear-gradient(135deg, rgba(40,116,240,0.08) 0%, rgba(0,83,226,0.04) 100%)", border: "1px solid rgba(40,116,240,0.15)" }}>
        <p style={{ margin: 0, fontSize: 13, color: "var(--fk-text)", lineHeight: 1.55 }}>
          Approve or reject return requests within <strong>48 hours</strong>. Flipkart will arrange reverse pickup for approved returns.
        </p>
      </FkCard>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <FkKpiCard label="Pending Returns" value={String(pending)} change={-8} icon={Clock} sparkline={[4, 3, 5, 3, 2, 3, pending]} tone="yellow" />
        <FkKpiCard label="Total Returns" value={String(FLIPKART_RETURNS.length)} change={2.1} icon={RotateCcw} sparkline={[8, 9, 10, 11, 11, 12, FLIPKART_RETURNS.length]} tone="blue" />
        <FkKpiCard label="Return Value" value={`₹${totalAmount.toLocaleString("en-IN")}`} change={-1.4} icon={TrendingDown} sparkline={[3, 3, 2, 3, 2, 3, 3]} tone="red" />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        {TABS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            style={{
              padding: "8px 14px",
              border: "1px solid var(--fk-border)",
              background: status === s ? "var(--fk-blue-light)" : "var(--fk-card-bg)",
              color: status === s ? "var(--fk-blue)" : "var(--fk-text-muted)",
              borderRadius: "var(--fk-radius-sm)",
              fontSize: 13,
              fontWeight: status === s ? 600 : 500,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {s}
          </button>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <FkSearchInput value={search} onChange={setSearch} placeholder="Search returns..." />
        </div>
      </div>

      <FkDataTable<FlipkartReturn>
        data={filtered}
        pageSize={5}
        bulkActions={<FkButton variant="outline" style={{ padding: "6px 12px", fontSize: 12 }}>Bulk Approve</FkButton>}
        columns={[
          { key: "returnId", label: "Return ID", sortable: true, render: (r) => <span style={{ fontFamily: "monospace", fontSize: 12 }}>{r.returnId}</span> },
          { key: "orderId", label: "Order ID", sortable: true, render: (r) => <span style={{ fontFamily: "monospace", fontSize: 12 }}>{r.orderId}</span> },
          { key: "productName", label: "Product", sortable: true },
          { key: "reason", label: "Reason", sortable: true },
          { key: "date", label: "Date", sortable: true, render: (r) => formatDate(r.date) },
          { key: "amount", label: "Amount", sortable: true, render: (r) => `₹${r.amount.toLocaleString("en-IN")}` },
          { key: "status", label: "Status", render: (r) => <FkStatusBadge status={r.status} /> },
          {
            key: "action",
            label: "Action",
            render: (r) =>
              r.status === "pending" ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <FkButton style={{ padding: "6px 12px", fontSize: 12 }}>Approve</FkButton>
                  <FkButton variant="outline" style={{ padding: "6px 12px", fontSize: 12 }}>Reject</FkButton>
                </div>
              ) : (
                "—"
              ),
          },
        ]}
      />
    </FkPageTransition>
  );
}
