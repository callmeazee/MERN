import { useState } from "react";


const Ex15 = () => {
     const [title, setTitle] = useState("")

     const handleBtn = () => {
      
       document.title = title.charAt(0).toUpperCase() + title.split( )
     }
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
          <h1 className="text-2xl font-semibold ">
               Implement a functionality where clicking a button changes the document
               title.
          </h1>

          <input
               type="text"
                      className="border bg-gray-800 p-2"
                      onChange={(e) => setTitle(e.target.value)}
          />

          <button
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
                      onClick={handleBtn }
          >
             Change title
          </button>
      </div>
    </div>
  );
}

export default Ex15