import { useState } from "react";


const Ex10 = () => {
     const [value, setValue ] = useState('')

     const handleSubmit = (e) => {
          e.preventDefault()
          

     }
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Create a form with a Submit button that logs the input value on click.
        </h1>
          <form
               className="flex flex-col gap-8"
               onSubmit = {handleSubmit}
          >
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            className="border px-6 py-2.5 rounded-lg "
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            placeholder="enter your email"
            className="border px-6 py-2.5 rounded-lg "
          />
          <label>Password: </label>
          <input
            type="text"
            name="password"
            placeholder="enter your password"
            className="border px-6 py-2.5 rounded-lg "
          />
          <button
          type="submit"
          className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer "
          >
          Submit
               
          </button>
        </form>
      </div>
    </div>
  );
}

export default Ex10