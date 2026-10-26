"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useDemoDb } from "@/components/providers/demo-db-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  INVENTORY_STATUSES,
  INVENTORY_STATUS_LABELS,
  INVENTORY_WAREHOUSES,
} from "@/types/inventory";
import type { DemoProduct } from "@/types/product";
import type { InventoryStatus } from "@/types/inventory";

type InventoryEditSheetProps = {
  product: DemoProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function InventoryEditSheet({ product, open, onOpenChange }: InventoryEditSheetProps) {
  const { updateProduct } = useDemoDb();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [reserved, setReserved] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [status, setStatus] = useState<InventoryStatus>("in_stock");

  useEffect(() => {
    if (!product) return;
    setName(product.name);
    setSku(product.sku);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setReserved(String(product.reserved));
    setWarehouse(product.warehouse);
    setStatus(product.status);
  }, [product]);

  const handleSave = () => {
    if (!product) return;

    const parsedPrice = Number.parseFloat(price);
    const parsedStock = Number.parseInt(stock, 10);
    const parsedReserved = Number.parseInt(reserved, 10);

    if (!name.trim() || !sku.trim()) {
      toast.error("Name and SKU are required");
      return;
    }
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      toast.error("Enter a valid price");
      return;
    }
    if (Number.isNaN(parsedStock) || parsedStock < 0) {
      toast.error("Enter a valid stock quantity");
      return;
    }
    if (Number.isNaN(parsedReserved) || parsedReserved < 0) {
      toast.error("Enter a valid reserved quantity");
      return;
    }

    updateProduct(product.id, {
      name: name.trim(),
      sku: sku.trim(),
      price: parsedPrice,
      stock: parsedStock,
      reserved: parsedReserved,
      warehouse,
      status,
    });

    toast.success("Inventory updated", { description: sku.trim() });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit inventory</SheetTitle>
          <SheetDescription>
            Update listing and FBA inventory details for this SKU.
          </SheetDescription>
        </SheetHeader>

        {product ? (
          <div className="flex flex-col gap-4 px-4 pb-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Product name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="border-[#D5D9D9]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-sku">SKU</Label>
              <Input
                id="edit-sku"
                value={sku}
                onChange={(event) => setSku(event.target.value)}
                className="border-[#D5D9D9] font-mono text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price (₹)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className="border-[#D5D9D9]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-stock">Stock</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  min={0}
                  value={stock}
                  onChange={(event) => setStock(event.target.value)}
                  className="border-[#D5D9D9]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="edit-reserved">Reserved</Label>
                <Input
                  id="edit-reserved"
                  type="number"
                  min={0}
                  value={reserved}
                  onChange={(event) => setReserved(event.target.value)}
                  className="border-[#D5D9D9]"
                />
              </div>
              <div className="space-y-2">
                <Label>Warehouse</Label>
                <Select value={warehouse} onValueChange={(value) => setWarehouse(value ?? warehouse)}>
                  <SelectTrigger className="border-[#D5D9D9]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INVENTORY_WAREHOUSES.map((fc) => (
                      <SelectItem key={fc} value={fc}>
                        {fc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus((value ?? status) as InventoryStatus)}
              >
                <SelectTrigger className="border-[#D5D9D9]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INVENTORY_STATUSES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {INVENTORY_STATUS_LABELS[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : null}

        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-[#FF9900] text-[#0F1111] hover:bg-[#E88B00]"
            onClick={handleSave}
          >
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
