"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { MsIconBox, MsIconChevronDown, MsIconSearch } from "@/components/meesho/meesho-icons";
import { MEESHO_ORDERS, type MeeshoOrder, type MeeshoOrderStatus } from "@/lib/demo/meesho";
import { formatDate } from "@/lib/date";

const ORDER_TABS: { id: MeeshoOrderStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "packed", label: "Packed" },
  { id: "shipped", label: "Shipped" },
  { id: "out_for_delivery", label: "Out for Delivery" },
  { id: "delivered", label: "Delivered" },
  { id: "returned", label: "Returned" },
  { id: "cancelled", label: "Cancelled" },
];

type OrderTab = (typeof ORDER_TABS)[number]["id"];

const SEARCH_FIELDS = [
  { id: "orderId", label: "Order ID" },
  { id: "skuId", label: "SKU ID" },
  { id: "productName", label: "Product Name" },
  { id: "customerName", label: "Customer Name" },
  { id: "city", label: "City" },
] as const;

const PAGE_SIZE = 8;

export function MeeshoOrdersPage() {
  const [tab, setTab] = useState<OrderTab>("all");
  const [dateFilter, setDateFilter] = useState("order_date");
  const [paymentFilter, setPaymentFilter] = useState<"all" | "Prepaid" | "COD">("all");
  const [sortBy, setSortBy] = useState<"date_desc" | "date_asc" | "price_desc" | "price_asc">("date_desc");
  const [searchField, setSearchField] = useState<(typeof SEARCH_FIELDS)[number]["id"]>("orderId");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const counts = useMemo(() => {
    const map: Record<OrderTab, number> = {
      all: MEESHO_ORDERS.length,
      pending: 0,
      processing: 0,
      packed: 0,
      shipped: 0,
      out_for_delivery: 0,
      delivered: 0,
      returned: 0,
      cancelled: 0,
    };
    MEESHO_ORDERS.forEach((o) => {
      map[o.status] += 1;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    let rows = MEESHO_ORDERS.filter((order) => {
      if (tab !== "all" && order.status !== tab) return false;
      if (paymentFilter !== "all" && order.paymentType !== paymentFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      const value = String(order[searchField] ?? "");
      return value.toLowerCase().includes(q);
    });

    rows = [...rows].sort((a, b) => {
      if (sortBy === "date_desc") return b.orderDateIso.localeCompare(a.orderDateIso);
      if (sortBy === "date_asc") return a.orderDateIso.localeCompare(b.orderDateIso);
      if (sortBy === "price_desc") return b.amount - a.amount;
      return a.amount - b.amount;
    });

    return rows;
  }, [tab, search, searchField, paymentFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleTabChange = (next: OrderTab) => {
    setTab(next);
    setPage(0);
  };

  const handlePaymentChange = (value: "all" | "Prepaid" | "COD") => {
    setPaymentFilter(value);
    setPage(0);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Orders</h1>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "var(--ms-text-muted)", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#ef4444" }}>▶</span>
            Learn how to process your orders?
          </span>
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              background: "var(--ms-purple)",
              color: "var(--ms-card-bg)",
              border: "none",
              borderRadius: "var(--ms-radius-sm)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Download Orders Data
            <MsIconChevronDown size={14} color="var(--ms-card-bg)" />
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          padding: "16px 20px",
          borderRadius: "var(--ms-radius-lg)",
          background: "var(--ms-alert-bg)",
          border: "1px solid var(--ms-alert-border)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 28 }}>📦</span>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
            Some orders may be put &apos;On-Hold&apos; due to high stress levels among our courier partners.
          </p>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--ms-text-muted)", lineHeight: 1.45 }}>
            These orders will be processed to Pending tab soon. Don&apos;t worry! There will be no order loss and Meesho will not charge any penalties.
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          padding: "14px 18px",
          borderRadius: "var(--ms-radius-lg)",
          background: "var(--ms-card-bg)",
          border: "1px solid var(--ms-purple-border)",
          boxShadow: "var(--ms-shadow-card)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 240 }}>
          <span style={{ fontSize: 22, color: "var(--ms-purple)" }}>📦</span>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45 }}>
            As per Meesho packaging policy, all sellers must use Transparent Barcoded Packaging for their products on the platform.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button type="button" style={outlinePurpleBtn}>Buy Barcoded Packets</button>
          <button type="button" style={outlinePurpleBtn}>Scan Barcoded Packets</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 24, borderBottom: "1px solid var(--ms-border)", overflowX: "auto" }}>
        {ORDER_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => handleTabChange(t.id)}
            style={{
              padding: "12px 4px",
              background: "none",
              border: "none",
              borderBottom: tab === t.id ? "2px solid var(--ms-purple)" : "2px solid transparent",
              color: tab === t.id ? "var(--ms-purple)" : "var(--ms-text-muted)",
              fontWeight: tab === t.id ? 600 : 400,
              fontSize: 14,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {t.label} ({counts[t.id]})
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            Filter by:
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{ padding: "8px 12px", border: "1px solid var(--ms-border)", borderRadius: 6, fontSize: 13 }}
            >
              <option value="order_date">Order Date</option>
              <option value="ship_date">Ship Date</option>
            </select>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            Payment:
            <select
              value={paymentFilter}
              onChange={(e) => handlePaymentChange(e.target.value as typeof paymentFilter)}
              style={{ padding: "8px 12px", border: "1px solid var(--ms-border)", borderRadius: 6, fontSize: 13 }}
            >
              <option value="all">All</option>
              <option value="Prepaid">Prepaid</option>
              <option value="COD">COD</option>
            </select>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as typeof sortBy);
                setPage(0);
              }}
              style={{ padding: "8px 12px", border: "1px solid var(--ms-border)", borderRadius: 6, fontSize: 13 }}
            >
              <option value="date_desc">Date (Newest)</option>
              <option value="date_asc">Date (Oldest)</option>
              <option value="price_desc">Price (High to Low)</option>
              <option value="price_asc">Price (Low to High)</option>
            </select>
          </label>
        </div>

        <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value as typeof searchField)}
            style={{
              padding: "9px 12px",
              border: "1px solid var(--ms-border)",
              borderRight: "none",
              borderRadius: "6px 0 0 6px",
              fontSize: 13,
              background: "var(--ms-table-header-bg)",
            }}
          >
            {SEARCH_FIELDS.map((f) => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
          <div style={{ position: "relative" }}>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              placeholder="Search"
              style={{
                width: 220,
                padding: "9px 36px 9px 12px",
                border: "1px solid var(--ms-border)",
                borderRadius: "0 6px 6px 0",
                fontSize: 13,
              }}
            />
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
              <MsIconSearch size={16} color="var(--ms-icon-muted)" />
            </span>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 20px", color: "var(--ms-text-muted)" }}>
          <div style={{ margin: "0 auto 16px", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MsIconBox size={64} color="var(--ms-icon-muted)" />
          </div>
          <p style={{ fontSize: 18, fontWeight: 600, color: "var(--ms-text)", margin: "0 0 8px" }}>No orders yet</p>
          <p style={{ margin: 0, fontSize: 14 }}>But keep checking this section from time to time.</p>
        </div>
      ) : (
        <>
          <OrdersTable orders={pageRows} />
          {filtered.length > PAGE_SIZE ? (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, fontSize: 13, color: "var(--ms-text-muted)" }}>
              <span>
                Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of {filtered.length} orders
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                  style={{ ...outlinePurpleBtn, opacity: page === 0 ? 0.5 : 1 }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                  style={{ ...outlinePurpleBtn, opacity: page >= totalPages - 1 ? 0.5 : 1 }}
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

function OrdersTable({ orders }: { orders: MeeshoOrder[] }) {
  return (
    <div style={{ marginTop: 20, background: "var(--ms-card-bg)", border: "1px solid var(--ms-border)", borderRadius: "var(--ms-radius-lg)", overflow: "hidden", boxShadow: "var(--ms-shadow-card)" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 1200 }}>
          <thead>
            <tr style={{ background: "var(--ms-table-header-bg)", textAlign: "left" }}>
              {[
                "Product",
                "Order ID",
                "Customer",
                "City",
                "Qty",
                "Selling Price",
                "Payment",
                "Courier",
                "Order Date",
                "Expected Delivery",
                "Status",
              ].map((h) => (
                <th key={h} style={{ padding: "12px 16px", fontWeight: 500, color: "var(--ms-text-muted)", borderBottom: "1px solid var(--ms-border)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid var(--ms-border)" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", minWidth: 220 }}>
                    <Image
                      src={row.imageUrl}
                      alt={row.productName}
                      width={44}
                      height={44}
                      style={{ objectFit: "cover", borderRadius: 4, border: "1px solid var(--ms-border)", flexShrink: 0 }}
                    />
                    <span style={{ lineHeight: 1.4 }}>{row.productName}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", whiteSpace: "nowrap" }}>{row.orderId}</td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{row.customerName}</td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{row.city}</td>
                <td style={{ padding: "12px 16px" }}>{row.quantity}</td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>₹{row.sellingPrice.toLocaleString("en-IN")}</td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{row.paymentType}</td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{row.courierPartner}</td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{formatDate(row.orderDateIso)}</td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{formatDate(row.expectedDeliveryDate)}</td>
                <td style={{ padding: "12px 16px", textTransform: "capitalize", whiteSpace: "nowrap" }}>{row.status.replace(/_/g, " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const outlinePurpleBtn: React.CSSProperties = {
  padding: "8px 14px",
  background: "var(--ms-card-bg)",
  color: "var(--ms-purple)",
  border: "1px solid var(--ms-purple)",
  borderRadius: "var(--ms-radius-md)",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  whiteSpace: "nowrap",
};
