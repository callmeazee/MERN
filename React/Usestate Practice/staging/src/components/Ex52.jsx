import { useState } from "react"


const Ex52 = () => {
     
     const [form, setForm] = useState({
          fullname: '',
          email: '',
          mobile: '',
          password: ''
     })
     const [error, setError] = useState({
       fullname: "",
       email: "",
       mobile: "",
       password: "",
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

     const validateRequired = (value) => {
          if (value.length)
               return null
          return "this field is required"
     }

     const signup = (e) => {
          e.preventDefault()
          setError({
               fullname: validateRequired(form.fullname),
               email: validateRequired(form.email),
               mobile: validateRequired(form.email),
               password: validateRequired(form.password)
          })
     }



  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-50 p-6">
      <h1 className="text-2xl mb-6 font-bold text-center">
        Create a form that validates user input and updates an error message in
        state.
      </h1>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h1 className="font-bold text-2xl text-slate-800 text-center mb-2">
          Create an Account
        </h1>
        <p className="text-sm text-slate-500 text-center mb-8">
          Please fill in your details to get started.
        </p>

        <form className="space-y-5" onSubmit={signup}>
          {/* Full Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="John Doe"
              className="border border-slate-200 p-3 w-full rounded-xl text-slate-800 bg-slate-50/50 focus:bg-white transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              onChange={handleChange}
            />
            {/* Example Error Message Layout */}
            {error.fullname && (
              <span className="text-xs font-medium text-red-500 mt-0.5">
                {error.fullname}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="border border-slate-200 p-3 w-full rounded-xl text-slate-800 bg-slate-50/50 focus:bg-white transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              onChange={handleChange}
            />
            {error.email && (
              <span className="text-xs font-medium text-red-500 mt-0.5 ">
                {error.email}
              </span>
            )}
          </div>

          {/* Mobile Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="10-digit mobile number"
              className="border border-slate-200 p-3 w-full rounded-xl text-slate-800 bg-slate-50/50 focus:bg-white transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              onChange={handleChange}
            />
            {error.mobile && (
              <span className="text-xs font-medium text-red-500 mt-0.5 ">
                {error.mobile}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="border border-slate-200 p-3 w-full rounded-xl text-slate-800 bg-slate-50/50 focus:bg-white transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              onChange={handleChange}
            />
            {error.password && (
              <span className="text-xs font-medium text-red-500 mt-0.5 ">
                {error.password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold p-3.5 rounded-xl shadow-lg shadow-indigo-100 transition-all mt-4">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default Ex52