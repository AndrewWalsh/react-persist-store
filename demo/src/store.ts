import createStore from "react-persist-store";

const documentStore = {
  app: {
    count: 1,
    text: "Odd",
    unchanged: [],
  },
  const: {
    a: 1,
  },
};

const store = createStore(documentStore, {
  storage: "session",
  namespace: "namespace",
});

export const useApp = store("app");
