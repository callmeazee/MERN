import { useState } from "react";


const Ex7 = () => {
     const [enable,setEnable] = useState(false)
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold "></h1>

        <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium "
          onClick={() => setEnable(!enable)}
          disabled={enable}>
          Click me to disable
        </button>
      </div>
    </div>
  );
}

export default Ex7