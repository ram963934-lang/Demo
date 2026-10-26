import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  disabled?: boolean;
  external?: boolean;
};

export type FooterNavGroup = {
  title: string;
  items: NavItem[];
};
