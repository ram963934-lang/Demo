"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEMO_PAYMENTS, getPaymentSummary } from "@/lib/demo/payments/data";
import { formatCurrency } from "@/lib/format";
import { formatDate } from "@/lib/date";

export function PaymentsPageContent() {
  const summary = getPaymentSummary();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#0F1111]">Payments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Account balance and disbursement history
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total balance", value: formatCurrency(summary.totalBalance) },
          { label: "Scheduled disbursement", value: formatCurrency(summary.scheduledDisbursement) },
          { label: "Last disbursement", value: formatCurrency(summary.lastDisbursement) },
          { label: "Fees (30 days)", value: formatCurrency(summary.fees30d) },
        ].map((card) => (
          <div key={card.label} className="rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-sm">
            <p className="text-xs text-[#565959]">{card.label}</p>
            <p className="mt-1 text-xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-[#D5D9D9] bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F7FAFA]">
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO_PAYMENTS.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{formatDate(payment.date)}</TableCell>
                <TableCell>{payment.description}</TableCell>
                <TableCell className="capitalize">{payment.status}</TableCell>
                <TableCell
                  className={`text-right font-medium ${payment.amount < 0 ? "text-red-600" : "text-[#067D62]"}`}
                >
                  {formatCurrency(Math.abs(payment.amount))}
                  {payment.amount < 0 ? " (debit)" : ""}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toast.success("Report downloaded", { description: payment.description })}
                  >
                    <Download className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
