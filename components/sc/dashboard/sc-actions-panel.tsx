import { IconInfo } from "@/components/sc/sc-icons";
import { SC_DASHBOARD } from "@/lib/demo/dashboard/amazon-data";

export function ScActionsPanel() {
  return (
    <section className="sc-white-card">
      <div className="sc-panel-head">
        <div className="sc-panel-head-left">
          <h2 className="sc-panel-title">Actions</h2>
          <button type="button" className="sc-info-btn" aria-label="Info">
            <IconInfo />
          </button>
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 24,
            height: 20,
            padding: "0 8px",
            borderRadius: 999,
            background: "#565959",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {SC_DASHBOARD.actionsCount}
        </span>
      </div>
      <div style={{ padding: "16px 16px 20px" }}>
        <div
          style={{
            background: "#f0f2f2",
            borderRadius: 4,
            padding: "32px 16px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: 13, color: "#565959", lineHeight: 1.4 }}>
            Check in later for more content
          </p>
        </div>
      </div>
    </section>
  );
}
