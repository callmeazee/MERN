import { useState } from "react";

const Ex45 = () => {
    
     const [loginForm, setLoginForm] = useState({
       email: "",
          password: "",
       checkbox: ""
     
     });

     const handleChange = (e) => {
          const input = e.target
          const key = input.name 
          const value = (key === "checkbox" ? input.checked : input.value)

          setLoginForm({
               ...loginForm,
               [key] : value
          })
          
          console.log(loginForm)
     }
  
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Implement a login form where state tracks email, password, and
        rememberMe.
      </h1>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              onChange={handleChange}
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between my-1">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 select-none">
              <input
                name="checkbox"
                type="checkbox"
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-sm mt-2 cursor-pointer">
            Sign In
          </button>
        </form>
      </div>
        <div>
          <h2> Email: {loginForm.email}</h2>
          <h2> Password:  {loginForm.password}</h2>
          <h2> Remember me: {loginForm.checkbox.toString()}</h2>
        </div>
    </div>
  );
};

export default Ex45;
