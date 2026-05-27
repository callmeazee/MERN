import { useState } from "react";


const Ex41 = () => {
     const [position, setPosition] = useState({
          x: 0,
          y:0

     })
     const handleMouseMove = (e) => {
          setPosition({ x: e.clientX, y:e.clientY})
        
   }
      

     window.addEventListener('mousemove', handleMouseMove)
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Implement a feature where an object state tracks the users scroll
        position.
      </h1>

      <p className="text-2xl font-medium">X position:{position.x}</p>
      <p className="text-2xl font-medium">Y position:{position.y}</p>
    </div>
  );
}

export default Ex41