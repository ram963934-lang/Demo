"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Search, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ─── Page chrome ─── */

export function FkPageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export function FkPageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fk-text)" }}>{title}</h1>
        {subtitle ? <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--fk-text-muted)", lineHeight: 1.5 }}>{subtitle}</p> : null}
      </div>
      {actions ? <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>{actions}</div> : null}
    </div>
  );
}

export function FkCard({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={className}
      style={{
        background: "var(--fk-card-bg)",
        border: "1px solid var(--fk-border)",
        borderRadius: "var(--fk-radius)",
        boxShadow: "var(--fk-shadow-sm)",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Buttons ─── */

type FkButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  loading?: boolean;
  href?: string;
};

export function FkButton({ variant = "primary", loading, href, children, style, className, ...props }: FkButtonProps) {
  const base: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 18px",
    borderRadius: "var(--fk-radius-sm)",
    fontSize: 13,
    fontWeight: 600,
    cursor: props.disabled || loading ? "not-allowed" : "pointer",
    opacity: props.disabled || loading ? 0.65 : 1,
    textDecoration: "none",
    border: "none",
    ...style,
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "linear-gradient(135deg, var(--fk-blue) 0%, var(--fk-blue-dark) 100%)", color: "#fff", boxShadow: "0 2px 8px rgba(40,116,240,0.3)" },
    outline: { background: "var(--fk-card-bg)", color: "var(--fk-blue)", border: "1px solid var(--fk-border)" },
    ghost: { background: "transparent", color: "var(--fk-text-muted)", border: "1px solid transparent" },
  };
  const cls = `${variant === "primary" ? "fk-btn-primary fk-btn-ripple" : variant === "outline" ? "fk-btn-outline" : ""} ${className ?? ""}`.trim();
  const merged = { ...base, ...variants[variant] };

  if (href) {
    return (
      <Link href={href} className={cls} style={merged}>
        {loading ? "…" : children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} style={merged} {...props}>
      {loading ? "Loading…" : children}
    </button>
  );
}

export const fkPrimaryBtn: React.CSSProperties = {};
export const fkOutlineBtn: React.CSSProperties = {};

/* ─── KPI Cards ─── */

export function FkKpiCard({
  label,
  value,
  change,
  icon: Icon,
  sparkline,
  tone = "blue",
}: {
  label: string;
  value: string;
  change: number;
  icon: LucideIcon;
  sparkline: number[];
  tone?: "blue" | "green" | "yellow" | "red";
}) {
  const up = change >= 0;
  const colors = { blue: "#2874F0", green: "#22C55E", yellow: "#F59E0B", red: "#EF4444" };
  const chartData = sparkline.map((v, i) => ({ i, v }));

  return (
    <FkCard style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${colors[tone]}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={20} color={colors[tone]} strokeWidth={2} />
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: up ? "var(--fk-success)" : "var(--fk-danger)", background: up ? "#dcfce7" : "#fee2e2", padding: "4px 8px", borderRadius: 20 }}>
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(change)}%
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 12, fontWeight: 500, color: "var(--fk-text-muted)", textTransform: "uppercase", letterSpacing: 0.04 }}>{label}</p>
      <p style={{ margin: "6px 0 0", fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fk-text)" }}>{value}</p>
      <div className="fk-kpi-sparkline" style={{ height: 48, marginTop: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors[tone]} stopOpacity={0.35} />
                <stop offset="100%" stopColor={colors[tone]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={colors[tone]} fill={`url(#grad-${label})`} strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </FkCard>
  );
}

export function FkStatCard({ label, value, delta, tone = "blue" }: { label: string; value: string; delta?: string; tone?: "blue" | "green" | "yellow" | "red" }) {
  const accent = { blue: "var(--fk-blue)", green: "var(--fk-success)", yellow: "var(--fk-warning)", red: "var(--fk-danger)" }[tone];
  return (
    <FkCard style={{ padding: "18px 20px" }}>
      <p style={{ margin: 0, fontSize: 12, color: "var(--fk-text-muted)", fontWeight: 500 }}>{label}</p>
      <p style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 700, color: "var(--fk-text)" }}>{value}</p>
      {delta ? <p style={{ margin: "6px 0 0", fontSize: 12, color: accent, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><TrendingUp size={14} />{delta}</p> : null}
    </FkCard>
  );
}

/* ─── Search & Select ─── */

export function FkSearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ position: "relative", minWidth: 240 }}>
      <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--fk-text-muted)" }} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search..."}
        style={{ width: "100%", padding: "10px 14px 10px 38px", border: "1px solid var(--fk-border)", borderRadius: "var(--fk-radius-sm)", fontSize: 13, background: "var(--fk-card-bg)", color: "var(--fk-text)", outline: "none", transition: "border-color 0.2s" }}
      />
    </div>
  );
}

