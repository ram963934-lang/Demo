"use client";

import { motion } from "framer-motion";

import { PlatformCard } from "@/components/platform/platform-card";
import { PLATFORMS } from "@/config/platforms";

export function PlatformSelector() {
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

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col px-5 py-14 sm:px-8 sm:py-20">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
          >
            Enterprise Demo Platform
          </motion.p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            DropshipGuru Seller Demo
          </h1>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            Choose Platform
          </p>
        </motion.header>

        <div className="mt-12 grid flex-1 gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-8">
          {PLATFORMS.map((platform, index) => (
            <PlatformCard key={platform.id} {...platform} platformId={platform.id} index={index} />
          ))}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-12 text-center text-xs text-slate-500 sm:mt-16"
        >
          All marketplace demos use simulated data for product demonstrations only.
        </motion.footer>
      </div>
    </div>
  );
}
