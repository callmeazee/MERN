import { useState } from "react";

const Ex44 = () => {
  const [userForm, setUserForm] = useState({
    fullname: "azee zooo",
    email: "azee@zeecorp.co.in",
    number: "9893995681",
    address: "5th Evenue Street, house no 63 , bangalore, karnataka",
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const input = e.target;
    const key = input.name;
    const value = input.value;

    setUserForm({
      ...userForm,
      [key]: value,
    });
  };
  const signup = (e) => {
    e.preventDefault();
    setSubmittedData(userForm );
    console.log(submittedData);
  };
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Build a form that manages multiple input fields using a single state
        object.
      </h1>
      <form className="flex flex-col gap-3" onSubmit={signup}>
        <input
          type="text"
          placeholder="enter your name"
          name="fullname"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
          value={"azee"}
        />
        <input
          type="email"
          placeholder="enter your email"
          name="email"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
          value={"azee@gmail.com"}
        />
        <input
          type="number"
          placeholder="enter your number"
          name="mobile"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
          value={3989562413}
        />
        <input
          type="text"
          placeholder="enter your address"
          name="address"
          className="border border-gray-600 p-2.5 rounded-lg"
          onChange={handleChange}
          value={"azeez street highway colony mp, ny "}
        />

        <button className="px-6 py-3 rounded bg-blue-500 hover:bg-blue-600 cursor-pointer mt-3">
          Submit
        </button>
      </form>
        {  submittedData &&    (<div className="text-center">
        <p className="font-medium text-lg text-gray-700">{submittedData.fullname}</p>
        <p className="font-medium text-lg text-gray-700">{submittedData.email}</p>
        <p className="font-medium text-lg text-gray-700">{submittedData.number}</p>
        <p className="font-medium text-lg text-gray-700">{submittedData.address}</p>
      </div>)}
    </div>
  );
};

export default Ex44;
