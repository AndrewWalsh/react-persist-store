import { useState, useEffect } from "react";

import type { Client, Internal, Document } from "./types";

const useStore = <Data extends Document>(
  client: Client<Data>,
  internal: Internal<Data>
): Client<Data> => {
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
