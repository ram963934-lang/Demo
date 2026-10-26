"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { InventoryTableState } from "@/hooks/use-inventory-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAGE_SIZE_OPTIONS } from "@/types/inventory";

type InventoryPaginationProps = {
  table: InventoryTableState;
};

export function InventoryPagination({ table }: InventoryPaginationProps) {
  const { page, pageSize, totalPages, totalCount, setPage, setPageSize } = table;

  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex flex-col gap-3 border-t border-[#E3E6E6] bg-[#FAFAFA] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Rows per page</span>
        <Select
          value={String(pageSize)}
          onValueChange={(value) =>
            setPageSize(Number(value) as (typeof PAGE_SIZE_OPTIONS)[number])
          }
        >
          <SelectTrigger size="sm" className="w-[70px] border-[#D5D9D9] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="hidden sm:inline">
          · {start}–{end} of {totalCount}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="border-[#D5D9D9]"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <span className="px-3 text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="border-[#D5D9D9]"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
