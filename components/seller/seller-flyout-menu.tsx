"use client";

import { Bookmark, ChevronRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type FlyoutMenuProps = {
  open: boolean;
  onClose: () => void;
};

type MenuItem = {
  id: string;
  label: string;
  subItems?: { id: string; label: string }[];
};

const menuItems: MenuItem[] = [
  {
    id: "inventory",
    label: "Inventory",
    subItems: [
      { id: "manage-all", label: "Manage All Inventory" },
      { id: "seller-fulfilled", label: "Manage Seller Fulfilled Products" },
      { id: "sell-globally", label: "Sell Globally" },
      { id: "planning", label: "Inventory Planning" },
    ],
  },
  { id: "orders", label: "Orders" },
  { id: "advertising", label: "Advertising" },
];

export function SellerFlyoutMenu({ open, onClose }: FlyoutMenuProps) {
  const [activeItem, setActiveItem] = useState<string>("inventory");

  if (!open) return null;

  const activeMenu = menuItems.find((item) => item.id === activeItem);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/45" onClick={onClose} aria-hidden="true" />
      <div className="fixed inset-y-0 left-0 z-50 flex pt-[var(--sc-nav-height)]">
        <nav
          className="flex w-[240px] flex-col border-r border-[#d5d9d9] bg-white"
          aria-label="Seller Central navigation"
        >
          <ul className="py-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveItem(item.id)}
                  onFocus={() => setActiveItem(item.id)}
                  className={cn(
                    "flex w-full items-center justify-between px-5 py-[10px] text-left text-[13px] text-[#0f1111] transition-colors",
                    activeItem === item.id
                      ? "bg-[#eaeded] font-normal"
                      : "bg-white hover:bg-[#f7fafa]",
                  )}
                >
                  {item.label}
                  {item.subItems ? (
                    <ChevronRight className="size-[14px] text-[#565959]" strokeWidth={2} />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {activeMenu?.subItems ? (
          <nav
            className="flex w-[272px] flex-col border-r border-[#d5d9d9] bg-white shadow-[2px_0_6px_rgba(0,0,0,0.08)]"
            aria-label={`${activeMenu.label} submenu`}
          >
            <ul className="py-2">
              {activeMenu.subItems.map((sub) => (
                <li key={sub.id}>
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between px-5 py-[10px] text-left text-[13px] text-[#0f1111] transition-colors hover:bg-[#f7fafa]"
                  >
                    <span>{sub.label}</span>
                    <Bookmark
                      className="size-[13px] text-[#879596] opacity-60 transition-opacity group-hover:opacity-100"
                      strokeWidth={1.5}
                      fill="none"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </>
  );
}
