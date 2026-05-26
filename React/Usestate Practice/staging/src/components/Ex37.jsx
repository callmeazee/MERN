import { useState } from "react"


const Ex37 = () => {
     const [profile, setProfile] = useState({
          email: "",
          password: ""
     })
     const handleChange = (e) => {
          const input = e.target
          const key = input.name 
          const value = input.value 

          setProfile ({
               ...profile,
               [key]: value
          })
         

     }
  return (
    <div className="bg-gray-100 min-h-screen grid grid-col-2 p-8 ">
      <h1 className="text-2xl font-semibold">
        Build a form where users can update their email and password in an
        object state.
      </h1>
      <div>
        <form
          className="flex flex-col gap-6 mx-auto w-[400px]"
         >
          <input
            type="email"
            name="email"
            className="bg-white border-2 p-3 rounded"
            placeholder="enter your email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="bg-white border-2 p-3 rounded"
            placeholder="enter your password"
            onChange={handleChange}
          />
          {/* <button className="bg-blue-600 text-white p-3 rounded" type="submit">
            Submit
          </button> */}
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-lg text-center h-fit py-8 space-y-2">
        <i className="ri-user-line text-8xl "></i>
    
        
        <h1 className="text-xl font-medium">Email: {profile.email}</h1>
        <h1 className="text-xl font-medium">Password: {profile.password}</h1>
      </div>
    </div>
  );
}

export default Ex37