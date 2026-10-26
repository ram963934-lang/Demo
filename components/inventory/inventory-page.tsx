"use client";

import { motion } from "framer-motion";
import { Download, RefreshCw } from "lucide-react";

import { InventorySummaryCards } from "@/components/inventory/inventory-summary-cards";
import { InventoryTable } from "@/components/inventory/inventory-table";
import { InventoryToolbar } from "@/components/inventory/inventory-toolbar";
import { useDemoDb } from "@/components/providers/demo-db-provider";
import { useSeller } from "@/components/providers/seller-provider";
import { Button } from "@/components/ui/button";
import { useInventoryTable } from "@/hooks/use-inventory-table";

export function InventoryPageContent() {
  const { account } = useSeller();
  const { inventorySummary } = useDemoDb();
  const table = useInventoryTable();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F1111]">Manage All Inventory</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {account.storeName} · {inventorySummary.totalSkus} uploaded products · Amazon FBA
            inventory across fulfillment centers
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="border-[#D5D9D9]">
            <RefreshCw className="size-4" />
            Sync inventory
          </Button>
          <Button size="sm" className="bg-[#FF9900] text-[#0F1111] hover:bg-[#E88B00]">
            <Download className="size-4" />
            Download report
          </Button>
        </div>
      </div>

      <InventorySummaryCards summary={inventorySummary} />
      <InventoryToolbar table={table} />
      <InventoryTable table={table} />
    </motion.div>
  );
}
