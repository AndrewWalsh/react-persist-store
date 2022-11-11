import { expect, test, afterEach, vi } from "vitest";
import { EventEmitter2 as EventEmitter } from "eventemitter2";

import createInternalAPI from "./create-internal-api";

const createStore = () => ({
  foo: "bar",
});

let store = createStore();
let emitter = new EventEmitter();
type S = typeof store;
type K = keyof S;
type V = S[K];
let internalAPI = createInternalAPI<S, K, V>("foo", emitter);

afterEach(() => {
  store = createStore();
  emitter = new EventEmitter();
  type S = typeof store;
  type K = keyof S;
  type V = S[K];
  internalAPI = createInternalAPI<S, K, V>("foo", emitter);
});

test("onChange adds an event listener", () => {
  const fn = vi.fn();
  const updateStr = "test";
  internalAPI.onChange(fn);
  emitter.emit("foo", updateStr);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith(updateStr);
});

test("onChange only adds one event listener at a time", () => {
  const fn = vi.fn();
  const updateStr = "test";
  for (let i = 0; i < 10; i++) {
    internalAPI.onChange(fn);
  }
  emitter.emit("foo", updateStr);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith(updateStr);
});

test("onTerminate removes the event listener", () => {
  const fn = vi.fn();
  internalAPI.onChange(fn);
  internalAPI.onTerminate();
  emitter.emit("foo", "update");
  expect(fn).not.toHaveBeenCalled();
});
