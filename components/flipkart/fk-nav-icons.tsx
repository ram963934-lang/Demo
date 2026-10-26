import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Headphones,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  Megaphone,
  MessageSquare,
  Package,
  RotateCcw,
  Settings,
  ShoppingBag,
  Store,
  Users,
  Wallet,
  FileText,
  Boxes,
} from "lucide-react";

export const FK_NAV_ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  orders: ShoppingBag,
  listings: Store,
  inventory: Boxes,
  returns: RotateCcw,
  payments: Wallet,
  performance: BarChart3,
  analytics: LineChart,
  ads: Megaphone,
  reports: FileText,
  customers: Users,
  support: Headphones,
  settings: Settings,
};

export function getFkNavIcon(name: string): LucideIcon {
  return FK_NAV_ICONS[name] ?? Package;
}
