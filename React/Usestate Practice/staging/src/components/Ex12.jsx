import { useState } from "react";


const Ex12 = () => {
     const [text, settext] =useState('original')
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
          <h1 className="text-2xl font-semibold ">
          create a state variable that holds a string and updates when a button
          is clicked.
          </h1>
                 <p className="text-center font-bold text-2xl">{text}</p>

          <button
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
                      onClick={() => settext(text === 'original' ? 'upadted' : 'original')}
          >
               Change text
          </button>
      </div>
    </div>
  );
}

export default Ex12