import { useApp } from "./store";

function Button({ clear = false }) {
  const { data, update, clearAll } = useApp();
  return (
    <>
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
      {clear && <>&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => clearAll()}>reset</button></>}
    </>
  );
}

export default Button;
