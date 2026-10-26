"use client";

import { Download, FileText, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import {
  FkButton,
  FkCard,
  FkDataTable,
  FkKpiCard,
  FkPageHeader,
  FkPageTransition,
  FkSearchInput,
} from "@/components/flipkart/fk-ui";
import { FLIPKART_REPORTS } from "@/lib/demo/flipkart";
import { formatDate } from "@/lib/date";

type ReportRow = (typeof FLIPKART_REPORTS)[number];

export function FlipkartReportsPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return FLIPKART_REPORTS;
    const q = search.toLowerCase();
    return FLIPKART_REPORTS.filter((r) => r.name.toLowerCase().includes(q) || r.period.toLowerCase().includes(q));
  }, [search]);

  return (
    <FkPageTransition>
      <FkPageHeader
        title="Reports"
        subtitle="Download and schedule business reports"
        actions={<FkButton><Plus size={16} /> Schedule Report</FkButton>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <FkKpiCard label="Available Reports" value={String(FLIPKART_REPORTS.length)} change={0} icon={FileText} sparkline={[5, 5, 5, 5, 5, 5, 5]} tone="blue" />
        <FkKpiCard label="Generated This Month" value="12" change={20} icon={Download} sparkline={[8, 9, 10, 10, 11, 11, 12]} tone="green" />
      </div>

      <div style={{ marginBottom: 20, maxWidth: 360 }}>
        <FkSearchInput value={search} onChange={setSearch} placeholder="Search reports..." />
      </div>

      <FkDataTable<ReportRow>
        data={filtered}
        pageSize={5}
        columns={[
          { key: "name", label: "Report Name", sortable: true, render: (r) => <span style={{ fontWeight: 600 }}>{r.name}</span> },
          { key: "period", label: "Period", sortable: true },
          { key: "generated", label: "Last Generated", sortable: true, render: (r) => formatDate(r.generated) },
          {
            key: "actions",
            label: "Actions",
            render: () => (
              <div style={{ display: "flex", gap: 8 }}>
                <FkButton variant="outline" style={{ padding: "6px 12px", fontSize: 12 }}>
                  <Download size={14} /> Download
                </FkButton>
                <FkButton variant="ghost" style={{ padding: "6px 12px", fontSize: 12 }}>Schedule</FkButton>
              </div>
            ),
          },
        ]}
      />

      <FkCard style={{ padding: 20, marginTop: 24 }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: "var(--fk-text)" }}>Automated Reports</h3>
        <p style={{ margin: 0, fontSize: 14, color: "var(--fk-text-muted)", lineHeight: 1.55 }}>
          Schedule weekly sales and inventory reports to be emailed every Monday at 9 AM IST.
        </p>
      </FkCard>
    </FkPageTransition>
  );
}
