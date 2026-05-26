import { useState } from "react";

const Ex35 = () => {
  const [box, setBox] = useState({
    width: '300',
    height: '200'
  })


  const handleChange = (e) => {
    const input = e.target
    const key = input.name
    const value = input.value
     
    setBox({
      ...box,
      [key]: Number(value)
    })
  }

  return (
    <div className="bg-gray-100 min-h-screen grid grid-col-2 p-8 ">
      <h1 className="text-2xl font-semibold">
        Implement a state object that stores and updates width and height
        dynamically.
      </h1>
      <div>
        <input
          type="number"
          name="width"
          className="bg-white border border-gray-300 p-3 rounded"
          placeholder="enter width"
          onChange={handleChange}
        />
        <input
          type="number"
          name="height"
          className="bg-white border p-3 rounded"
          placeholder="enter height"
          onChange={handleChange}
        />
      </div>
      <div
        className="w-[300px] h-[300px] border border-amber-800"
        // style={{ width: box.width + "px", height: box.height + "px" }}
        style={{ width: box.width , height: box.height }}></div>
    </div>
  );
};

export default Ex35;
