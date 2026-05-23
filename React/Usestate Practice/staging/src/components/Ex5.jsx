import { useState } from "react";


const Ex5 = () => {
     const [input, setInput] = useState('')
     
     const handleChange = (e) => [
         setInput(e.target.value) 
     ]

return (
<div className="flex  justify-center items-center ">
  <div className="flex flex-col gap-12">
      <h1 className="text-2xl font-semibold ">
          Build a simple input field that updates the UI as the user types.
      </h1>
          <input
               onChange={handleChange}
               name="input"
               className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
               placeholder="Type here..."
          
          />
          <p className="p-2 font-bold text-2xl text-gray-800">
               {input}  
          </p>
     </div>
</div>
);
}

export default Ex5