"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FkButton, FkCard, FkPageHeader, FkStatusBadge } from "@/components/flipkart/fk-ui";
import { flipkartRoutes } from "@/config/flipkart-routes";
import { getFlipkartOrder, getFlipkartProduct } from "@/lib/demo/flipkart";
import { formatDateTime } from "@/lib/date";

export function FlipkartOrderDetailPage({ orderId }: { orderId: string }) {
  const order = getFlipkartOrder(orderId);
  if (!order) notFound();
  const product = getFlipkartProduct(order.productId);

  return (
    <div>
      <FkPageHeader
        title="Order Details"
        subtitle={order.orderId}
        actions={<Link href={flipkartRoutes.orders} style={{ color: "var(--fk-blue)", fontSize: 13, textDecoration: "none" }}>← Back to Orders</Link>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        <FkCard style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Order Summary</h2>
            <FkStatusBadge status={order.status} />
          </div>
          {product ? (
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <Image src={product.imageUrl} alt={product.title} width={80} height={80} style={{ objectFit: "cover", borderRadius: "var(--fk-radius)", border: "1px solid var(--fk-border)" }} />
              <div>
                <Link href={flipkartRoutes.listingDetail(product.id)} style={{ fontSize: 15, fontWeight: 600, color: "var(--fk-text)", textDecoration: "none" }}>{order.productName}</Link>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fk-text-muted)" }}>SKU: {order.sku}</p>
                <p style={{ margin: "4px 0 0", fontSize: 13 }}>Qty: {order.quantity} · ₹{order.amount.toLocaleString("en-IN")}</p>
              </div>
            </div>
          ) : null}
          <dl style={{ margin: 0, display: "grid", gap: 12 }}>
            {[
              ["Order Date", formatDateTime(order.orderDate)],
              ["Customer City", order.customerCity],
              ["Fulfillment", order.fulfillment],
              ["Payment", order.paymentMode],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid var(--fk-border)", paddingBottom: 8 }}>
                <dt style={{ color: "var(--fk-text-muted)" }}>{k}</dt>
                <dd style={{ margin: 0, fontWeight: 500 }}>{v}</dd>
              </div>
            ))}
          </dl>
          {order.status === "new" ? (
            <FkButton style={{ marginTop: 20, width: "100%" }}>Mark as Packed</FkButton>
          ) : null}
        </FkCard>

        <FkCard style={{ padding: 24 }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 600 }}>Timeline</h2>
          {["Order placed", "Payment confirmed", order.status === "new" ? "Awaiting packing" : "Packed", "Shipped", "Delivered"].map((step, i) => (
            <div key={step} style={{ display: "flex", gap: 12, padding: "10px 0", borderLeft: i <= 2 ? "2px solid var(--fk-blue)" : "2px solid var(--fk-border)", paddingLeft: 16, marginLeft: 8 }}>
              <span style={{ fontSize: 13, fontWeight: i <= 2 ? 600 : 400, color: i <= 2 ? "var(--fk-text)" : "var(--fk-text-muted)" }}>{step}</span>
            </div>
          ))}
        </FkCard>
      </div>
    </div>
  );
}
