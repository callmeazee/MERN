import { useState } from "react";


const Ex9 = () => {
     const [color, setColor] = useState("black")
  return (
    <div className="flex  justify-center items-center">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Implement a feature that changes text color when clicking a button.
                 </h1>
                 <p style={{color: color}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo quo inventore corrupti enim excepturi odit earum, quaerat, quisquam delectus totam asperiores repellendus dicta unde temporibus.</p>

                 <button
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
                      onClick={() => setColor(color === "red" ? "black" : "red")}
                 >
                      change color
                 </button>
      </div>
    </div>
  );
}

export default Ex9