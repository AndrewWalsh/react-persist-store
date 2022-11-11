import { expect, test, afterEach, vi } from "vitest";
import { EventEmitter2 as EventEmitter } from "eventemitter2";
import store2 from "store2";

import createClientAPI from "./create-client-api";

const createStore = () => ({
  foo: "bar",
});

let localStore = store2.namespace("test").local;
let store = createStore();
let emitter = new EventEmitter();
type S = typeof store;
type K = keyof S;
type V = S[K];
let clientAPI = createClientAPI<S, K, V>(
  "foo",
  emitter,
  store["foo"],
  localStore,
  store
);

afterEach(() => {
  localStore = store2.namespace("test").local;
  store = createStore();
  emitter = new EventEmitter();
  type S = typeof store;
  type K = keyof S;
  type V = S[K];
  clientAPI = createClientAPI<S, K, V>(
    "foo",
    emitter,
    store["foo"],
    localStore,
    store
  );
});

test("update emits new state and updates browser storage", () => {
  const emitFn = vi.fn();
  const setFn = vi.fn();

  emitter.once("foo", emitFn);
  localStore.set = setFn;

  const updateStr = "test";
  clientAPI.update(updateStr);

  expect(emitFn).toHaveBeenCalledWith(updateStr);
  expect(emitFn).toHaveBeenCalledTimes(1);

  expect(setFn).toHaveBeenCalledWith("foo", updateStr);
  expect(setFn).toHaveBeenCalledTimes(1);
});

test("clearAll emits default state and clears browser storage", () => {
  const emitFn = vi.fn();
  const clearAllFn = vi.fn();

  emitter.once("foo", emitFn);
  localStore.clearAll = clearAllFn;

  const updateStr = "test";
  clientAPI.data = updateStr;
  clientAPI.clearAll();

  expect(emitFn).toHaveBeenCalledWith(store.foo);
  expect(emitFn).toHaveBeenCalledTimes(1);

  expect(clearAllFn).toHaveBeenCalled();
  expect(clearAllFn).toHaveBeenCalledTimes(1);
});
