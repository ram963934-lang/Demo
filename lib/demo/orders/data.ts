import { demoDay, demoDayAt, demoHoursAgo, demoMinutesAgo } from "@/lib/date";
import { UPLOADED_PRODUCT_CATALOG } from "@/lib/demo/products/catalog";

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled" | "returned";

export type DemoOrder = {
  id: string;
  orderNumber: string;
  productId: string;
  productName: string;
  productSku: string;
  productImageUrl: string;
  categoryLabel: string;
  customer: string;
  quantity: number;
  amount: number;
  status: OrderStatus;
  fulfillment: "FBA" | "FBM";
  /** ISO timestamp (IST) when the order was placed. */
  placedAt: string;
  /** Calendar date (IST) the order must ship by; null once it has shipped or closed. */
  shipBy: string | null;
};

const CUSTOMERS = [
  "Priya S.",
  "Rahul M.",
  "Ananya K.",
  "Vikram P.",
  "Sneha R.",
  "Arjun D.",
  "Meera T.",
  "Karan J.",
  "Divya N.",
  "Rohan B.",
];

const STATUSES: OrderStatus[] = ["pending", "shipped", "delivered", "cancelled", "returned"];
/**
 * When an order was placed depends on where it is in its life-cycle — a delivered order can't have been placed
 * minutes ago, and a returned one must be older than a typical delivery window. Timestamps are drawn from a
 * per-status window, relative to the demo clock.
 */
const PLACED_AT_BY_STATUS: Record<OrderStatus, string[]> = {
  pending: [demoMinutesAgo(12), demoMinutesAgo(28), demoHoursAgo(1), demoHoursAgo(2), demoHoursAgo(3), demoHoursAgo(5)],
  shipped: [demoDayAt(-1, "15:40"), demoDayAt(-1, "10:05"), demoDayAt(-2, "18:20")],
  delivered: [demoDayAt(-3, "11:15"), demoDayAt(-4, "16:45"), demoDayAt(-5, "09:30")],
  cancelled: [demoHoursAgo(2), demoDayAt(-1, "09:15"), demoDayAt(-2, "13:50")],
  returned: [demoDayAt(-8, "12:10"), demoDayAt(-10, "17:25"), demoDayAt(-12, "10:40")],
};

function placedAtFor(status: OrderStatus, variant: number) {
  const options = PLACED_AT_BY_STATUS[status];
  return options[variant % options.length];
}

export const DEMO_ORDERS: DemoOrder[] = UPLOADED_PRODUCT_CATALOG.flatMap((product, index) => {
  const baseOrderNumber = 114_8829000 + index * 17;
  return [
    {
      id: `ord-${product.id}-1`,
      orderNumber: `${baseOrderNumber}`,
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      productImageUrl: product.imageUrl,
      categoryLabel: product.categoryLabel,
      customer: CUSTOMERS[index % CUSTOMERS.length],
      quantity: (index % 3) + 1,
      amount: product.price * ((index % 3) + 1),
      status: STATUSES[index % STATUSES.length],
      fulfillment: product.fulfillment,
      placedAt: placedAtFor(STATUSES[index % STATUSES.length], Math.floor(index / STATUSES.length)),
      shipBy: STATUSES[index % STATUSES.length] === "pending" ? demoDay(index % 4 === 0 ? 0 : 1) : null,
    },
    ...(index % 2 === 0
      ? [
          {
            id: `ord-${product.id}-2`,
            orderNumber: `${baseOrderNumber + 3}`,
            productId: product.id,
            productName: product.name,
            productSku: product.sku,
            productImageUrl: product.imageUrl,
            categoryLabel: product.categoryLabel,
            customer: CUSTOMERS[(index + 3) % CUSTOMERS.length],
            quantity: 1,
            amount: product.price,
            status: "shipped" as const,
            fulfillment: product.fulfillment,
            placedAt: placedAtFor("shipped", index),
            shipBy: null,
          },
        ]
      : []),
  ];
});

export function getOrders() {
  return DEMO_ORDERS;
}

export function getOrderById(id: string) {
  return DEMO_ORDERS.find((order) => order.id === id);
}

export function getOrderSummary() {
  const orders = DEMO_ORDERS;
  return {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders.reduce((sum, o) => sum + o.amount, 0),
  };
}
