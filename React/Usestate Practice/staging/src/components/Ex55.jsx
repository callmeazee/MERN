import { useState } from "react";


const Ex55 = () => {
     const [ui, setUi] = useState({
          switch1: "Off",
          switch2: "On",
          switch3: "Off"
          
     })
     const handleChange = (e) => {
          const input = e.target 
          const key = input.name 
          const value = input.checked 

          setUi({
               ...ui,
               [key]: value ? "On" :  "Off"
          })
     }
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Create a toggle switch where state stores the on/off status of multiple
        switches.
      </h1>
      <div className="flex flex-1 items-center justify-center w-full">
        <div className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg min-w-[320px]">
          {/* Switch 1 */}
          <div className="flex items-center justify-between gap-12 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <span className="font-medium text-gray-700 text-lg">
              Switch One
            </span>
            <label className="relative inline-flex h-12 w-24 items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                name="switch1"
                onChange={handleChange}
              />
              <div className="w-full h-full bg-gray-400 rounded-full transition-colors duration-300 ease-in-out peer-checked:bg-green-500" />
              <div className="absolute left-1 h-10 w-10 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out peer-checked:translate-x-12" />
            </label>
            {ui.switch1}
          </div>

          {/* Switch 2 */}
          <div className="flex items-center justify-between gap-12 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <span className="font-medium text-gray-700 text-lg">
              Switch Two
            </span>
            <label className="relative inline-flex h-12 w-24 items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                name="switch2"
                onChange={handleChange}
              />
              <div className="w-full h-full bg-gray-400 rounded-full transition-colors duration-300 ease-in-out peer-checked:bg-green-500" />
              <div className="absolute left-1 h-10 w-10 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out peer-checked:translate-x-12" />
            </label>
            {ui.switch2}
          </div>

          {/* Switch 3 */}
          <div className="flex items-center justify-between gap-12 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <span className="font-medium text-gray-700 text-lg">
              Switch Three
            </span>
            <label className="relative inline-flex h-12 w-24 items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                name="switch3"
                onChange={handleChange}
              />
              <div className="w-full h-full bg-gray-400 rounded-full transition-colors duration-300 ease-in-out peer-checked:bg-green-500" />
              <div className="absolute left-1 h-10 w-10 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out peer-checked:translate-x-12" />
            </label>
            {ui.switch3}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ex55