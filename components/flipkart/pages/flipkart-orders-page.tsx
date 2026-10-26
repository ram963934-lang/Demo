"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { FkButton, FkDataTable, FkPageHeader, FkSearchInput, FkSelect, FkStatusBadge } from "@/components/flipkart/fk-ui";
import { flipkartRoutes } from "@/config/flipkart-routes";
import { FLIPKART_ORDERS, type FlipkartOrder } from "@/lib/demo/flipkart";
import { formatDateTime } from "@/lib/date";

const TABS = ["all", "new", "packed", "shipped", "delivered", "cancelled", "return_requested"] as const;

export function FlipkartOrdersPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");
  const [search, setSearch] = useState("");
  const [fulfillment, setFulfillment] = useState("all");

  const filtered = useMemo(() => {
    return FLIPKART_ORDERS.filter((o) => {
      if (tab !== "all" && o.status !== tab) return false;
      if (fulfillment !== "all" && o.fulfillment !== fulfillment) return false;
      const q = search.toLowerCase();
      if (q && !o.orderId.toLowerCase().includes(q) && !o.productName.toLowerCase().includes(q) && !o.sku.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tab, search, fulfillment]);

  return (
    <div>
      <FkPageHeader title="Orders" subtitle="Manage and fulfill customer orders" actions={<FkButton variant="outline">Export</FkButton>} />

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", borderBottom: "1px solid var(--fk-border)", paddingBottom: 12 }}>
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} style={{ padding: "8px 14px", border: "none", background: tab === t ? "var(--fk-blue-light)" : "transparent", color: tab === t ? "var(--fk-blue)" : "var(--fk-text-muted)", borderRadius: "var(--fk-radius-sm)", fontWeight: tab === t ? 600 : 500, fontSize: 13, cursor: "pointer", textTransform: "capitalize" }}>
            {t.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <FkSearchInput value={search} onChange={setSearch} placeholder="Search order ID, SKU, product..." />
        <FkSelect value={fulfillment} onChange={setFulfillment} label="Fulfillment" options={[
          { value: "all", label: "All" },
          { value: "FBF", label: "Flipkart Fulfilled" },
          { value: "Easy Ship", label: "Easy Ship" },
          { value: "Self Ship", label: "Self Ship" },
        ]} />
      </div>

      <FkDataTable<FlipkartOrder>
        data={filtered}
        pageSize={6}
        bulkActions={<FkButton variant="outline" style={{ padding: "6px 12px", fontSize: 12 }}>Mark Packed</FkButton>}
        columns={[
          { key: "orderId", label: "Order ID", sortable: true, render: (o) => <span style={{ fontFamily: "monospace", fontSize: 12 }}>{o.orderId}</span> },
          { key: "productName", label: "Product", sortable: true },
          { key: "quantity", label: "Qty", sortable: true },
          { key: "amount", label: "Amount", sortable: true, render: (o) => `₹${o.amount.toLocaleString("en-IN")}` },
          { key: "status", label: "Status", render: (o) => <FkStatusBadge status={o.status} /> },
          { key: "orderDate", label: "Date", sortable: true, render: (o) => formatDateTime(o.orderDate) },
          { key: "customerCity", label: "City", sortable: true },
          { key: "id", label: "", render: (o) => <Link href={flipkartRoutes.orderDetail(o.id)} style={{ color: "var(--fk-blue)", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>View →</Link> },
        ]}
      />
    </div>
  );
}
