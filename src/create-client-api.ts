import deepmerge from "deepmerge";
import type { EventEmitter2 as EventEmitter } from "eventemitter2";
import type { StoreBase } from "store2";

import type { Store, Client } from "./types";

type Args<S extends Store, K extends keyof S, V extends S[K]> = [
  key: K,
  emitter: EventEmitter,
  data: V,
  localStore: StoreBase,
  defaultValues: S
];

const createClientAPI = <S extends Store, K extends keyof S, V extends S[K]>(
  ...args: [...Args<S, K, V>]
): Client<V> => {
  const [key, emitter, data, localStore, defaultValues] = args;
  const clientAPI: Client<V> = {
    update(value) {
      localStore.set(key, value);
      // @ts-expect-error
      this.data = deepmerge(this.data, value) as V;
      emitter.emit(key as string, value);
      return undefined;
    },
    clearAll() {
      const defaultValue = defaultValues[key] as V;
      this.data = defaultValue;
      localStore.clearAll();
      this.update(defaultValue);
      return undefined;
    },
    data,
  };
  return clientAPI;
};

export default createClientAPI;