import store2, { StoreBase } from "store2";
import { EventEmitter2 as EventEmitter } from "eventemitter2";
import { deepmerge } from "deepmerge-ts";

import usePersistStore from "./use-persist-store";

import type {
  Client,
  Store,
  Internal,
  Options,
} from "./types";

/** The default namespace used by store2 */
const NAMESPACE = "ns_store_lib_internal";

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

type CreateStore = <S extends Store>(
  defaultValues: S,
  options?: Options
) => <K extends keyof S>(key: K) => () => Client<S[K]>;

const defaultOptions: Required<Options> = {
  storage: "local",
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
  const { storage, namespace } = config;
  const localStore = createNamespacedStore(namespace, storage);

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
          this.data = deepmerge(this.data, value) as V;
          emitter.emit(key as string, value);
          return undefined;
        },
        clearAll() {
          const defaultValue = defaultValues[key];
          this.data = defaultValue;
          localStore.clearAll();
          this.update(defaultValue);
          return undefined;
        },
        data,
      };

      clientAPI.update = clientAPI.update.bind(clientAPI);
      clientAPI.clearAll = clientAPI.clearAll.bind(clientAPI);

      return usePersistStore<V>(clientAPI, internalAPI);
    };
  };
};

export default createStore;
