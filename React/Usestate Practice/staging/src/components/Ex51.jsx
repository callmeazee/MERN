import { useEffect, useState } from "react";


const Ex51 = () => {
     const [key, setKey] = useState(null)

     useEffect(() => {
      window.onkeydown = (e) => {
            setKey(e.key)
          }
          
          return () => {
             window.onkeydown = null
          }
  })

  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Implement a state object that tracks the last key pressed by the user.
      </h1>

      <div className="flex flex-col justify-center gap-4 text-center w-[350px] h-[350px] bg-amber-200 shadow-lg p-3 rounded-lg">
        <h2 className="text-4xl text-gray-500 font-mono">Press any Key </h2>
        <h2 className="text-3xl text-blue-500 font-sans">
          Key Pressed - {key}
        </h2>
      </div>
    </div>
  );
}

export default Ex51