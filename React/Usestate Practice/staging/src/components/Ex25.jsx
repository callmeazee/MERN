import { useState } from "react";


const Ex25 = () => {
     const [input, setInput] = useState('')
     
     const handleChange = (e) => {
          const inputValue = e.target.value
          setInput(inputValue.toUpperCase())
     }
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Implement a text input that converts input to uppercase dynamically.
        </h1>

          <input
               type="text"
               className=" border border-gray-500 p-2"
                      placeholder="enter text to uppercase"
                      onChange={handleChange}
          />
                 <p className="text-2xl font-medium text-center">{input}</p>
      </div>
    </div>
  );
}

export default Ex25