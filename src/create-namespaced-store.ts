import store2, { StoreBase } from "store2";

import type { Options } from "./types";

/**
 * Creates a store2 instance
 * @param {string} namespace A string that gets prepended by store2 to keys to avoid collisions
 * @param {Options["storage"]} storage The type of browser storage engine to user
 * @returns A configured store2 instance with a namespace and storage engine
 */
const createNamespacedStore = (
  namespace: string,
  storage: Options["storage"]
) => {
  const namespacedStore = store2.namespace(namespace);
  let baseStore: StoreBase;
  if (storage === "session") {
    baseStore = namespacedStore.session;
  } else if (storage === "local") {
    baseStore = namespacedStore.local;
  } else {
    baseStore = namespacedStore.page;
  }
  return baseStore;
};

export default createNamespacedStore;
