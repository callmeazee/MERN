import { useState } from "react"


const Ex33 = () => {
     const [form, setForm] = useState({
          username: "",
          password: ""
     })
     const handleChange = (e) => {
          const input = e.target
          const key = input.name
          const value = input.value
          setForm({
               ...form,
               [key] : value
          })
     }
     const login = (e) => {
          e.preventDefault()
          
     }
  return (
    <div className="bg-gray-100 min-h-screen grid grid-col-2 p-8 ">
      <h1 className="text-2xl font-semibold">
        Create an object state to store a users login credentials and update
        them.
      </h1>
      <div>
        <form className="flex flex-col gap-6 mx-auto w-[400px]" onSubmit={login}>
          <input
            type="text"
            name="username"
            className="bg-white border border-gray-300 p-3 rounded"
            placeholder="enter your username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="bg-white border p-3 rounded"
            placeholder="enter your password"
            onChange={handleChange}
          />
          <button className="bg-blue-600 text-white p-3 rounded" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-lg text-center h-fit">
        {/* <i className="ri-user-line text-8xl"></i>
    
        <p></p> */}
                 <h1 className="text-xl font-medium">{form.username}</h1>
                 <h1 className="text-xl font-medium">{ form.password}</h1>
      </div>
    </div>
  );
}

export default Ex33