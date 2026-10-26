"use client";

import { Check, ChevronsUpDown, Store } from "lucide-react";

import { useSeller } from "@/components/providers/seller-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sellerAccounts } from "@/lib/demo/seller-accounts";
import { cn } from "@/lib/utils";
import type { SellerCategoryId } from "@/types/seller";

type CategorySwitcherProps = {
  className?: string;
};

export function CategorySwitcher({ className }: CategorySwitcherProps) {
  const { categoryId, account, setCategoryId } = useSeller();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "h-9 min-w-[220px] justify-between gap-2 border-[#D5D9D9] bg-white px-3 font-normal shadow-none hover:bg-[#F7FAFA]",
              className,
            )}
          />
        }
      >
        <span className="flex min-w-0 items-center gap-2">
          <Store className="size-4 shrink-0 text-[#FF9900]" />
          <span className="truncate text-left">
            <span className="block text-xs text-muted-foreground">{account.categoryLabel}</span>
            <span className="block truncate text-sm font-medium">{account.storeName}</span>
          </span>
        </span>
        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-[280px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Switch demo seller account</DropdownMenuLabel>
          {sellerAccounts.map((seller) => (
            <DropdownMenuItem
              key={seller.id}
              onClick={() => setCategoryId(seller.id as SellerCategoryId)}
              className="flex items-start justify-between gap-2 py-2.5"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{seller.storeName}</p>
                <p className="text-xs text-muted-foreground">{seller.categoryLabel}</p>
              </div>
              {seller.id === categoryId ? (
                <Check className="size-4 shrink-0 text-[#FF9900]" />
              ) : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
