"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ProductImagePreview } from "@/components/dashboard/product-thumb";
import { InventoryEditSheet } from "@/components/inventory/inventory-edit-sheet";
import { InventoryStatusBadge } from "@/components/inventory/inventory-status-badge";
import { useDemoDb } from "@/components/providers/demo-db-provider";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { formatCurrency, formatNumber } from "@/lib/format";
import { formatRelativeTime } from "@/lib/date";

type ProductDetailContentProps = {
  productId: string;
};

export function ProductDetailContent({ productId }: ProductDetailContentProps) {
  const router = useRouter();
  const { getProductById, deleteProduct } = useDemoDb();
  const product = getProductById(productId);
  const [editOpen, setEditOpen] = useState(false);

  if (!product) {
    notFound();
  }

  const handleDelete = () => {
    if (!window.confirm(`Remove "${product.name}" from inventory?`)) return;
    deleteProduct(product.id);
    toast.success("Product removed from inventory");
    router.push(routes.seller.inventory);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-[#D5D9D9]"
            render={<Link href={routes.seller.inventory} />}
          >
            <ArrowLeft className="size-4" />
            Back to inventory
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="border-[#D5D9D9]" onClick={() => setEditOpen(true)}>
            <Pencil className="size-4" />
            Edit product
          </Button>
          <Button variant="outline" size="sm" className="border-red-200 text-red-600" onClick={handleDelete}>
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-sm">
          <ProductImagePreview
            imageUrl={product.imageUrl}
            categoryId={product.categoryId}
            seed={product.imageSeed}
            alt={product.name}
            width={288}
            height={288}
            quality={95}
            priority
            className="mx-auto w-full max-w-[288px]"
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-[#D5D9D9] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#565959]">
                  {product.categoryLabel}
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-[#0F1111]">{product.name}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
              </div>
              <InventoryStatusBadge status={product.status} />
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem label="SKU" value={product.sku} mono />
              <DetailItem label="ASIN" value={product.asin} mono />
              <DetailItem label="Listing status" value={product.listingStatus} />
              <DetailItem label="Fulfillment" value={product.fulfillment} />
              <DetailItem label="Price" value={formatCurrency(product.price)} />
              <DetailItem label="Warehouse" value={product.warehouse} mono />
              <DetailItem label="Stock" value={formatNumber(product.stock)} />
              <DetailItem label="Reserved" value={formatNumber(product.reserved)} />
              <DetailItem label="Available" value={formatNumber(product.available)} />
              <DetailItem label="Last updated" value={formatRelativeTime(product.lastUpdated)} />
              <DetailItem label="Image folder" value={product.imageFolder} />
            </dl>
          </div>

          <div className="rounded-lg border border-[#D5D9D9] bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-[#0F1111]">Inventory details</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              FBA inventory for this ASIN is stored at fulfillment center{" "}
              <span className="font-mono font-medium text-[#0F1111]">{product.warehouse}</span>.
              {product.status === "stranded"
                ? " This unit is currently stranded and requires a removal or replenishment action."
                : product.status === "inbound"
                  ? " Inbound units are in transit to the fulfillment center."
                  : " Available units are ready for customer orders."}
            </p>
          </div>
        </div>
      </div>

      <InventoryEditSheet product={product} open={editOpen} onOpenChange={setEditOpen} />
    </div>
  );
}

function DetailItem({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-medium text-[#565959]">{label}</dt>
      <dd className={mono ? "mt-0.5 font-mono text-sm text-[#0F1111]" : "mt-0.5 text-sm text-[#0F1111]"}>
        {value}
      </dd>
    </div>
  );
}
