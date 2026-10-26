"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { MsIconEdit, MsIconMore, MsIconSearch, MsIconUpload } from "@/components/meesho/meesho-icons";
import { meeshoRoutes } from "@/config/meesho-routes";
import { MEESHO_INVENTORY } from "@/lib/demo/meesho";

export function MeeshoInventoryPage() {
  const [primaryTab, setPrimaryTab] = useState("active");
  const [stockTab, setStockTab] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("orders");
  const [selectedId, setSelectedId] = useState(MEESHO_INVENTORY[0]?.id ?? "");

  const filteredCatalogs = useMemo(() => {
    return MEESHO_INVENTORY.filter((cat) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        cat.name.toLowerCase().includes(q) ||
        cat.catalogId.includes(q) ||
        cat.skus.some((s) => s.skuId.toLowerCase().includes(q) || s.styleId.toLowerCase().includes(q));
      const matchesCategory = category === "all" || cat.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const selected = filteredCatalogs.find((c) => c.id === selectedId) ?? filteredCatalogs[0];
  const categories = [...new Set(MEESHO_INVENTORY.map((c) => c.category))];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Inventory</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "var(--ms-text-muted)" }}>▶ How it Works?</span>
          <div style={{ position: "relative", minWidth: 280 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Catalog ID/Style ID/SKU ID"
              style={{ width: "100%", padding: "10px 36px 10px 12px", border: "1px solid var(--ms-border)", borderRadius: 6, fontSize: 13 }}
            />
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
              <MsIconSearch size={16} color="var(--ms-icon-muted)" />
            </span>
          </div>
          <Link href={meeshoRoutes.catalog} className="meesho-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 16px", background: "var(--ms-purple)", color: "var(--ms-card-bg)", borderRadius: "var(--ms-radius-sm)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
            <MsIconUpload size={14} color="var(--ms-card-bg)" />
            Catalog Upload
          </Link>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 20, borderBottom: "1px solid var(--ms-border)", flexWrap: "wrap" }}>
        {[
          { id: "active", label: `Active (${MEESHO_INVENTORY.length})` },
          { id: "pending", label: "Activation Pending (0)" },
          { id: "blocked", label: "Blocked (2)" },
          { id: "paused", label: "Paused (0)" },
        ].map((t) => (
          <button key={t.id} type="button" onClick={() => setPrimaryTab(t.id)} style={tabStyle(primaryTab === t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { id: "all", label: `All Stock (${MEESHO_INVENTORY.length})` },
            { id: "out", label: "Out of Stock (0)" },
            { id: "low", label: "Low Stock (0)" },
          ].map((t) => (
            <button key={t.id} type="button" onClick={() => setStockTab(t.id)} style={tabStyle(stockTab === t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" style={{ ...outlineBtn, fontSize: 13 }}>📊 Bulk Stock Update</button>
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
        <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          Filter by:
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={selectStyle}>
            <option value="all">Select Category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          Sort catalogs by:
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={selectStyle}>
            <option value="orders">Highest Estimated Orders</option>
            <option value="stock">Highest Stock</option>
          </select>
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 280px) 1fr", gap: 0, marginTop: 20, background: "var(--ms-card-bg)", border: "1px solid var(--ms-border)", borderRadius: "var(--ms-radius-lg)", overflow: "hidden", minHeight: 420, boxShadow: "var(--ms-shadow-card)" }}>
        <div style={{ borderRight: "1px solid var(--ms-border)", padding: "16px 0" }}>
          <p style={{ padding: "0 16px 12px", margin: 0, fontSize: 13, fontWeight: 600 }}>Catalog: All Stock</p>
          {filteredCatalogs.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="meesho-catalog-item"
              onClick={() => setSelectedId(cat.id)}
              style={{
                display: "flex",
                gap: 12,
                width: "100%",
                padding: "12px 16px",
                border: "none",
                borderTop: "1px solid var(--ms-border)",
                background: selected?.id === cat.id ? "var(--ms-hover-bg)" : "var(--ms-card-bg)",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <Image src={cat.imageUrl} alt={cat.name} width={48} height={48} style={{ objectFit: "cover", borderRadius: 4, border: "1px solid var(--ms-border)" }} />
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{cat.name}</p>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--ms-text-muted)" }}>Catalog ID: {cat.catalogId}</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--ms-text-muted)" }}>Category: {cat.category}</p>
              </div>
            </button>
          ))}
        </div>

        {selected ? (
          <div style={{ padding: 16, overflowX: "auto" }}>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{selected.name}</h2>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--ms-text-muted)" }}>
                Catalog ID: {selected.catalogId} · Category: {selected.category}
              </p>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 720 }}>
              <thead>
                <tr style={{ background: "var(--ms-table-header-bg)", textAlign: "left" }}>
                  {["", "SKU", "Variation", "Estimated Order Per Day", "Days to Stockout", "Stock", "Actions"].map((h) => (
                    <th key={h || "cb"} style={{ padding: "10px 12px", borderBottom: "1px solid var(--ms-border)", fontWeight: 500, color: "var(--ms-text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selected.skus.map((sku) => (
                  <tr key={sku.id} style={{ borderBottom: "1px solid var(--ms-border)" }}>
                    <td style={{ padding: "12px", width: 36 }}><input type="checkbox" /></td>
                    <td style={{ padding: "12px", minWidth: 260 }}>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Image src={sku.imageUrl} alt={sku.title} width={56} height={56} style={{ objectFit: "cover", border: "1px solid var(--ms-border)" }} />
                        <div>
                          <p style={{ margin: 0, fontSize: 12, fontWeight: 500, lineHeight: 1.35 }}>{sku.title}</p>
                          <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--ms-text-muted)" }}>Style ID: {sku.styleId}</p>
                          <p style={{ margin: "2px 0 0", fontSize: 11, color: "var(--ms-text-muted)" }}>Meesho Price: ₹{sku.meeshoPrice}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px" }}>{sku.variation}</td>
                    <td style={{ padding: "12px" }}>{sku.estimatedOrdersPerDay}</td>
                    <td style={{ padding: "12px" }}>{sku.daysToStockout}</td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 11, color: "var(--ms-text-muted)" }}>Current Stock</span>
                        <input defaultValue={sku.stock} style={{ width: 48, padding: "4px 6px", border: "1px solid var(--ms-border)", borderRadius: 4, fontSize: 12 }} />
                        <MsIconEdit size={12} color="var(--ms-purple)" />
                      </div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <button type="button" style={linkBtn}><MsIconEdit size={12} /> Edit</button>
                        <button type="button" style={linkBtn}><MsIconMore size={14} /> More</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    padding: "10px 4px",
    background: "none",
    border: "none",
    borderBottom: active ? "2px solid var(--ms-purple)" : "2px solid transparent",
    color: active ? "var(--ms-purple)" : "var(--ms-text-muted)",
    fontWeight: active ? 600 : 400,
    fontSize: 13,
    cursor: "pointer",
  };
}

const selectStyle: React.CSSProperties = {
  padding: "8px 12px",
  border: "1px solid var(--ms-border)",
  borderRadius: 6,
  fontSize: 13,
};

const outlineBtn: React.CSSProperties = {
  padding: "8px 14px",
  background: "var(--ms-card-bg)",
  border: "1px solid var(--ms-border)",
  borderRadius: 6,
  cursor: "pointer",
};

const linkBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  background: "none",
  border: "none",
  color: "var(--ms-purple)",
  fontSize: 12,
  cursor: "pointer",
  padding: 0,
};
