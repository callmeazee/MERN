import { useState } from "react";


const Ex36 = () => {
     const dark = {
          background: "#f5f5f5",
          color: "#000000"

     }
     const light = {
          background: "#1a1a1a",
          color: '#ffffff'

     }
     

     const [theme, setTheme] = useState("light")
     
   const handleClick = () => {
       setTheme(theme === "dark" ? "light" :"dark");
     }
   

     return (
       <div
         className="min-w-fit h-screen bg-gray-100 p-3 flex flex-col items-center  justify-center gap-6 "
         style={theme === "light" ? light : dark}>
         <h1 className="text-center font-medium text-2xl">
           Create a toggle button that switches between two themes stored in an
           object
         </h1>
         <button
           className="px-6 py-3 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white"
           onClick={handleClick}>
           Toggle theme
         </button>
       </div>
     );
}

export default Ex36