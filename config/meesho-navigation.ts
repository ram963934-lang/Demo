import { meeshoRoutes } from "@/config/meesho-routes";

export type MeeshoNavItem = {
  label: string;
  href?: string;
  icon: string;
  badge?: string;
  children?: MeeshoNavItem[];
};

export type MeeshoNavSection = {
  title?: string;
  items: MeeshoNavItem[];
};

export const MEESHO_NAV: MeeshoNavSection[] = [
  {
    items: [{ label: "Home", href: meeshoRoutes.dashboard, icon: "home" }],
  },
  {
    title: "Manage Business",
    items: [
      { label: "Orders", href: meeshoRoutes.orders, icon: "orders" },
      { label: "Returns", href: meeshoRoutes.returns, icon: "returns" },
      { label: "Pricing", icon: "pricing" },
      { label: "Claims", icon: "claims" },
      { label: "Inventory", href: meeshoRoutes.inventory, icon: "inventory" },
      { label: "Catalog Uploads", href: meeshoRoutes.catalog, icon: "catalog" },
      { label: "Image Bulk Upload", icon: "image-upload" },
      { label: "Quality", icon: "quality" },
      { label: "Payments", href: meeshoRoutes.payments, icon: "payments" },
      { label: "Warehouse", icon: "warehouse" },
    ],
  },
  {
    title: "Boost Sales",
    items: [
      { label: "Influencer Marketing", icon: "influencer" },
      { label: "Promotions", icon: "promotions", badge: "Opt-in Live" },
      { label: "Instant Cash", icon: "cash" },
    ],
  },
  {
    title: "Performance",
    items: [{ label: "Business Dashboard", href: meeshoRoutes.growth, icon: "dashboard" }],
  },
];
