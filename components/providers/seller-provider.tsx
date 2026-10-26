"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

import {
  defaultSellerCategory,
  getSellerAccount,
} from "@/lib/demo/seller-accounts";
import type { SellerAccountSummary, SellerCategoryId } from "@/types/seller";
import { SELLER_CATEGORIES } from "@/types/seller";

const STORAGE_KEY = "dropshipguru-demo-category";

type SellerContextValue = {
  categoryId: SellerCategoryId;
  account: SellerAccountSummary;
  setCategoryId: (id: SellerCategoryId) => void;
  categories: typeof SELLER_CATEGORIES;
};

const SellerContext = createContext<SellerContextValue | null>(null);

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isSellerCategoryId(value: string): value is SellerCategoryId {
  return (SELLER_CATEGORIES as readonly string[]).includes(value);
}

function readCategoryFromStorage(): SellerCategoryId {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && isSellerCategoryId(stored)) {
    return stored;
  }
  return defaultSellerCategory;
}

function getCategorySnapshot(): SellerCategoryId {
  return readCategoryFromStorage();
}

function getCategoryServerSnapshot(): SellerCategoryId {
  return defaultSellerCategory;
}

function persistCategory(id: SellerCategoryId) {
  window.localStorage.setItem(STORAGE_KEY, id);
  listeners.forEach((listener) => listener());
}

type SellerProviderProps = {
  children: React.ReactNode;
};

export function SellerProvider({ children }: SellerProviderProps) {
  const categoryId = useSyncExternalStore(
    subscribe,
    getCategorySnapshot,
    getCategoryServerSnapshot,
  );

  const setCategoryId = useCallback((id: SellerCategoryId) => {
    persistCategory(id);
  }, []);

  const account = useMemo(() => getSellerAccount(categoryId), [categoryId]);

  const value = useMemo(
    () => ({
      categoryId,
      account,
      setCategoryId,
      categories: SELLER_CATEGORIES,
    }),
    [categoryId, account, setCategoryId],
  );

  return <SellerContext.Provider value={value}>{children}</SellerContext.Provider>;
}

export function useSeller() {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error("useSeller must be used within a SellerProvider");
  }
  return context;
}