export function FkSelect({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; label?: string }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fk-text-muted)" }}>
      {label ? <span style={{ fontWeight: 500 }}>{label}</span> : null}
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ padding: "9px 12px", border: "1px solid var(--fk-border)", borderRadius: "var(--fk-radius-sm)", fontSize: 13, background: "var(--fk-card-bg)", color: "var(--fk-text)" }}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

/* ─── Badges ─── */

export function FkStatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    active: { bg: "#dcfce7", text: "#15803d" },
    new: { bg: "#dbeafe", text: "#1d4ed8" },
    packed: { bg: "#fef3c7", text: "#b45309" },
    shipped: { bg: "#e0e7ff", text: "#4338ca" },
    delivered: { bg: "#dcfce7", text: "#15803d" },
    cancelled: { bg: "#fee2e2", text: "#b91c1c" },
    return_requested: { bg: "#fce7f3", text: "#be185d" },
    pending: { bg: "#fef3c7", text: "#b45309" },
    approved: { bg: "#dbeafe", text: "#1d4ed8" },
    rejected: { bg: "#fee2e2", text: "#b91c1c" },
    completed: { bg: "#dcfce7", text: "#15803d" },
    scheduled: { bg: "#dbeafe", text: "#1d4ed8" },
    out_of_stock: { bg: "#fee2e2", text: "#b91c1c" },
    paused: { bg: "#f1f5f9", text: "#64748b" },
    processing: { bg: "#e0e7ff", text: "#4338ca" },
  };
  const c = map[status] ?? { bg: "#f1f5f9", text: "#64748b" };
  return (
    <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: c.bg, color: c.text, fontWeight: 600, textTransform: "capitalize", whiteSpace: "nowrap" }}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

/* ─── Product Card ─── */

export function FkProductCard({
  id,
  title,
  imageUrl,
  price,
  mrp,
  stock,
  orders7d,
  status,
  href,
}: {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  mrp: number;
  stock: number;
  orders7d: number;
  status: string;
  href: string;
}) {
  const profit = Math.round(price * 0.32);
  const revenue = price * orders7d;

  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <motion.div
        className="fk-product-card"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        style={{
          background: "var(--fk-card-bg)",
          border: "1px solid var(--fk-border)",
          borderRadius: "var(--fk-radius)",
          overflow: "hidden",
          boxShadow: "var(--fk-shadow-sm)",
          transition: "box-shadow 0.25s ease",
        }}
      >
        <div style={{ position: "relative", aspectRatio: "1", background: "#f8fafc" }}>
          <Image src={imageUrl} alt={title} fill style={{ objectFit: "cover" }} sizes="280px" />
          <span style={{ position: "absolute", top: 10, left: 10 }}>
            <FkStatusBadge status={status} />
          </span>
          {stock < 30 && stock > 0 ? (
            <span style={{ position: "absolute", top: 10, right: 10, fontSize: 10, fontWeight: 700, background: "var(--fk-warning)", color: "#fff", padding: "3px 8px", borderRadius: 6 }}>Low Stock</span>
          ) : null}
        </div>
        <div style={{ padding: "16px 18px" }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "var(--fk-text)" }}>₹{price.toLocaleString("en-IN")}</span>
            <span style={{ fontSize: 13, color: "var(--fk-text-muted)", textDecoration: "line-through" }}>₹{mrp.toLocaleString("en-IN")}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--fk-border)" }}>
            <div><p style={{ margin: 0, fontSize: 10, color: "var(--fk-text-muted)" }}>Stock</p><p style={{ margin: 2, fontSize: 13, fontWeight: 600 }}>{stock}</p></div>
            <div><p style={{ margin: 0, fontSize: 10, color: "var(--fk-text-muted)" }}>Profit/unit</p><p style={{ margin: 2, fontSize: 13, fontWeight: 600, color: "var(--fk-success)" }}>₹{profit}</p></div>
            <div><p style={{ margin: 0, fontSize: 10, color: "var(--fk-text-muted)" }}>7d Rev</p><p style={{ margin: 2, fontSize: 13, fontWeight: 600 }}>₹{(revenue / 1000).toFixed(1)}k</p></div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ─── Data Table ─── */

export type FkColumn<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

