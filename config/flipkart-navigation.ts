import { flipkartRoutes } from "@/config/flipkart-routes";

export type FlipkartNavItem = {
  label: string;
  href?: string;
  icon: string;
  badge?: string;
};

export type FlipkartNavSection = {
  title?: string;
  items: FlipkartNavItem[];
};

export const FLIPKART_NAV: FlipkartNavSection[] = [
  {
    items: [{ label: "Dashboard", href: flipkartRoutes.dashboard, icon: "dashboard" }],
  },
  {
    title: "Commerce",
    items: [
      { label: "Orders", href: flipkartRoutes.orders, icon: "orders" },
      { label: "Listings", href: flipkartRoutes.listings, icon: "listings" },
      { label: "Inventory", href: flipkartRoutes.inventory, icon: "inventory" },
      { label: "Returns", href: flipkartRoutes.returns, icon: "returns" },
      { label: "Payments", href: flipkartRoutes.payments, icon: "payments" },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Performance", href: flipkartRoutes.performance, icon: "performance" },
      { label: "Analytics", href: flipkartRoutes.analytics, icon: "analytics" },
      { label: "Reports", href: flipkartRoutes.reports, icon: "reports" },
    ],
  },
  {
    title: "Growth",
    items: [
      { label: "Ads", href: flipkartRoutes.ads, icon: "ads", badge: "Live" },
      { label: "Customers", href: flipkartRoutes.customers, icon: "customers" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Support", href: flipkartRoutes.support, icon: "support" },
      { label: "Settings", href: flipkartRoutes.settings, icon: "settings" },
    ],
  },
];

export const FK_BREADCRUMB_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  orders: "Orders",
  listings: "Listings",
  inventory: "Inventory",
  payments: "Payments",
  returns: "Returns",
  performance: "Performance",
  analytics: "Analytics",
  reports: "Reports",
  ads: "Ads",
  customers: "Customers",
  support: "Support",
  settings: "Settings",
};
