import type { SellerAccountSummary } from "@/types/seller";

/**
 * Independent seller accounts — each category has unique demo metrics.
 * Full product/order/inventory datasets will be added per module.
 */
export const sellerAccounts: SellerAccountSummary[] = [
  {
    id: "home-decor",
    categoryLabel: "Home Decor",
    storeName: "Nest & Nurture Home",
    sellerId: "A3HKD9L2M8QW1",
    marketplace: "Amazon.com",
    metrics: {
      revenue30d: 48_230.17,
      orders30d: 1_247,
      unitsSold30d: 1_893,
      activeListings: 186,
      inventoryValue: 92_450,
      returnRate: 2.8,
      avgOrderValue: 38.67,
      pendingShipments: 34,
    },
  },
  {
    id: "fashion",
    categoryLabel: "Fashion",
    storeName: "Urban Thread Co.",
    sellerId: "A7BFK2P9X4RN6",
    marketplace: "Amazon.com",
    metrics: {
      revenue30d: 127_840.52,
      orders30d: 3_412,
      unitsSold30d: 4_891,
      activeListings: 524,
      inventoryValue: 218_300,
      returnRate: 9.4,
      avgOrderValue: 37.48,
      pendingShipments: 112,
    },
  },
  {
    id: "kitchen",
    categoryLabel: "Kitchen",
    storeName: "ChefCraft Essentials",
    sellerId: "A1MNC8V5T3JL9",
    marketplace: "Amazon.com",
    metrics: {
      revenue30d: 73_615.89,
      orders30d: 2_156,
      unitsSold30d: 2_734,
      activeListings: 142,
      inventoryValue: 64_880,
      returnRate: 4.1,
      avgOrderValue: 34.14,
      pendingShipments: 58,
    },
  },
  {
    id: "electronics",
    categoryLabel: "Electronics",
    storeName: "VoltEdge Tech",
    sellerId: "A9QWE4R7Y2KP3",
    marketplace: "Amazon.com",
    metrics: {
      revenue30d: 312_470.25,
      orders30d: 1_876,
      unitsSold30d: 2_104,
      activeListings: 98,
      inventoryValue: 445_200,
      returnRate: 6.7,
      avgOrderValue: 166.56,
      pendingShipments: 41,
    },
  },
  {
    id: "beauty",
    categoryLabel: "Beauty",
    storeName: "Glow Theory Beauty",
    sellerId: "A5ZXT8H1C6DM4",
    marketplace: "Amazon.com",
    metrics: {
      revenue30d: 89_342.64,
      orders30d: 4_823,
      unitsSold30d: 7_156,
      activeListings: 312,
      inventoryValue: 51_740,
      returnRate: 3.2,
      avgOrderValue: 18.52,
      pendingShipments: 167,
    },
  },
  {
    id: "toys",
    categoryLabel: "Toys",
    storeName: "WonderPlay Toys",
    sellerId: "A2PLM6N8B4VS7",
    marketplace: "Amazon.com",
    metrics: {
      revenue30d: 156_908.33,
      orders30d: 5_641,
      unitsSold30d: 8_902,
      activeListings: 428,
      inventoryValue: 173_600,
      returnRate: 5.9,
      avgOrderValue: 27.81,
      pendingShipments: 203,
    },
  },
  {
    id: "jewellery",
    categoryLabel: "Jewellery",
    storeName: "Lumina Jewels",
    sellerId: "A8JRW3K5E9TF2",
    marketplace: "Amazon.com",
    metrics: {
      revenue30d: 64_175.4,
      orders30d: 892,
      unitsSold30d: 1_024,
      activeListings: 156,
      inventoryValue: 128_900,
      returnRate: 7.3,
      avgOrderValue: 71.94,
      pendingShipments: 19,
    },
  },
  {
    id: "sports",
    categoryLabel: "Sports",
    storeName: "PeakForge Sports",
    sellerId: "A4DSG7W2H8NY5",
    marketplace: "Amazon.com",
    metrics: {
      revenue30d: 198_563.78,
      orders30d: 2_987,
      unitsSold30d: 3_654,
      activeListings: 267,
      inventoryValue: 156_420,
      returnRate: 4.8,
      avgOrderValue: 66.48,
      pendingShipments: 76,
    },
  },
];

export const defaultSellerCategory = sellerAccounts[0].id;

export function getSellerAccount(id: string) {
  return sellerAccounts.find((account) => account.id === id) ?? sellerAccounts[0];
}
