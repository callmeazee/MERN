import { useState } from "react"


const Ex46 = () => {
     const [select, setSelect] = useState({
          country : "India"
     })

  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Create an object state that updates dynamically when a user selects a
        dropdown option.
      </h1>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="country"
            className="text-sm font-medium text-gray-700">
            Choose a Destination
          </label>

          <select
            id="country"
            onChange={(e) => setSelect({country: e.target.value})}
            name="country"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 cursor-pointer appearance-none"
            defaultValue="">
            <option value="" disabled hidden>
              Select your country...
            </option>
            <option value="india">India</option>
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="canada">Canada</option>
            <option value="germany">Germany</option>
            <option value="japan">Japan</option>
          </select>
        </div>
      </div>

            <p className="font-bold text-2xl text-neutral-800 capitalize"> Your Selected Country : { select.country}</p>
  
    </div>
  );
}

export default Ex46