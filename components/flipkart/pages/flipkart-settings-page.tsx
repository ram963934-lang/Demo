"use client";

import { motion } from "framer-motion";
import { Bell, Building2, CreditCard, Shield } from "lucide-react";

import { FkButton, FkCard, FkPageHeader, FkPageTransition, FkStatusBadge } from "@/components/flipkart/fk-ui";
import { FLIPKART_SELLER } from "@/lib/demo/flipkart";

export function FlipkartSettingsPage() {
  const fields = [
    { label: "Store Name", value: FLIPKART_SELLER.storeName },
    { label: "Seller ID", value: FLIPKART_SELLER.sellerId },
    { label: "Email", value: FLIPKART_SELLER.email },
    { label: "Phone", value: FLIPKART_SELLER.phone },
    { label: "GSTIN", value: FLIPKART_SELLER.gstin },
    { label: "Warehouse", value: FLIPKART_SELLER.warehouse },
    { label: "Seller Tier", value: FLIPKART_SELLER.tier },
  ];

  const notifications = [
    "New order alerts",
    "Low stock warnings",
    "Return request notifications",
    "Payment settlement updates",
  ];

  return (
    <FkPageTransition>
      <div style={{ maxWidth: 760 }}>
        <FkPageHeader title="Settings" subtitle="Manage your seller account and preferences" />

        <FkCard style={{ padding: 0, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 24px", borderBottom: "1px solid var(--fk-border)", background: "linear-gradient(135deg, rgba(40,116,240,0.06) 0%, transparent 100%)" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, var(--fk-blue) 0%, var(--fk-blue-dark) 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>
              {FLIPKART_SELLER.storeName.charAt(0)}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--fk-text)" }}>{FLIPKART_SELLER.storeName}</p>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fk-text-muted)" }}>{FLIPKART_SELLER.sellerId}</p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <FkStatusBadge status="active" />
            </div>
          </div>
          {fields.map((f, i) => (
            <div
              key={f.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
                borderTop: i > 0 ? "1px solid var(--fk-border)" : "none",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 13, color: "var(--fk-text-muted)", fontWeight: 500 }}>{f.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, textAlign: "right", color: "var(--fk-text)" }}>{f.value}</span>
            </div>
          ))}
        </FkCard>

        <FkCard style={{ padding: 24, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--fk-blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bell size={18} color="var(--fk-blue)" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--fk-text)" }}>Notifications</h3>
          </div>
          {notifications.map((n, i) => (
            <motion.label
              key={n}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                fontSize: 14,
                cursor: "pointer",
                borderTop: i > 0 ? "1px solid var(--fk-border)" : "none",
                color: "var(--fk-text)",
              }}
            >
              <input type="checkbox" defaultChecked style={{ width: 16, height: 16, accentColor: "var(--fk-blue)" }} />
              {n}
            </motion.label>
          ))}
        </FkCard>

        <FkCard style={{ padding: 24, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--fk-blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CreditCard size={18} color="var(--fk-blue)" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--fk-text)" }}>Bank Details</h3>
          </div>
          <p style={{ margin: "0 0 20px", fontSize: 14, color: "var(--fk-text-muted)", lineHeight: 1.55 }}>
            Payouts are deposited to your registered bank account every Tuesday.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <FkButton>Update Bank Account</FkButton>
            <FkButton variant="outline">View Tax Documents</FkButton>
          </div>
        </FkCard>

        <FkCard style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--fk-blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={18} color="var(--fk-blue)" />
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--fk-text)" }}>Security</h3>
          </div>
          <p style={{ margin: "0 0 20px", fontSize: 14, color: "var(--fk-text-muted)", lineHeight: 1.55 }}>
            Two-factor authentication is enabled for your seller account.
          </p>
          <FkButton variant="outline">
            <Building2 size={16} /> Manage Access
          </FkButton>
        </FkCard>
      </div>
    </FkPageTransition>
  );
}
