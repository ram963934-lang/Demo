"use client";

import { Bell, ChevronDown, Mail, Menu, Search, Settings, X } from "lucide-react";
import { useState } from "react";

import { AmazonLogo } from "@/components/seller/amazon-logo";
import { MarketplaceSelector } from "@/components/seller/marketplace-selector";
import { SellerFlyoutMenu } from "@/components/seller/seller-flyout-menu";
import { cn } from "@/lib/utils";

type SellerHeaderProps = {
  className?: string;
};

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M1.5 8h13M8 1.5c2 2 2 10.5 0 13M8 1.5c-2 2-2 10.5 0 13"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function NewSellerCentralToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled(!enabled)}
      className="hidden items-center gap-2 xl:flex"
    >
      <span className="whitespace-nowrap text-[12px] leading-none text-white">New Seller Central</span>
      <span
        className={cn(
          "relative inline-flex h-[20px] w-[36px] shrink-0 rounded-full border border-white/20 transition-colors",
          enabled ? "bg-[#008296]" : "bg-[#565959]",
        )}
      >
        <span
          className={cn(
            "absolute top-[2px] size-[14px] rounded-full bg-white shadow-sm transition-transform",
            enabled ? "translate-x-[18px]" : "translate-x-[2px]",
          )}
        />
      </span>
    </button>
  );
}

function HeaderSearch({ className }: { className?: string }) {
  return (
    <div className={cn("relative min-w-0 flex-1", className)}>
      <input
        type="text"
        readOnly
        placeholder="Search"
        className="h-[36px] w-full rounded-[4px] border border-[#008296] bg-[#004b54] pr-[42px] pl-3 text-[13px] text-white placeholder:text-white/55 outline-none"
      />
      <button
        type="button"
        className="absolute top-0 right-0 flex h-[36px] w-[42px] items-center justify-center rounded-r-[3px] bg-[#008296] text-white transition-colors hover:bg-[#009aab]"
        aria-label="Search"
      >
        <Search className="size-[16px]" strokeWidth={2.2} />
      </button>
    </div>
  );
}

export function SellerHeader({ className }: SellerHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={cn("sticky top-0 z-40 bg-[#002f36]", className)}>
        <div
          className="flex items-center gap-3 px-4"
          style={{ height: "var(--sc-nav-height)" }}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex shrink-0 items-center gap-2 text-[13px] text-white transition-opacity hover:opacity-85"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-[18px]" strokeWidth={2} /> : <Menu className="size-[18px]" strokeWidth={2} />}
            <span>Menu</span>
          </button>

          {!menuOpen ? <AmazonLogo className="hidden md:flex" /> : null}

          <MarketplaceSelector
            variant={menuOpen ? "compact" : "default"}
            className={cn(menuOpen ? "flex" : "hidden md:flex")}
          />

          <HeaderSearch className={cn("mx-1 max-w-none", menuOpen ? "flex" : "hidden md:flex lg:max-w-[560px] xl:max-w-[640px]")} />

          <div className="ml-auto flex shrink-0 items-center">
            <NewSellerCentralToggle />

            <button
              type="button"
              className="flex size-[36px] items-center justify-center text-white/85 transition-colors hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="size-[17px]" strokeWidth={1.8} />
            </button>

            <button
              type="button"
              className="flex size-[36px] items-center justify-center text-white/85 transition-colors hover:text-white"
              aria-label="Messages"
            >
              <Mail className="size-[17px]" strokeWidth={1.8} />
            </button>

            <button
              type="button"
              className="hidden size-[36px] items-center justify-center text-white/85 transition-colors hover:text-white sm:flex"
              aria-label="Settings"
            >
              <Settings className="size-[17px]" strokeWidth={1.8} />
            </button>

            <button
              type="button"
              className="hidden items-center gap-1 px-2 text-white/85 transition-colors hover:text-white sm:flex"
              aria-label="Language"
            >
              <GlobeIcon />
              <span className="text-[12px]">EN</span>
              <ChevronDown className="size-3 text-white/70" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              className="hidden items-center gap-0.5 px-2 text-[12px] text-white/85 transition-colors hover:text-white sm:flex"
            >
              Help
              <ChevronDown className="size-3 text-white/70" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div
          className="flex items-center justify-between border-t border-[#004b54] bg-[#f0f2f2] px-4"
          style={{ height: "var(--sc-subheader-height)" }}
        >
          <button
            type="button"
            className="flex size-[28px] items-center justify-center text-[#565959] transition-colors hover:text-[#0f1111]"
            aria-label="Home"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1.2L1.5 7v7.8h4.8V10h3.4v4.8H14.5V7L8 1.2zm0 2l4.8 4.3V13.3h-1.8V9.2H5V13.3H3.2V7.5L8 3.2z" />
            </svg>
          </button>
          <button
            type="button"
            className="flex h-[28px] items-center gap-1.5 rounded-[3px] border border-[#d5d9d9] bg-white px-3 text-[13px] text-[#0f1111] transition-colors hover:bg-[#f7fafa]"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M11.2 1.8l3 3-9.7 9.7H2v-3.7L11.2 1.8z" />
            </svg>
            Edit
          </button>
        </div>
      </header>

      <SellerFlyoutMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
