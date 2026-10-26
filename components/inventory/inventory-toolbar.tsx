"use client";

import {
  ChevronDown,
  Download,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { useDemoDb } from "@/components/providers/demo-db-provider";
import type { InventoryTableState } from "@/hooks/use-inventory-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORY_FILTER_LABELS,
  INVENTORY_STATUSES,
  INVENTORY_STATUS_LABELS,
  INVENTORY_WAREHOUSES,
} from "@/types/inventory";
import { SELLER_CATEGORIES } from "@/types/seller";

type InventoryToolbarProps = {
  table: InventoryTableState;
};

export function InventoryToolbar({ table }: InventoryToolbarProps) {
  const { deleteProducts } = useDemoDb();
  const {
    filters,
    updateFilters,
    resetFilters,
    selectedItems,
    clearSelection,
    totalCount,
    allItems,
  } = table;

  const hasFilters =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.warehouse !== "all" ||
    filters.category !== "all";

  const runBulkDelete = () => {
    if (selectedItems.length === 0) {
      toast.error("Select at least one inventory item");
      return;
    }
    if (!window.confirm(`Remove ${selectedItems.length} product(s) from inventory?`)) return;
    deleteProducts(selectedItems.map((item) => item.id));
    toast.success(`Removed ${selectedItems.length} product(s) from inventory`);
    clearSelection();
  };

  const runBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      toast.error("Select at least one inventory item");
      return;
    }
    toast.success(`${action} queued for ${selectedItems.length} item(s)`, {
      description: "Demo bulk action completed.",
    });
    clearSelection();
  };

  return (
    <div className="space-y-3 rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative min-w-0 flex-1 lg:max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(event) => updateFilters({ search: event.target.value })}
            placeholder="Search by product, SKU, ASIN, or category..."
            className="h-9 border-[#D5D9D9] bg-[#F7FAFA] pl-9 shadow-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={filters.category}
            onValueChange={(value) =>
              updateFilters({ category: (value ?? "all") as typeof filters.category })
            }
          >
            <SelectTrigger size="sm" className="min-w-[140px] border-[#D5D9D9] bg-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {SELLER_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {CATEGORY_FILTER_LABELS[category]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) =>
              updateFilters({ status: value as typeof filters.status })
            }
          >
            <SelectTrigger size="sm" className="min-w-[140px] border-[#D5D9D9] bg-white">
              <SlidersHorizontal className="size-3.5 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {INVENTORY_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {INVENTORY_STATUS_LABELS[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.warehouse}
            onValueChange={(value) => updateFilters({ warehouse: value ?? "all" })}
          >
            <SelectTrigger size="sm" className="min-w-[120px] border-[#D5D9D9] bg-white">
              <SelectValue placeholder="Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All FCs</SelectItem>
              {INVENTORY_WAREHOUSES.map((warehouse) => (
                <SelectItem key={warehouse} value={warehouse}>
                  {warehouse}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasFilters ? (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="size-4" />
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#E3E6E6] pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-[#0F1111]">{totalCount}</span> of{" "}
          <span className="font-medium text-[#0F1111]">{allItems.length}</span> uploaded products
          {selectedItems.length > 0 ? (
            <span className="ml-2 text-[#FF9900]">· {selectedItems.length} selected</span>
          ) : null}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {selectedItems.length > 0 ? (
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              Deselect all
            </Button>
          ) : null}

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  size="sm"
                  className="bg-[#232F3E] text-white hover:bg-[#37475A]"
                  disabled={selectedItems.length === 0}
                />
              }
            >
              Bulk actions
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  {selectedItems.length > 0
                    ? `${selectedItems.length} item(s) selected`
                    : "Select items first"}
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => runBulkAction("Export")}>
                  <Download className="size-4" />
                  Export selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => runBulkAction("Price update")}>
                  <RefreshCw className="size-4" />
                  Update prices
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => runBulkAction("Restock request")}>
                  <RefreshCw className="size-4" />
                  Create restock order
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive" onClick={runBulkDelete}>
                  <Trash2 className="size-4" />
                  Delete selected
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
