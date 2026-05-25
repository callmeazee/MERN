import { useState } from "react"


const Ex30 = () => {
     const Component1 = () => {
          return (
            <div>
              <h1 className="text-2xl font-semibold">Enter Mobile number</h1>
              <input
                className="p-2 border border-gray-800"
                placeholder="enter mobile number"
              />
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium">
                Send
              </button>
            </div>
          );
     }
     const Component2 = () => {
          return (
            <div>
              <h1 className=" text-2xl font-semibold">Enter OTP</h1>
              <input
                className="p-2 border border-gray-800"
                placeholder="enter your OTP"
              />
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium">
                Verify
              </button>
            </div>
          );
     }

const [component, setComponent] = useState(false)
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Create a toggle button that switches between two different components.
        </h1>
           {component ? <Component1/> : <Component2/> }
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium" onClick={() =>setComponent(!component) }>Toggle</button>
      </div>
    </div>
  );
}

export default Ex30