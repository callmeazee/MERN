import { useState } from "react";


const Ex39 = () => {
     const [count, setCount] = useState({
          button1: 0,
          button2: 0,
          button3: 0
     })

     const handleClick = (e) => {
          console.log(e.target.name)
          const input = e.target
          const key = input.name
          setCount({
               ...count,
               [key]: count[key] + 1
              
          })
     }
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Create an object state that tracks the number of clicks for different
        buttons
      </h1>

      <div className="space-x-3">
        <button
          name="button1"
          className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer"
          onClick={handleClick}>
          Button 1
        </button>
        <button
          className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 rounded-lg text-white cursor-pointer"
          name="button2"
          onClick={handleClick}>
          Button 2
        </button>
        <button
          className="px-6 py-2.5 bg-green-500 hover:bg-green-600 rounded-lg text-white cursor-pointer"
          name="button3"
          onClick={handleClick}>
          Button 3
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-2xl font-semibold text-center">
          Button 1 clicked : {count.button1} times
        </p>
        <p className="text-2xl font-semibold text-center">
          Button 2 clicked : {count.button2} times
        </p>
          <p className="text-2xl font-semibold text-center">
            Button 3 clicked : {count.button3} times
          </p>
      </div>
    </div>
  );
}

export default Ex39