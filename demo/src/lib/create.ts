import store2, { StoreType, StoredData, StoreBase } from "store2";
import { EventEmitter } from "events";

import type { Client, Store, Internal, Options } from "./types";
import useStore from "./useStore";

/** The default namespace used by store2 */
const NAMESPACE = "ns_store_lib_internal";

const createNamespacedStore = (
  namespace: string,
  persist: Options["persist"]
) => {
  const namespacedStore = store2.namespace(namespace);
  let baseStore: StoreBase;
  if (persist === "session") {
    baseStore = namespacedStore.session;
  } else if (persist === "local") {
    baseStore = namespacedStore.local;
  } else {
    baseStore = namespacedStore.page;
  }
  return namespacedStore;
};

/**
 * A curried function that takes the following:
 *  <S, that extends Store>(options) =>
 *   (key in the store S) =>
 *    () => useStore
 *
 * The point of this is as follows:
 *  - Create a namespaced Store to avoid collision when writing to local storage
 *  - Reference a key in that store
 *  - Get a callback to update the value of that key, or get the current value
 */
type CreateStore = <S extends Store>(
  defaultValues: S,
  options?: Options
) => <K extends keyof S>(key: K) => () => Client<S[K]>;

const defaultOptions: Required<Options> = {
  persist: "local",
  namespace: NAMESPACE,
};

/**
 *
 * @param defaultValues -
 * @param options -
 * @returns
 */
const createStore: CreateStore = <S extends Store>(
  defaultValues: S,
  options?: Options
) => {
  // 3 options for persist, session, local, page (not persisted)
  const config = { ...defaultOptions, ...options };
  const { persist, namespace } = config;
  const localStore = createNamespacedStore(namespace, persist);

  // We now have a namespaced store
  // And proceed to the second level
  return <K extends keyof S>(key: K) => {
    const emitter = new EventEmitter();

    // Updates return a Document to update, or nothing to perform no action
    return () => {
      type V = S[K];

      const internalAPI: Internal<V> = {
        _eventListenerHandler: null,
        onChange(fn: (v: V) => void) {
          if (this._eventListenerHandler) {
            this.onTerminate();
          }
          this._eventListenerHandler = fn;
          emitter.addListener(key as string, this._eventListenerHandler);
          return undefined;
        },
        onTerminate() {
          if (this._eventListenerHandler) {
            emitter.removeListener(key as string, this._eventListenerHandler);
            this._eventListenerHandler = null;
            return undefined;
          }
        },
      };

      internalAPI.onChange = internalAPI.onChange.bind(internalAPI);
      internalAPI.onTerminate = internalAPI.onTerminate.bind(internalAPI);

      const data =
        (localStore.has(key) && (localStore.get(key) as V)) ||
        defaultValues[key];

      const clientAPI: Client<V> = {
        update(value) {
          localStore.set(key, value);
          this.data = value;
          emitter.emit(key as string, value);
          return undefined;
        },
        clearAll() {
          const defaultValue = defaultValues[key];
          this.data = defaultValue;
          localStore.clearAll();
          this.update(this.data);
          return undefined;
        },
        data,
      };

      clientAPI.update = clientAPI.update.bind(clientAPI);
      clientAPI.clearAll = clientAPI.clearAll.bind(clientAPI);

      return useStore<V>(clientAPI, internalAPI);
    };
  };
};

export default createStore;
