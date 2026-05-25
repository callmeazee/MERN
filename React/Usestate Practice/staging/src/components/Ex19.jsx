import { useState } from "react"


const Ex19 = () => {
     const [random, setRandom] = useState(10)

     const handleBtn = () => {
          const randomNum = Math.floor(Math.random() * 100)
   setRandom(randomNum)
}
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Create a state variable that stores a random number and updates on
          button click.
        </h1>
        <h2 className="font-bold text-4xl text-center text-blue-500 p-2">
        Random -  {random}
        </h2>

        <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
          onClick={handleBtn}>
          Change Randomly
        </button>
      </div>
    </div>
  );
}

export default Ex19