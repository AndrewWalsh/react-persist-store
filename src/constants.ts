import type { Options } from "./types";

/** The default namespace used by store2 */
export const NAMESPACE = "ns_store_lib_internal";

export const defaultOptions: Required<Options> = {
  storage: "local",
  namespace: NAMESPACE,
};
