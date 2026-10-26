"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { MsIconHeadset, MsIconSearch } from "@/components/meesho/meesho-icons";
import { meeshoRoutes } from "@/config/meesho-routes";
import { MEESHO_RETURNS } from "@/lib/demo/meesho";
import { formatDate } from "@/lib/date";

const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "completed", label: "Completed" },
] as const;

export function MeeshoReturnsPage() {
  const [tab, setTab] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return MEESHO_RETURNS.filter((r) => {
      if (tab !== "all" && r.status !== tab) return false;
      const q = search.toLowerCase();
      if (
        q &&
        !r.returnId.toLowerCase().includes(q) &&
        !r.orderId.toLowerCase().includes(q) &&
        !r.productName.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [tab, search]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Returns</h1>
        <Link href={meeshoRoutes.help} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ms-purple)", textDecoration: "none" }}>
          <MsIconHeadset size={16} color="var(--ms-purple)" />
          Need Help?
        </Link>
      </div>

      <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 8, background: "var(--ms-yellow-banner)", fontSize: 13, lineHeight: 1.5 }}>
        Returns are picked up by Meesho logistics partners. Approve or reject return requests within 48 hours to avoid auto-approval.
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap", alignItems: "center" }}>
        {STATUS_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            style={{
              padding: "8px 14px",
              borderRadius: 6,
              border: "1px solid var(--ms-border)",
              background: tab === t.id ? "var(--ms-filter-active-bg)" : "#fff",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", position: "relative", minWidth: 240 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Return ID / Order ID"
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
              {["Return ID", "Order ID", "Product", "Reason", "Date", "Amount", "Status", "Action"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", fontWeight: 500, color: "var(--ms-text-muted)", borderBottom: "1px solid var(--ms-border)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: "48px 16px", textAlign: "center", color: "var(--ms-text-muted)" }}>
                  No returns match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid var(--ms-border)" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>{row.returnId}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>{row.orderId}</td>
                  <td style={{ padding: "12px 16px" }}>{row.productName}</td>
                  <td style={{ padding: "12px 16px" }}>{row.reason}</td>
                  <td style={{ padding: "12px 16px" }}>{formatDate(row.date)}</td>
                  <td style={{ padding: "12px 16px" }}>₹{row.amount.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "12px 16px", textTransform: "capitalize" }}>{row.status}</td>
                  <td style={{ padding: "12px 16px" }}>
                    {row.status === "pending" ? (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button type="button" style={actionBtn("approve")}>Approve</button>
                        <button type="button" style={actionBtn("reject")}>Reject</button>
                      </div>
                    ) : (
                      <span style={{ color: "var(--ms-text-muted)", fontSize: 12 }}>—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function actionBtn(type: "approve" | "reject"): React.CSSProperties {
  return {
    padding: "6px 12px",
    borderRadius: 6,
    border: type === "approve" ? "1px solid var(--ms-purple)" : "1px solid var(--ms-border)",
    background: type === "approve" ? "var(--ms-purple)" : "#fff",
    color: type === "approve" ? "#fff" : "var(--ms-text)",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  };
}
