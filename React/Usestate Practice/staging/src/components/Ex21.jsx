import { useEffect, useState } from "react"


const Ex21 = () => {
     
     const getTime = () => {
        return   new Date().toLocaleTimeString()
     
     }
     const t = getTime()
     const [time, setTime] = useState(t)
     
     useEffect(() => {
          const interval = setInterval(() => {
               const newTime = getTime()
               setTime(newTime)
          }, 1000)

          return () => {
               clearInterval(interval)
          }
     }, [])
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Create a feature that updates state every second using setInterval
                 </h1>
                 
                 <h2 className="font-bold text-5xl text-center">{ time}</h2>

       
      </div>
    </div>
  );
}

export default Ex21