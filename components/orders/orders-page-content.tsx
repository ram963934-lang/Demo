"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ProductThumb } from "@/components/dashboard/product-thumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { routes } from "@/config/routes";
import { DEMO_ORDERS, getOrderSummary, type OrderStatus } from "@/lib/demo/orders/data";
import { formatCurrency } from "@/lib/format";
import { Search } from "lucide-react";
import { formatRelativeTime } from "@/lib/date";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

export function OrdersPageContent() {
  const summary = getOrderSummary();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return DEMO_ORDERS.filter((order) => {
      const matchesSearch =
        !query ||
        order.orderNumber.includes(query) ||
        order.productName.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query);
      const matchesStatus = status === "all" || order.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#0F1111]">Manage Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {summary.total} orders · {summary.pending} pending · {summary.shipped} shipped
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: "Total orders", value: summary.total },
          { label: "Pending", value: summary.pending },
          { label: "Shipped", value: summary.shipped },
          { label: "Revenue", value: formatCurrency(summary.revenue) },
        ].map((card) => (
          <div key={card.label} className="rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-sm">
            <p className="text-xs text-[#565959]">{card.label}</p>
            <p className="mt-1 text-xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-sm sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="border-[#D5D9D9] pl-9"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v ?? "all")}>
          <SelectTrigger className="w-full border-[#D5D9D9] sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#D5D9D9] bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F7FAFA]">
              <TableHead>Order</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Placed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">{order.orderNumber}</TableCell>
                <TableCell>
                  <Link
                    href={routes.seller.productDetail(order.productId)}
                    className="flex items-center gap-2"
                  >
                    <ProductThumb
                      imageUrl={order.productImageUrl}
                      seed={order.productSku}
                      alt={order.productName}
                      size={36}
                    />
                    <span className="max-w-[180px] truncate text-sm hover:text-[#007185]">
                      {order.productName}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{STATUS_LABELS[order.status]}</TableCell>
                <TableCell className="text-right">{formatCurrency(order.amount)}</TableCell>
                <TableCell className="text-muted-foreground">{formatRelativeTime(order.placedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
