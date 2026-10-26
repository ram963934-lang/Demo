"use client";

import { AuthProvider } from "@/components/auth/auth-provider";
import { DemoDbProvider } from "@/components/providers/demo-db-provider";
import { SellerProvider } from "@/components/providers/seller-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider forcedTheme="light" enableSystem={false}>
      <TooltipProvider delay={0}>
        <AuthProvider>
          <SellerProvider>
            <DemoDbProvider>
              {children}
              <Toaster richColors closeButton position="top-right" />
            </DemoDbProvider>
          </SellerProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
