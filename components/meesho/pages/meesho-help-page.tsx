"use client";

import { useMemo, useState } from "react";

import { MsIconHeadset, MsIconSearch } from "@/components/meesho/meesho-icons";
import { MEESHO_LEARN_ITEMS } from "@/lib/demo/meesho";

const FAQ_ITEMS = [
  { q: "How do I upload catalogs in bulk?", a: "Go to Catalog Uploads → Add Catalog in Bulk. Download the template, fill product details, and upload the Excel file." },
  { q: "When will I receive my payments?", a: "Settlements are processed weekly every Friday for orders delivered in the previous cycle." },
  { q: "What is Transparent Barcoded Packaging?", a: "All Meesho sellers must use transparent packets with scannable barcodes for order fulfillment." },
  { q: "How do I update inventory stock?", a: "Navigate to Inventory, select your catalog, and edit the Current Stock field for each SKU." },
  { q: "What happens when an order is On Hold?", a: "On-hold orders are temporarily paused due to logistics constraints and will move to Pending automatically." },
];

export function MeeshoHelpPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredFaq = useMemo(() => {
    if (!search) return FAQ_ITEMS;
    const q = search.toLowerCase();
    return FAQ_ITEMS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [search]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Support &amp; Help</h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--ms-text-muted)" }}>Find answers or reach our supplier support team</p>
        </div>
        <button
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            background: "var(--ms-purple)",
            color: "var(--ms-card-bg)",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <MsIconHeadset size={16} color="var(--ms-card-bg)" />
          Contact Support
        </button>
      </div>

      <div style={{ marginTop: 24, position: "relative", maxWidth: 480 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search help articles..."
          style={{ width: "100%", padding: "12px 40px 12px 16px", border: "1px solid var(--ms-border)", borderRadius: 8, fontSize: 14, background: "var(--ms-card-bg)" }}
        />
        <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
          <MsIconSearch size={18} color="var(--ms-icon-muted)" />
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 28 }}>
        {MEESHO_LEARN_ITEMS.map((item) => (
          <div key={item.id} style={{ background: "var(--ms-card-bg)", border: "1px solid var(--ms-border)", borderRadius: 10, padding: "18px 20px" }}>
            <span style={{ fontSize: 24 }}>{item.icon === "training" ? "📖" : item.icon === "youtube" ? "▶" : item.icon === "pricing" ? "💰" : "🚚"}</span>
            <h3 style={{ margin: "12px 0 6px", fontSize: 15, fontWeight: 600 }}>{item.title}</h3>
            <p style={{ margin: 0, fontSize: 13, color: "var(--ms-text-muted)", lineHeight: 1.45 }}>{item.description}</p>
            {item.badge ? (
              <span style={{ display: "inline-block", marginTop: 10, fontSize: 10, padding: "2px 8px", borderRadius: 4, background: "var(--ms-green-badge-bg)", color: "var(--ms-green-badge-text)", fontWeight: 600 }}>
                {item.badge}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 16px" }}>Frequently Asked Questions</h2>
        <div style={{ background: "var(--ms-card-bg)", border: "1px solid var(--ms-border)", borderRadius: 10, overflow: "hidden" }}>
          {filteredFaq.map((faq, i) => (
            <div key={faq.q} style={{ borderTop: i > 0 ? "1px solid var(--ms-border)" : "none" }}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: openFaq === i ? "var(--ms-table-header-bg)" : "#fff",
                  border: "none",
                  textAlign: "left",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {faq.q}
                <span style={{ color: "var(--ms-text-muted)", fontSize: 18 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i ? (
                <p style={{ margin: 0, padding: "0 20px 16px", fontSize: 13, color: "var(--ms-text-muted)", lineHeight: 1.55 }}>
                  {faq.a}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
