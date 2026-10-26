"use client";

import { useSeller } from "@/components/providers/seller-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routes } from "@/config/routes";
import { resetInventoryDb } from "@/lib/demo/db/inventory-store";
import { CATEGORY_FILTER_LABELS } from "@/types/inventory";
import { SELLER_CATEGORIES } from "@/types/seller";
import Link from "next/link";
import { toast } from "sonner";

export function SettingsPageContent() {
  const { account, categoryId, setCategoryId, categories } = useSeller();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#0F1111]">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Account and demo configuration</p>
      </div>

      <div className="rounded-lg border border-[#D5D9D9] bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold">Seller account</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[#565959]">Store name</dt>
            <dd className="text-sm font-medium">{account.storeName}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#565959]">Seller ID</dt>
            <dd className="font-mono text-sm">{account.sellerId}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#565959]">Marketplace</dt>
            <dd className="text-sm">{account.marketplace}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#565959]">Category</dt>
            <dd className="text-sm">{account.categoryLabel}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-lg border border-[#D5D9D9] bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold">Demo category</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Switch the active seller category for dashboard analytics.
        </p>
        <div className="mt-4 max-w-xs space-y-2">
          <Label>Active category</Label>
          <Select value={categoryId} onValueChange={(v) => v && setCategoryId(v as typeof categoryId)}>
            <SelectTrigger className="border-[#D5D9D9]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {CATEGORY_FILTER_LABELS[cat]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border border-[#D5D9D9] bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold">Quick links</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" className="border-[#D5D9D9]" render={<Link href={routes.seller.inventory} />}>
            Inventory
          </Button>
          <Button variant="outline" className="border-[#D5D9D9]" render={<Link href={routes.seller.products} />}>
            Products
          </Button>
          <Button variant="outline" className="border-[#D5D9D9]" render={<Link href={routes.seller.orders} />}>
            Orders
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-[#D5D9D9] bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold">Reset demo data</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Restore all uploaded products to their default inventory values.
        </p>
        <Button
          variant="outline"
          className="mt-4 border-red-200 text-red-600"
          onClick={() => {
            resetInventoryDb();
            toast.success("Demo inventory reset to defaults");
          }}
        >
          Reset inventory database
        </Button>
      </div>
    </div>
  );
}
