import { useState } from "react";


const Ex18 = () => {
     const [height, setHeight] = useState(2)
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Implement a text area that dynamically adjusts its height based on
          input.
        </h1>
        <input
          type="number"
          placeholder="enter the height in rows from 1-20"
          className="border bg-gray-800 p-2"
          onChange={(e) => setHeight(e.target.value)}
        />
        <textarea className="border bg-gray-800 p-2" rows={height}></textarea>
      </div>
    </div>
  );
}

export default Ex18