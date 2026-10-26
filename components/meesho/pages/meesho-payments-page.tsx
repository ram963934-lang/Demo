"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { MsIconHeadset, MsIconSearch } from "@/components/meesho/meesho-icons";
import { meeshoRoutes } from "@/config/meesho-routes";
import { MEESHO_PAYMENTS } from "@/lib/demo/meesho";
import { formatDate } from "@/lib/date";

const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "scheduled", label: "Scheduled" },
  { id: "processing", label: "Processing" },
] as const;

export function MeeshoPaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return MEESHO_PAYMENTS.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (search && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [statusFilter, search]);

  const totalCompleted = MEESHO_PAYMENTS.filter((p) => p.status === "completed").reduce((s, p) => s + p.amount, 0);
  const nextPayout = MEESHO_PAYMENTS.find((p) => p.status === "scheduled");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Payments</h1>
        <Link href={meeshoRoutes.help} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ms-purple)", textDecoration: "none" }}>
          <MsIconHeadset size={16} color="var(--ms-purple)" />
          Need Help?
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 20 }}>
        <div style={statCard}>
          <p style={{ margin: 0, fontSize: 12, color: "var(--ms-text-muted)" }}>Total Settled</p>
          <p style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 600 }}>₹{totalCompleted.toLocaleString("en-IN")}</p>
        </div>
        <div style={statCard}>
          <p style={{ margin: 0, fontSize: 12, color: "var(--ms-text-muted)" }}>Next Payout</p>
          <p style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 600 }}>
            {nextPayout ? `₹${nextPayout.amount.toLocaleString("en-IN")}` : "—"}
          </p>
          {nextPayout ? <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--ms-text-muted)" }}>{formatDate(nextPayout.date)}</p> : null}
        </div>
        <div style={statCard}>
          <p style={{ margin: 0, fontSize: 12, color: "var(--ms-text-muted)" }}>Settlement Cycle</p>
          <p style={{ margin: "8px 0 0", fontSize: 16, fontWeight: 600 }}>Weekly (Every Friday)</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setStatusFilter(f.id)}
            style={{
              padding: "8px 14px",
              borderRadius: 6,
              border: "1px solid var(--ms-border)",
              background: statusFilter === f.id ? "var(--ms-filter-active-bg)" : "#fff",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", position: "relative", minWidth: 220 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions"
            style={{ width: "100%", padding: "9px 36px 9px 12px", border: "1px solid var(--ms-border)", borderRadius: 6, fontSize: 13 }}
          />
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
            <MsIconSearch size={16} color="var(--ms-icon-muted)" />
          </span>
        </div>
      </div>

      <div style={{ marginTop: 16, background: "var(--ms-card-bg)", border: "1px solid var(--ms-border)", borderRadius: 8, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--ms-table-header-bg)", textAlign: "left" }}>
              {["Date", "Description", "Amount", "Status"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", fontWeight: 500, color: "var(--ms-text-muted)", borderBottom: "1px solid var(--ms-border)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid var(--ms-border)" }}>
                <td style={{ padding: "12px 16px" }}>{formatDate(row.date)}</td>
                <td style={{ padding: "12px 16px" }}>{row.description}</td>
                <td style={{ padding: "12px 16px", color: row.amount < 0 ? "#dc2626" : "var(--ms-text)", fontWeight: 500 }}>
                  {row.amount < 0 ? "-" : ""}₹{Math.abs(row.amount).toLocaleString("en-IN")}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={statusPill(row.status)}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const statCard: React.CSSProperties = {
  background: "var(--ms-card-bg)",
  border: "1px solid var(--ms-border)",
  borderRadius: 8,
  padding: "16px 18px",
};

function statusPill(status: string): React.CSSProperties {
  const colors: Record<string, { bg: string; text: string }> = {
    completed: { bg: "var(--ms-green-badge-bg)", text: "var(--ms-green-badge-text)" },
    scheduled: { bg: "#fef3c7", text: "#92400e" },
    processing: { bg: "#e0e7ff", text: "#3730a3" },
  };
  const c = colors[status] ?? { bg: "var(--ms-filter-active-bg)", text: "#374151" };
  return {
    fontSize: 11,
    padding: "3px 10px",
    borderRadius: 12,
    background: c.bg,
    color: c.text,
    fontWeight: 600,
    textTransform: "capitalize",
  };
}
