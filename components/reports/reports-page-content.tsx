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
import { DEMO_REPORTS } from "@/lib/demo/reports/data";
import { formatTodayOrDate } from "@/lib/date";

export function ReportsPageContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#0F1111]">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Download inventory, order, and payment reports
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#D5D9D9] bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F7FAFA]">
              <TableHead>Report name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last generated</TableHead>
              <TableHead>Format</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO_REPORTS.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.category}</TableCell>
                <TableCell className="text-muted-foreground">{formatTodayOrDate(report.lastGenerated)}</TableCell>
                <TableCell>{report.format}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#D5D9D9]"
                    onClick={() =>
                      toast.success(`${report.name} downloaded`, { description: report.format })
                    }
                  >
                    <Download className="size-4" />
                    Download
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
