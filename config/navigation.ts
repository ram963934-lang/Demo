import {
  BarChart3,
  CreditCard,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Warehouse,
} from "lucide-react";

import { routes } from "@/config/routes";
import type { NavItem } from "@/types/navigation";

export const sellerNav: NavItem[] = [
  { title: "Dashboard", href: routes.seller.dashboard, icon: LayoutDashboard },
  { title: "Inventory", href: routes.seller.inventory, icon: Warehouse },
  { title: "Orders", href: routes.seller.orders, icon: ShoppingCart },
  { title: "Products", href: routes.seller.products, icon: Package },
  { title: "Analytics", href: routes.seller.analytics, icon: BarChart3 },
  { title: "Payments", href: routes.seller.payments, icon: CreditCard },
  { title: "Reports", href: routes.seller.reports, icon: FileText },
  { title: "Settings", href: routes.seller.settings, icon: Settings },
];

export const sellerNavByHref = Object.fromEntries(
  sellerNav.map((item) => [item.href, item]),
) as Record<string, NavItem>;
