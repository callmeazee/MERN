import { useState } from "react";




const Ex29 = () => {
     const [message, setMessage] = useState('Hello ji Ki Haal hai ?')
     const Alert = () => {
          return (
               <div style={{
                    width: 720,
                    height: 60,
                    background: "red",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 16px",
                    borderRadius: 8
               }}>
                    {message}
     
               </div>
     
          )
     }
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Build a component that conditionally renders different messages based
          on state.
                 </h1>
                 <Alert message={message} />

        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium" onClick={() => setMessage("sab chnaga siiiii")}>Change state</button>
      </div>
    </div>
  );
}

export default Ex29