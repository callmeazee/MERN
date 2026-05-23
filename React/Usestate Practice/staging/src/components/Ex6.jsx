import { useState } from "react";

const Ex6 = () => {
  // 1. Used camelCase for the setter function name
  const [showPassword, setShowPassword] = useState("password");

  const handleClick = () => {
    setShowPassword(showPassword === "password" ? "text" : "password");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 max-w-sm w-full p-4">
        <h1 className="text-2xl font-semibold mb-4">
          Implement a password visibility toggle in an input field.
        </h1>

        {/* A simple wrapper to style the input and button nicely together */}
        <div className="relative flex items-center">
          <input
            type={showPassword}
            placeholder="enter your password here"
            className="border p-2 rounded w-full pr-10" // added padding so text doesn't overlap icon
          />
          <button
            onClick={handleClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            type="button">
            {/* 2. Checked the state value here to swap the icons correctly */}
            <i
              className={
                showPassword === "password" ? "ri-eye-line" : "ri-eye-off-line"
              }></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ex6;
