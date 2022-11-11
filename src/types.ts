/**
 * The reason for the higher order functions is to use closures to share logic and state
 */
export type CreateStore = <S extends Store>(
  defaultValues: S,
  options?: Options
) => <K extends keyof S>(key: K) => () => Client<S[K]>;

export type PartialDeep<Data extends Document> = {
  [Key in keyof Data]?: Partial<Data[Key]>;
};

export type UpdateFn<Data extends Document> = (
  value: PartialDeep<Data> | Data
) => void;

/**
 * Options.storage sets the browser storage engine to use, or none
 *
 * Options.namespace namespaces keys in local or session storage. Use this to avoid conflicts, but otherwise ignore this
 */
export type Options = {
  /** Defaults to local. Persist to session or local storage, else false to not persist */
  storage?: "local" | "session" | false;
  /** Default to ns_store_lib_internal. An implementation detail for use with the store2 library. Use to change the namespace if you need to avoid collision */
  namespace?: string;
};

/**
 * The Client interface accepts a type argument that extends Document
 *
 * @param update Update {data} for all users of this hook
 * @param data The data of type Data
 * @param clearAll Restore {data} to its initial value for all users of this hook
 */
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

/**
 * A Document is a JSON Schema compliant object
 *
 * All values in the Store must be a Document
 *
 * This lets it get serialised to browser storage
 */
export type Document =
  | JSONSchemaPrimitives
  | JSONSchemaObject
  | JSONSchemaArray;

/**
 * The Store is the typed collection of your stores
 *
 * Each key in the top level of the Store is a namespace store
 *
 * Each property is a Document, which is a JSON Schema compliant object
 */
export type Store = {
  [K in string]: Document;
};

export type PrivateInterface = <D extends Document>(
  client: Client<D>,
  internal: Internal<D>
) => Client<D>;
