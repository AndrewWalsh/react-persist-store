import { EventEmitter2 as EventEmitter } from "eventemitter2";

import createNamespacedStore from "./create-namespaced-store";
import createInternalAPI from "./create-internal-api";
import createClientAPI from "./create-client-api";
import usePersistStore from "./use-persist-store";

import type { Options, CreateStore } from "./types";

/** The default namespace used by store2 */
const NAMESPACE = "ns_store_lib_internal";

const defaultOptions: Required<Options> = {
  storage: "local",
  namespace: NAMESPACE,
};

/**
 * Create a store with defaultValues and get a function to access a key in that store
 * @param {Store} defaultValues A Store object that contains the default values for the store
 * @param {Options} Options for the store, such as "storage" or "namespace"
 * @returns A function that accepts a top level key in the store, and returns a function that takes no arguments and returns a Client interface to said key
 * @example
 * const store = createStore({ myNamespace: { foo: "bar" }  });
 * const useFoo = store("myNamespace");
 *
 * // In a component
 * const { data, update, clearAll } = useFoo()
 */
const createStore: CreateStore = (defaultValues, options) => {
  type S = typeof defaultValues;
  const config = { ...defaultOptions, ...options };
  const { storage, namespace } = config;
  const localStore = createNamespacedStore(namespace, storage);

  return (key) => {
    const emitter = new EventEmitter();
    return () => {
      type K = typeof key;
      type V = S[K];

      const internalAPI = createInternalAPI<S, K, V>(key, emitter);

      const data =
        (localStore.has(key) && (localStore.get(key) as V)) ||
        defaultValues[key];

      const clientAPI = createClientAPI<S, K, V>(
        key,
        emitter,
        data,
        localStore,
        defaultValues
      );

      return usePersistStore<V>(clientAPI, internalAPI);
    };
  };
};

export default createStore;
