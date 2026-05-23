import { useState } from "react";


const Ex4 = () => {
     // const[enable, setEnable] = useState(false)
        const [enable, setEnable] =  useState(true)
  return (
        <div className="flex  justify-center items-center ">
          <div className="flex flex-col gap-12">
            <h1 className="text-2xl font-semibold ">
              Create a toggle switch for enabling/disabling a feature.
                 </h1>
                 <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." readOnly={enable } />

                 <button
                    onClick={() => setEnable(!enable)}
                     className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium">{enable ? "Start" : "Stop"}
                      
                 </button>
          </div>
        </div>

//     <div className="flex  justify-center items-center ">
//       <div className="flex flex-col gap-12">
//         <h1 className="text-2xl font-semibold ">
//           Create a toggle switch for enabling/disabling a feature.
//         </h1>

//         <p hidden = {enable} >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, adipisci a, recusandae corrupti dolore assumenda, sapiente sit eaque qui blanditiis earum. Quos quibusdam consequatur nostrum maiores nemo facilis dicta alias?
//         </p>
//         <button
//           className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
//           onClick={() => setEnable(!enable)}>
//           {enable ? "Show" : "Hide"}
//         </button>
//       </div>
//     </div>
  );
}

export default Ex4