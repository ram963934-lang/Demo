import { ScSparkline } from "@/components/sc/dashboard/sc-sparkline";
import { IconChevronDown, IconStarFilled } from "@/components/sc/sc-icons";
import { SC_DASHBOARD } from "@/lib/demo/dashboard/amazon-data";

type CellProps = {
  label: string;
  value?: string;
  sub: string;
  noRightBorder?: boolean;
  noBottomBorder?: boolean;
  footer?: React.ReactNode;
  valueRow?: React.ReactNode;
};

function Cell({ label, value, sub, footer, valueRow, noRightBorder, noBottomBorder }: CellProps) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRight: noRightBorder ? "none" : "1px solid #d5d9d9",
        borderBottom: noBottomBorder ? "none" : "1px solid #d5d9d9",
        minHeight: 112,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: "#565959", lineHeight: 1.3 }}>{label}</span>
        <IconChevronDown size={11} color="#879596" />
      </div>
      {valueRow ?? (
        <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.15, color: "#0f1111", letterSpacing: "-0.01em" }}>
          {value}
        </div>
      )}
      <div style={{ fontSize: 12, color: "#565959", marginTop: 4, lineHeight: 1.35 }}>{sub}</div>
      {footer}
    </div>
  );
}

function FeedbackStars({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 1, marginLeft: 8, verticalAlign: "middle" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <IconStarFilled key={i} partial={i === 5 && rating < 5} />
      ))}
    </span>
  );
}

function IconEnvelopeHeader() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#565959" strokeWidth="1.3" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="10" rx="1" />
      <path d="M1.5 4.5L8 9.5l6.5-5" />
    </svg>
  );
}

function IconLayoutHeader() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#565959" aria-hidden="true">
      <circle cx="5" cy="4" r="1.2" />
      <circle cx="11" cy="4" r="1.2" />
      <circle cx="5" cy="8" r="1.2" />
      <circle cx="11" cy="8" r="1.2" />
      <circle cx="5" cy="12" r="1.2" />
      <circle cx="11" cy="12" r="1.2" />
      <rect x="2" y="3" width="12" height="10" fill="none" stroke="#565959" strokeWidth="1.2" rx="1" />
    </svg>
  );
}

export function ScGlobalSnapshot() {
  const g = SC_DASHBOARD.globalSnapshot;

  return (
    <section className="sc-white-card">
      <div className="sc-panel-head">
        <h2 className="sc-panel-title">Global Snapshot</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button type="button" className="sc-kebab-btn" style={{ width: 30, height: 30 }} aria-label="Messages">
            <IconEnvelopeHeader />
          </button>
          <button type="button" className="sc-kebab-btn" style={{ width: 30, height: 30 }} aria-label="Layout">
            <IconLayoutHeader />
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        <Cell
          label="Sales"
          value={g.sales.value}
          sub={g.sales.sub}
          footer={<ScSparkline data={[...g.sales.sparkline]} />}
        />

        <Cell
          label="Open Orders"
          value={g.openOrders.value}
          sub={g.openOrders.sub}
          footer={
            <div style={{ marginTop: 8, fontSize: 11, lineHeight: 1.55 }}>
              {g.openOrders.lines.map((line) => (
                <div key={line.label} style={{ color: "#565959" }}>
                  {line.label}{" "}
                  <span style={{ color: "#007185" }}>({line.count})</span>
                </div>
              ))}
            </div>
          }
        />

        <Cell label="Buyer Messages" value={g.buyerMessages.value} sub={g.buyerMessages.sub} />

        <Cell label="Featured Offer %" value={g.featuredOffer.value} sub={g.featuredOffer.sub} noRightBorder />

        <Cell label="Global Promotions Sales" value={g.globalPromotions.value} sub={g.globalPromotions.sub} />

        <Cell label="Ad Sales" value={g.adSales.value} sub={g.adSales.sub} />

        <Cell label="Ad Impressions" value={g.adImpressions.value} sub={g.adImpressions.sub} />

        <Cell
          label="Seller Feedback"
          sub={g.sellerFeedback.sub}
          noRightBorder
          valueRow={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#0f1111" }}>{g.sellerFeedback.value}</span>
              <FeedbackStars rating={g.sellerFeedback.rating} />
            </div>
          }
        />

        <Cell label="Payments" value={g.payments.value} sub={g.payments.sub} noBottomBorder />

        <div style={{ borderBottom: "1px solid #d5d9d9" }} aria-hidden="true" />
        <div style={{ borderBottom: "1px solid #d5d9d9" }} aria-hidden="true" />
        <div style={{ borderBottom: "1px solid #d5d9d9" }} aria-hidden="true" />
      </div>
    </section>
  );
}
