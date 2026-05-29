import { useState } from "react";

const Ex58 = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    address: "",
    mobile: "",
  });
  const handleChange = (e) => {
    const input = e.target;
    const key = input.name;
    const value = input.value;

    setForm({
      ...form,
      [key]: value,
    });
  };

//   const signup = (e) => {
//     e.preventDefault();
//     console.log(form);
//   };

  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Create a form that resets only specific fields when a reset button is
        clicked.
      </h1>
      <form className="flex flex-col gap-3" >
        <input
          type="text"
          placeholder="enter your name"
          name="fullname"
          value={form.fullname}
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
        />
        <input
          value={form.email}
          type="email"
          placeholder="enter your email"
          name="email"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
        />
        <input
          value={form.mobile}
          type="number"
          placeholder="enter your number"
          name="mobile"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
        />
        <input
          value={form.address}
          type="text"
          placeholder="enter your address"
          name="address"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
        />

        {/* <button
          className="px-6 py-3 rounded bg-blue-500 hover:bg-blue-600 cursor-pointer mt-3"
       >
          Submit
        </button> */}
        <button
          className="px-6 py-3 rounded bg-rose-500 hover:bg-rose-600 cursor-pointer mt-3"
                      type="button"
                      onClick={() => setForm({...form, address: ''})}
          >
          Reset
        </button>
      </form>
    </div>
  );
};

export default Ex58;
