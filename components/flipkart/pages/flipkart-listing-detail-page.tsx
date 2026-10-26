"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FkButton, FkCard, FkPageHeader, FkStatCard, FkStatusBadge } from "@/components/flipkart/fk-ui";
import { flipkartRoutes } from "@/config/flipkart-routes";
import { getFlipkartProduct } from "@/lib/demo/flipkart";
import { formatRelativeTime } from "@/lib/date";

export function FlipkartListingDetailPage({ productId }: { productId: string }) {
  const product = getFlipkartProduct(productId);
  if (!product) notFound();

  return (
    <div>
      <FkPageHeader
        title="Listing Details"
        subtitle={product.fsn}
        actions={<Link href={flipkartRoutes.listings} style={{ color: "var(--fk-blue)", fontSize: 13, textDecoration: "none" }}>← Back to Listings</Link>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        <FkCard style={{ padding: 24 }}>
          <Image src={product.imageUrl} alt={product.title} width={320} height={320} style={{ width: "100%", maxWidth: 320, height: "auto", objectFit: "cover", borderRadius: "var(--fk-radius)", border: "1px solid var(--fk-border)" }} />
        </FkCard>

        <div>
          <FkCard style={{ padding: 24, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{product.title}</h2>
              <FkStatusBadge status={product.status} />
            </div>
            <p style={{ margin: "12px 0", fontSize: 14, color: "var(--fk-text-muted)", lineHeight: 1.55 }}>{product.description}</p>
            <div style={{ display: "flex", gap: 16, alignItems: "baseline", marginTop: 16 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "var(--fk-text)" }}>₹{product.price.toLocaleString("en-IN")}</span>
              <span style={{ fontSize: 16, color: "var(--fk-text-muted)", textDecoration: "line-through" }}>₹{product.mrp.toLocaleString("en-IN")}</span>
            </div>
            <dl style={{ margin: "20px 0 0", display: "grid", gap: 10 }}>
              {[
                ["Brand", product.brand],
                ["Category", product.category],
                ["SKU", product.sku],
                ["FSN", product.fsn],
                ["Fulfillment", product.fulfillment],
                ["Return Rate", `${product.returnRate}%`],
                ["Last Updated", formatRelativeTime(product.lastUpdated)],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid var(--fk-border)", paddingBottom: 8 }}>
                  <dt style={{ color: "var(--fk-text-muted)" }}>{k}</dt>
                  <dd style={{ margin: 0, fontWeight: 500 }}>{v}</dd>
                </div>
              ))}
            </dl>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <FkButton>Edit Listing</FkButton>
              <FkButton variant="outline">Update Stock</FkButton>
            </div>
          </FkCard>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <FkStatCard label="Views (7d)" value={product.views7d.toLocaleString("en-IN")} />
            <FkStatCard label="Orders (7d)" value={String(product.orders7d)} tone="green" />
            <FkStatCard label="Stock" value={String(product.stock)} tone={product.stock === 0 ? "red" : "blue"} />
          </div>
        </div>
      </div>
    </div>
  );
}
