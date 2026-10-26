"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { MsIconHeadset, MsIconSearch } from "@/components/meesho/meesho-icons";
import { meeshoRoutes } from "@/config/meesho-routes";
import { MEESHO_CATALOG_UPLOADS } from "@/lib/demo/meesho";
import { formatDate } from "@/lib/date";

const QC_FILTERS = [
  { id: "all", label: "All" },
  { id: "action_required", label: "Action Required (0)" },
  { id: "qc_progress", label: "QC in Progress (0)" },
  { id: "qc_error", label: "QC Error (0)" },
  { id: "qc_pass", label: "QC Pass (0)" },
] as const;

export function MeeshoCatalogPage() {
  const [tab, setTab] = useState<"bulk" | "single">("bulk");
  const [qcFilter, setQcFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const bulkCount = MEESHO_CATALOG_UPLOADS.filter((u) => u.type === "bulk").length;
  const singleCount = MEESHO_CATALOG_UPLOADS.filter((u) => u.type === "single").length;

  const filtered = useMemo(() => {
    return MEESHO_CATALOG_UPLOADS.filter((item) => {
      if (item.type !== tab) return false;
      if (qcFilter !== "all" && item.status !== qcFilter) return false;
      if (category !== "all" && item.category !== category) return false;
      if (search && !item.fileId.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [tab, qcFilter, category, search]);

  const categories = [...new Set(MEESHO_CATALOG_UPLOADS.map((u) => u.category))];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Upload Catalog</h1>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "var(--ms-text-muted)" }}>▶ Learn how to upload catalogs</span>
          <Link href={meeshoRoutes.help} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ms-purple)", textDecoration: "none" }}>
            <MsIconHeadset size={16} color="var(--ms-purple)" />
            Need Help?
          </Link>
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: "16px 20px",
          borderRadius: "var(--ms-radius-lg)",
          background: "linear-gradient(90deg, var(--ms-promo-bg-start) 0%, var(--ms-promo-bg-end) 100%)",
          border: "1px solid var(--ms-promo-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "var(--ms-text)", maxWidth: 720, lineHeight: 1.5 }}>
          Get upto 50% more orders + upto 10% lesser returns. Add/edit the catalogs and improve the quality. Plus, prevent catalogs from deactivations/low visibility *T&amp;C
        </p>
        <button
          type="button"
          className="meesho-btn-primary"
          style={{
            padding: "10px 18px",
            background: "var(--ms-purple)",
            color: "var(--ms-card-bg)",
            border: "none",
            borderRadius: "var(--ms-radius-sm)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Improve products here
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
        <button type="button" className="meesho-btn-primary" style={primaryBtn}>Add Catalog in Bulk</button>
        <button type="button" className="meesho-btn-outline" style={outlineBtn}>Add Single Catalog</button>
      </div>

      <p style={{ margin: "24px 0 12px", fontSize: 13, color: "var(--ms-text-muted)" }}>Overview</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {[
          { label: "Total Uploads Done", value: MEESHO_CATALOG_UPLOADS.length },
          { label: "Using Bulk Uploads", value: bulkCount },
          { label: "Using Single Uploads", value: singleCount },
        ].map((card) => (
          <div key={card.label} style={overviewCard}>
            <p style={{ margin: 0, fontSize: 12, color: "var(--ms-text-muted)" }}>{card.label}</p>
            <p style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 600 }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, borderBottom: "1px solid var(--ms-border)", display: "flex", gap: 24 }}>
        {(["bulk", "single"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              padding: "12px 4px",
              background: "none",
              border: "none",
              borderBottom: tab === t ? "2px solid var(--ms-purple)" : "2px solid transparent",
              color: tab === t ? "var(--ms-purple)" : "var(--ms-text-muted)",
              fontWeight: tab === t ? 600 : 400,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {t === "bulk" ? `Bulk Uploads (${bulkCount})` : `Single Uploads (${singleCount})`}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {QC_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setQcFilter(f.id)}
            style={{
              padding: "8px 14px",
              borderRadius: 6,
              border: "1px solid var(--ms-border)",
              background: qcFilter === f.id ? "var(--ms-filter-active-bg)" : "var(--ms-card-bg)",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
          Filter by:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid var(--ms-border)", borderRadius: 6, fontSize: 13 }}
          >
            <option value="all">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <div style={{ marginLeft: "auto", position: "relative", minWidth: 220 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By File Id"
            style={{ width: "100%", padding: "9px 36px 9px 12px", border: "1px solid var(--ms-border)", borderRadius: 6, fontSize: 13 }}
          />
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
            <MsIconSearch size={16} color="var(--ms-icon-muted)" />
          </span>
        </div>
      </div>

      <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--ms-yellow-banner)", border: "1px solid var(--ms-yellow-banner-border)", borderRadius: "var(--ms-radius-md)", fontSize: 13 }}>
        💡 QC (Quality-Check) error products can now be fixed as they appear. Try to fix QC errors faster to speed up your catalog creation process.
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--ms-text-muted)" }}>
          <p style={{ fontSize: 40, margin: "0 0 12px" }}>🔍</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: "var(--ms-text)", margin: "0 0 8px" }}>No Results</p>
          <p style={{ margin: 0, fontSize: 14 }}>
            No {tab === "bulk" ? "Bulk" : "Single"} catalogs exist. Upload a new catalog using {tab === "bulk" ? "Bulk" : "Single"} upload button on the top
          </p>
        </div>
      ) : (
        <div style={{ marginTop: 16, background: "var(--ms-card-bg)", border: "1px solid var(--ms-border)", borderRadius: "var(--ms-radius-lg)", overflow: "hidden", boxShadow: "var(--ms-shadow-card)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--ms-table-header-bg)", textAlign: "left" }}>
                {["File ID", "Category", "Products", "Status", "Uploaded"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", fontWeight: 500, color: "var(--ms-text-muted)", borderBottom: "1px solid var(--ms-border)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid var(--ms-border)" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>{row.fileId}</td>
                  <td style={{ padding: "12px 16px" }}>{row.category}</td>
                  <td style={{ padding: "12px 16px" }}>{row.products}</td>
                  <td style={{ padding: "12px 16px" }}>{row.status.replace(/_/g, " ")}</td>
                  <td style={{ padding: "12px 16px" }}>{formatDate(row.uploadedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  padding: "11px 20px",
  background: "var(--ms-purple)",
  color: "var(--ms-card-bg)",
  border: "none",
  borderRadius: "var(--ms-radius-sm)",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const outlineBtn: React.CSSProperties = {
  padding: "11px 20px",
  background: "var(--ms-card-bg)",
  color: "var(--ms-purple)",
  border: "1px solid var(--ms-purple)",
  borderRadius: "var(--ms-radius-sm)",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const overviewCard: React.CSSProperties = {
  background: "var(--ms-card-bg)",
  border: "1px solid var(--ms-border)",
  borderRadius: "var(--ms-radius-lg)",
  padding: "16px 18px",
  boxShadow: "var(--ms-shadow-card)",
};
