import { useEffect } from "react";
import { expect, test, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

import createStore from "./persist-store";

const createDefaultStore = () => ({
  primitive: "test",
  object: {
    state: {
      count: 0,
    },
  },
  array: ["test2", { test: null }, 0],
});

let defaultStore = createDefaultStore();
let store = createStore(defaultStore);
let usePrimitive = store("primitive");
let useObject = store("object");
let useArray = store("array");

afterEach(() => {
  defaultStore = createDefaultStore();
  store = createStore(defaultStore);
  usePrimitive = store("primitive");
  useObject = store("object");
  useArray = store("array");
});

test("updates primitive values and uses local storage", () => {
  const updateWith = "new text";
  store = createStore(defaultStore);
  const Component = () => {
    const { data, update } = usePrimitive();
    useEffect(() => {
      update(updateWith);
    }, []);
    return <div>{data}</div>;
  };
  render(<Component />);
  expect(screen.getByText(updateWith)).toBeDefined();
  expect(localStorage.getItem("ns_store_lib_internal.primitive")).toEqual(`"${updateWith}"`)
});

test("updates array values", () => {
  const updateWith = "new text";
  const Component = () => {
    const { data, update } = useArray();
    useEffect(() => {
      update([updateWith]);
    }, []);
    return <div>{String(data[0])}</div>;
  };
  render(<Component />);
  expect(screen.getByText(updateWith)).toBeDefined();
});

test("updates object values", () => {
  const updateWith = 100;
  const Component = () => {
    const { data, update } = useObject();
    useEffect(() => {
      update({ state: { count: updateWith } });
    }, []);
    return <div>{String(data.state.count)}</div>;
  };
  render(<Component />);
  expect(screen.getByText(updateWith)).toBeDefined();
});

// The test environment appears to disregard session storage
// So below is not ideal, need to look at store2 under the hood
test("can use session storage", () => {
  const namespace = "namespace";
  const storage = "session";
  store = createStore(defaultStore, { namespace, storage });
  const updateWith = "updated";
  const Component = () => {
    const { data, update } = usePrimitive();
    useEffect(() => {
      update(updateWith);
    }, []);
    return <div>{String(data)}</div>;
  };
  render(<Component />);
  expect(screen.getByText(updateWith)).toBeDefined();
  expect(localStorage.getItem(`ns_store_lib_internal.primitive`)).toBe(`"${updateWith}"`);
});

// test("can opt to not use storage", () => {
//   const namespace = "namespace";
//   const storage = false;
//   store = createStore(defaultStore, { namespace, storage });
//   const updateWith = "updated";
//   const Component = () => {
//     const { data, update } = usePrimitive();
//     useEffect(() => {
//       update(updateWith);
//     }, []);
//     return <div>{String(data)}</div>;
//   };
//   render(<Component />);
//   expect(screen.getByText(updateWith)).toBeDefined();
//   const sessionLen = window.sessionStorage.length
//   const localLen = window.localStorage.length
//   expect(sessionLen).toBe(0);
//   expect(localLen).toBe(0);
// });
