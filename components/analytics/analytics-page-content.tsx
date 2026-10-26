"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useSeller } from "@/components/providers/seller-provider";
import { getDashboardData } from "@/lib/demo/dashboard/data";
import { formatDate, formatDayMonth } from "@/lib/date";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";

export function AnalyticsPageContent() {
  const { categoryId, account } = useSeller();
  const data = getDashboardData(categoryId);

  const recentTrend = data.dailyTrend.slice(-14);
  const rangeStart = recentTrend[0]?.date;
  const rangeEnd = recentTrend[recentTrend.length - 1]?.date;
  const trendData = recentTrend.map((point) => ({
    day: formatDayMonth(point.date),
    sales: point.sales,
    revenue: point.revenue,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#0F1111]">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {account.storeName} · Performance over the last 14 days ({formatDayMonth(rangeStart)} – {formatDate(rangeEnd)})
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Today's sales", value: formatCurrency(data.kpis.todaysSales) },
          { label: "30-day revenue", value: formatCompactCurrency(data.kpis.totalRevenue) },
          { label: "Orders (30d)", value: data.kpis.totalOrders.toLocaleString() },
          { label: "Conversion rate", value: `${data.kpis.conversionRate}%` },
        ].map((card) => (
          <div key={card.label} className="rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-sm">
            <p className="text-xs text-[#565959]">{card.label}</p>
            <p className="mt-1 text-xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold">Daily sales (units)</h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E3E6E6" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#FF9900" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold">Revenue by category</h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E3E6E6" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => formatCompactCurrency(Number(value))} />
                <Bar dataKey="sales" fill="#146EB4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
