import { useState } from "react";


const Ex54 = () => {
     const [ui, setUi] = useState({
          el1: true,
          el2: true,
          el3: true
     })
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Implement a state object that tracks the visibility of multiple UI
        elements.
      </h1>
      <div>
        {ui.el1 && (
          <h2
            className="text-2xl text-blue-500 cursor-pointer"
            onClick={() => setUi({ ...ui, el1: false })}>
            Element 1
          </h2>
        )}
        {ui.el2 && (
          <h2
            className="text-2xl text-amber-300 cursor-pointer"
            onClick={() => setUi({ ...ui, el2: false })}>
            Element 2
          </h2>
        )}
        {ui.el3 && (
          <h2
            className="text-2xl text-cyan-800 cursor-pointer"
            onClick={() => setUi({ ...ui, el3: false })}>
            Element 3
          </h2>
        )}
      </div>
    </div>
  );
}

export default Ex54