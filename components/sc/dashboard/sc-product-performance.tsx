"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  IconChevronDown,
  IconInfo,
  IconKebab,
  IconSearch,
  IconSort,
  IconStarOutline,
} from "@/components/sc/sc-icons";
import { routes } from "@/config/routes";
import { UPLOADED_PRODUCT_CATALOG } from "@/lib/demo/products/catalog";

const DASHBOARD_PRODUCTS = UPLOADED_PRODUCT_CATALOG.filter(
  (p) => p.imageFolder === "Bag Pack",
).slice(0, 5);

function Th({ label, sortable = true }: { label: string; sortable?: boolean }) {
  return (
    <th
      style={{
        padding: "10px 12px",
        textAlign: "left",
        fontWeight: 400,
        fontSize: 13,
        color: "#565959",
        background: "#fafafa",
        borderBottom: "1px solid #d5d9d9",
        whiteSpace: "nowrap",
      }}
    >
      <button
        type="button"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          padding: 0,
          font: "inherit",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        {label}
        {sortable ? <IconSort /> : null}
      </button>
    </th>
  );
}

export function ScProductPerformance() {
  return (
    <section className="sc-white-card">
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #d5d9d9" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <h2 className="sc-panel-title">Product Performance</h2>
              <button type="button" className="sc-info-btn" aria-label="Info">
                <IconInfo />
              </button>
            </div>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#565959" }}>Last 30 days</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <button type="button" style={filterBtn}>
              Active <IconChevronDown size={11} color="#565959" />
            </button>
            <button type="button" style={filterBtn}>
              Frequently Interacted <IconChevronDown size={11} color="#565959" />
            </button>
            <div style={{ display: "flex" }}>
              <input
                readOnly
                placeholder="Search"
                style={{
                  width: 118,
                  height: 32,
                  padding: "0 10px",
                  border: "1px solid #d5d9d9",
                  borderRight: "none",
                  borderRadius: "3px 0 0 3px",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <button
                type="button"
                aria-label="Search"
                style={{
                  width: 36,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#232f3e",
                  border: "1px solid #232f3e",
                  borderRadius: "0 3px 3px 0",
                  cursor: "pointer",
                }}
              >
                <IconSearch />
              </button>
            </div>
            <button type="button" className="sc-kebab-btn" style={{ width: 32, height: 32 }} aria-label="More">
              <IconKebab />
            </button>
            <button type="button" className="sc-kebab-btn" style={{ width: 32, height: 32 }} aria-label="Collapse">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#565959" strokeWidth="2">
                <path d="M4 10l4-4 4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 920, fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ width: 36, padding: "10px 12px", background: "#fafafa", borderBottom: "1px solid #d5d9d9" }}>
                <IconStarOutline />
              </th>
              <Th label="Product details" />
              <Th label="Listing status" />
              <Th label="Sales" />
              <Th label="Units sold" />
              <Th label="Page views" />
              <Th label="Inventory" />
              <Th label="Price" />
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  fontWeight: 400,
                  fontSize: 13,
                  color: "#565959",
                  background: "#fafafa",
                  borderBottom: "1px solid #d5d9d9",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {DASHBOARD_PRODUCTS.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #e7e7e7", height: 72 }}>
                <td style={{ padding: "11px 12px", verticalAlign: "middle" }}>
                  <button type="button" style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                    <IconStarOutline />
                  </button>
                </td>
                <td style={{ padding: "11px 12px", verticalAlign: "middle" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      width={40}
                      height={40}
                      quality={90}
                      sizes="40px"
                      style={{ width: 40, height: 40, border: "1px solid #e7e7e7", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <Link href={routes.seller.productDetail(p.id)} className="sc-link" style={{ fontSize: 13, lineHeight: 1.35, textDecoration: "none" }}>
                        {p.name.length > 32 ? `${p.name.slice(0, 32)}...` : p.name}
                      </Link>
                      <div style={{ fontSize: 12, color: "#565959", marginTop: 2 }}>ASIN: {p.asin}</div>
                      <div style={{ fontSize: 12, color: "#565959" }}>SKU: {p.sku}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "11px 12px", color: "#0f1111", verticalAlign: "middle" }}>Active</td>
                <td style={{ padding: "11px 12px", color: "#565959", verticalAlign: "middle" }}>--</td>
                <td style={{ padding: "11px 12px", color: "#565959", verticalAlign: "middle" }}>--</td>
                <td style={{ padding: "11px 12px", color: "#565959", verticalAlign: "middle" }}>--</td>
                <td style={{ padding: "11px 12px", color: "#0f1111", verticalAlign: "middle" }}>{p.stock} {p.fulfillment}</td>
                <td style={{ padding: "11px 12px", color: "#0f1111", verticalAlign: "middle" }}>₹{p.price.toFixed(2)}</td>
                <td style={{ padding: "11px 12px", verticalAlign: "middle" }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const filterBtn: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  height: 32,
  padding: "0 10px",
  background: "#fff",
  border: "1px solid #d5d9d9",
  borderRadius: 3,
  fontSize: 13,
  color: "#0f1111",
  cursor: "pointer",
};
