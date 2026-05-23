import { useState } from "react";

const Ex8 = () => {
  const[count, setCount] = useState(0)
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Build a Click me button that tracks the number of times it is
          clicked.
        </h1>

        <button
          onClick={() => setCount(count + 1)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium">
        click me
        </button>
        <h2 className="font-bold text-4xl text-black text-center">Button Clicked: {count}</h2>
   
      </div>
    </div>
  );
}

export default Ex8