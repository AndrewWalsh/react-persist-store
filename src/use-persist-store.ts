import { useState, useEffect } from "react";

import type { PrivateInterface, Document, Client, Internal } from "./types";

const useStore: PrivateInterface = <D extends Document>(client: Client<D>, internal: Internal<D>) => {
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
