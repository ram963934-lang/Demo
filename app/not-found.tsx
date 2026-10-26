import Link from "next/link";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#EAEDED] px-4 text-center">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold text-[#0F1111]">Page not found</h1>
        <p className="max-w-md text-muted-foreground">
          This demo route does not exist in Seller Central.
        </p>
      </div>
      <Button render={<Link href={routes.seller.dashboard} />}>Back to dashboard</Button>
    </div>
  );
}
