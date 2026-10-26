"use client";

import { useCallback, useMemo, useState } from "react";

import { useDemoDb } from "@/components/providers/demo-db-provider";
import type {
  InventoryFilters,
  InventorySortDirection,
  InventorySortField,
} from "@/types/inventory";
import { PAGE_SIZE_OPTIONS } from "@/types/inventory";

const DEFAULT_FILTERS: InventoryFilters = {
  search: "",
  status: "all",
  warehouse: "all",
  category: "all",
};

export function useInventoryTable() {
  const { products } = useDemoDb();
  const [filters, setFilters] = useState<InventoryFilters>(DEFAULT_FILTERS);
  const [sortField, setSortField] = useState<InventorySortField>("name");
  const [sortDirection, setSortDirection] = useState<InventorySortDirection>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const allItems = products;

  const filteredItems = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return allItems.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.asin.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);

      const matchesStatus = filters.status === "all" || item.status === filters.status;
      const matchesWarehouse =
        filters.warehouse === "all" || item.warehouse === filters.warehouse;
      const matchesCategory =
        filters.category === "all" || item.categoryId === filters.category;

      return matchesSearch && matchesStatus && matchesWarehouse && matchesCategory;
    });
  }, [allItems, filters]);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "sku":
          comparison = a.sku.localeCompare(b.sku);
          break;
        case "asin":
          comparison = a.asin.localeCompare(b.asin);
          break;
        case "categoryLabel":
          comparison = a.categoryLabel.localeCompare(b.categoryLabel);
          break;
        case "stock":
          comparison = a.stock - b.stock;
          break;
        case "reserved":
          comparison = a.reserved - b.reserved;
          break;
        case "available":
          comparison = a.available - b.available;
          break;
        case "warehouse":
          comparison = a.warehouse.localeCompare(b.warehouse);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [filteredItems, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return sortedItems.slice(start, start + pageSize);
  }, [sortedItems, safePage, pageSize]);

  const toggleSort = useCallback(
    (field: InventorySortField) => {
      if (sortField === field) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
      setPage(1);
    },
    [sortField],
  );

  const updateFilters = useCallback((patch: Partial<InventoryFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
    setSelectedIds(new Set());
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
    setSelectedIds(new Set());
  }, []);

  const toggleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedIds(new Set(paginatedItems.map((item) => item.id)));
      } else {
        setSelectedIds(new Set());
      }
    },
    [paginatedItems],
  );

  const toggleSelect = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const isAllPageSelected =
    paginatedItems.length > 0 && paginatedItems.every((item) => selectedIds.has(item.id));

  const isSomePageSelected =
    paginatedItems.some((item) => selectedIds.has(item.id)) && !isAllPageSelected;

  const selectedItems = useMemo(
    () => allItems.filter((item) => selectedIds.has(item.id)),
    [allItems, selectedIds],
  );

  return {
    allItems,
    filteredItems: sortedItems,
    paginatedItems,
    filters,
    sortField,
    sortDirection,
    page: safePage,
    pageSize,
    totalPages,
    totalCount: sortedItems.length,
    selectedIds,
    selectedItems,
    isAllPageSelected,
    isSomePageSelected,
    setPage,
    setPageSize: (size: (typeof PAGE_SIZE_OPTIONS)[number]) => {
      setPageSize(size);
      setPage(1);
    },
    updateFilters,
    resetFilters,
    toggleSort,
    toggleSelectAll,
    toggleSelect,
    clearSelection,
  };
}

export type InventoryTableState = ReturnType<typeof useInventoryTable>;
