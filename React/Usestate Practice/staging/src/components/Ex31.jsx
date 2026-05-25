import { useState } from "react";


const Ex31 = () => {
     const [user, setUser] = useState({
          name: 'John Wick',
          age: '48'
  
     })
     const handleChange = (e) => {
          const input = e.target
          const key = input.name
          const value = input.value

          setUser({
               ...user,
               [key]: value
          })
     }
  return (
    <div className="bg-gray-100 min-h-screen grid grid-col-2 w-8/12 p-8 ">
      <h1 className="text-2xl font-semibold">
        Create a user profile state with name and age, and update them via input
        fields
      </h1>
      <div className="flex flex-col gap-6">
         <input
          type="text"
          name = "name"
          className="bg-white border p-3 rounded"
          placeholder="enter your name"
          onChange={handleChange}
         
        />
       <input
          type="number"
          name= "age"
          className="bg-white border p-3 rounded"
          placeholder="enter your age"
          onChange={handleChange}
        
        />
      </div>
      <div
           className="bg-white rounded-lg shadow-lg text-center h-fit">
            <i className="ri-user-line text-8xl"></i>
          <h1 className="text-xl font-medium">{ user.name}</h1>
        <p>Age - {user.age} Years</p>
      </div>
    </div>
  );
}

export default Ex31