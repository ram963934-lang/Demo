"use client";

import { useMemo, useState } from "react";

import { FkCard, FkDataTable, FkPageHeader, FkSearchInput, FkStatCard } from "@/components/flipkart/fk-ui";
import { FLIPKART_CUSTOMERS } from "@/lib/demo/flipkart";
import { formatDate } from "@/lib/date";

export function FlipkartCustomersPage() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search) return FLIPKART_CUSTOMERS;
    const q = search.toLowerCase();
    return FLIPKART_CUSTOMERS.filter((c) => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q));
  }, [search]);

  const totalSpent = FLIPKART_CUSTOMERS.reduce((s, c) => s + c.spent, 0);

  return (
    <div>
      <FkPageHeader title="Customers" subtitle="Manage relationships and repeat buyers" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
        <FkStatCard label="Total Customers" value={String(FLIPKART_CUSTOMERS.length)} delta="Active buyers" tone="blue" />
        <FkStatCard label="Lifetime Value" value={`₹${totalSpent.toLocaleString("en-IN")}`} delta="All time" tone="green" />
        <FkStatCard label="Avg Rating" value="4.2" delta="Customer satisfaction" tone="yellow" />
      </div>

      <div style={{ marginBottom: 16, maxWidth: 320 }}>
        <FkSearchInput value={search} onChange={setSearch} placeholder="Search by name or city..." />
      </div>

      <FkDataTable
        data={filtered}
        pageSize={5}
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "city", label: "City", sortable: true },
          { key: "orders", label: "Orders", sortable: true },
          { key: "spent", label: "Spent", sortable: true, render: (c) => `₹${c.spent.toLocaleString("en-IN")}` },
          { key: "lastOrder", label: "Last Order", sortable: true, render: (c) => formatDate(c.lastOrder) },
          { key: "rating", label: "Rating", render: (c) => `⭐ ${c.rating}` },
        ]}
      />

      <FkCard style={{ padding: 20, marginTop: 24 }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700 }}>Retention Tip</h3>
        <p style={{ margin: 0, fontSize: 14, color: "var(--fk-text-muted)", lineHeight: 1.55 }}>
          Customers who ordered twice in 30 days have 3× higher lifetime value. Consider Flipkart Ads retargeting for repeat buyers.
        </p>
      </FkCard>
    </div>
  );
}
