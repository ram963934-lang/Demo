"use client";

import {
  AlertTriangle,
  ArrowDownToLine,
  Package,
  PackageCheck,
  PackageX,
} from "lucide-react";
import { motion } from "framer-motion";

import { getInventorySummaryFromProducts } from "@/lib/demo/db/inventory-store";
import { formatCompactCurrency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

type InventorySummaryCardsProps = {
  summary: ReturnType<typeof getInventorySummaryFromProducts>;
};

export function InventorySummaryCards({ summary }: InventorySummaryCardsProps) {
  const cards = [
    { label: "Total SKUs", value: summary.totalSkus, icon: Package, color: "text-[#146EB4]" },
    {
      label: "Total Units",
      value: formatNumber(summary.totalUnits),
      icon: PackageCheck,
      color: "text-[#067D62]",
    },
    { label: "In Stock", value: summary.inStock, icon: PackageCheck, color: "text-emerald-600" },
    { label: "Low Stock", value: summary.lowStock, icon: AlertTriangle, color: "text-amber-600" },
    { label: "Out of Stock", value: summary.outOfStock, icon: PackageX, color: "text-red-600" },
    {
      label: "Inventory Value",
      value: formatCompactCurrency(summary.totalValue),
      icon: ArrowDownToLine,
      color: "text-[#FF9900]",
      hint: `${summary.stranded} stranded · ${summary.inbound} inbound`,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-[#565959]">{card.label}</p>
              <Icon className={cn("size-4", card.color)} />
            </div>
            <p className="mt-1 text-2xl font-semibold text-[#0F1111]">{card.value}</p>
            {"hint" in card && card.hint ? (
              <p className="mt-1 text-xs text-muted-foreground">{card.hint}</p>
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}
