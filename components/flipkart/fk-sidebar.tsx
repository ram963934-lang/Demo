"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getFkNavIcon } from "@/components/flipkart/fk-nav-icons";
import { FLIPKART_NAV } from "@/config/flipkart-navigation";

type FkSidebarProps = {
  collapsed: boolean;
};

export function FkSidebar({ collapsed }: FkSidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? "var(--fk-sidebar-collapsed)" : "var(--fk-sidebar-width)" }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{
        minWidth: collapsed ? "var(--fk-sidebar-collapsed)" : "var(--fk-sidebar-width)",
        background: "var(--fk-sidebar-bg)",
        borderRight: "1px solid var(--fk-border)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflow: "hidden",
        zIndex: 40,
        boxShadow: "var(--fk-shadow-sm)",
      }}
    >
      {!collapsed ? (
        <div style={{ padding: "20px 20px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--fk-blue), var(--fk-blue-dark))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(40,116,240,0.35)" }}>
              <span style={{ color: "#FFE500", fontWeight: 800, fontSize: 16 }}>F</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--fk-text)", letterSpacing: "-0.02em" }}>Seller Hub</p>
              <p style={{ margin: 0, fontSize: 11, color: "var(--fk-text-muted)" }}>Enterprise</p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: "16px 0", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--fk-blue), var(--fk-blue-dark))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#FFE500", fontWeight: 800, fontSize: 14 }}>F</span>
          </div>
        </div>
      )}

      <nav style={{ flex: 1, overflowY: "auto", padding: collapsed ? "8px 6px" : "8px 12px 16px" }}>
        {FLIPKART_NAV.map((section) => (
          <div key={section.title ?? "root"} style={{ marginBottom: 8 }}>
            {section.title && !collapsed ? (
              <p style={{ padding: "8px 12px 6px", fontSize: 10, fontWeight: 700, color: "var(--fk-sidebar-muted)", textTransform: "uppercase", letterSpacing: 0.08 }}>
                {section.title}
              </p>
            ) : null}
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {section.items.map((item) => {
                const isActive = item.href ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false;
                const Icon = getFkNavIcon(item.icon);
                return (
                  <li key={item.label} style={{ position: "relative" }}>
                    {isActive ? (
                      <motion.div
                        layoutId="fk-nav-indicator"
                        style={{ position: "absolute", left: 0, top: 6, bottom: 6, width: 3, borderRadius: 4, background: "var(--fk-blue)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="fk-sidebar-link"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: collapsed ? "11px 0" : "10px 14px",
                          marginBottom: 2,
                          justifyContent: collapsed ? "center" : "flex-start",
                          borderRadius: "var(--fk-radius-sm)",
                          color: isActive ? "var(--fk-sidebar-active-text)" : "var(--fk-sidebar-text)",
                          background: isActive ? "var(--fk-sidebar-active-bg)" : "transparent",
                          fontWeight: isActive ? 600 : 500,
                          fontSize: 14,
                          textDecoration: "none",
                        }}
                      >
                        <Icon size={18} strokeWidth={isActive ? 2.25 : 2} color={isActive ? "var(--fk-blue)" : "var(--fk-sidebar-text)"} />
                        {!collapsed ? (
                          <>
                            <span style={{ flex: 1 }}>{item.label}</span>
                            {item.badge ? (
                              <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 20, background: "var(--fk-yellow)", color: "#1f2937", fontWeight: 700 }}>{item.badge}</span>
                            ) : null}
                          </>
                        ) : null}
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </motion.aside>
  );
}
