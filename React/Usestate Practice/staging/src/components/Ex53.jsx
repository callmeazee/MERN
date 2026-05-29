import { useState } from "react";

const Ex53 = () => {
     const [user, setUser] = useState({
          name: '',
          age: '',
          gender: ''
  })

  const handleChange = (e) => {
    const input = e.target;
    const key = input.name;
       const value = input.value;
       
       setUser({
            ...user,
            [key] : value
       })
  
  };
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Build a component where state stores name, age, and gender, and updates
        individually.
      </h1>
      <div className="flex flex-col gap-4 w-8/12 ">
        <input
          type="text"
          className="border border-gray-400 p-2 rounded-lg"
          placeholder="enter your name"
          onChange={handleChange}
          name="name"
        />
        <input
          type="number"
          className="border border-gray-400 p-2 rounded-lg"
          placeholder="enter your age"
          onChange={handleChange}
          name="age"
        />
        <select
          onChange={handleChange}
          name="gender"
          className="w-full p-3 border border-gray-400 rounded-lg">
          <option value="" default>
            Select any
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 p-6 w-6/12 justify-center bg-slate-600 rounded-lg text-white shadow-lg text-center">
                 <h2 className="font-mono text-xl ">Name: { user.name}</h2>
                 <h2 className="font-mono text-xl ">Age: { user.age}</h2>
                 <h2 className="font-mono text-xl ">Gender: { user.gender}</h2>
      </div>
    </div>
  );
};

export default Ex53;
