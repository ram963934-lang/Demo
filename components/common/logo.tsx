import Link from "next/link";

import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link
      href={routes.seller.dashboard}
      className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}
      aria-label={`${siteConfig.name} dashboard`}
    >
      <span
        aria-hidden
        className="flex size-8 items-center justify-center rounded-lg bg-[#FF9900] text-sm font-bold text-[#0F1111]"
      >
        DG
      </span>
      {showWordmark ? (
        <span className="leading-tight">
          <span className="block">{siteConfig.name}</span>
          <span className="block text-[11px] font-medium text-[#FF9900]">
            {siteConfig.productName}
          </span>
        </span>
      ) : null}
    </Link>
  );
}
