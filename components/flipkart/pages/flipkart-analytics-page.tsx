"use client";

import { useMemo, useState } from "react";

import { FkBarChartSimple, FkCard, FkCategoryChart, FkDataTable, FkPageHeader, FkSearchInput, FkTrafficChart } from "@/components/flipkart/fk-ui";
import { FLIPKART_CUSTOMERS, FLIPKART_DASHBOARD } from "@/lib/demo/flipkart";
import { formatDate } from "@/lib/date";

export function FlipkartAnalyticsPage() {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    if (!search) return FLIPKART_CUSTOMERS;
    const q = search.toLowerCase();
    return FLIPKART_CUSTOMERS.filter((c) => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q));
  }, [search]);

  return (
    <div>
      <FkPageHeader title="Analytics" subtitle="Deep-dive into store performance and customer behavior" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 24 }}>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Traffic Sources</h2>
          <FkTrafficChart data={FLIPKART_DASHBOARD.trafficSources} />
        </FkCard>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Category Performance</h2>
          <FkCategoryChart data={FLIPKART_DASHBOARD.categorySplit} />
        </FkCard>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Order Funnel</h2>
          <FkBarChartSimple data={FLIPKART_DASHBOARD.orderStatusSplit} dataKey="value" label="%" />
        </FkCard>
      </div>

      <h2 style={{ margin: "32px 0 16px", fontSize: 20, fontWeight: 700 }}>Customer Insights</h2>
      <div style={{ marginBottom: 16, maxWidth: 320 }}>
        <FkSearchInput value={search} onChange={setSearch} placeholder="Search customers..." />
      </div>
      <FkDataTable
        data={filteredCustomers}
        pageSize={5}
        columns={[
          { key: "name", label: "Customer", sortable: true },
          { key: "city", label: "City", sortable: true },
          { key: "orders", label: "Orders", sortable: true },
          { key: "spent", label: "Total Spent", sortable: true, render: (c) => `₹${c.spent.toLocaleString("en-IN")}` },
          { key: "lastOrder", label: "Last Order", sortable: true, render: (c) => formatDate(c.lastOrder) },
          { key: "rating", label: "Rating", render: (c) => `⭐ ${c.rating}` },
        ]}
      />
    </div>
  );
}
