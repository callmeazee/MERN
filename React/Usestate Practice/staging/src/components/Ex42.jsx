import { useState } from "react";

const Ex42 = () => {
  const [rgb, setRgb] = useState({
    value: "1f1f1f",
  });

  const handleChange = (e) => {
    const input = e.target;
//     const key = input.name;
    const val = input.value;

    setRgb({
      value: val,
    });
  };
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Create an object state that stores RGB values and updates them on input
        change.
      </h1>

      <input
        type="color"
        className="w-[200px] h-15  shadow cursor-pointer"
        name="color"
        onChange={handleChange}
        value={rgb.value}
      />
      <div
        className="w-[700px] h-[300px] bg-blue-500 items-center mt-58 rounded-lg shadow-2xl"
        style={{ background:  rgb.value  }}></div>
    </div>
  );
};

export default Ex42;
