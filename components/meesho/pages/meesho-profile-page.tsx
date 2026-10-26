"use client";

import Link from "next/link";

import { MsIconChevronRight, MsIconUser } from "@/components/meesho/meesho-icons";
import { meeshoRoutes } from "@/config/meesho-routes";
import { MEESHO_ONBOARDING, MEESHO_SUPPLIER } from "@/lib/demo/meesho";

export function MeeshoProfilePage() {
  const fields = [
    { label: "Store Name", value: MEESHO_SUPPLIER.storeName },
    { label: "Supplier ID", value: MEESHO_SUPPLIER.supplierId },
    { label: "Email", value: MEESHO_SUPPLIER.email },
    { label: "Phone", value: MEESHO_SUPPLIER.phone },
    { label: "GSTIN", value: MEESHO_SUPPLIER.gstin },
    { label: "Warehouse", value: MEESHO_SUPPLIER.warehouse },
    { label: "Joined", value: MEESHO_SUPPLIER.joinedDate },
  ];

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Profile</h1>
      <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--ms-text-muted)" }}>Manage your supplier account details</p>

      <div
        style={{
          marginTop: 24,
          background: "var(--ms-card-bg)",
          border: "1px solid var(--ms-border)",
          borderRadius: 10,
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--ms-purple-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <MsIconUser size={28} color="var(--ms-purple)" />
        </span>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{MEESHO_SUPPLIER.storeName}</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ms-text-muted)" }}>{MEESHO_SUPPLIER.supplierId}</p>
        </div>
      </div>

      <div style={{ marginTop: 20, background: "var(--ms-card-bg)", border: "1px solid var(--ms-border)", borderRadius: 10, overflow: "hidden" }}>
        {fields.map((f, i) => (
          <div
            key={f.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderTop: i > 0 ? "1px solid var(--ms-border)" : "none",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 13, color: "var(--ms-text-muted)" }}>{f.label}</span>
            <span style={{ fontSize: 13, fontWeight: 500, textAlign: "right" }}>{f.value}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, background: "var(--ms-card-bg)", border: "1px solid var(--ms-border)", borderRadius: 10, padding: "20px 22px" }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 600 }}>Onboarding Progress</h3>
        {MEESHO_ONBOARDING.steps.map((step) => (
          <div key={step.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: step.done ? "var(--ms-green)" : step.active ? "var(--ms-purple)" : "var(--ms-border)",
                color: "var(--ms-card-bg)",
                fontSize: 11,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {step.done ? "✓" : step.id}
            </span>
            <span style={{ fontSize: 13, color: step.active ? "var(--ms-text)" : "var(--ms-text-muted)" }}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <Link
        href={meeshoRoutes.dashboard}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginTop: 24,
          fontSize: 14,
          color: "var(--ms-purple)",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Back to Home
        <MsIconChevronRight size={14} color="var(--ms-purple)" />
      </Link>
    </div>
  );
}
