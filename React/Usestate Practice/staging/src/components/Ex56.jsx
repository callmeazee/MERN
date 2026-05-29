import { useState } from "react";

const Ex56 = () => {
  const [counter, setCounter] = useState({
    counter1: 0,
    counter2: 0,
    counter3: 0,
  });
  const increaseCounter = (key) => {
       setCounter({
            ...counter,
            [key]: counter[key] + 1
    });
  };
     const decreaseCounter = (key) => {
          setCounter({
               ...counter,
               [key]:counter[key] > 0 ? counter[key] - 1 : 0
       })
  };

  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Build a counter app where state tracks multiple counters inside an
        object.
      </h1>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-center text-2xl font-medium mb-3">Counter 1</h1>
          <div className="flex items-center  px-6 py-2 bg-gray-400 rounded-lg shadow-lg gap-3 ">
            <button
              className="px-3 py-2 bg-blue-400 cursor-pointer rounded hover:bg-blue-500"
              onClick={() => decreaseCounter("counter1")}>
              -
            </button>
            <h1 className="text-xl font-mono">Count: {counter.counter1}</h1>
            <button
              className="px-3 py-2 bg-blue-400 cursor-pointer rounded hover:bg-blue-500"
              onClick={() => increaseCounter("counter1")}>
              +
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-center text-2xl font-medium mb-3">Counter 2</h1>
          <div className="flex items-center  px-6 py-2 bg-gray-400 rounded-lg shadow-lg gap-3 ">
            <button
              className="px-3 py-2 bg-blue-400 cursor-pointer rounded hover:bg-blue-500"
              onClick={() => decreaseCounter("counter2")}>
              -
            </button>
            <h1 className="text-xl font-mono">Count: {counter.counter2}</h1>
            <button
              className="px-3 py-2 bg-blue-400 cursor-pointer rounded hover:bg-blue-500"
              onClick={() => increaseCounter("counter2")}>
              +
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-center text-2xl font-medium mb-3">Counter 3</h1>
          <div className="flex items-center  px-6 py-2 bg-gray-400 rounded-lg shadow-lg gap-3 ">
            <button
              className="px-3 py-2 bg-blue-400 cursor-pointer rounded hover:bg-blue-500"
              onClick={() => decreaseCounter("counter3")}>
              -
            </button>
            <h1 className="text-xl font-mono">Count: {counter.counter3}</h1>
            <button
              className="px-3 py-2 bg-blue-400 cursor-pointer rounded hover:bg-blue-500"
              onClick={() => increaseCounter("counter3")}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ex56;
