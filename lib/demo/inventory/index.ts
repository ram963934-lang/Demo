import {
  getInventoryStoreServerSnapshot,
  getInventoryStoreSnapshot,
  getInventorySummaryFromProducts,
} from "@/lib/demo/db/inventory-store";

export {
  deleteInventoryProduct,
  deleteInventoryProducts,
  getInventoryStoreSnapshot,
  getInventoryStoreServerSnapshot,
  getInventorySummaryFromProducts,
  getProductFromDb,
  resetInventoryDb,
  subscribeInventoryDb,
  updateInventoryProduct,
} from "@/lib/demo/db/inventory-store";

export {
  UPLOADED_PRODUCT_CATALOG,
  getCatalogProductById,
  getCatalogProductBySku,
} from "@/lib/demo/products/catalog";

/** @deprecated Use getInventoryStoreSnapshot().products */
export function getInventoryItems() {
  return getInventoryStoreSnapshot().products;
}

/** @deprecated Use getInventoryStoreSnapshot().summary */
export function getInventorySummary() {
  return getInventoryStoreSnapshot().summary;
}

// Legacy aliases
export const getInventoryDbSnapshot = () => [...getInventoryStoreSnapshot().products];
export const getInventoryDbServerSnapshot = () => [
  ...getInventoryStoreServerSnapshot().products,
];
