/** Flipkart-only routes — isolated from Amazon & Meesho */
export const flipkartRoutes = {
  root: "/flipkart",
  dashboard: "/flipkart/dashboard",
  orders: "/flipkart/orders",
  orderDetail: (id: string) => `/flipkart/orders/${id}`,
  listings: "/flipkart/listings",
  listingDetail: (id: string) => `/flipkart/listings/${id}`,
  inventory: "/flipkart/inventory",
  payments: "/flipkart/payments",
  returns: "/flipkart/returns",
  performance: "/flipkart/performance",
  analytics: "/flipkart/analytics",
  reports: "/flipkart/reports",
  ads: "/flipkart/ads",
  customers: "/flipkart/customers",
  support: "/flipkart/support",
  settings: "/flipkart/settings",
} as const;
