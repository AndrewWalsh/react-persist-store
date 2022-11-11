import { useState, useEffect } from "react";

import type { PrivateInterface, Store, Client, Internal } from "./types";

/**
 * useStore returns a Client interface to a namespace in the store
 *
 * @param client The interface that is returned to the user
 * @param internal An interface with functionality critical to the function of the Client interface
 * @returns Data, an update function, and a clearAll function
 */
const useStore: PrivateInterface = <
  S extends Store,
  K extends keyof S,
  V extends S[K]
>(
  client: Client<V>,
  internal: Internal<V>
): Client<V> => {
  const [data, setData] = useState(client.data);

  useEffect(() => {
    internal.onChange((newData) => {
      setData(newData);
    });
    return internal.onTerminate;
  }, []);

  return {
    update: client.update,
    data,
    clearAll: client.clearAll,
  };
};

export default useStore;
