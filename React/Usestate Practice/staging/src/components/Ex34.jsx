import { useState } from "react";

const Ex34 = () => {
  const [color, setColor] = useState({
    background: "#000000",
  });


  const handleChange = (e) => {
    const input = e.target;
    const key = input.name;
    const value = input.value;
   

    setColor({
      ...color,
      [key]: value,
    });
  };
  return (
    <div className="bg-gray-100 min-h-screen grid grid-col-2 p-8 items-center text-center">
      <h1 className="text-2xl font-semibold">
        Build a color picker that updates an object state with backgroundColor.
      </h1>
      <div className="mx-auto">
        <input
          type="color"
          name="background"
          className="bg-white border border-gray-300 p-3 rounded mb-8"
          placeholder="enter your first name"
          onChange={handleChange}
        />
        <div
          className="w-[300px] h-[300px] border bg-amber-600"
          style={{ background: color.background }}></div>
      </div>

    </div>
  );
};

export default Ex34;
