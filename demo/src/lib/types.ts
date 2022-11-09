type UpdateFn<Data> = (value: Data) => void;

export type Options = {
  /** Defaults to local. Persist to session or local storage, else false to not persist */
  persist?: "local" | "session" | false;
  /** Default to ns_store_lib_internal. An implementation detail for use with the store2 library. Use to change the namespace if you need to avoid collision */
  namespace?: string;
};

export type Client<Data> = {
  update: UpdateFn<Data>;
  data: Data;
  /** Clear all data from the store, including local or session storage */
  clearAll: () => void;
};

export type Internal<Data> = {
  onChange: (fn: (d: Data) => void) => void;
  onTerminate: () => void;
  _eventListenerHandler: ((d: Data) => void) | null;
};

type JSONifiable = { toJSON: () => Document };
type JSONSchemaPrimitives = string | number | boolean | null;
type JSONSchemaObject = { [key: string]: Document };
type JSONSchemaArray = Array<Document>;

export type Document =
  | JSONSchemaPrimitives
  | JSONSchemaObject
  | JSONSchemaArray
  | JSONifiable;

/**
 * A map of string -> Document
 *
 * Each key in the map is a string
 * Each value for that key is a Document type
 *
 * @example
 *  type Post = {
 *    title: string;
 *    content: string;
 *  }
 *
 *  type PostStore = {
 *    POSTS: Post
 *  }
 *
 *  const postStore = createStore<PostStore>('post_store');
 */
export type Store = {
  [Key in string]: Document;
};
