import { useState } from "react";

const Ex43 = () => {
  const [user, setUser] = useState({
    name: "rahul",
    age: 32,
    roll: 5213,
    class: "12th B",
    subject: "maths",
  });

  const handleChange = (e) => {
    const input = e.target;

    const value = input.value;
    setUser({
      ...user,
      subject: value,
    });
  };
  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Implement a text input that updates only one field of an object state.
      </h1>
      <div className="space-y-4">
        <h2 className="font-bold text-xl text-gray-700 capitalize">
          Name : {user.name}{" "}
        </h2>
        <h2 className="font-bold text-xl text-gray-700">Age : {user.age} </h2>
        <h2 className="font-bold text-xl text-gray-700">
          Roll No. : {user.roll}{" "}
        </h2>
        <h2 className="font-bold text-xl text-gray-700">
          Class : {user.class}{" "}
        </h2>
        <h2 className="font-bold text-xl text-gray-700 capitalize">
          Subject : {user.subject}{" "}
        </h2>

        <input
          className="border-2 border-gray-700 p-3 mt-6"
          type="text"
          placeholder="enter the subject"
          name="sub"
          onChange={handleChange}
          maxLength={15}
        />
      </div>
    </div>
  );
};

export default Ex43;
