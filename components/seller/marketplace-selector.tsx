"use client";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type MarketplaceSelectorProps = {
  className?: string;
  storeName?: string;
  marketplace?: string;
  variant?: "default" | "compact";
};

export function MarketplaceSelector({
  className,
  storeName = "Look Creation",
  marketplace = "India",
  variant = "default",
}: MarketplaceSelectorProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-[36px] items-center gap-1 rounded-[4px] border px-2.5 text-left transition-colors",
        variant === "compact"
          ? "min-w-[168px] border-[#879596] bg-[#37475a] text-white hover:bg-[#3d4f63]"
          : "min-w-[176px] border-[#d5d9d9] bg-white text-[#0f1111] hover:bg-[#f7fafa]",
        className,
      )}
    >
      <span className="min-w-0 flex-1 truncate text-[13px] leading-none">
        {storeName}
        <span className={variant === "compact" ? "text-white/80" : "text-[#565959]"}>
          {" "}
          | {marketplace}
        </span>
      </span>
      <ChevronDown
        className={cn(
          "size-[14px] shrink-0",
          variant === "compact" ? "text-white/80" : "text-[#565959]",
        )}
        strokeWidth={2.5}
      />
    </button>
  );
}
