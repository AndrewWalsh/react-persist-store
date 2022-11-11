import type { EventEmitter2 as EventEmitter } from "eventemitter2";

import type { Internal, Store } from "./types";

const createInternalAPI = <S extends Store, K extends keyof S, V extends S[K]>(
  key: K,
  emitter: EventEmitter
): Internal<V> => {
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
  return internalAPI;
};

export default createInternalAPI;
