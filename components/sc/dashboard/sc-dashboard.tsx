import { ScActionsPanel } from "@/components/sc/dashboard/sc-actions-panel";
import { ScCommunicationsPanel } from "@/components/sc/dashboard/sc-communications-panel";
import { ScGlobalSnapshot } from "@/components/sc/dashboard/sc-global-snapshot";
import { ScProductPerformance } from "@/components/sc/dashboard/sc-product-performance";
import { ScToolbar } from "@/components/sc/dashboard/sc-toolbar";

export function ScDashboard() {
  return (
    <div style={{ maxWidth: "var(--sc-content-max)", margin: "0 auto" }}>
      <ScToolbar />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "var(--sc-left-col) 1fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <ScActionsPanel />
          <ScCommunicationsPanel />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <ScGlobalSnapshot />
          <ScProductPerformance />
        </div>
      </div>
    </div>
  );
}
