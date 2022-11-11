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
  expect(localStorage.getItem("ns_store_lib_internal.primitive")).toEqual(
    `"${updateWith}"`
  );
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
