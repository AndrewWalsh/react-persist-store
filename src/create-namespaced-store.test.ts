import { expect, test } from "vitest";

import createNamespacedStore from "./create-namespaced-store";

const namespace = "test";

test('sets namespace to value and storage to "local" when storage is "local"', () => {
  const store = createNamespacedStore(namespace, "local");
  // @ts-expect-error
  expect(store._id).toBe("local");
  // @ts-expect-error
  expect(store._ns).toBe(`${namespace}.`);
});

test('sets namespace to value and storage to "session" when storage is "session"', () => {
  const store = createNamespacedStore(namespace, "session");
  // @ts-expect-error
  expect(store._id).toBe("session");
  // @ts-expect-error
  expect(store._ns).toBe(`${namespace}.`);
});

test('sets namespace to value and storage to "page" when storage is false', () => {
  const store = createNamespacedStore(namespace, false);
  // @ts-expect-error
  expect(store._id).toBe("page");
  // @ts-expect-error
  expect(store._ns).toBe(`${namespace}.`);
});
