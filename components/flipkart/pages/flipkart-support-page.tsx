"use client";

import { useState } from "react";
import { Headphones, Mail, MessageCircle, Phone } from "lucide-react";

import { FkButton, FkCard, FkPageHeader } from "@/components/flipkart/fk-ui";

const FAQ = [
  { q: "How do I process a return?", a: "Go to Returns, review the request, and approve or reject within 48 hours. Flipkart arranges reverse pickup." },
  { q: "When will I receive my settlement?", a: "Settlements are processed every Tuesday for orders delivered in the previous cycle." },
  { q: "How do I create a Flipkart Ads campaign?", a: "Navigate to Ads → Create Campaign, select PLA or Display, set budget and target products." },
  { q: "What is Flipkart Fulfilled (FBF)?", a: "FBF lets Flipkart store, pack, and ship your inventory from their fulfillment centers." },
];

export function FlipkartSupportPage() {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ maxWidth: 880 }}>
      <FkPageHeader
        title="Support"
        subtitle="Get help from our seller success team"
        actions={<FkButton>Contact Support</FkButton>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { icon: MessageCircle, title: "Live Chat", desc: "Avg. response 2 min", action: "Start Chat" },
          { icon: Phone, title: "Phone", desc: "1800-XXX-XXXX", action: "Call Now" },
          { icon: Mail, title: "Email", desc: "seller-support@demo.flipkart", action: "Send Email" },
          { icon: Headphones, title: "Account Manager", desc: "Gold Seller priority", action: "Schedule Call" },
        ].map((item) => (
          <FkCard key={item.title} style={{ padding: 22, textAlign: "center" }}>
            <item.icon size={28} color="var(--fk-blue)" style={{ margin: "0 auto 12px" }} />
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>{item.title}</h3>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--fk-text-muted)" }}>{item.desc}</p>
            <FkButton variant="outline" style={{ width: "100%", padding: "8px", fontSize: 12 }}>{item.action}</FkButton>
          </FkCard>
        ))}
      </div>

      <FkCard style={{ overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--fk-border)" }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Frequently Asked Questions</h2>
        </div>
        {FAQ.map((item, i) => (
          <div key={item.q} style={{ borderTop: i > 0 ? "1px solid var(--fk-border)" : "none" }}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{ width: "100%", padding: "16px 22px", background: open === i ? "var(--fk-blue-light)" : "transparent", border: "none", textAlign: "left", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "var(--fk-text)", display: "flex", justifyContent: "space-between" }}
            >
              {item.q}
              <span style={{ color: "var(--fk-text-muted)" }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i ? (
              <p style={{ margin: 0, padding: "0 22px 16px", fontSize: 14, color: "var(--fk-text-muted)", lineHeight: 1.55 }}>{item.a}</p>
            ) : null}
          </div>
        ))}
      </FkCard>
    </div>
  );
}
