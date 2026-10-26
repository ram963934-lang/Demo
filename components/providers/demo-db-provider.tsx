"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

import {
  deleteInventoryProduct,
  deleteInventoryProducts,
  getInventoryStoreServerSnapshot,
  getInventoryStoreSnapshot,
  subscribeInventoryDb,
  updateInventoryProduct,
} from "@/lib/demo/db/inventory-store";
import type { DemoProduct, ProductUpdateInput } from "@/types/product";

type DemoDbContextValue = {
  products: readonly DemoProduct[];
  getProductById: (id: string) => DemoProduct | undefined;
  updateProduct: (id: string, patch: ProductUpdateInput) => void;
  deleteProduct: (id: string) => void;
  deleteProducts: (ids: string[]) => void;
  inventorySummary: ReturnType<typeof getInventoryStoreSnapshot>["summary"];
};

const DemoDbContext = createContext<DemoDbContextValue | null>(null);

type DemoDbProviderProps = {
  children: React.ReactNode;
};

export function DemoDbProvider({ children }: DemoDbProviderProps) {
  const snapshot = useSyncExternalStore(
    subscribeInventoryDb,
    getInventoryStoreSnapshot,
    getInventoryStoreServerSnapshot,
  );

  const getProductById = useCallback(
    (id: string) => snapshot.products.find((product) => product.id === id),
    [snapshot],
  );

  const updateProduct = useCallback((id: string, patch: ProductUpdateInput) => {
    updateInventoryProduct(id, patch);
  }, []);

  const deleteProduct = useCallback((id: string) => {
    deleteInventoryProduct(id);
  }, []);

  const deleteProducts = useCallback((ids: string[]) => {
    deleteInventoryProducts(ids);
  }, []);

  const value = useMemo(
    () => ({
      products: snapshot.products,
      getProductById,
      updateProduct,
      deleteProduct,
      deleteProducts,
      inventorySummary: snapshot.summary,
    }),
    [snapshot, getProductById, updateProduct, deleteProduct, deleteProducts],
  );

  return <DemoDbContext.Provider value={value}>{children}</DemoDbContext.Provider>;
}

export function useDemoDb() {
  const context = useContext(DemoDbContext);
  if (!context) {
    throw new Error("useDemoDb must be used within a DemoDbProvider");
  }
  return context;
}
