"use client";

import { Bell, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "@/components/auth/auth-provider";

export function MarketplaceHeader() {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#070B14]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
            DG
          </div>
          <span className="hidden text-sm font-semibold text-white sm:inline">DropshipGuru</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-sm font-medium text-slate-200">{user?.name ?? "Admin"}</span>
            <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
              Admin
            </span>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>
          <button
            type="button"
            className="hidden size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white sm:flex"
            aria-label="Settings"
          >
            <Settings size={18} />
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
