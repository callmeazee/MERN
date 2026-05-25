import { useEffect, useState } from "react";


const Ex27 = () => {
     const getTime = () => {
          return new Date().toLocaleTimeString()
     }
     const t = getTime()
     const [time, setTime] = useState(t)

     useEffect(() => {
        
     const interval =  setInterval(() => {
               setTime(getTime())
            
     }, 1000)
          
           return () => {
     clearInterval(interval)
          }
     }, [])
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Create a state variable that stores the current date and updates it
          every second
        </h1>
                 <p className="text-2xl font-mono text-center">{time }</p>
      </div>
    </div>
  );
}

export default Ex27