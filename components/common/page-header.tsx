import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-muted-foreground text-pretty">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
