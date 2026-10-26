export const SELLER_CATEGORIES = [
  "home-decor",
  "fashion",
  "kitchen",
  "electronics",
  "beauty",
  "toys",
  "jewellery",
  "sports",
] as const;

export type SellerCategoryId = (typeof SELLER_CATEGORIES)[number];

export type SellerAccountSummary = {
  id: SellerCategoryId;
  categoryLabel: string;
  storeName: string;
  sellerId: string;
  marketplace: string;
  /** Unique per-category demo metrics for the dashboard shell */
  metrics: {
    revenue30d: number;
    orders30d: number;
    unitsSold30d: number;
    activeListings: number;
    inventoryValue: number;
    returnRate: number;
    avgOrderValue: number;
    pendingShipments: number;
  };
};
