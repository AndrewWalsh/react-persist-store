import icon from "./assets/icon_viewport.svg";
import "./App.css";
import createStore from "../../src";

const documentStore = {
  app: {
    count: 1,
    text: "Odd",
    unchanged: [],
  },
  const: {
    a: 1
  }
};

const store = createStore(documentStore, {
  storage: "session",
  namespace: "namespace",
});

const useStore = store("app");

function App() {
  const { data, update, clearAll } = useStore();

  return (
    <div className="App">
      <div>
        <a
          href="https://github.com/AndrewWalsh/react-persist-store"
          target="_blank"
        >
          <img
            src={icon}
            className="logo react"
            alt="react-persist-store logo"
          />
        </a>
      </div>
      <h1>react-persist-store</h1>
      <div className="card">
        <button
          onClick={() =>
            update({
              count: data.count + 1,
              text: data.text === "Odd" ? "Even" : "Odd",
            })
          }
        >
          {data.text} {data.count}
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={() => clearAll()}>reset</button>
        <p>
          A simple hook-based type-safe store for React with out-of-the-box
          browser persistence
        </p>
      </div>
      <p className="read-the-docs">
        <code>npm i react-persist-store</code>
      </p>
    </div>
  );
}

export default App;
