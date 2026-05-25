import { useState } from "react";


const Ex17 = () => {
     const [select, setSelect] = useState('bentley')
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Build a dropdown that updates the selected value in state
        </h1>

        <label >Choose a car:</label>

        <select name="cars" id="cars" onChange={(e) => setSelect(e.target.value)}>
          <option value="volvo">Volvo</option>
          <option value="bentley" selected>Bentley</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
          <h2 className="font-bold text-4xl text-center text-amber-400">{select.toUpperCase()}</h2>

     
      </div>
    </div>
  );
}

export default Ex17