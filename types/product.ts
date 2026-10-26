import type { InventoryStatus } from "@/types/inventory";
import type { SellerCategoryId } from "@/types/seller";

export type DemoProduct = {
  id: string;
  name: string;
  sku: string;
  asin: string;
  categoryId: SellerCategoryId;
  categoryLabel: string;
  imageFolder: string;
  imageFile: string;
  imageUrl: string;
  imageSeed: string;
  description: string;
  stock: number;
  reserved: number;
  available: number;
  warehouse: string;
  price: number;
  status: InventoryStatus;
  listingStatus: "Active" | "Inactive";
  fulfillment: "FBA" | "FBM";
  /** ISO timestamp (IST) of the last edit; render with formatRelativeTime(). */
  lastUpdated: string;
};

export type ProductUpdateInput = Partial<
  Pick<DemoProduct, "name" | "sku" | "price" | "stock" | "reserved" | "status" | "warehouse">
>;
