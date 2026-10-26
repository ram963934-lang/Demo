"use client";

import { ScHeader } from "@/components/sc/sc-header";
import { ScModuleNav } from "@/components/sc/sc-module-nav";

export function ScShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="sc-page">
      <ScHeader />
      <main style={{ padding: "18px 20px 28px" }}>
        <ScModuleNav />
        {children}
      </main>
    </div>
  );
}