export function FkDataTable<T extends { id: string }>({
  columns,
  data,
  pageSize = 5,
  bulkActions,
}: {
  columns: FkColumn<T>[];
  data: T[];
  pageSize?: number;
  bulkActions?: React.ReactNode;
}) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = av < bv ? -1 : 1;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const toggleAll = () => {
    if (selected.size === pageData.length) setSelected(new Set());
    else setSelected(new Set(pageData.map((r) => r.id)));
  };

  return (
    <FkCard style={{ overflow: "hidden" }}>
      {selected.size > 0 && bulkActions ? (
        <div style={{ padding: "12px 16px", background: "var(--fk-blue-light)", borderBottom: "1px solid var(--fk-border)", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{selected.size} selected</span>
          {bulkActions}
        </div>
      ) : null}
      <div style={{ overflowX: "auto", maxHeight: 520 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
          <thead className="fk-sticky-thead">
            <tr style={{ background: "#f8fafc" }}>
              <th style={fkTh}><input type="checkbox" checked={selected.size === pageData.length && pageData.length > 0} onChange={toggleAll} /></th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ ...fkTh, cursor: col.sortable ? "pointer" : "default", userSelect: "none" }}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  {col.label}
                  {sortKey === col.key ? (sortDir === "asc" ? " ↑" : " ↓") : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => (
              <tr key={row.id} className="fk-table-row" style={{ transition: "background 0.15s" }}>
                <td style={fkTd}><input type="checkbox" checked={selected.has(row.id)} onChange={() => {
                  const next = new Set(selected);
                  if (next.has(row.id)) next.delete(row.id); else next.add(row.id);
                  setSelected(next);
                }} /></td>
                {columns.map((col) => (
                  <td key={col.key} style={fkTd}>
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderTop: "1px solid var(--fk-border)", fontSize: 13, color: "var(--fk-text-muted)" }}>
        <span>{sorted.length} rows · Page {page + 1} of {totalPages}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" disabled={page === 0} onClick={() => setPage((p) => p - 1)} style={pagerBtn}><ChevronLeft size={16} /></button>
          <button type="button" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)} style={pagerBtn}><ChevronRight size={16} /></button>
        </div>
      </div>
    </FkCard>
  );
}

const pagerBtn: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  border: "1px solid var(--fk-border)",
  borderRadius: 8,
  background: "var(--fk-card-bg)",
  cursor: "pointer",
};

export const fkTh: React.CSSProperties = {
  padding: "14px 16px",
  fontWeight: 600,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.04,
  color: "var(--fk-text-muted)",
  textAlign: "left",
  borderBottom: "1px solid var(--fk-border)",
  whiteSpace: "nowrap",
};

export const fkTd: React.CSSProperties = {
  padding: "14px 16px",
  fontSize: 13,
  borderBottom: "1px solid var(--fk-border)",
  color: "var(--fk-text)",
};

/* ─── Charts ─── */

const CHART_COLORS = ["#2874F0", "#FFE500", "#22C55E", "#8B5CF6", "#F59E0B"];

export function FkRevenueChart({ data }: { data: { day: string; revenue: number; orders: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--fk-border)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--fk-text-muted)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "var(--fk-text-muted)" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--fk-border)", boxShadow: "var(--fk-shadow)" }} />
        <Line type="monotone" dataKey="revenue" stroke="#2874F0" strokeWidth={3} dot={{ r: 4, fill: "#2874F0" }} activeDot={{ r: 6 }} name="Revenue (₹)" animationDuration={800} />
        <Line type="monotone" dataKey="orders" stroke="#FFE500" strokeWidth={2.5} dot={{ r: 3 }} name="Orders" animationDuration={800} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function FkCategoryChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} animationDuration={800}>
          {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--fk-border)" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function FkBarChartSimple({ data, dataKey, label }: { data: Record<string, string | number>[]; dataKey: string; label: string }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--fk-border)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--fk-text-muted)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "var(--fk-text-muted)" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--fk-border)" }} />
        <Bar dataKey={dataKey} fill="#2874F0" radius={[6, 6, 0, 0]} name={label} animationDuration={800} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function FkMonthlySalesChart({ data }: { data: { month: string; sales: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="monthlyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2874F0" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#2874F0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--fk-border)" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--fk-text-muted)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "var(--fk-text-muted)" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--fk-border)" }} />
        <Area type="monotone" dataKey="sales" stroke="#2874F0" fill="url(#monthlyGrad)" strokeWidth={2.5} name="Sales (₹)" animationDuration={800} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function FkTrafficChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="var(--fk-border)" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: "var(--fk-text-muted)" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "var(--fk-text-muted)" }} width={80} axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#0053E2" radius={[0, 6, 6, 0]} name="%" animationDuration={800} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export const fkTableWrap: React.CSSProperties = {};
