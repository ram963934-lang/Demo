"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { MarketplaceCard } from "@/components/marketplace/marketplace-card";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { PLATFORMS } from "@/config/platforms";

import "@/styles/auth.css";

export function MarketplacePage() {
  const router = useRouter();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (ready && !user) router.replace("/");
  }, [ready, user, router]);

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#070B14]">
        <div className="dg-btn-spinner border-white/20 border-t-indigo-400" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="relative min-h-svh overflow-hidden bg-[#070B14] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,153,0,0.12), transparent 40%), radial-gradient(circle at 80% 10%, rgba(40,116,240,0.12), transparent 35%), radial-gradient(circle at 50% 80%, rgba(155,89,182,0.1), transparent 40%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <MarketplaceHeader />

      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Seller Portal</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Choose Marketplace
          </h1>
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            Select a marketplace to manage orders, inventory, and growth analytics.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-8">
          {PLATFORMS.map((platform, index) => (
            <MarketplaceCard key={platform.id} {...platform} platformId={platform.id} index={index} />
          ))}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-12 text-center text-xs text-slate-500 sm:mt-16"
        >
          All marketplace demos use simulated data for product demonstrations only.
        </motion.footer>
      </div>
    </div>
  );
}
