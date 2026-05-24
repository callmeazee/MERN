import { useState } from "react";


const Ex13 = () => {
     const [value, setValue] = useState('')
     
     const handleChange = (e) => {
          const input = e.target
          setValue(input.value)
         

     }
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
          <h1 className="text-2xl font-semibold ">
               Implement a function to clear an input field when a button is pressed
          </h1>
          <input
               value={value}  
               name="value"
               type="text"
               placeholder="enter the text"
               className="border bg-blue-700"
               onChange={handleChange}
          />

          <button
               className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
             onClick={() => setValue('')}
          >
               Reset
          </button>
      </div>
    </div>
  );
}

export default Ex13