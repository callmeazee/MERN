import { useState } from "react";


const Ex28 = () => {
      const [input, setInput] = useState("azee")

     
     const handleInput = (e) => {
         setInput(e.target.value)
        
     }




  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Implement a feature where a button click resets all state values.
                 </h1>
                 <input value={input} type="text" placeholder="enter your text"  onChange={handleInput} className="p-2 border border-gray-800"/>

                 <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
                 onClick={() => setInput("")}>Reset</button>
      </div>
    </div>
  );
}

export default Ex28