import { useState } from "react";

const Ex16 = () => {
  const [color, setColor] = useState("#323232");

  return (
    <div
      className="flex  justify-center items-center"
      style={{
        background: color,
        height: "100vh",
      }}>
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Create a toggle button to switch between Light Mode and Dark Mode.
        </h1>

        <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
          onClick={() => setColor(color === "white" ? "#323232" : "white")}>
          {color === "white" ? "Dark mode" : "Light mode"}
        </button>
      </div>
    </div>
  );
};

export default Ex16;
