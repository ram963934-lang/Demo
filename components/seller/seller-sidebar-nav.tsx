"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sellerNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

type SellerSidebarNavProps = {
  onNavigate?: () => void;
};

export function SellerSidebarNav({ onNavigate }: SellerSidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Seller Central" className="flex flex-col gap-0.5 px-2">
      {sellerNav.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-[#37475A] font-medium text-white"
                : "text-[#D5D9D9] hover:bg-[#37475A]/70 hover:text-white",
            )}
          >
            {Icon ? <Icon className="size-4 shrink-0" /> : null}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
