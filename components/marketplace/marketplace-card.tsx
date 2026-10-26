"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { PlatformId } from "@/config/platforms";

type MarketplaceCardProps = {
  name: string;
  description: string;
  href: string;
  accent: string;
  accentHover: string;
  glow: string;
  gradientFrom: string;
  gradientTo: string;
  badge: string;
  platformId: PlatformId;
  index: number;
};

function PlatformMark({ platformId }: { platformId: PlatformId }) {
  if (platformId === "amazon") {
    return (
      <svg viewBox="0 0 48 48" className="size-11" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="#232F3E" />
        <path d="M24 34c-6.5 2.2-12.2 2.1-17-0.1 0.3 0.2 6.4 3.8 17.9 3.8 11.2 0 17.2-3.4 17.7-3.7-4.9 2.1-10.4 2.3-18.6 0z" fill="#FF9900" />
        <path d="M36.5 20.2c0-8.8-10.4-9.3-10.4-9.3s-10.4 0.5-10.4 9.3c0 7.8 4.6 11.5 10.4 11.5s10.4-3.7 10.4-11.5z" fill="#FF9900" opacity="0.9" />
      </svg>
    );
  }
  if (platformId === "meesho") {
    return (
      <svg viewBox="0 0 48 48" className="size-11" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="#9B59B6" />
        <path d="M14 30V18h6.2c3.4 0 5.6 1.8 5.6 4.8 0 2.2-1.2 3.8-3.2 4.4L27 30h-3.4l-3.8-6.2H17.2V30H14zm3.2-8.8h2.8c1.6 0 2.6-0.8 2.6-2.2s-1-2.2-2.6-2.2h-2.8v4.4zM29.5 30V18h8.2v2.6h-5v2.4h4.6v2.5h-4.6v2.3h5.2V30h-8.4z" fill="#fff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="size-11" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#2874F0" />
      <path d="M14 32l10-16 10 16h-4.2l-1.6-2.6H19.8L18.2 32H14zm6.8-5.2h6.4L24 21.8l-3.2 5zM34 16h4v16h-4V16z" fill="#FFE500" />
    </svg>
  );
}

export function MarketplaceCard({
  name,
  description,
  href,
  accent,
  accentHover,
  glow,
  gradientFrom,
  gradientTo,
  badge,
  platformId,
  index,
}: MarketplaceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="dg-marketplace-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-8"
      style={{ backgroundImage: `linear-gradient(145deg, ${gradientFrom}, ${gradientTo})` }}
    >
      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 size-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-4">
        <PlatformMark platformId={platformId} />
        <span
          className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide"
          style={{ borderColor: `${accent}55`, color: accent }}
        >
          {badge}
        </span>
      </div>

      <div className="relative mt-6 flex flex-1 flex-col">
        <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{name}</h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{description}</p>

        <motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={href}
            className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-[#0F1111] shadow-lg transition-colors duration-200 sm:w-auto"
            style={{ backgroundColor: accent, boxShadow: `0 8px 24px ${glow}` }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accentHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = accent; }}
          >
            Launch
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
