"use client";

import { LayoutGrid, List } from "lucide-react";
import { useMemo, useState } from "react";

import { FkPageHeader, FkProductCard, FkSearchInput, FkSelect } from "@/components/flipkart/fk-ui";
import { flipkartRoutes } from "@/config/flipkart-routes";
import { FLIPKART_PRODUCTS } from "@/lib/demo/flipkart";

export function FlipkartListingsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const categories = [...new Set(FLIPKART_PRODUCTS.map((p) => p.category))];

  const filtered = useMemo(() => {
    return FLIPKART_PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (status !== "all" && p.status !== status) return false;
      const q = search.toLowerCase();
      if (q && !p.title.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q) && !p.fsn.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, category, status]);

  return (
    <div>
      <FkPageHeader title="Listings" subtitle={`${filtered.length} active products in your catalog`} />

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <FkSearchInput value={search} onChange={setSearch} placeholder="Search by title, SKU, FSN..." />
        <FkSelect value={category} onChange={setCategory} label="Category" options={[{ value: "all", label: "All Categories" }, ...categories.map((c) => ({ value: c, label: c }))]} />
        <FkSelect value={status} onChange={setStatus} label="Status" options={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "out_of_stock", label: "Out of Stock" },
        ]} />
        <div style={{ marginLeft: "auto", display: "flex", gap: 4, background: "var(--fk-card-bg)", border: "1px solid var(--fk-border)", borderRadius: "var(--fk-radius-sm)", padding: 4 }}>
          <button type="button" onClick={() => setView("grid")} style={{ ...viewToggle, background: view === "grid" ? "var(--fk-blue-light)" : "transparent", color: view === "grid" ? "var(--fk-blue)" : "var(--fk-text-muted)" }}><LayoutGrid size={16} /></button>
          <button type="button" onClick={() => setView("list")} style={{ ...viewToggle, background: view === "list" ? "var(--fk-blue-light)" : "transparent", color: view === "list" ? "var(--fk-blue)" : "var(--fk-text-muted)" }}><List size={16} /></button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: view === "grid" ? "repeat(auto-fill, minmax(260px, 1fr))" : "1fr", gap: 20 }}>
        {filtered.map((p) => (
          <FkProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            imageUrl={p.imageUrl}
            price={p.price}
            mrp={p.mrp}
            stock={p.stock}
            orders7d={p.orders7d}
            status={p.status}
            href={flipkartRoutes.listingDetail(p.id)}
          />
        ))}
      </div>
    </div>
  );
}

const viewToggle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 32,
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
