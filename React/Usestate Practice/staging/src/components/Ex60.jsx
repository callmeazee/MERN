import { useState } from "react";


const Ex60 = () => {
     const [field, setField] = useState({
          name: "azee khan",
          class: "12th C",
          roll: 64,
          subject: "Economics"
     })
     const handleChange = (e) => {
       const { name, value } = e.target; // Grabs the input's name attribute and what you typed

       // 2. Call setField to update the state dynamically
       setField({
         ...field, // Copy the existing object properties so you don't lose them
         [name]: value, // Overwrite or update only the key that matches the input's name attribute
       });
     };
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Create input fields dynamically using map based on an object. Use the
        objects keys as the input name attributes and the corresponding values
        as the input values
      </h1>
     {
      Object.keys(field).map((item, index) => (
       <input
          key={index}
          name={item}
                value={field[item]}
                onChange={handleChange}
          className="border border-indigo-500 p-2 w-5/12 rounded-lg"
       />
      ))
     }
    </div>
  );
}

export default Ex60