import { useState } from "react";


const Ex20 = () => {
     const [char, setChar] = useState(0)

     const handleChar = (e) => {
          const inputValue = e.target.value
          console.log(inputValue.length)
          setChar(inputValue.length)
     }
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Implement a live character count display for an input field.
        </h1>

        <input
          className="border p-2"
          type="text"
          placeholder="enter your text"
          onChange={handleChar}
        />

        <p className="text-xl font-semibold text-center bg-cyan-400 p-2">
          Char- {char}
        </p>
      </div>
    </div>
  );
}

export default Ex20