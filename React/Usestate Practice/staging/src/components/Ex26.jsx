import { useState } from "react";


// const Ex26 = () => {
//      const [clicked, setClicked] = useState(0)

//      const handleClicked = (e) => {
//          setClicked(e.detail)
//      }
//   return (
//     <div className="flex  justify-center items-center ">
//       <div className="flex flex-col gap-12">
//         <h1 className="text-2xl font-semibold ">
//           Build a component where state updates only after a button is clicked.
//         </h1>

//         <button
//           className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
//           onClick={handleClicked}>
//           Click
//         </button>
//         <p className="font-medium text-2xl text-center">
//           Button Clicked: {clicked} Times
//         </p>
//       </div>
//     </div>
//   );
// }

const Ex26 = () => {
     const [value, setValue] = useState('')
     const [result, setResult] = useState('')

     const handleClick = () => {
          setResult(value)
     }



  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Build a component where state updates only after a button is clicked.
                 </h1>
                 
                 <input
                      type="text"
                      onChange={(e) => setValue(e.target.value)}
                      className="p-2 border border-gray-800"
                      placeholder="enter your text"
                 /> 

        <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
          onClick={handleClick}>
          Result
        </button>
        <p className="font-medium text-2xl text-center capitalize">
               {result}
        </p>
      </div>
    </div>
  );
};

export default Ex26