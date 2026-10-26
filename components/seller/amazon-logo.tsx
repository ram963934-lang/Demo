import { cn } from "@/lib/utils";

type AmazonLogoProps = {
  className?: string;
};

export function AmazonLogo({ className }: AmazonLogoProps) {
  return (
    <div className={cn("shrink-0 select-none leading-none", className)}>
      <div className="flex items-end gap-[6px]">
        <div className="relative">
          <span className="text-[20px] font-bold tracking-[-0.02em] text-white lowercase">
            amazon
          </span>
          <svg
            className="absolute -bottom-[3px] left-[1px]"
            width="52"
            height="8"
            viewBox="0 0 52 8"
            aria-hidden="true"
          >
            <path
              d="M2 5.5C12 1.5 22 0.5 50 2"
              fill="none"
              stroke="#ff9900"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M48 2L52 0.5L50 4.5"
              fill="#ff9900"
              stroke="none"
            />
          </svg>
        </div>
        <span className="pb-[1px] text-[11px] font-normal leading-tight text-white/95">
          seller
          <br />
          central
        </span>
      </div>
      <span className="mt-[2px] block text-[10px] font-normal text-white/70">India</span>
    </div>
  );
}
