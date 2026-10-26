"use client";

import { useCallback, useState } from "react";

import { MeeshoSidebar } from "@/components/meesho/meesho-sidebar";
import { MsIconMenu } from "@/components/meesho/meesho-icons";

type MeeshoShellProps = {
  children: React.ReactNode;
};

export function MeeshoShell({ children }: MeeshoShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="meesho-app flex min-h-svh">
      <div className="hidden shrink-0 md:block">
        <MeeshoSidebar collapsed={collapsed} onToggle={toggleCollapsed} />
      </div>

      {mobileOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 md:hidden">
            <MeeshoSidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
          </div>
        </>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="meesho-topbar flex items-center gap-3 px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="border-none bg-transparent p-1"
          >
            <MsIconMenu />
          </button>
          <span className="text-[15px] font-semibold text-[var(--ms-text)]">meesho Supplier Hub</span>
        </div>

        <div className="meesho-topbar hidden items-center justify-end px-5 py-2.5 md:flex">
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="meesho-topbar-btn"
          >
            <MsIconMenu size={16} />
            {collapsed ? "Expand" : "Collapse"}
          </button>
        </div>

        <main className="flex-1 overflow-x-auto px-5 py-5 md:px-6 md:py-6">{children}</main>
      </div>
    </div>
  );
}
