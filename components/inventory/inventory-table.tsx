"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ProductThumb } from "@/components/dashboard/product-thumb";
import { InventoryEditSheet } from "@/components/inventory/inventory-edit-sheet";
import { InventoryPagination } from "@/components/inventory/inventory-pagination";
import { InventoryStatusBadge } from "@/components/inventory/inventory-status-badge";
import { useDemoDb } from "@/components/providers/demo-db-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { routes } from "@/config/routes";
import type { InventoryTableState } from "@/hooks/use-inventory-table";
import type { InventorySortField } from "@/types/inventory";
import type { DemoProduct } from "@/types/product";
import { formatCurrency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { formatRelativeTime } from "@/lib/date";

type InventoryTableProps = {
  table: InventoryTableState;
};

type SortableHeaderProps = {
  label: string;
  field: InventorySortField;
  table: InventoryTableState;
  className?: string;
};

function SortableHeader({ label, field, table, className }: SortableHeaderProps) {
  const { sortField, sortDirection, toggleSort } = table;
  const isActive = sortField === field;

  return (
    <button
      type="button"
      onClick={() => toggleSort(field)}
      className={cn(
        "inline-flex items-center gap-1 font-medium text-[#565959] hover:text-[#0F1111]",
        className,
      )}
    >
      {label}
      {isActive ? (
        sortDirection === "asc" ? (
          <ArrowUp className="size-3.5" />
        ) : (
          <ArrowDown className="size-3.5" />
        )
      ) : (
        <ArrowUpDown className="size-3.5 opacity-40" />
      )}
    </button>
  );
}

export function InventoryTable({ table }: InventoryTableProps) {
  const router = useRouter();
  const { deleteProduct } = useDemoDb();
  const [editingProduct, setEditingProduct] = useState<DemoProduct | null>(null);

  const {
    paginatedItems,
    selectedIds,
    isAllPageSelected,
    isSomePageSelected,
    toggleSelectAll,
    toggleSelect,
    totalCount,
  } = table;

  const handleDelete = (product: DemoProduct) => {
    if (!window.confirm(`Remove "${product.name}" from inventory?`)) return;
    deleteProduct(product.id);
    toast.success("Product removed from inventory", { description: product.sku });
    table.clearSelection();
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-[#D5D9D9] bg-white shadow-sm">
        <Table className="min-w-[1100px]">
          <TableHeader>
            <TableRow className="border-[#E3E6E6] bg-[#F7FAFA] hover:bg-[#F7FAFA]">
              <TableHead className="w-10">
                <Checkbox
                  checked={isAllPageSelected}
                  onCheckedChange={(checked) => toggleSelectAll(checked === true)}
                  aria-label={
                    isSomePageSelected && !isAllPageSelected
                      ? "Select all on page (partial selection active)"
                      : "Select all on page"
                  }
                />
              </TableHead>
              <TableHead className="min-w-[240px]">
                <SortableHeader label="Product" field="name" table={table} />
              </TableHead>
              <TableHead>
                <SortableHeader label="SKU" field="sku" table={table} />
              </TableHead>
              <TableHead>
                <SortableHeader label="Category" field="categoryLabel" table={table} />
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader label="Stock" field="stock" table={table} className="ml-auto" />
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader label="Available" field="available" table={table} className="ml-auto" />
              </TableHead>
              <TableHead className="text-right">
                <SortableHeader label="Price" field="price" table={table} className="ml-auto" />
              </TableHead>
              <TableHead>
                <SortableHeader label="Status" field="status" table={table} />
              </TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                  No inventory items match your search or filters.
                </TableCell>
              </TableRow>
            ) : (
              paginatedItems.map((item) => (
                <TableRow
                  key={item.id}
                  className={cn(
                    "border-[#E3E6E6] hover:bg-[#FAFAFA]",
                    selectedIds.has(item.id) && "bg-[#FFF8F0]",
                  )}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(item.id)}
                      onCheckedChange={(checked) => toggleSelect(item.id, checked === true)}
                      aria-label={`Select ${item.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={routes.seller.productDetail(item.id)}
                      className="flex items-center gap-3"
                    >
                      <ProductThumb
                        imageUrl={item.imageUrl}
                        categoryId={item.categoryId}
                        seed={item.imageSeed}
                        alt={item.name}
                        size={44}
                        quality={90}
                      />
                      <div className="min-w-0">
                        <p className="max-w-[220px] truncate text-sm font-medium text-[#0F1111] hover:text-[#007185]">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          ASIN {item.asin} · Updated {formatRelativeTime(item.lastUpdated)}
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-[#565959]">{item.sku}</TableCell>
                  <TableCell className="text-sm text-[#565959]">{item.categoryLabel}</TableCell>
                  <TableCell className="text-right font-medium">{formatNumber(item.stock)}</TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium",
                      item.available === 0 && "text-red-600",
                      item.available > 0 && item.available <= 10 && "text-amber-600",
                    )}
                  >
                    {formatNumber(item.available)}
                  </TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(item.price)}</TableCell>
                  <TableCell>
                    <InventoryStatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${item.name}`}
                        onClick={() => setEditingProduct(item)}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${item.name}`}
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hidden border-[#D5D9D9] sm:inline-flex"
                        onClick={() => router.push(routes.seller.productDetail(item.id))}
                      >
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {totalCount > 0 ? <InventoryPagination table={table} /> : null}
      </div>

      <InventoryEditSheet
        product={editingProduct}
        open={editingProduct !== null}
        onOpenChange={(open) => {
          if (!open) setEditingProduct(null);
        }}
      />
    </>
  );
}
