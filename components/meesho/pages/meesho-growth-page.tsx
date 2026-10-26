"use client";

import Link from "next/link";

import { MsIconChevronRight, MsIconHeadset } from "@/components/meesho/meesho-icons";
import { meeshoRoutes } from "@/config/meesho-routes";
import { MEESHO_GROWTH_METRICS, MEESHO_LEARN_ITEMS } from "@/lib/demo/meesho";

export function MeeshoGrowthPage() {
  const metrics = [
    { label: "Product Views (7d)", value: MEESHO_GROWTH_METRICS.views7d.toLocaleString("en-IN") },
    { label: "Orders (7d)", value: String(MEESHO_GROWTH_METRICS.orders7d) },
    { label: "Revenue (7d)", value: `₹${MEESHO_GROWTH_METRICS.revenue7d.toLocaleString("en-IN")}` },
    { label: "Conversion Rate", value: `${MEESHO_GROWTH_METRICS.conversion}%` },
    { label: "Catalog Quality Score", value: `${MEESHO_GROWTH_METRICS.catalogScore}/100` },
    { label: "Return Rate", value: `${MEESHO_GROWTH_METRICS.returnRate}%` },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Business Dashboard</h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--ms-text-muted)" }}>Performance overview for the last 7 days</p>
        </div>
        <Link href={meeshoRoutes.help} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ms-purple)", textDecoration: "none" }}>
          <MsIconHeadset size={16} color="var(--ms-purple)" />
          Need Help?
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 24 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ background: "var(--ms-card-bg)", border: "1px solid var(--ms-border)", borderRadius: 8, padding: "16px 18px" }}>
            <p style={{ margin: 0, fontSize: 12, color: "var(--ms-text-muted)" }}>{m.label}</p>
            <p style={{ margin: "8px 0 0", fontSize: 22, fontWeight: 600 }}>{m.value}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28, background: "var(--ms-card-bg)", border: "1px solid var(--ms-border)", borderRadius: 10, padding: "20px 22px" }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 600 }}>Learn &amp; Grow On Meesho</h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {MEESHO_LEARN_ITEMS.map((item) => (
            <li key={item.id} style={{ borderTop: "1px solid var(--ms-border)", padding: "14px 0" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>
                  {item.icon === "youtube" ? "▶" : item.icon === "training" ? "📖" : item.icon === "pricing" ? "%" : "🚚"}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{item.title}</span>
                    {item.badge ? (
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: "var(--ms-green-badge-bg)", color: "var(--ms-green-badge-text)", fontWeight: 600 }}>
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--ms-text-muted)" }}>{item.description}</p>
                </div>
                <MsIconChevronRight color="var(--ms-icon-muted)" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
