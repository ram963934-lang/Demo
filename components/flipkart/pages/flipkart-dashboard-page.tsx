"use client";

import Link from "next/link";
import {
  Eye,
  IndianRupee,
  Package,
  RotateCcw,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

import {
  FkBarChartSimple,
  FkButton,
  FkCard,
  FkCategoryChart,
  FkKpiCard,
  FkMonthlySalesChart,
  FkPageHeader,
  FkRevenueChart,
  FkTrafficChart,
} from "@/components/flipkart/fk-ui";
import { flipkartRoutes } from "@/config/flipkart-routes";
import { FLIPKART_DASHBOARD, FLIPKART_ORDERS, FLIPKART_PRODUCTS, FLIPKART_SELLER } from "@/lib/demo/flipkart";

const SPARK = {
  sales: [18, 22, 20, 28, 32, 30, 36],
  revenue: [12, 18, 16, 24, 28, 26, 32],
  orders: [8, 12, 10, 16, 18, 14, 20],
  visitors: [20, 24, 22, 28, 30, 26, 34],
  conversion: [2, 2.4, 2.8, 3, 3.2, 3.1, 3.2],
  wallet: [30, 32, 34, 36, 38, 40, 42],
  returns: [4, 3, 5, 4, 3, 2, 3],
  cancelled: [2, 3, 2, 1, 2, 1, 1],
};

export function FlipkartDashboardPage() {
  const k = FLIPKART_DASHBOARD.kpis;
  const newOrders = FLIPKART_ORDERS.filter((o) => o.status === "new").length;
  const lowStock = FLIPKART_PRODUCTS.filter((p) => p.stock > 0 && p.stock < 30).length;

  return (
    <div>
      <FkPageHeader
        title={`Welcome back, ${FLIPKART_SELLER.storeName}`}
        subtitle={`Seller ID ${FLIPKART_SELLER.sellerId} · ⭐ ${FLIPKART_SELLER.rating} rating · Real-time overview`}
        actions={<FkButton href={flipkartRoutes.listings}>+ Add Listing</FkButton>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginBottom: 28 }}>
        <FkKpiCard label="Today's Sales" value={`₹${k.todaySales.toLocaleString("en-IN")}`} change={14.2} icon={IndianRupee} sparkline={SPARK.sales} tone="blue" />
        <FkKpiCard label="Revenue (7d)" value={`₹${(k.revenue / 1000).toFixed(1)}k`} change={12.4} icon={TrendingUp} sparkline={SPARK.revenue} tone="green" />
        <FkKpiCard label="Orders" value={String(k.orders)} change={8.6} icon={ShoppingCart} sparkline={SPARK.orders} tone="blue" />
        <FkKpiCard label="Visitors" value={k.visitors.toLocaleString("en-IN")} change={18.3} icon={Eye} sparkline={SPARK.visitors} />
        <FkKpiCard label="Conversion" value={`${k.conversion}%`} change={0.4} icon={TrendingUp} sparkline={SPARK.conversion} tone="green" />
        <FkKpiCard label="Wallet" value={`₹${k.wallet.toLocaleString("en-IN")}`} change={5.2} icon={Wallet} sparkline={SPARK.wallet} tone="yellow" />
        <FkKpiCard label="Returns" value={String(k.returns)} change={-2.1} icon={RotateCcw} sparkline={SPARK.returns} tone="red" />
        <FkKpiCard label="Cancelled" value={String(k.cancelled)} change={-4.5} icon={XCircle} sparkline={SPARK.cancelled} tone="red" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20, marginBottom: 24 }}>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>Revenue Trend</h2>
          <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--fk-text-muted)" }}>Daily revenue & order volume</p>
          <FkRevenueChart data={FLIPKART_DASHBOARD.revenueTrend} />
        </FkCard>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>Monthly Sales</h2>
          <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--fk-text-muted)" }}>6-month performance</p>
          <FkMonthlySalesChart data={FLIPKART_DASHBOARD.monthlySales} />
        </FkCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 24 }}>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Top Categories</h2>
          <FkCategoryChart data={FLIPKART_DASHBOARD.categorySplit} />
        </FkCard>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Traffic Sources</h2>
          <FkTrafficChart data={FLIPKART_DASHBOARD.trafficSources} />
        </FkCard>
        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Order Status</h2>
          <FkBarChartSimple data={FLIPKART_DASHBOARD.orderStatusSplit} dataKey="value" label="Orders %" />
        </FkCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        <FkCard style={{ padding: 22 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}><Package size={18} color="var(--fk-blue)" /> Action Required</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {[
              { href: flipkartRoutes.orders, count: newOrders, text: "new orders awaiting processing" },
              { href: flipkartRoutes.inventory, count: lowStock, text: "SKUs running low on stock" },
              { href: flipkartRoutes.returns, count: 1, text: "return pending approval" },
            ].map((item) => (
              <li key={item.href} style={{ padding: "12px 0", borderBottom: "1px solid var(--fk-border)", fontSize: 14 }}>
                <Link href={item.href} style={{ color: "var(--fk-blue)", fontWeight: 600, textDecoration: "none" }}>{item.count}</Link>
                <span style={{ color: "var(--fk-text-muted)" }}> {item.text}</span>
              </li>
            ))}
          </ul>
        </FkCard>
        <FkCard style={{ padding: 22 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}><Users size={18} color="var(--fk-blue)" /> Top Listings</h3>
          {FLIPKART_PRODUCTS.slice(0, 4).map((p) => (
            <Link key={p.id} href={flipkartRoutes.listingDetail(p.id)} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid var(--fk-border)", textDecoration: "none", color: "inherit", fontSize: 13 }}>
              <span style={{ fontWeight: 500 }}>{p.title.slice(0, 38)}…</span>
              <span style={{ color: "var(--fk-success)", fontWeight: 600 }}>{p.orders7d} orders</span>
            </Link>
          ))}
        </FkCard>
      </div>
    </div>
  );
}
