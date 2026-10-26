"use client";

import {
  FkBarChartSimple,
  FkCard,
  FkMonthlySalesChart,
  FkPageHeader,
  FkRevenueChart,
  FkStatCard,
  FkTrafficChart,
} from "@/components/flipkart/fk-ui";
import { FLIPKART_DASHBOARD, FLIPKART_PRODUCTS, FLIPKART_SELLER } from "@/lib/demo/flipkart";

export function FlipkartPerformancePage() {
  const topProducts = [...FLIPKART_PRODUCTS].sort((a, b) => b.orders7d - a.orders7d).slice(0, 5).map((p) => ({
    name: p.title.slice(0, 18),
    orders: p.orders7d,
  }));

  return (
    <div>
      <FkPageHeader title="Performance" subtitle="Track your seller metrics and growth" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        <FkStatCard label="Seller Rating" value={`⭐ ${FLIPKART_SELLER.rating}`} delta="Gold Seller tier" tone="yellow" />
        <FkStatCard label="Conversion Rate" value="3.2%" delta="+0.4% vs last week" tone="green" />
        <FkStatCard label="On-time Dispatch" value="96.8%" delta="Target: 95%" tone="green" />
        <FkStatCard label="Cancellation Rate" value="1.2%" delta="Below threshold" tone="blue" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20, marginBottom: 24 }}>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Revenue Trend</h2>
          <FkRevenueChart data={FLIPKART_DASHBOARD.revenueTrend} />
        </FkCard>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Monthly Sales</h2>
          <FkMonthlySalesChart data={FLIPKART_DASHBOARD.monthlySales} />
        </FkCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 24 }}>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Top Products</h2>
          <FkBarChartSimple data={topProducts} dataKey="orders" label="Orders (7d)" />
        </FkCard>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Traffic Sources</h2>
          <FkTrafficChart data={FLIPKART_DASHBOARD.trafficSources} />
        </FkCard>
      </div>

      <FkCard style={{ padding: 24 }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Health Score Breakdown</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {[
            { label: "Listing Quality", score: 88 },
            { label: "Fulfillment", score: 96 },
            { label: "Customer Service", score: 82 },
            { label: "Returns Management", score: 91 },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                <span style={{ fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: "var(--fk-blue)" }}>{item.score}%</span>
              </div>
              <div style={{ height: 8, background: "#e6eaf0", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ width: `${item.score}%`, height: "100%", background: "linear-gradient(90deg, var(--fk-blue), var(--fk-blue-dark))", borderRadius: 8, transition: "width 0.8s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </FkCard>
    </div>
  );
}
