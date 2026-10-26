"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MsIconBell, MsIconChevronDown, MsIconHeadset, MsLogo, MsNavIcon, MsIconUser } from "@/components/meesho/meesho-icons";
import { MEESHO_NAV } from "@/config/meesho-navigation";
import { meeshoRoutes } from "@/config/meesho-routes";
import { MEESHO_SUPPLIER } from "@/lib/demo/meesho";

type MeeshoSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export function MeeshoSidebar({ collapsed }: MeeshoSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: collapsed ? "var(--ms-sidebar-collapsed)" : "var(--ms-sidebar-width)",
        minWidth: collapsed ? "var(--ms-sidebar-collapsed)" : "var(--ms-sidebar-width)",
        background: "var(--ms-sidebar-bg)",
        color: "var(--ms-sidebar-text)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        transition: "width 0.22s ease, min-width 0.22s ease",
        overflow: "hidden",
        zIndex: 30,
      }}
    >
      <div style={{ padding: collapsed ? "14px 10px" : "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Link
          href={meeshoRoutes.profile}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "var(--ms-sidebar-text-active)",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--ms-sidebar-avatar-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <MsIconUser size={16} color="var(--ms-sidebar-text-active)" />
          </span>
          {!collapsed ? (
            <>
              <span style={{ fontSize: 14, fontWeight: 500, flex: 1, whiteSpace: "nowrap" }}>
                {MEESHO_SUPPLIER.storeName}
              </span>
              <MsIconChevronDown size={14} color="var(--ms-sidebar-muted)" />
            </>
          ) : null}
        </Link>

        {!collapsed ? (
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              type="button"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "8px 10px",
                background: "var(--ms-sidebar-btn-bg)",
                border: "1px solid var(--ms-sidebar-btn-border)",
                borderRadius: "var(--ms-radius-md)",
                color: "var(--ms-sidebar-text-active)",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              <MsIconBell size={14} />
              Notices (1)
            </button>
            <Link
              href={meeshoRoutes.help}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "8px 10px",
                background: "var(--ms-sidebar-btn-bg)",
                border: "1px solid var(--ms-sidebar-btn-border)",
                borderRadius: "var(--ms-radius-md)",
                color: "var(--ms-sidebar-text-active)",
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              <MsIconHeadset size={14} />
              Support
            </Link>
          </div>
        ) : null}
      </div>

      <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0 16px" }}>
        {MEESHO_NAV.map((section) => (
          <div key={section.title ?? "root"} style={{ marginBottom: 8 }}>
            {section.title && !collapsed ? (
              <p
                style={{
                  padding: "10px 20px 6px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ms-sidebar-muted)",
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                }}
              >
                {section.title}
              </p>
            ) : null}
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {section.items.map((item) => {
                const isActive = item.href ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false;
                const content = (
                  <>
                    <MsNavIcon name={item.icon} size={18} color={isActive ? "var(--ms-sidebar-text-active)" : "var(--ms-sidebar-text)"} />
                    {!collapsed ? (
                      <>
                        <span style={{ flex: 1, fontSize: 13.5 }}>{item.label}</span>
                        {item.badge ? (
                          <span
                            style={{
                              fontSize: 10,
                              padding: "2px 6px",
                              borderRadius: 4,
                              background: "var(--ms-pink-badge)",
                              color: "var(--ms-pink-text)",
                              fontWeight: 600,
                            }}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                        {item.label === "Pricing" ? <MsIconChevronDown size={12} color="var(--ms-sidebar-muted)" /> : null}
                      </>
                    ) : null}
                  </>
                );

                const itemStyle: React.CSSProperties = {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: collapsed ? "11px 0" : "10px 20px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  color: isActive ? "var(--ms-sidebar-text-active)" : "var(--ms-sidebar-text)",
                  background: isActive ? "var(--ms-sidebar-active)" : "transparent",
                  borderLeft: isActive ? "3px solid var(--ms-sidebar-active-bar)" : "3px solid transparent",
                  textDecoration: "none",
                  fontSize: 13.5,
                  cursor: item.href ? "pointer" : "default",
                  opacity: item.href ? 1 : 0.65,
                };

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <Link href={item.href} className="meesho-sidebar-link" style={itemStyle}>
                        {content}
                      </Link>
                    ) : (
                      <span style={itemStyle}>{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <MsLogo collapsed={collapsed} />
    </aside>
  );
}
