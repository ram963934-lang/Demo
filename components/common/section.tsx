import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  spacing?: "sm" | "md" | "lg";
};

const spacingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
} as const;

export function Section({
  className,
  spacing = "md",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("w-full", spacingClasses[spacing], className)}
      {...props}
    />
  );
}
