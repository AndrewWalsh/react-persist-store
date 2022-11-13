import icon from "./assets/icon_viewport.svg";
import "./App.css";
import Button from "./Button"


function App() {
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
        <Button />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button clear />
        <p>
          A reactive hook-based type-safe store for React with out-of-the-box browser persistence. Refresh the browser and state will persist.
        </p>
      </div>
      <p className="read-the-docs">
        <a href="https://www.npmjs.com/package/react-persist-store"><code>npm i react-persist-store</code></a>
      </p>
    </div>
  );
}

export default App;
