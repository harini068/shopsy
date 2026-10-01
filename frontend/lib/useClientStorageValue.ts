"use client";

import { useSyncExternalStore } from "react";
import { getStorageSnapshot, subscribeStorageKey } from "@/lib/storage";

export function useClientStorageValue<T>(key: string, fallback: T): T {
  const fallbackSnapshot = JSON.stringify(fallback);
  const snapshot = useSyncExternalStore(
    (listener) => subscribeStorageKey(key, listener),
    () => getStorageSnapshot(key, fallbackSnapshot),
    () => fallbackSnapshot,
  );

  try {
    return JSON.parse(snapshot) as T;
  } catch {
    return fallback;
  }
}