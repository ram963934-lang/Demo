import { cn } from "@/lib/utils";
import { layoutConstants } from "@/lib/constants";

type ContainerProps = React.ComponentProps<"div"> & {
  size?: "default" | "narrow" | "wide";
};

const sizeClasses = {
  default: layoutConstants.marketingMaxWidth,
  narrow: layoutConstants.contentMaxWidth,
  wide: "max-w-[90rem]",
} as const;

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}
      {...props}
    />
  );
}
