"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { IconBookmark } from "@/components/sc/sc-icons";
import { routes } from "@/config/routes";

type ScFlyoutMenuProps = {
  open: boolean;
  onClose: () => void;
};

const MAIN = [
  { label: "Inventory", href: routes.seller.inventory, hasSub: true },
  { label: "Orders", href: routes.seller.orders, hasSub: false },
  { label: "Advertising", href: routes.seller.analytics, hasSub: false },
] as const;

const INVENTORY_SUB = [
  { label: "Manage All Inventory", href: routes.seller.inventory },
  { label: "Manage Seller Fulfilled Products", href: routes.seller.products },
  { label: "Sell Globally", href: routes.seller.reports },
  { label: "Inventory Planning", href: routes.seller.analytics },
] as const;

const MORE_LINKS = [
  { label: "Payments", href: routes.seller.payments },
  { label: "Reports", href: routes.seller.reports },
  { label: "Settings", href: routes.seller.settings },
] as const;

export function ScFlyoutMenu({ open, onClose }: ScFlyoutMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState<(typeof MAIN)[number]["label"]>("Inventory");

  if (!open) return null;

  const navigate = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.45)" }}
        aria-hidden="true"
      />
      <div
        style={{
          position: "fixed",
          top: "calc(var(--sc-nav-h) + var(--sc-subnav-h))",
          left: 0,
          zIndex: 51,
          display: "flex",
          bottom: 0,
        }}
      >
        <nav style={{ width: 240, background: "#fff", borderRight: "1px solid #d5d9d9" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: "8px 0" }}>
            {MAIN.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(item.label)}
                  onClick={() => navigate(item.href)}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 20px",
                    fontSize: 13,
                    color: "#0f1111",
                    background:
                      active === item.label || pathname.startsWith(item.href)
                        ? "#eaeded"
                        : "#fff",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {item.label}
                  {item.hasSub ? (
                    <span style={{ color: "#565959", fontSize: 12 }}>›</span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "8px 0",
              borderTop: "1px solid #e7e7e7",
            }}
          >
            {MORE_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: "block",
                    padding: "10px 20px",
                    fontSize: 13,
                    color: pathname === item.href ? "#007185" : "#0f1111",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {active === "Inventory" ? (
          <nav
            style={{
              width: 268,
              background: "#fff",
              borderRight: "1px solid #d5d9d9",
              boxShadow: "2px 0 6px rgba(0,0,0,0.06)",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: "8px 0" }}>
              {INVENTORY_SUB.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 20px",
                      fontSize: 13,
                      color: pathname === item.href ? "#007185" : "#0f1111",
                      background: pathname === item.href ? "#f7fafa" : "#fff",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                    <IconBookmark />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </>
  );
}
