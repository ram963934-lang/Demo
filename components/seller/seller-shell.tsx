"use client";

import { SellerHeader } from "@/components/seller/seller-header";
import { cn } from "@/lib/utils";

type SellerShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function SellerShell({ children, className }: SellerShellProps) {
  return (
    <div
      className={cn("flex min-h-svh flex-col bg-[#f0f2f2]", className)}
      style={{ fontFamily: "var(--sc-font)" }}
    >
      <SellerHeader />
      <main className="flex-1 overflow-auto px-[16px] py-[16px] lg:px-[20px] lg:py-[18px]">
        {children}
      </main>
    </div>
  );
}
