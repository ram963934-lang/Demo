"use client";

import Link from "next/link";

import { MsIconChevronRight, MsIconHeadset, MsIconCheck } from "@/components/meesho/meesho-icons";
import { meeshoRoutes } from "@/config/meesho-routes";
import { MEESHO_LEARN_ITEMS, MEESHO_ONBOARDING, MEESHO_SUPPLIER } from "@/lib/demo/meesho";

export function MeeshoDashboardPage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: 0, color: "var(--ms-text)" }}>
            Welcome {MEESHO_SUPPLIER.storeName}
          </h1>
          <p style={{ margin: "8px 0 0", color: "var(--ms-text-muted)", fontSize: 15 }}>
            Let&apos;s get your business started in 3 steps
          </p>
        </div>
        <Link
          href={meeshoRoutes.help}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            border: "1px solid var(--ms-border)",
            borderRadius: "var(--ms-radius-lg)",
            background: "var(--ms-card-bg)",
            color: "var(--ms-purple)",
            fontSize: 14,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <MsIconHeadset size={18} color="var(--ms-purple)" />
          Need Help?
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: 0,
          marginTop: 28,
          borderBottom: "1px solid var(--ms-border)",
          overflowX: "auto",
        }}
      >
        {MEESHO_ONBOARDING.steps.map((step) => (
          <div
            key={step.id}
            style={{
              flex: "1 1 200px",
              minWidth: 180,
              padding: "0 16px 14px",
              borderBottom: step.active ? "3px solid var(--ms-purple)" : "3px solid transparent",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: step.done ? "var(--ms-green)" : step.active ? "var(--ms-purple)" : "var(--ms-border)",
                color: "var(--ms-card-bg)",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {step.done ? <MsIconCheck size={14} color="var(--ms-card-bg)" /> : step.id}
            </span>
            <span style={{ fontSize: 13, color: step.active ? "var(--ms-text)" : "var(--ms-text-muted)" }}>
              Step {step.id}: {step.label}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginTop: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              background: "var(--ms-card-bg)",
              border: "1px solid var(--ms-border)",
              borderRadius: "var(--ms-radius-lg)",
              padding: "24px 28px",
              boxShadow: "var(--ms-shadow-card)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 36 }}>👕</span>
              <div>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{MEESHO_ONBOARDING.catalogsLive} Catalogs live</p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--ms-text-muted)" }}>
                  Stay active &amp; wait for your orders
                </p>
              </div>
            </div>
            <Link
              href={meeshoRoutes.catalog}
              className="meesho-btn-primary"
              style={{
                padding: "12px 24px",
                background: "var(--ms-purple)",
                color: "var(--ms-card-bg)",
                borderRadius: "var(--ms-radius-sm)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              View / Manage Catalogs
            </Link>
          </div>

          <div
            style={{
              background: "var(--ms-card-bg)",
              border: "1px solid var(--ms-border)",
              borderRadius: "var(--ms-radius-lg)",
              padding: "20px 24px",
              boxShadow: "var(--ms-shadow-card)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "var(--ms-green-badge-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                ⊞
              </span>
              <div>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Get higher visibility with more catalogs</p>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ms-text-muted)" }}>
                  A minimum of 5 catalogs is recommended
                </p>
              </div>
            </div>
            <Link
              href={meeshoRoutes.catalog}
              className="meesho-btn-outline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 20px",
                border: "1px solid var(--ms-purple)",
                borderRadius: "var(--ms-radius-sm)",
                color: "var(--ms-purple)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                background: "var(--ms-card-bg)",
              }}
            >
              ↑ Upload
            </Link>
          </div>
        </div>

        <div
          style={{
            background: "var(--ms-card-bg)",
            border: "1px solid var(--ms-border)",
            borderRadius: "var(--ms-radius-lg)",
            padding: "20px 22px",
            minWidth: 280,
            boxShadow: "var(--ms-shadow-card)",
          }}
        >
          <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 600 }}>Learn &amp; Grow On Meesho</h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {MEESHO_LEARN_ITEMS.map((item) => (
              <li
                key={item.id}
                style={{
                  borderTop: "1px solid var(--ms-border)",
                  padding: "14px 0",
                }}
              >
                <Link
                  href={meeshoRoutes.growth}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>
                    {item.icon === "youtube" ? "▶" : item.icon === "training" ? "📖" : item.icon === "pricing" ? "%" : "🚚"}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{item.title}</span>
                      {item.badge ? (
                        <span
                          style={{
                            fontSize: 10,
                            padding: "2px 8px",
                            borderRadius: 4,
                            background: "var(--ms-green-badge-bg)",
                            color: "var(--ms-green-badge-text)",
                            fontWeight: 600,
                          }}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--ms-text-muted)", lineHeight: 1.4 }}>
                      {item.description}
                    </p>
                  </div>
                  <MsIconChevronRight color="var(--ms-icon-muted)" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
