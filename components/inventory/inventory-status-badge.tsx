import type { InventoryStatus } from "@/types/inventory";
import { INVENTORY_STATUS_LABELS } from "@/types/inventory";
import { cn } from "@/lib/utils";

const statusStyles: Record<InventoryStatus, string> = {
  in_stock: "border-emerald-200 bg-emerald-50 text-emerald-800",
  low_stock: "border-amber-200 bg-amber-50 text-amber-800",
  out_of_stock: "border-red-200 bg-red-50 text-red-800",
  stranded: "border-purple-200 bg-purple-50 text-purple-800",
  inbound: "border-blue-200 bg-blue-50 text-blue-800",
};

type InventoryStatusBadgeProps = {
  status: InventoryStatus;
  className?: string;
};

export function InventoryStatusBadge({ status, className }: InventoryStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
        statusStyles[status],
        className,
      )}
    >
      {INVENTORY_STATUS_LABELS[status]}
    </span>
  );
}
