import { getDemoNow, toIstIsoString } from "@/lib/date";
import { UPLOADED_PRODUCT_CATALOG } from "@/lib/demo/products/catalog";
import type { DemoProduct, ProductUpdateInput } from "@/types/product";

const STORAGE_KEY = "dropshipguru-demo-inventory-db";

/** A saved edit plus when it was made (ISO, IST) so "Updated …" stays truthful after a reload. */
type StoredProductUpdate = ProductUpdateInput & { updatedAt?: string };

type InventoryDbState = {
  deletedIds: string[];
  updates: Record<string, StoredProductUpdate>;
};

type InventorySummary = {
  totalSkus: number;
  totalUnits: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  stranded: number;
  inbound: number;
  totalValue: number;
};

export type InventoryStoreSnapshot = {
  products: readonly DemoProduct[];
  summary: InventorySummary;
};

const EMPTY_DB_STATE: InventoryDbState = {
  deletedIds: [],
  updates: {},
};

const listeners = new Set<() => void>();

function readState(): InventoryDbState {
  if (typeof window === "undefined") {
    return EMPTY_DB_STATE;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return EMPTY_DB_STATE;
    }

    const parsed = JSON.parse(raw) as InventoryDbState;
    return {
      deletedIds: Array.isArray(parsed.deletedIds) ? [...parsed.deletedIds] : [],
      updates:
        parsed.updates && typeof parsed.updates === "object" ? { ...parsed.updates } : {},
    };
  } catch {
    return EMPTY_DB_STATE;
  }
}

function writeState(state: InventoryDbState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function applyUpdate(product: DemoProduct, storedPatch: StoredProductUpdate): DemoProduct {
  const { updatedAt, ...patch } = storedPatch;
  const stock = patch.stock ?? product.stock;
  const reserved = patch.reserved ?? product.reserved;
  return {
    ...product,
    ...patch,
    stock,
    reserved,
    available: Math.max(0, stock - reserved),
    // Edits made before timestamps were stored fall back to the demo clock.
    lastUpdated: updatedAt ?? toIstIsoString(getDemoNow()),
  };
}

function buildProducts(state: InventoryDbState): DemoProduct[] {
  return UPLOADED_PRODUCT_CATALOG.filter((product) => !state.deletedIds.includes(product.id)).map(
    (product) => {
      const patch = state.updates[product.id];
      return patch ? applyUpdate(product, patch) : product;
    },
  );
}

export function getInventorySummaryFromProducts(items: readonly DemoProduct[]): InventorySummary {
  return {
    totalSkus: items.length,
    totalUnits: items.reduce((sum, item) => sum + item.stock, 0),
    inStock: items.filter((item) => item.status === "in_stock").length,
    lowStock: items.filter((item) => item.status === "low_stock").length,
    outOfStock: items.filter((item) => item.status === "out_of_stock").length,
    stranded: items.filter((item) => item.status === "stranded").length,
    inbound: items.filter((item) => item.status === "inbound").length,
    totalValue: items.reduce((sum, item) => sum + item.stock * item.price, 0),
  };
}

function createStoreSnapshot(products: readonly DemoProduct[]): InventoryStoreSnapshot {
  return {
    products,
    summary: getInventorySummaryFromProducts(products),
  };
}

const SERVER_STORE_SNAPSHOT = createStoreSnapshot(UPLOADED_PRODUCT_CATALOG);

let storeSnapshot: InventoryStoreSnapshot = SERVER_STORE_SNAPSHOT;
let clientHydrated = false;

function rebuildStoreSnapshot() {
  const products = buildProducts(readState());
  storeSnapshot = createStoreSnapshot(products);
}

function ensureClientSnapshot() {
  if (typeof window === "undefined" || clientHydrated) {
    return;
  }

  clientHydrated = true;
  rebuildStoreSnapshot();
}

function notify() {
  rebuildStoreSnapshot();
  listeners.forEach((listener) => listener());
}

export function subscribeInventoryDb(listener: () => void) {
  ensureClientSnapshot();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Stable reference until the store mutates — required by useSyncExternalStore */
export function getInventoryStoreSnapshot(): InventoryStoreSnapshot {
  ensureClientSnapshot();
  return storeSnapshot;
}

export function getInventoryStoreServerSnapshot(): InventoryStoreSnapshot {
  return SERVER_STORE_SNAPSHOT;
}

/** @deprecated Use getInventoryStoreSnapshot().products */
export function getInventoryDbSnapshot(): DemoProduct[] {
  return [...getInventoryStoreSnapshot().products];
}

/** @deprecated Use getInventoryStoreServerSnapshot().products */
export function getInventoryDbServerSnapshot(): DemoProduct[] {
  return [...SERVER_STORE_SNAPSHOT.products];
}

export function getProductFromDb(id: string): DemoProduct | undefined {
  return getInventoryStoreSnapshot().products.find((product) => product.id === id);
}

export function updateInventoryProduct(id: string, patch: ProductUpdateInput) {
  const state = readState();
  writeState({
    deletedIds: state.deletedIds,
    updates: {
      ...state.updates,
      [id]: { ...state.updates[id], ...patch, updatedAt: toIstIsoString(getDemoNow()) },
    },
  });
  notify();
}

export function deleteInventoryProduct(id: string) {
  const state = readState();
  const deletedIds = state.deletedIds.includes(id)
    ? state.deletedIds
    : [...state.deletedIds, id];
  const updates = { ...state.updates };
  delete updates[id];

  writeState({ deletedIds, updates });
  notify();
}

export function deleteInventoryProducts(ids: string[]) {
  const state = readState();
  const deletedSet = new Set(state.deletedIds);
  for (const id of ids) {
    deletedSet.add(id);
  }

  const updates = { ...state.updates };
  for (const id of ids) {
    delete updates[id];
  }

  writeState({
    deletedIds: [...deletedSet],
    updates,
  });
  notify();
}

export function resetInventoryDb() {
  writeState(EMPTY_DB_STATE);
  notify();
}
