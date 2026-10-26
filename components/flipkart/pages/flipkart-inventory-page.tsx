"use client";

import Image from "next/image";
import { AlertTriangle, Boxes, PackageX } from "lucide-react";
import { useMemo, useState } from "react";

import {
  FkButton,
  FkDataTable,
  FkKpiCard,
  FkPageHeader,
  FkPageTransition,
  FkSearchInput,
  FkSelect,
  FkStatusBadge,
} from "@/components/flipkart/fk-ui";
import { FLIPKART_PRODUCTS, type FlipkartProduct } from "@/lib/demo/flipkart";

export function FlipkartInventoryPage() {
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  const filtered = useMemo(() => {
    return FLIPKART_PRODUCTS.filter((p) => {
      const q = search.toLowerCase();
      if (q && !p.title.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) return false;
      if (stockFilter === "out" && p.stock > 0) return false;
      if (stockFilter === "low" && (p.stock === 0 || p.stock >= 30)) return false;
      if (stockFilter === "healthy" && p.stock < 30) return false;
      return true;
    });
  }, [search, stockFilter]);

  const totalUnits = FLIPKART_PRODUCTS.reduce((s, p) => s + p.stock, 0);
  const outOfStock = FLIPKART_PRODUCTS.filter((p) => p.stock === 0).length;
  const lowStock = FLIPKART_PRODUCTS.filter((p) => p.stock > 0 && p.stock < 30).length;

  return (
    <FkPageTransition>
      <FkPageHeader
        title="Inventory"
        subtitle={`${totalUnits.toLocaleString("en-IN")} total units across ${FLIPKART_PRODUCTS.length} SKUs`}
        actions={<FkButton variant="outline">Export CSV</FkButton>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        <FkKpiCard label="Total Units" value={totalUnits.toLocaleString("en-IN")} change={4.2} icon={Boxes} sparkline={[820, 840, 860, 880, 900, 920, totalUnits % 1000]} tone="blue" />
        <FkKpiCard label="Low Stock SKUs" value={String(lowStock)} change={-12} icon={AlertTriangle} sparkline={[5, 4, 6, 3, 4, 3, lowStock]} tone="yellow" />
        <FkKpiCard label="Out of Stock" value={String(outOfStock)} change={0} icon={PackageX} sparkline={[2, 1, 2, 1, 1, 2, outOfStock]} tone="red" />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { id: "all", label: `All (${FLIPKART_PRODUCTS.length})` },
          { id: "healthy", label: "Healthy Stock" },
          { id: "low", label: `Low Stock (${lowStock})` },
          { id: "out", label: `Out of Stock (${outOfStock})` },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setStockFilter(t.id)}
            style={{
              padding: "8px 14px",
              border: "1px solid var(--fk-border)",
              background: stockFilter === t.id ? "var(--fk-blue-light)" : "var(--fk-card-bg)",
              color: stockFilter === t.id ? "var(--fk-blue)" : "var(--fk-text-muted)",
              borderRadius: "var(--fk-radius-sm)",
              fontSize: 13,
              fontWeight: stockFilter === t.id ? 600 : 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <FkSearchInput value={search} onChange={setSearch} placeholder="Search SKU or product..." />
        <FkSelect value="all" onChange={() => {}} label="Warehouse" options={[{ value: "all", label: "Mumbai Bhiwandi FC" }]} />
      </div>

      <FkDataTable<FlipkartProduct>
        data={filtered}
        pageSize={6}
        bulkActions={<FkButton variant="outline" style={{ padding: "6px 12px", fontSize: 12 }}>Bulk Restock</FkButton>}
        columns={[
          {
            key: "title",
            label: "Product",
            sortable: true,
            render: (p) => (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Image src={p.imageUrl} alt={p.title} width={44} height={44} style={{ objectFit: "cover", borderRadius: 8, border: "1px solid var(--fk-border)" }} />
                <span style={{ fontWeight: 500, maxWidth: 220 }}>{p.title.length > 45 ? `${p.title.slice(0, 45)}…` : p.title}</span>
              </div>
            ),
          },
          { key: "sku", label: "SKU", sortable: true, render: (p) => <span style={{ fontFamily: "monospace", fontSize: 12 }}>{p.sku}</span> },
          { key: "fulfillment", label: "Fulfillment", sortable: true },
          {
            key: "stock",
            label: "Available",
            sortable: true,
            render: (p) => (
              <input
                defaultValue={p.stock}
                style={{ width: 60, padding: "6px 10px", border: "1px solid var(--fk-border)", borderRadius: 6, fontSize: 13, background: "var(--fk-card-bg)" }}
              />
            ),
          },
          {
            key: "reserved",
            label: "Reserved",
            render: (p) => Math.floor(p.stock * 0.08),
          },
          {
            key: "daysCover",
            label: "Days Cover",
            sortable: true,
            render: (p) => (p.stock === 0 ? "—" : `${Math.max(1, Math.floor(p.stock / Math.max(p.orders7d / 7, 0.5)))} days`),
          },
          {
            key: "status",
            label: "Status",
            render: (p) => <FkStatusBadge status={p.stock === 0 ? "out_of_stock" : p.status} />,
          },
        ]}
      />
    </FkPageTransition>
  );
}
