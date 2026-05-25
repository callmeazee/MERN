import { useState } from "react";


const Ex24 = () => {
     const[key, setKey] = useState(0)
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Create a state that updates when the user presses a key.
        </h1>
                 <input type="text"
                      className=" border border-gray-500 p-2"
                      placeholder="enter your keys"
                      onKeyDown={() => setKey(key + 1)}
                 /> 
                 <h1 className="font-mono text-cyan-700 text-center text-3xl">Key Count : {key }</h1>
      </div>
    </div>
  );
}

export default Ex24