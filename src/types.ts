export type PartialDeep<Data extends Document> = {
  [Key in keyof Data]?: Partial<Data[Key]>;
}

export type UpdateFn<Data extends Document> = (value: PartialDeep<Data> | Data) => void;

export type Options = {
  /** Defaults to local. Persist to session or local storage, else false to not persist */
  storage?: "local" | "session" | false;
  /** Default to ns_store_lib_internal. An implementation detail for use with the store2 library. Use to change the namespace if you need to avoid collision */
  namespace?: string;
};

export type Client<Data extends Document> = {
  update: UpdateFn<Data>;
  data: Data;
  /** Clear all data from the store, including local or session storage */
  clearAll: () => void;
};

export type Internal<Data extends Document> = {
  onChange: (fn: (d: Data) => void) => void;
  onTerminate: () => void;
  _eventListenerHandler: ((d: Data) => void) | null;
};

export type JSONSchemaPrimitives = string | number | boolean | null;
export type JSONSchemaObject = { [key: string]: Document };
export type JSONSchemaArray = Array<Document>;

export type Document =
  | JSONSchemaPrimitives
  | JSONSchemaObject
  | JSONSchemaArray

export type Store = {
  [K in string]: Document;
};

export type PrivateInterface = <D extends Document>(client: Client<D>, internal: Internal<D>) => Client<D>;
