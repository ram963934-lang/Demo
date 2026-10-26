"use client";

import { Megaphone, MousePointerClick, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

import {
  FkButton,
  FkDataTable,
  FkKpiCard,
  FkPageHeader,
  FkPageTransition,
  FkSearchInput,
  FkStatusBadge,
} from "@/components/flipkart/fk-ui";
import { FLIPKART_ADS } from "@/lib/demo/flipkart";

type AdRow = (typeof FLIPKART_ADS)[number];

export function FlipkartAdsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return FLIPKART_ADS.filter((a) => {
      if (status !== "all" && a.status !== status) return false;
      if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, status]);

  const totalSpend = FLIPKART_ADS.reduce((s, a) => s + a.spend, 0);
  const avgRoas = FLIPKART_ADS.reduce((s, a) => s + a.roas, 0) / FLIPKART_ADS.length;
  const activeCount = FLIPKART_ADS.filter((a) => a.status === "active").length;
  const totalClicks = FLIPKART_ADS.reduce((s, a) => s + a.clicks, 0);

  return (
    <FkPageTransition>
      <FkPageHeader
        title="Flipkart Ads"
        subtitle="Promote listings and grow visibility"
        actions={<FkButton>+ Create Campaign</FkButton>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <FkKpiCard label="Total Spend (7d)" value={`₹${totalSpend.toLocaleString("en-IN")}`} change={6.8} icon={Megaphone} sparkline={[6, 7, 7, 8, 7, 8, 8]} tone="blue" />
        <FkKpiCard label="Avg ROAS" value={`${avgRoas.toFixed(1)}x`} change={14.2} icon={TrendingUp} sparkline={[3.2, 3.4, 3.6, 3.8, 4.0, 4.1, avgRoas]} tone="green" />
        <FkKpiCard label="Active Campaigns" value={String(activeCount)} change={0} icon={MousePointerClick} sparkline={[2, 2, 2, 2, 2, 2, activeCount]} tone="yellow" />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        {["all", "active", "paused"].map((s) => (
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
          <FkSearchInput value={search} onChange={setSearch} placeholder="Search campaigns..." />
        </div>
      </div>

      <FkDataTable<AdRow>
        data={filtered}
        pageSize={5}
        bulkActions={<FkButton variant="outline" style={{ padding: "6px 12px", fontSize: 12 }}>Pause Selected</FkButton>}
        columns={[
          { key: "name", label: "Campaign", sortable: true, render: (a) => <span style={{ fontWeight: 600 }}>{a.name}</span> },
          { key: "type", label: "Type", sortable: true },
          { key: "budget", label: "Budget", sortable: true, render: (a) => `₹${a.budget.toLocaleString("en-IN")}` },
          { key: "spend", label: "Spend", sortable: true, render: (a) => `₹${a.spend.toLocaleString("en-IN")}` },
          { key: "roas", label: "ROAS", sortable: true, render: (a) => <span style={{ fontWeight: 600, color: "var(--fk-success)" }}>{a.roas}x</span> },
          { key: "impressions", label: "Impressions", sortable: true, render: (a) => a.impressions.toLocaleString("en-IN") },
          { key: "clicks", label: "Clicks", sortable: true, render: (a) => a.clicks.toLocaleString("en-IN") },
          { key: "status", label: "Status", render: (a) => <FkStatusBadge status={a.status} /> },
        ]}
      />

      <p style={{ margin: "16px 0 0", fontSize: 12, color: "var(--fk-text-muted)" }}>
        {totalClicks.toLocaleString("en-IN")} total clicks across all campaigns this week
      </p>
    </FkPageTransition>
  );
}
