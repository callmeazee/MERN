import { useEffect, useState } from "react";


const Ex57 = () => {
     const light = {
          background: "#f5f5f5",
          color: "black"
     }
     const dark = {
          background: "#323232",
          color: "white"
     }

     const [theme, setTheme] = useState("light")

     useEffect(() => {
          const persistTheme = localStorage.getItem("theme")
          if (!persistTheme) {
               
               localStorage.setItem("theme", "light")
          } else {
               setTheme(persistTheme)
          }
     }, [])

     const handleClick = () => {
          const persistTheme = localStorage.getItem("theme");
          if (persistTheme === "light") {
               localStorage.setItem("theme", "dark")
               setTheme("dark")
          } else {
               localStorage.setItem("theme", "light");
              setTheme("light") 
          }
     }
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4" style={theme === "light" ? light : dark}>
      <h1 className="font-medium text-2xl text-center">
        Implement a feature where a users theme preference is saved in an
        object state.
            </h1>
            <button className="px-6 py-2 bg-blue-400 hover:bg-blue-500 cursor-pointer"
            onClick={handleClick}
            >Toggle</button>
    </div>
  );
}

export default Ex57