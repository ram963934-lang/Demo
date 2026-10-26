"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Returns true after the component has mounted — useful for theme/hydration-safe UI. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
