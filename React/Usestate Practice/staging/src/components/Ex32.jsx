import { useState } from "react"


const Ex32 = () => {
     const [form, setForm] = useState({
          firstName: "",
          lastName: ""
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
  const signup = (e) => {
    e.preventDefault()
    console.log(form)
    //handle backend from here 
  }
  return (
    <div className="bg-gray-100 min-h-screen grid grid-col-2 p-8 ">
      <h1 className="text-2xl font-semibold">
        Implement a form with a state object containing firstName and lastName.
      </h1>
      <div>
        <form className="flex flex-col gap-6 mx-auto w-[400px]" onSubmit={signup}>
          <input
            type="text"
            name="firstName"
            className="bg-white border border-gray-300 p-3 rounded"
            placeholder="enter your first name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            className="bg-white border p-3 rounded"
            placeholder="enter your last name"
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
        <h1 className="text-xl font-medium">{form.firstName}</h1>
        <h1 className="text-xl font-medium">{form.lastName}</h1>
      </div>
    </div>
  );
}

export default Ex32