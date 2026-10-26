/** Meesho-only routes — isolated from Amazon config/routes.ts */
export const meeshoRoutes = {
  root: "/meesho",
  dashboard: "/meesho/dashboard",
  catalog: "/meesho/catalog",
  inventory: "/meesho/inventory",
  orders: "/meesho/orders",
  payments: "/meesho/payments",
  returns: "/meesho/returns",
  growth: "/meesho/growth",
  help: "/meesho/help",
  profile: "/meesho/profile",
} as const;
