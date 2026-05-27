import { useState } from "react";


const Ex47 = () => {
     const [form, setForm] = useState({
       fullname: "john",
       email: "john@gmail.com",
       mobile: "9893995381",
       address: "john whitefield street highway colony pune, maharashtra",
     });

     const handleChange = (e) => {
          const input = e.target
          const key = input.name 
          const value = input.value
          setForm({
               ...form,
               [key] : value
          })
     }

  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Build a form that updates user information but retains previously
        entered data.
      </h1>
      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="enter your name"
          name="fullname"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="enter your email"
          name="email"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="enter your number"
          name="mobile"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="enter your address"
          name="address"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
        />

        <button className="px-6 py-3 rounded bg-blue-500 hover:bg-blue-600 cursor-pointer mt-3">
          Submit
        </button>
      </form>
      <div className="text-center ">
        <h2 className="font-bold text-xl text-gray-600">Fullname: {form.fullname}</h2>
        <h2 className="font-bold text-xl text-gray-600">Email: {form.email}</h2>
        <h2 className="font-bold text-xl text-gray-600">Mobile: {form.mobile}</h2>
        <h2 className="font-bold text-xl text-gray-600">Address: {form.address}</h2>
      </div>
    </div> 
  );
}

export default Ex47