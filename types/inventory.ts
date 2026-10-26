import type { DemoProduct } from "@/types/product";
import type { SellerCategoryId } from "@/types/seller";

export type InventoryStatus =
  | "in_stock"
  | "low_stock"
  | "out_of_stock"
  | "stranded"
  | "inbound";

/** Inventory row — aligned with uploaded product catalog */
export type InventoryItem = DemoProduct;

export type InventorySortField =
  | "name"
  | "sku"
  | "asin"
  | "categoryLabel"
  | "stock"
  | "reserved"
  | "available"
  | "warehouse"
  | "price"
  | "status";

export type InventorySortDirection = "asc" | "desc";

export type InventoryFilters = {
  search: string;
  status: InventoryStatus | "all";
  warehouse: string;
  category: SellerCategoryId | "all";
};

export const INVENTORY_STATUSES: InventoryStatus[] = [
  "in_stock",
  "low_stock",
  "out_of_stock",
  "stranded",
  "inbound",
];

export const INVENTORY_WAREHOUSES = [
  "PHX7",
  "EWR4",
  "ONT8",
  "FTW1",
  "BWI2",
  "LAX9",
  "MDW2",
  "JFK8",
  "ATL6",
  "DEN2",
] as const;

export const INVENTORY_STATUS_LABELS: Record<InventoryStatus, string> = {
  in_stock: "In Stock",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
  stranded: "Stranded",
  inbound: "Inbound",
};

export const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

export const CATEGORY_FILTER_LABELS: Record<SellerCategoryId, string> = {
  "home-decor": "Home Decor",
  fashion: "Fashion",
  kitchen: "Kitchen",
  electronics: "Electronics",
  beauty: "Beauty",
  toys: "Toys",
  jewellery: "Jewellery",
  sports: "Sports",
};
