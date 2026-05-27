import { useState } from "react";


const Ex48 = () => {
     const [box, setBox] = useState({
          width: "300px",
          color : "#1f1f1f"
     })
     const handleChange = (e) => {
          const input = e.target
          const key = input.name
          const value = input.value
          console.log(value)

          setBox({
               ...box,
               [key] :  value
          })

     }
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Implement a state object that changes borderColor and borderWidth
        dynamically.
      </h1>
      <div className="flex gap-8 items-center">
                
        <input
        
          className="p-3 border border-gray-700 rounded-lg"
          placeholder="enter width in px"
          name="width"
          onChange={handleChange}
        />
             
        <input
          type="color"
          className=" w-[70px]"
       
          name="color"
          onChange={handleChange}
        />
      </div>
      <div className="w-[300px] h-[300px] bg-indigo-400 border-4 border-gray-800" style={{width: box.width + "px", borderColor: box.color}}></div>
    </div>
  );
}

export default Ex48