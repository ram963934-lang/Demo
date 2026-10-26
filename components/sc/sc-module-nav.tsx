"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sellerNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function ScModuleNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Seller Central modules"
      style={{
        display: "flex",
        gap: 0,
        overflowX: "auto",
        borderBottom: "1px solid #d5d9d9",
        background: "#fff",
        margin: "-18px -20px 18px",
        padding: "0 20px",
      }}
    >
      {sellerNav.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 14px",
              fontSize: 13,
              color: isActive ? "#0f1111" : "#007185",
              borderBottom: isActive ? "2px solid #ff9900" : "2px solid transparent",
              whiteSpace: "nowrap",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 400,
            }}
            className={cn(!isActive && "hover:underline")}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
