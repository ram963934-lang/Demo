"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronRight, HelpCircle, Menu, MessageSquare, Moon, Search, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { FkSidebar } from "@/components/flipkart/fk-sidebar";
import { FkPageTransition } from "@/components/flipkart/fk-ui";
import { FK_BREADCRUMB_LABELS } from "@/config/flipkart-navigation";
import { flipkartRoutes } from "@/config/flipkart-routes";
import { FLIPKART_SELLER } from "@/lib/demo/flipkart";

type FkShellProps = {
  children: React.ReactNode;
};

export function FkShell({ children }: FkShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");

  const toggleCollapsed = useCallback(() => setCollapsed((p) => !p), []);
  const toggleTheme = useCallback(() => setDark((p) => !p), []);

  const breadcrumbs = useMemo(() => {
    const parts = pathname.replace("/flipkart", "").split("/").filter(Boolean);
    const crumbs: { label: string; href: string }[] = [{ label: "Home", href: flipkartRoutes.dashboard }];
    parts.forEach((part, i) => {
      if (part.match(/^[a-z0-9-]+$/i) && !part.startsWith("fk-") && part.length > 8) return;
      const href = `/flipkart/${parts.slice(0, i + 1).join("/")}`;
      const label = FK_BREADCRUMB_LABELS[part] ?? (part.startsWith("fk-") || part.startsWith("OD") ? "Detail" : part);
      crumbs.push({ label, href });
    });
    return crumbs;
  }, [pathname]);

  return (
    <div className="flipkart-app flex min-h-svh" data-theme={dark ? "dark" : "light"}>
      <div className="hidden shrink-0 md:block">
        <FkSidebar collapsed={collapsed} />
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 md:hidden"
            >
              <FkSidebar collapsed={false} />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="fk-header-blur"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "var(--fk-header-bg)",
            borderBottom: "1px solid var(--fk-header-border)",
            boxShadow: "var(--fk-shadow-sm)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", flexWrap: "wrap" }}>
            <button type="button" className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu" style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4 }}>
              <Menu size={22} color="var(--fk-text)" />
            </button>
            <button type="button" className="hidden md:block" onClick={toggleCollapsed} aria-label="Toggle sidebar" style={{ border: "none", background: "transparent", cursor: "pointer", padding: 4 }}>
              <Menu size={22} color="var(--fk-text)" />
            </button>

            <Link href={flipkartRoutes.dashboard} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginRight: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--fk-blue), var(--fk-blue-dark))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#FFE500", fontWeight: 800, fontSize: 14 }}>F</span>
              </div>
              <span className="hidden lg:inline" style={{ fontSize: 15, fontWeight: 700, color: "var(--fk-text)" }}>Seller Hub</span>
            </Link>

            <div style={{ flex: 1, maxWidth: 480, minWidth: 180, position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--fk-text-muted)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders, listings, SKUs..."
                style={{ width: "100%", padding: "10px 14px 10px 38px", borderRadius: "var(--fk-radius-sm)", border: "1px solid var(--fk-border)", fontSize: 13, background: "var(--fk-card-bg)", color: "var(--fk-text)", outline: "none" }}
              />
            </div>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
              {[
                { icon: MessageSquare, label: "Messages" },
                { icon: Bell, label: "Notifications" },
                { icon: HelpCircle, label: "Help" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} type="button" aria-label={label} style={{ position: "relative", width: 40, height: 40, border: "none", background: "transparent", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fk-text-muted)" }}>
                  <Icon size={20} />
                  {label === "Notifications" ? (
                    <span style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "var(--fk-danger)", border: "2px solid var(--fk-card-bg)" }} />
                  ) : null}
                </button>
              ))}
              <button type="button" onClick={toggleTheme} aria-label="Toggle theme" style={{ width: 40, height: 40, border: "none", background: "transparent", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--fk-text-muted)" }}>
                {dark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 12, borderLeft: "1px solid var(--fk-border)" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, var(--fk-blue-light), var(--fk-blue))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", boxShadow: "0 2px 8px rgba(40,116,240,0.25)" }}>
                {FLIPKART_SELLER.storeName.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--fk-text)" }}>{FLIPKART_SELLER.storeName}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "linear-gradient(135deg, #FFE500, #F59E0B)", color: "#1f2937", marginTop: 2 }}>
                  {FLIPKART_SELLER.tier}
                </span>
              </div>
            </div>
          </div>

          <nav style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 20px 10px", fontSize: 13, flexWrap: "wrap" }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                {i > 0 ? <ChevronRight size={14} color="var(--fk-text-muted)" /> : null}
                <Link href={crumb.href} style={{ color: i === breadcrumbs.length - 1 ? "var(--fk-blue)" : "var(--fk-text-muted)", fontWeight: i === breadcrumbs.length - 1 ? 600 : 400, textDecoration: "none" }}>
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        </header>

        <main style={{ flex: 1, overflowX: "auto", padding: "24px 28px" }}>
          <FkPageTransition>{children}</FkPageTransition>
        </main>
      </div>
    </div>
  );
}
