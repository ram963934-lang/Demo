/**
 * Centralized route definitions for the Seller Central demo platform.
 */
export const routes = {
  home: "/",
  seller: {
    dashboard: "/dashboard",
    inventory: "/dashboard/inventory",
    orders: "/dashboard/orders",
    products: "/dashboard/products",
    analytics: "/dashboard/analytics",
    payments: "/dashboard/payments",
    reports: "/dashboard/reports",
    settings: "/dashboard/settings",
    productDetail: (id: string) => `/dashboard/products/${id}`,
  },
} as const;

export type Routes = typeof routes;
