"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ProductThumb } from "@/components/dashboard/product-thumb";
import { useDemoDb } from "@/components/providers/demo-db-provider";
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
import { CATEGORY_FILTER_LABELS } from "@/types/inventory";
import { SELLER_CATEGORIES } from "@/types/seller";
import { formatCurrency } from "@/lib/format";
import { Search } from "lucide-react";

export function ProductsPageContent() {
  const { products } = useDemoDb();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);
      const matchesCategory = category === "all" || product.categoryId === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#0F1111]">Manage Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {products.length} uploaded products · Catalog listings with real images
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-[#D5D9D9] bg-white p-4 shadow-sm sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border-[#D5D9D9] pl-9"
          />
        </div>
        <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
          <SelectTrigger className="w-full border-[#D5D9D9] sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {SELLER_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {CATEGORY_FILTER_LABELS[cat]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#D5D9D9] bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F7FAFA]">
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Link href={routes.seller.productDetail(product.id)} className="flex items-center gap-3">
                    <ProductThumb
                      imageUrl={product.imageUrl}
                      categoryId={product.categoryId}
                      seed={product.imageSeed}
                      alt={product.name}
                      size={40}
                    />
                    <span className="text-sm font-medium hover:text-[#007185]">{product.name}</span>
                  </Link>
                </TableCell>
                <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                <TableCell>{product.categoryLabel}</TableCell>
                <TableCell>{product.listingStatus}</TableCell>
                <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#D5D9D9]"
                    render={<Link href={routes.seller.productDetail(product.id)} />}
                  >
                    View
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
