import { useState } from "react";


const Ex14 = () => {
     const [char, setChar] = useState(0)

     const handleChange = (e) => {
          const input = e.target
           setChar(input.value)

     }
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Create a text input that limits the number of characters typed.
        </h1>
                 <input
                      className="border bg-gray-800 p-2"
                      type='number'
                      placeholder='enter character limit'
                    //   value={char}
                      onChange={handleChange}

                      
                 />
                 <textarea
                      name="text"
                      placeholder='your text goes here'
                      maxLength={char}
                      rows={5}
                      className="border bg-gray-800 p-2"

                 >
                      
                 </textarea>

      </div>
    </div>
  );
}

export default Ex14